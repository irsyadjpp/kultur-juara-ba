'use client';

import { useState, useRef } from 'react';
import { Upload, X, File as FileIcon, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { uploadFile } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface FileUploadZoneProps {
  onUploadComplete: (url: string) => void;
  storagePath: string;
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
  previousUrl?: string; // If editing
}

export function FileUploadZone({
  onUploadComplete,
  storagePath,
  label = "Upload File",
  accept = "image/*,application/pdf",
  maxSizeMB = 5,
  className,
  previousUrl
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(previousUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File Terlalu Besar",
        description: `Maksimal ukuran file adalah ${maxSizeMB}MB`,
        variant: "destructive"
      });
      return;
    }

    // Validate Type (Simple check)
    // You can extend this logic based on 'accept' prop if needed

    setIsUploading(true);

    try {
      // Create local preview if image
      if (file.type.startsWith('image/')) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      } else {
        setPreviewUrl(null); // Or set generic file icon
      }

      const downloadUrl = await uploadFile(file, storagePath);
      onUploadComplete(downloadUrl);
      // Update preview to remote URL (optional, but good practice)
      setPreviewUrl(downloadUrl);

      toast({
        title: "Upload Berhasil",
        description: "File telah berhasil diunggah.",
        className: "bg-green-600 text-white"
      });

    } catch (error) {
      console.error(error);
      toast({
        title: "Upload Gagal",
        description: "Terjadi kesalahan saat mengunggah file.",
        variant: "destructive"
      });
      setPreviewUrl(previousUrl || null); // Revert
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onUploadComplete(""); // Clear value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-6 transition-all duration-200 text-center relative overflow-hidden group",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-secondary/50",
          previewUrl ? "border-solid border-border p-0" : ""
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          onChange={handleFileInput}
          disabled={isUploading}
        />

        {/* LOADING OVERLAY */}
        {isUploading && (
          <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center flex-col gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm font-bold animate-pulse">Mengunggah...</p>
          </div>
        )}

        {previewUrl ? (
          // PREVIEW MODE
          <div className="relative w-full aspect-video md:aspect-[3/1] bg-secondary flex items-center justify-center group-hover:bg-secondary/80 transition-colors">
            {/* Image Preview */}
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain"
            />

            {/* Actions Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <Button
                size="sm"
                variant="destructive"
                className="rounded-full"
                onClick={(e) => { e.stopPropagation(); handleRemove(); }}
              >
                <X className="w-4 h-4 mr-2" /> Hapus
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" /> Ganti
              </Button>
            </div>

            <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg pointer-events-none">
              <CheckCircle2 className="w-3 h-3" /> Terupload
            </div>
          </div>
        ) : (
          // UPLOAD PROMPT MODE
          <div
            className="cursor-pointer py-4"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-bold text-sm text-foreground">{label}</h3>
            <p className="text-xs text-muted-foreground mt-1 px-4">
              Drag & drop atau klik untuk memilih file. (Max {maxSizeMB}MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
