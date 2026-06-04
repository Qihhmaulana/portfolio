"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch {
      setError("Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(160deg,#05050f,#080818)",
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        width: "100%", maxWidth: 380, padding: "2.5rem",
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16, backdropFilter: "blur(20px)",
      }}>
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em",
            background: "linear-gradient(90deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", marginBottom: 8 }}>
            maulanafaqih.dev
          </div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Admin Panel</h1>
          <p style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>Masuk untuk mengelola konten</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="email" required placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password" required placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
          />
          {error && <p style={{ color: "#f87171", fontSize: 12, margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Masuk..." : "Masuk →"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)", color: "#f1f5f9", fontSize: 13, outline: "none",
  width: "100%", boxSizing: "border-box",
};

const btnStyle: React.CSSProperties = {
  marginTop: 4, padding: "13px", borderRadius: 10, border: "none", cursor: "pointer",
  background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "#fff",
  fontSize: 13, fontWeight: 700, transition: "opacity 0.15s",
};
