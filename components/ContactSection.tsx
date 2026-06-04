"use client";

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="section" id="contact">
      <h2 className="contact-main-title">Mari <span>Terhubung</span></h2>
      <p className="contact-main-sub">Saya selalu terbuka untuk peluang baru. Kirimkan pesan Anda.</p>

      <div className="contact-split">
        {/* LEFT */}
        <div className="contact-left-panel">
          <div className="contact-sys-status">
            <div className="contact-sys-dot" />
            <span className="contact-sys-text mono">SYSTEM STATUS: ONLINE</span>
          </div>

          <a href="mailto:maulanafaqih54@gmail.com" className="contact-link-card">
            <div className="clic-icon"><i className="ti ti-mail" /></div>
            <div>
              <div className="clic-label mono">EMAIL</div>
              <div className="clic-val">maulanafaqih54@gmail.com</div>
            </div>
          </a>

          <a href="mailto:maulana.faqih@binus.ac.id" className="contact-link-card">
            <div className="clic-icon"><i className="ti ti-school" /></div>
            <div>
              <div className="clic-label mono">EMAIL CAMPUS</div>
              <div className="clic-val">maulana.faqih@binus.ac.id</div>
            </div>
          </a>

          <a href="https://wa.me/628170139837?text=Halo%20Maulana%2C%20saya%20tertarik%20bekerja%20sama." target="_blank" rel="noopener noreferrer" className="contact-link-card">
            <div className="clic-icon clic-icon-wa"><i className="ti ti-brand-whatsapp" /></div>
            <div>
              <div className="clic-label mono">CHAT WHATSAPP</div>
              <div className="clic-val">+62 817-0139-837</div>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/maulana-faqih/" target="_blank" rel="noopener noreferrer" className="contact-link-card">
            <div className="clic-icon clic-icon-li"><i className="ti ti-brand-linkedin" /></div>
            <div>
              <div className="clic-label mono">LINKEDIN</div>
              <div className="clic-val">maulana-faqih</div>
            </div>
          </a>

          <a href="https://github.com/Qihhmaulana" target="_blank" rel="noopener noreferrer" className="contact-link-card">
            <div className="clic-icon clic-icon-gh"><i className="ti ti-brand-github" /></div>
            <div>
              <div className="clic-label mono">GITHUB</div>
              <div className="clic-val">Qihhmaulana</div>
            </div>
          </a>

          <div className="contact-panel-footer mono">
            <i className="ti ti-wifi" /> establishing uplink...
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="contact-right-panel">
          <div className="contact-form-header">
            <i className="ti ti-send" />
            <span className="mono">INITIATE DATA TRANSMISSION</span>
          </div>
          <form className="cform" onSubmit={handleSubmit}>
            <div className="cform-field">
              <i className="ti ti-user" />
              <input type="text" name="name" required placeholder="ID Pengirim / Nama" className="cform-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="cform-field">
              <i className="ti ti-mail" />
              <input type="email" name="email" required placeholder="Frekuensi Email" className="cform-input" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <textarea required rows={5} placeholder="Data Transmisi Pesan" className="cform-textarea" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            <button type="submit" className="cform-submit" disabled={status === "loading"}>
              {status === "loading"
                ? <><i className="ti ti-loader-2" style={{ animation: "spin 1s linear infinite" }} /><span>MENGIRIM...</span></>
                : <><span>INISIASI TRANSMISI</span><i className="ti ti-arrow-up-right" /></>
              }
            </button>
            {status === "success" && <div className="cform-success mono">✓ TRANSMISI BERHASIL — PESAN TERKIRIM KE GMAIL</div>}
            {status === "error"   && <div className="cform-error mono">✗ GAGAL MENGIRIM — COBA LAGI</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
