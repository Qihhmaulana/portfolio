import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="a1">
        <div className="hero-eyebrow mono">
          <div className="eyebrow-line" />
          HALO, SAYA
        </div>
        <div className="hero-title">Maulana</div>
        <div className="hero-title-thin">Faqih.</div>

        <div className="hero-role">
          <div className="hero-role-pre">Seorang</div>
          <div className="hero-role-main">Computer Engineer &amp; IT Specialist</div>
        </div>

        <div className="hero-socials">
          <a href="https://github.com/Qihhmaulana" target="_blank" rel="noopener noreferrer" className="hero-social-link">
            <i className="ti ti-brand-github" />
          </a>
          <a href="https://www.linkedin.com/in/maulana-faqih/" target="_blank" rel="noopener noreferrer" className="hero-social-link">
            <i className="ti ti-brand-linkedin" />
          </a>
          <a href="mailto:maulanafaqih54@gmail.com" className="hero-social-link">
            <i className="ti ti-mail" />
          </a>
        </div>

        <p className="hero-desc">
          My name is Maulana Faqih, I&apos;m a Final-year (8 semester) Computer Engineering student with 1 year of hands-on experience as an IT Support Infrastructure Intern at Triputra Agro Persada. Experienced in providing end-user technical support, troubleshooting hardware, software, and network issues, as well as managing IT Infrastructure and device deployment. Skilled in Microsoft 365 administration, network monitoring, and implementing security measures such as Multi-Factor Authentication (MFA). Strong problem-solving, adaptability, and communication skills, with a strong interest in IT Support and infrastructure roles.
        </p>

        <div className="hero-btns">
          <a href="/CV_MaulanaFaqih.pdf" download style={{ textDecoration: "none" }}>
            <button className="btn-black">Download CV</button>
          </a>
          <a href="#contact" style={{ textDecoration: "none" }}>
            <button className="btn-outline">Kontak Saya →</button>
          </a>
        </div>
      </div>

      <div className="hero-photo-wrap a2">
        <div className="photo-glow" />
        <div className="photo-blob">
          <Image src="/Profile.png" alt="Maulana Faqih" width={420} height={520} className="blob-photo" unoptimized />
        </div>
        <div className="float-dot fd1" />
        <div className="float-dot fd2" />
        <div className="float-dot fd3" />
        <div className="photo-badge mono">MF · 2026</div>
      </div>
    </section>
  );
}
