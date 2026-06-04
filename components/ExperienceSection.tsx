type Experience = { title: string; company: string; period: string; desc: string; tags: string[] };
type Props = { experiences: Experience[] };

export default function ExperienceSection({ experiences }: Props) {
  return (
    <section className="section" id="experience">
      <div className="section-header">
        <span className="section-label">Experience</span>
        <div className="section-rule" />
      </div>
      <div className="exp-list">
        {experiences.map((e) => (
          <div key={e.title} className="exp-card">
            <div className="exp-header">
              <div>
                <div className="exp-title">{e.title}</div>
                <div className="exp-company">{e.company}</div>
              </div>
              <span className="exp-period mono">{e.period}</span>
            </div>
            <p className="exp-desc">{e.desc}</p>
            <div className="exp-tags">
              {e.tags.map((t) => (
                <span key={t} className="exp-tag mono">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
