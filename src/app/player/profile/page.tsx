
'use client';

import { useState } from "react";
import Link from "next/link";
import { 
  User, Mail, Phone, MapPin, Calendar, 
  Shirt, Activity, Trophy, Upload, 
  ChevronLeft, Save, Shield, QrCode, 
  Camera, Lock, AlertCircle, CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// --- MOCK DATA (Simulasi data user yang sedang login) ---
const USER_PROFILE = {
  id: "ATL-2026-007",
  name: "Jonathan Christie",
  email: "jojo@badminton.id",
  wa: "0812-3456-7890",
  dob: "1997-09-15",
  address: "Jakarta Timur, DKI Jakarta",
  avatar: "https://github.com/shadcn.png",
  
  // Game Data
  team: "PB Djarum Official",
  jerseySize: "L",
  hand: "Right",
  category: "Mens Singles (PRO)",
  
  // Verification
  status: "VERIFIED", // VERIFIED, PENDING, REJECTED
  pbsiId: "00012399",
  instagram: "@jonathanchristieofficial"
};

export default function ManageProfilePage() {
  const [formData, setFormData] = useState(USER_PROFILE);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulasi API Call
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile Updated Successfully!");
    }, 1000);
  };

  const isVerified = formData.status === 'VERIFIED';

  return (
    <div className="min-h-screen bg-zinc-950 font-body pb-24">
      
      {/* --- HEADER --- */}
      <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Link href="/player/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white">
                    <ChevronLeft className="w-6 h-6"/>
                </Button>
            </Link>
            <div>
                <h1 className="text-xl font-black text-white tracking-tight uppercase">My Profile</h1>
                <p className="text-xs text-zinc-500 font-medium">Manage your athlete identity</p>
            </div>
        </div>
        <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold shadow-[0_0_15px_rgba(8,145,178,0.4)]"
        >
            {isSaving ? "SAVING..." : <><Save className="w-4 h-4 mr-2"/> SAVE CHANGES</>}
        </Button>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: VISUAL IDENTITY --- */}
        <div className="lg:col-span-1 space-y-6">
            
            {/* Avatar Uploader */}
            <div className="flex flex-col items-center">
                <div className="relative group">
                    <Avatar className="w-40 h-40 border-4 border-zinc-800 shadow-2xl">
                        <AvatarImage src={formData.avatar} className="object-cover" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Camera className="w-8 h-8 text-white"/>
                    </div>
                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-cyan-600 border-4 border-zinc-950 hover:bg-cyan-500">
                        <Upload className="w-4 h-4"/>
                    </Button>
                </div>
                <div className="mt-4 text-center">
                    <h2 className="text-2xl font-black text-white">{formData.name}</h2>
                    <p className="text-zinc-500 text-sm">{formData.team}</p>
                </div>
            </div>

            {/* Digital ID Card Preview */}
            <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 border-zinc-800 rounded-[24px] overflow-hidden relative shadow-2xl transform transition-transform hover:scale-[1.02]">
                {/* Holographic Overlay Effect */}
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-[40px]"></div>
                
                <CardContent className="p-6 relative z-10 text-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-400"/>
                            <span className="font-black tracking-widest text-xs">BCC 2026</span>
                        </div>
                        <QrCode className="w-8 h-8 opacity-80"/>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <p className="text-[10px] font-bold text-indigo-200 uppercase">Athlete Name</p>
                            <p className="text-xl font-black tracking-tight">{formData.name}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] font-bold text-indigo-200 uppercase">Category</p>
                                <p className="text-sm font-bold">{formData.category}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-indigo-200 uppercase">Team</p>
                                <p className="text-sm font-bold truncate">{formData.team}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/20 flex justify-between items-end">
                        <Badge className={cn("border-none text-[10px]", isVerified ? "bg-green-500 text-black" : "bg-yellow-500 text-black")}>
                            {isVerified ? "VERIFIED PLAYER" : "UNVERIFIED"}
                        </Badge>
                        <p className="text-[10px] font-mono opacity-70">ID: {formData.id}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Status Alert */}
            {!isVerified && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0"/>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-yellow-500">Profile Under Review</p>
                        <p className="text-xs text-yellow-200/70">Data Anda sedang diverifikasi oleh TPF. Anda tidak dapat mengubah NIK dan Nama selama proses ini.</p>
                    </div>
                </div>
            )}
        </div>

        {/* --- RIGHT COLUMN: EDIT FORMS --- */}
        <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
                <TabsList className="bg-zinc-900 w-full p-1 rounded-2xl mb-6">
                    <TabsTrigger value="personal" className="flex-1 rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-bold text-xs md:text-sm">
                        <User className="w-4 h-4 mr-2"/> PERSONAL INFO
                    </TabsTrigger>
                    <TabsTrigger value="game" className="flex-1 rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-bold text-xs md:text-sm">
                        <Activity className="w-4 h-4 mr-2"/> GAME DATA
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex-1 rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-bold text-xs md:text-sm">
                        <Shield className="w-4 h-4 mr-2"/> ACCOUNT
                    </TabsTrigger>
                </TabsList>

                {/* TAB: PERSONAL */}
                <TabsContent value="personal">
                    <Card className="bg-zinc-900 border-zinc-800 rounded-[32px]">
                        <CardHeader>
                            <CardTitle className="text-lg font-black text-white">Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-1">
                                        Full Name {isVerified && <Lock className="w-3 h-3 ml-1 text-zinc-600"/>}
                                    </label>
                                    <Input 
                                        value={formData.name} 
                                        disabled={isVerified}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="bg-black border-zinc-800 h-12 rounded-xl text-white disabled:opacity-50" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Date of Birth</label>
                                    <Input 
                                        type="date"
                                        value={formData.dob} 
                                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                                        className="bg-black border-zinc-800 h-12 rounded-xl text-white" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-4 w-4 h-4 text-zinc-500"/>
                                        <Input 
                                            value={formData.email} 
                                            disabled
                                            className="bg-black border-zinc-800 h-12 rounded-xl text-zinc-400 pl-10" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">WhatsApp</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-4 w-4 h-4 text-zinc-500"/>
                                        <Input 
                                            value={formData.wa} 
                                            onChange={(e) => setFormData({...formData, wa: e.target.value})}
                                            className="bg-black border-zinc-800 h-12 rounded-xl text-white pl-10" 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-zinc-500"/>
                                    <Input 
                                        value={formData.address} 
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                        className="bg-black border-zinc-800 h-12 rounded-xl text-white pl-10" 
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB: GAME DATA */}
                <TabsContent value="game">
                    <Card className="bg-zinc-900 border-zinc-800 rounded-[32px]">
                        <CardHeader>
                            <CardTitle className="text-lg font-black text-white">Equipment & Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-1">
                                        Jersey Size <Shirt className="w-3 h-3 ml-1 text-indigo-500"/>
                                    </label>
                                    <Select 
                                        defaultValue={formData.jerseySize}
                                        onValueChange={(val) => setFormData({...formData, jerseySize: val})}
                                    >
                                        <SelectTrigger className="bg-black border-zinc-800 h-12 rounded-xl text-white"><SelectValue/></SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                            {['S','M','L','XL','XXL'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Dominant Hand</label>
                                    <Select 
                                        defaultValue={formData.hand}
                                        onValueChange={(val) => setFormData({...formData, hand: val})}
                                    >
                                        <SelectTrigger className="bg-black border-zinc-800 h-12 rounded-xl text-white"><SelectValue/></SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                            <SelectItem value="Right">Right Handed</SelectItem>
                                            <SelectItem value="Left">Left Handed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-zinc-800 space-y-4">
                                <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest">Public Profile</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase">Instagram</label>
                                        <Input 
                                            value={formData.instagram} 
                                            onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                                            className="bg-black border-zinc-800 h-12 rounded-xl text-white" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-1">
                                            PBSI ID {isVerified && <Lock className="w-3 h-3 ml-1 text-zinc-600"/>}
                                        </label>
                                        <Input 
                                            value={formData.pbsiId} 
                                            disabled={isVerified}
                                            className="bg-black border-zinc-800 h-12 rounded-xl text-white disabled:opacity-50" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB: SECURITY */}
                <TabsContent value="security">
                    <Card className="bg-zinc-900 border-zinc-800 rounded-[32px]">
                        <CardHeader>
                            <CardTitle className="text-lg font-black text-white">Account Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Change Password</label>
                                <Input type="password" placeholder="New Password" className="bg-black border-zinc-800 h-12 rounded-xl text-white" />
                            </div>
                            <div className="space-y-2">
                                <Input type="password" placeholder="Confirm New Password" className="bg-black border-zinc-800 h-12 rounded-xl text-white" />
                            </div>
                            <Button variant="outline" className="w-full h-12 rounded-xl border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
                                Update Password
                            </Button>

                            <div className="pt-6 border-t border-zinc-800">
                                <h4 className="text-xs font-black text-red-500 uppercase tracking-widest mb-4">Danger Zone</h4>
                                <Button variant="destructive" className="w-full h-12 rounded-xl bg-red-900/20 text-red-500 hover:bg-red-900/40 border border-red-900/50">
                                    Delete Account & Leave Tournament
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>

      </div>
    </div>
  );
}

