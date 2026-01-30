'use client';

export function AdminBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden bg-background">
      
      {/* 1. Base Gradient (Light) */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background opacity-90" />

      {/* 2. Noise Texture (Subtle on light) */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-multiply" />

      {/* 3. Sporty Grid Pattern (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* 4. Ambient Glows (Gen-Z Style - for light mode) */}
      {/* Primary Glow (Top Right - Red/Orange) */}
      <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply" />
      
      {/* Secondary Glow (Bottom Left - Light Blue) */}
      <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] mix-blend-multiply" />

      {/* 5. Center Spotlight (Very subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

    </div>
  );
}
