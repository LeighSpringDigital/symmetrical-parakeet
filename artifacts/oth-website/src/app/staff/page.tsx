"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

export default function StaffLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "test" && password === "test") {
      // In a real app, we'd set a cookie or session here
      router.push("/staff/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-navy px-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-12 text-center">
        <h1 className="text-4xl font-black uppercase text-gold mb-8">Staff Portal</h1>
        
        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-navy border border-white/10 py-4 pl-12 pr-4 text-white focus:border-gold outline-none transition-colors"
                placeholder="Staff ID"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-navy border border-white/10 py-4 pl-12 pr-4 text-white focus:border-gold outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gold text-navy font-black py-5 uppercase tracking-widest hover:bg-white transition-colors"
          >
            Enter Portal
          </button>
        </form>

        <p className="mt-12 text-[10px] font-bold uppercase tracking-widest text-white/20">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </main>
  );
}
