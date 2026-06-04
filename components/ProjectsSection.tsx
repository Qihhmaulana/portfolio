"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

type Project = {
  num: string; title: string; desc: string; tags: string[];
  year: string; role: string; overview: string; features: string[]; link?: string;
};
type Props = { projects: Project[] };

export default function ProjectsSection({ projects }: Props) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <section className="section" id="projects">
        <div className="section-header">
          <span className="section-label">Projects</span>
          <div className="section-rule" />
        </div>
        <div className="proj-list">
          {projects.map((p) => (
            <div key={p.num} className="proj-row" onClick={() => setActive(p)}>
              <div className="proj-left">
                <div className="proj-num mono">{p.num}</div>
                <div>
                  <div className="proj-title">{p.title}</div>
                  <div className="proj-desc">{p.desc}</div>
                </div>
              </div>
              <div className="proj-right">
                <div className="proj-tags">
                  {p.tags.map((t) => (
                    <div key={t} className="proj-tag-pill mono">{t}</div>
                  ))}
                </div>
                <i className="ti ti-arrow-right proj-arrow" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {active && createPortal(
        <div className="modal-overlay" onClick={() => setActive(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActive(null)} aria-label="Close">
              <i className="ti ti-x" />
            </button>

            <div className="modal-num mono">PROJECT {active.num}</div>
            <div className="modal-title">{active.title}</div>
            <div className="modal-role">{active.role}</div>

            <div className="modal-tags">
              {active.tags.map((t) => (
                <span key={t} className="modal-tag mono">{t}</span>
              ))}
            </div>

            <div className="modal-meta-row">
              <div className="modal-meta-box">
                <div className="modal-meta-label mono">Year</div>
                <div className="modal-meta-val">{active.year}</div>
              </div>
              <div className="modal-meta-box">
                <div className="modal-meta-label mono">Role</div>
                <div className="modal-meta-val">{active.role}</div>
              </div>
            </div>

            <div className="modal-section-label mono">Overview</div>
            <p className="modal-overview">{active.overview}</p>

            <div className="modal-section-label mono">Key Features</div>
            <ul className="modal-features">
              {active.features.map((f, i) => (
                <li key={i} className="modal-feature">
                  <i className="ti ti-check" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {active.link && (
              <a href={`https://${active.link}`} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                <i className="ti ti-brand-github" />
                View on GitHub
              </a>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
