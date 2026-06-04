type Tool = { name: string; category: string; icon: string; color: string; order: number };
type Props = { tools: Tool[] };

export default function ToolsSection({ tools }: Props) {
  return (
    <section className="section" id="tools">
      <div className="section-header">
        <span className="section-label">Tools &amp; Apps</span>
        <div className="section-rule" />
      </div>
      <div className="tools-grid">
        {tools.map((t, i) => (
          <div key={i} className="tool-card">
            <div
              className="tool-icon-wrap"
              style={{
                color: t.color,
                borderColor: `${t.color}30`,
                background: `${t.color}14`,
                border: `1px solid ${t.color}30`,
              }}
            >
              <i className={`ti ${t.icon}`} />
            </div>
            <div>
              <div className="tool-name">{t.name}</div>
              <div className="tool-category">{t.category}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
