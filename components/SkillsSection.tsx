type Props = { skills: string[] };

export default function SkillsSection({ skills }: Props) {
  return (
    <section className="section" id="about">
      <div className="section-header">
        <span className="section-label">Skills</span>
        <div className="section-rule" />
      </div>
      <div className="skills-wrap">
        {skills.map((s) => (
          <div key={s} className="skill-tag">{s}</div>
        ))}
      </div>
    </section>
  );
}
