"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

// Rob = full admin access
// Staff = content creator + noticeboard + feedback + rota + allergens
const ACCOUNTS = [
  { username: "rob", password: "tiger2026", role: "admin", redirect: "/staff/dashboard" },
  { username: "staff", password: "tigers", role: "staff", redirect: "/staff/staff-home" },
];

export default function StaffLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const account = ACCOUNTS.find(a => a.username === username.toLowerCase() && a.password === password);
    if (account) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("oth_role", account.role);
        sessionStorage.setItem("oth_user", account.username);
        sessionStorage.setItem("staff_auth", account.role);
      }
      router.push(account.redirect);
    } else {
      setError("Incorrect username or password.");
    }
  };

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <p className="text-gold text-[10px] font-black tracking-[0.4em] uppercase mb-2">The Old Tigers Head</p>
          <h1 className="text-3xl font-black uppercase text-white sc">Staff Portal</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-white/50 text-xs font-bold uppercase tracking-widest block mb-2">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              autoComplete="username" />
          </div>
          <div className="relative">
            <label className="text-white/50 text-xs font-bold uppercase tracking-widest block mb-2">Password</label>
            <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 pr-12 focus:outline-none focus:border-gold transition-colors"
              autoComplete="current-password" />
            <button type="button" onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-[42px] text-white/40 hover:text-white transition-colors">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className="text-red-400 text-xs font-bold uppercase tracking-widest">{error}</p>}
          <button type="submit"
            className="w-full bg-gold text-navy font-black tracking-widest py-4 uppercase hover:bg-white transition-colors mt-4 sc">
            Sign In
          </button>
        </form>
        <p className="text-white/20 text-xs text-center mt-8">
          Contact Rob if you need your login details.
        </p>
      </div>
    </main>
  );
}
