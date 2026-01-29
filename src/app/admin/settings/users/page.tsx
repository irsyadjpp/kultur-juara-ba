
'use client';

import { useState, useMemo, useEffect } from "react";
import { 
  ShieldCheck, UserCog, Key, Plus, 
  Search, Filter, MoreHorizontal, Lock, 
  Unlock, Mail, RefreshCw, Smartphone, 
  Trash2, BadgeCheck, LayoutGrid, CircleUser,
  UserPlus, Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { collection } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { inviteUser, updateUser, deleteUser } from './actions';

const ROLES = [
  { id: "SUPER_ADMIN", label: "Super Admin", color: "text-sky-400 border-sky-500 bg-sky-500/10", desc: "Full System Access" },
  { id: "COACH", label: "Coach", color: "text-sky-400 border-sky-500 bg-sky-500/10", desc: "Manages athletes and logs." },
  { id: "PSYCHOLOGIST", label: "Psychologist", color: "text-pink-400 border-pink-500 bg-pink-500/10", desc: "Access to mental journals." },
  { id: "STAFF", label: "Staff / Logistics", color: "text-orange-400 border-orange-500 bg-orange-500/10", desc: "Inventory & Check-in" },
];

export default function UserManagementPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usersCollection = useMemoFirebase(() => {
    if (firestore && user) {
        return collection(firestore, 'users');
    }
    return null;
  }, [firestore, user]);

  const { data: usersData, isLoading: isCollectionLoading } = useCollection(usersCollection);

  const isLoading = isUserLoading || isCollectionLoading;

  const filteredUsers = useMemo(() => {
    if (!usersData) return [];
    return usersData.filter(u => 
      (u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.includes(searchQuery)) &&
      (roleFilter === "ALL" || u.role === roleFilter)
    );
  }, [usersData, searchQuery, roleFilter]);

  const getRoleBadge = (roleCode: string) => {
    const role = ROLES.find(r => r.id === roleCode) || ROLES[2];
    return (
      <Badge variant="outline" className={cn("text-[10px] font-black border uppercase", role.color)}>
        {role.label}
      </Badge>
    );
  };

  const handleInviteUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      dept: formData.get('dept') as string,
    };
    
    const result = await inviteUser(userData);
    if (result.success) {
      toast({ title: "Success", description: result.message, className: "bg-green-600 text-white" });
      setIsAddOpen(false);
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  const handleUpdateUserStatus = async (userId: string, newStatus: string) => {
    const result = await updateUser(userId, { status: newStatus });
    if (result.success) {
      toast({ title: "Success", description: "User status updated." });
      setSelectedUser(prev => prev ? { ...prev, status: newStatus } : null);
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" });
    }
  };
  
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to revoke access for this user permanently?")) {
      const result = await deleteUser(userId);
       if (result.success) {
        toast({ title: "Success", description: "User access has been revoked." });
        setSelectedUser(null);
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    }
  }

  return (
    <div className="flex flex-col space-y-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-sky-500 text-sky-500 bg-sky-500/10 backdrop-blur-md">
                    <UserCog className="w-3 h-3 mr-2" /> SYSTEM ACCESS
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                User <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">Management</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Atur hak akses untuk pelatih, staf, dan administrator akademi.
            </p>
        </div>

        <Button 
            onClick={() => setIsAddOpen(true)}
            className="h-14 rounded-full px-8 bg-sky-600 hover:bg-sky-700 text-white font-black text-lg shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-transform active:scale-95"
        >
            <Plus className="mr-2 w-5 h-5"/> INVITE USER
        </Button>
      </div>

      {/* --- STATS BAR --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
         <Card className="bg-zinc-900 border-zinc-800 rounded-[28px] p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                <ShieldCheck className="w-6 h-6"/>
            </div>
            <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Accounts</p>
                <p className="text-3xl font-black text-white">{usersData?.length || 0}</p>
            </div>
         </Card>
         <Card className="bg-zinc-900 border-zinc-800 rounded-[28px] p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                <Smartphone className="w-6 h-6"/>
            </div>
            <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Now</p>
                <p className="text-3xl font-black text-white">{usersData?.filter(u=>u.lastActive === 'Now').length || 0}</p>
            </div>
         </Card>
         <Card className="bg-zinc-900 border-zinc-800 rounded-[28px] p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                <Lock className="w-6 h-6"/>
            </div>
            <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Suspended</p>
                <p className="text-3xl font-black text-white">{usersData?.filter(u => u.status === 'SUSPENDED').length || 0}</p>
            </div>
         </Card>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm flex flex-col flex-1">
        
        <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 shrink-0">
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto p-1 no-scrollbar">
                <button 
                    onClick={() => setRoleFilter("ALL")}
                    className={cn("px-6 h-10 rounded-full text-sm font-bold transition-all border", roleFilter === "ALL" ? "bg-zinc-800 text-white border-zinc-700" : "border-transparent text-zinc-500 hover:text-white")}
                >
                    All Users
                </button>
                {ROLES.map(role => (
                    <button 
                        key={role.id}
                        onClick={() => setRoleFilter(role.id)}
                        className={cn("px-6 h-10 rounded-full text-sm font-bold transition-all border whitespace-nowrap", roleFilter === role.id ? "bg-zinc-800 text-white border-zinc-700" : "border-transparent text-zinc-500 hover:text-white")}
                    >
                        {role.label.split('/')[0]}
                    </button>
                ))}
            </div>

            <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                <Input 
                    placeholder="Find user..." 
                    className="h-12 bg-zinc-950 border-zinc-800 rounded-full pl-10 text-white focus:ring-sky-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

        <ScrollArea className="px-4 pb-4 flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-zinc-500"/></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredUsers.map((user) => (
                    <div 
                        key={user.id} 
                        onClick={() => setSelectedUser(user)}
                        className="group relative bg-zinc-900 border border-zinc-800 rounded-[32px] p-6 hover:border-sky-500/50 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <Avatar className="h-16 w-16 border-4 border-zinc-950 shadow-xl">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="bg-zinc-800 font-bold text-zinc-500 text-xl">{user.name.split(' ').map((n: string)=>n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="text-right">
                                {user.status === 'ACTIVE' ? (
                                    <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none">ACTIVE</Badge>
                                ) : (
                                    <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-none">SUSPENDED</Badge>
                                )}
                                <p className="text-[10px] text-zinc-500 font-mono mt-2">{user.lastActive}</p>
                            </div>
                        </div>
                        <div className="space-y-1 mb-4">
                            <h3 className="text-lg font-black text-white leading-tight group-hover:text-sky-400 transition-colors">
                                {user.name}
                            </h3>
                            <p className="text-sm text-zinc-500 truncate">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2 pt-4 border-t border-zinc-800">
                            {getRoleBadge(user.role)}
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                                • {user.dept}
                            </span>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-5 h-5 text-zinc-400"/>
                        </div>
                    </div>
                ))}
                <button 
                    onClick={() => setIsAddOpen(true)}
                    className="border-2 border-dashed border-zinc-800 rounded-[32px] flex flex-col items-center justify-center gap-4 text-zinc-600 hover:text-sky-500 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all min-h-[200px] group"
                >
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="w-8 h-8"/>
                    </div>
                    <span className="font-black uppercase tracking-widest text-sm">Add New User</span>
                </button>
            </div>
          )}
        </ScrollArea>
      </div>

      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent className="w-full sm:max-w-md bg-zinc-950 border-l border-zinc-800 p-0 overflow-y-auto">
            {selectedUser && (
                <div className="flex flex-col h-full">
                    <div className="h-48 bg-gradient-to-b from-sky-900/50 to-zinc-900 relative flex flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-20 pointer-events-none"></div>
                        <Avatar className="h-24 w-24 border-4 border-zinc-900 shadow-2xl mb-3">
                            <AvatarImage src={selectedUser.avatar} />
                            <AvatarFallback className="bg-zinc-800 text-2xl font-black text-zinc-500">{selectedUser.name.split(' ').map((n:string)=>n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-black text-white">{selectedUser.name}</h2>
                        <p className="text-zinc-400 text-sm font-mono">{selectedUser.email}</p>
                    </div>

                    <div className="p-8 space-y-8 flex-1">
                        <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-zinc-500 uppercase">Account Status</p>
                                <p className={cn("font-bold text-sm", selectedUser.status === 'ACTIVE' ? "text-green-500" : "text-red-500")}>
                                    {selectedUser.status}
                                </p>
                            </div>
                            <Switch checked={selectedUser.status === 'ACTIVE'} onCheckedChange={(checked) => handleUpdateUserStatus(selectedUser.id, checked ? 'ACTIVE' : 'SUSPENDED')} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Key className="w-4 h-4 text-sky-500"/> Permissions
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3">
                                    <BadgeCheck className="w-5 h-5 text-sky-500"/>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-white">Current Role</p>
                                        <p className="text-xs text-zinc-500">{ROLES.find(r => r.id === selectedUser.role)?.label}</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3">
                                    <LayoutGrid className="w-5 h-5 text-zinc-500"/>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-white">Department</p>
                                        <p className="text-xs text-zinc-500">{selectedUser.dept}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Lock className="w-4 h-4 text-red-500"/> Danger Zone
                            </h3>
                            <div className="flex flex-col gap-2">
                                <Button variant="outline" className="justify-start h-12 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:text-white text-zinc-400">
                                    <RefreshCw className="w-4 h-4 mr-3"/> Reset Password
                                </Button>
                                <Button variant="outline" className="justify-start h-12 border-red-900/30 bg-red-950/10 hover:bg-red-950/30 text-red-500 hover:text-red-400" onClick={() => handleDeleteUser(selectedUser.id)}>
                                    <Trash2 className="w-4 h-4 mr-3"/> Revoke Access
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </SheetContent>
      </Sheet>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-lg p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 bg-sky-950/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2 text-sky-500">
                        <UserPlus className="w-6 h-6"/> Invite Staff
                    </DialogTitle>
                    <DialogDescription>Kirim undangan akses ke anggota tim baru.</DialogDescription>
                </DialogHeader>
            </div>
            
            <form onSubmit={handleInviteUser}>
                <div className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Email Address</label>
                        <Input name="email" type="email" required placeholder="user@kulturjuara.com" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl text-lg" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Full Name</label>
                        <Input name="name" required placeholder="Nama Lengkap" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Role / Access</label>
                            <Select name="role" required>
                                <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Select..." /></SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                    {ROLES.map(r => <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Department</label>
                            <Select name="dept" required>
                                <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Unit..." /></SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                    <SelectItem value="IT & System">IT & System</SelectItem>
                                    <SelectItem value="Match Control">Match Control</SelectItem>
                                    <SelectItem value="Logistics">Logistics</SelectItem>
                                    <SelectItem value="Security">Security</SelectItem>
                                    <SelectItem value="Media & Creative">Media & Creative</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button type="submit" className="w-full h-16 rounded-full font-black text-lg bg-sky-600 hover:bg-sky-700 text-white mt-2 shadow-xl shadow-sky-900/20" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />}
                        {isSubmitting ? "SENDING..." : "SEND INVITATION"}
                    </Button>
                </div>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

