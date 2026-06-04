"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, orderBy, query,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type Skill      = { id: string; name: string; order: number };
type Experience = { id: string; order: number; title: string; company: string; period: string; desc: string; tags: string[] };
type Project    = { id: string; order: number; num: string; title: string; desc: string; tags: string[]; year: string; role: string; overview: string; features: string[]; link?: string };
type Tool       = { id: string; order: number; name: string; category: string; icon: string; color: string };

type Tab = "skills" | "experiences" | "projects" | "tools";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("skills");
  const [skills, setSkills]           = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects]       = useState<Project[]>([]);
  const [tools, setTools]             = useState<Tool[]>([]);
  const [modal, setModal] = useState<{ type: Tab; data?: Skill | Experience | Project } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) router.replace("/admin");
      else setLoading(false);
    });
    return unsub;
  }, [router]);

  const fetchAll = useCallback(async () => {
    const [sSnap, eSnap, pSnap, tSnap] = await Promise.all([
      getDocs(query(collection(db, "skills"),      orderBy("order"))),
      getDocs(query(collection(db, "experiences"), orderBy("order"))),
      getDocs(query(collection(db, "projects"),    orderBy("order"))),
      getDocs(query(collection(db, "tools"),       orderBy("order"))),
    ]);
    setSkills(sSnap.docs.map(d => ({ id: d.id, ...d.data() } as Skill)));
    setExperiences(eSnap.docs.map(d => ({ id: d.id, ...d.data() } as Experience)));
    setProjects(pSnap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
    setTools(tSnap.docs.map(d => ({ id: d.id, ...d.data() } as Tool)));
  }, []);

  useEffect(() => { if (!loading) fetchAll(); }, [loading, fetchAll]);

  const handleDelete = async (col: Tab, id: string) => {
    if (!confirm("Hapus item ini?")) return;
    await deleteDoc(doc(db, col, id));
    fetchAll();
  };

  const handleLogout = async () => { await signOut(auth); router.replace("/admin"); };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#05050f", color: "#f1f5f9" }}>
      Memuat...
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#05050f", color: "#f1f5f9", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: "0 2rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "sticky", top: 0, background: "rgba(5,5,15,0.9)", backdropFilter: "blur(20px)", zIndex: 10 }}>
        <span style={{ fontWeight: 800, fontSize: 14, background: "linear-gradient(90deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Admin Dashboard</span>
        <button onClick={handleLogout} style={{ ...smBtn, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>Logout</button>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
          {(["skills", "experiences", "projects", "tools"] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ ...tabBtn, ...(tab === t ? tabBtnActive : {}) }}>{t}</button>
          ))}
        </div>

        {/* Add button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
          <button onClick={() => setModal({ type: tab })} style={addBtn}>+ Tambah {tab.slice(0, -1)}</button>
        </div>

        {/* Skills */}
        {tab === "skills" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map(s => (
              <div key={s.id} style={chipWrap}>
                <span style={{ fontSize: 12, color: "#a78bfa" }}>{s.name}</span>
                <div style={{ display: "flex", gap: 4 }}>
                  <button onClick={() => setModal({ type: "skills", data: s })} style={iconBtn}>✏️</button>
                  <button onClick={() => handleDelete("skills", s.id)} style={{ ...iconBtn, color: "#f87171" }}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experiences */}
        {tab === "experiences" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {experiences.map(e => (
              <div key={e.id} style={card}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: 2 }}>{e.title}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{e.company} · {e.period}</div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 6, lineHeight: 1.5 }}>{e.desc.slice(0, 100)}...</div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button onClick={() => setModal({ type: "experiences", data: e })} style={smBtn}>Edit</button>
                  <button onClick={() => handleDelete("experiences", e.id)} style={{ ...smBtn, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {tab === "projects" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {projects.map(p => (
              <div key={p.id} style={card}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: 2 }}>{p.num} — {p.title}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{p.role} · {p.year}</div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>{p.desc}</div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button onClick={() => setModal({ type: "projects", data: p })} style={smBtn}>Edit</button>
                  <button onClick={() => handleDelete("projects", p.id)} style={{ ...smBtn, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tools */}
        {tab === "tools" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
            {tools.map(t => (
              <div key={t.id} style={{ ...card, flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: `${t.color}18`, border: `1px solid ${t.color}40`, color: t.color }}>
                  <i className={`ti ${t.icon}`} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 13 }}>{t.name}</div>
                  <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase" }}>{t.category}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setModal({ type: "tools", data: t })} style={smBtn}>Edit</button>
                  <button onClick={() => handleDelete("tools", t.id)} style={{ ...smBtn, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <FormModal
          type={modal.type}
          data={modal.data}
          existingCount={{ skills: skills.length, experiences: experiences.length, projects: projects.length, tools: tools.length }[modal.type] ?? 0}
          onClose={() => setModal(null)}
          onSave={async () => { setModal(null); await fetchAll(); }}
        />
      )}
    </div>
  );
}

/* ── FORM MODAL ── */
function FormModal({ type, data, existingCount, onClose, onSave }: {
  type: Tab; data?: Skill | Experience | Project | Tool; existingCount: number;
  onClose: () => void; onSave: () => void;
}) {
  const isEdit = !!data;
  const [saving, setSaving] = useState(false);

  // Skill form
  const [skillName, setSkillName] = useState((data as Skill)?.name ?? "");

  // Experience form
  const [expTitle, setExpTitle]     = useState((data as Experience)?.title ?? "");
  const [expCompany, setExpCompany] = useState((data as Experience)?.company ?? "");
  const [expPeriod, setExpPeriod]   = useState((data as Experience)?.period ?? "");
  const [expDesc, setExpDesc]       = useState((data as Experience)?.desc ?? "");
  const [expTags, setExpTags]       = useState((data as Experience)?.tags?.join(", ") ?? "");

  // Project form
  const [projNum, setProjNum]         = useState((data as Project)?.num ?? "");
  const [projTitle, setProjTitle]     = useState((data as Project)?.title ?? "");
  const [projDesc, setProjDesc]       = useState((data as Project)?.desc ?? "");
  const [projYear, setProjYear]       = useState((data as Project)?.year ?? "");
  const [projRole, setProjRole]       = useState((data as Project)?.role ?? "");
  const [projOverview, setProjOverview] = useState((data as Project)?.overview ?? "");
  const [projFeatures, setProjFeatures] = useState((data as Project)?.features?.join("\n") ?? "");
  const [projTags, setProjTags]       = useState((data as Project)?.tags?.join(", ") ?? "");
  const [projLink, setProjLink]       = useState((data as Project)?.link ?? "");

  // Tool form
  const [toolName,     setToolName]     = useState((data as Tool)?.name     ?? "");
  const [toolCategory, setToolCategory] = useState((data as Tool)?.category ?? "");
  const [toolIcon,     setToolIcon]     = useState((data as Tool)?.icon     ?? "ti-tool");
  const [toolColor,    setToolColor]    = useState((data as Tool)?.color    ?? "#a78bfa");

  const handleSave = async () => {
    setSaving(true);
    try {
      if (type === "skills") {
        const payload = { name: skillName, order: (data as Skill)?.order ?? existingCount };
        isEdit ? await updateDoc(doc(db, "skills", data!.id), payload) : await addDoc(collection(db, "skills"), payload);
      } else if (type === "experiences") {
        const payload = { title: expTitle, company: expCompany, period: expPeriod, desc: expDesc, tags: expTags.split(",").map(t => t.trim()).filter(Boolean), order: (data as Experience)?.order ?? existingCount };
        isEdit ? await updateDoc(doc(db, "experiences", data!.id), payload) : await addDoc(collection(db, "experiences"), payload);
      } else if (type === "projects") {
        const payload = { num: projNum, title: projTitle, desc: projDesc, year: projYear, role: projRole, overview: projOverview, features: projFeatures.split("\n").map(f => f.trim()).filter(Boolean), tags: projTags.split(",").map(t => t.trim()).filter(Boolean), link: projLink, order: (data as Project)?.order ?? existingCount };
        isEdit ? await updateDoc(doc(db, "projects", data!.id), payload) : await addDoc(collection(db, "projects"), payload);
      } else if (type === "tools") {
        const payload = { name: toolName, category: toolCategory, icon: toolIcon, color: toolColor, order: (data as Tool)?.order ?? existingCount };
        isEdit ? await updateDoc(doc(db, "tools", data!.id), payload) : await addDoc(collection(db, "tools"), payload);
      }
      onSave();
    } finally { setSaving(false); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }} onClick={onClose}>
      <div style={{ background: "#0d0d1f", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 560, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <h2 style={{ margin: "0 0 1.5rem", fontSize: "1.1rem", fontWeight: 700, color: "#f1f5f9" }}>
          {isEdit ? "Edit" : "Tambah"} {type.slice(0, -1)}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {type === "skills" && (
            <input placeholder="Nama skill" value={skillName} onChange={e => setSkillName(e.target.value)} style={mInput} />
          )}

          {type === "experiences" && (<>
            <input placeholder="Jabatan / Title" value={expTitle}   onChange={e => setExpTitle(e.target.value)}   style={mInput} />
            <input placeholder="Perusahaan"       value={expCompany} onChange={e => setExpCompany(e.target.value)} style={mInput} />
            <input placeholder="Periode (contoh: Jan 2024 – Des 2024)" value={expPeriod} onChange={e => setExpPeriod(e.target.value)} style={mInput} />
            <textarea placeholder="Deskripsi" value={expDesc} onChange={e => setExpDesc(e.target.value)} rows={4} style={mTextarea} />
            <input placeholder="Tags (pisah koma): IT Support, Hardware" value={expTags} onChange={e => setExpTags(e.target.value)} style={mInput} />
          </>)}

          {type === "projects" && (<>
            <input placeholder="Nomor (01, 02, ...)" value={projNum}   onChange={e => setProjNum(e.target.value)}   style={mInput} />
            <input placeholder="Judul"                value={projTitle} onChange={e => setProjTitle(e.target.value)} style={mInput} />
            <input placeholder="Deskripsi singkat"   value={projDesc}  onChange={e => setProjDesc(e.target.value)}  style={mInput} />
            <div style={{ display: "flex", gap: 10 }}>
              <input placeholder="Tahun"  value={projYear} onChange={e => setProjYear(e.target.value)} style={{ ...mInput, flex: 1 }} />
              <input placeholder="Role"  value={projRole} onChange={e => setProjRole(e.target.value)} style={{ ...mInput, flex: 2 }} />
            </div>
            <textarea placeholder="Overview (deskripsi lengkap)" value={projOverview} onChange={e => setProjOverview(e.target.value)} rows={4} style={mTextarea} />
            <textarea placeholder="Fitur-fitur (satu baris per fitur)" value={projFeatures} onChange={e => setProjFeatures(e.target.value)} rows={4} style={mTextarea} />
            <input placeholder="Tags (pisah koma): React, TypeScript" value={projTags} onChange={e => setProjTags(e.target.value)} style={mInput} />
            <input placeholder="Link GitHub (tanpa https://)" value={projLink} onChange={e => setProjLink(e.target.value)} style={mInput} />
          </>)}

          {type === "tools" && (<>
            <input placeholder="Nama aplikasi (contoh: VS Code)" value={toolName} onChange={e => setToolName(e.target.value)} style={mInput} />
            <input placeholder="Kategori (contoh: CODE EDITOR)" value={toolCategory} onChange={e => setToolCategory(e.target.value)} style={mInput} />
            <input placeholder="Tabler icon class (contoh: ti-brand-vscode)" value={toolIcon} onChange={e => setToolIcon(e.target.value)} style={mInput} />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input type="color" value={toolColor} onChange={e => setToolColor(e.target.value)} style={{ width: 48, height: 40, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "none", cursor: "pointer", padding: 2 }} />
              <input placeholder="Warna hex (contoh: #60a5fa)" value={toolColor} onChange={e => setToolColor(e.target.value)} style={{ ...mInput, flex: 1 }} />
            </div>
            <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: `${toolColor}18`, border: `1px solid ${toolColor}40`, color: toolColor }}>
                <i className={`ti ${toolIcon}`} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>{toolName || "Nama Tool"}</div>
                <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase" }}>{toolCategory || "KATEGORI"}</div>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 11, color: "#475569" }}>
              Cari icon di <a href="https://tabler.io/icons" target="_blank" rel="noopener noreferrer" style={{ color: "#a78bfa" }}>tabler.io/icons</a> — copy class-nya (contoh: <code style={{ color: "#60a5fa" }}>ti-brand-vscode</code>)
            </p>
          </>)}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: "1.5rem", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ ...smBtn, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#64748b" }}>Batal</button>
          <button onClick={handleSave} disabled={saving} style={{ ...smBtn, background: "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none", color: "#fff", opacity: saving ? 0.6 : 1 }}>
            {saving ? "Menyimpan..." : isEdit ? "Simpan" : "Tambah"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Shared styles ── */
const card: React.CSSProperties = { display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 18px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };
const chipWrap: React.CSSProperties = { display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 8, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)" };
const smBtn: React.CSSProperties = { padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "#e2e8f0", fontSize: 12, fontWeight: 600, cursor: "pointer" };
const iconBtn: React.CSSProperties = { background: "none", border: "none", cursor: "pointer", fontSize: 14, padding: "2px 4px" };
const tabBtn: React.CSSProperties = { padding: "7px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#64748b", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" };
const tabBtnActive: React.CSSProperties = { background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#a78bfa" };
const addBtn: React.CSSProperties = { padding: "8px 18px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" };
const mInput: React.CSSProperties = { padding: "11px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#f1f5f9", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" };
const mTextarea: React.CSSProperties = { ...mInput, resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 };
