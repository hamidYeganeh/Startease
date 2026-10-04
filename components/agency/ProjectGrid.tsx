"use client";
import Image from "next/image";
import { useState } from "react";
import { projects, copy, type Locale } from "@/lib/content";
import { Arrow, Star } from "./Brand";

export function ProjectGrid({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState("all");
  const c = copy[locale];
  const filtered = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );
  return (
    <>
      <div className="work-toolbar">
        <p>{c.workIntro}</p>
        <div
          className="filters"
          role="group"
          aria-label={locale === "fa" ? "فیلتر پروژه‌ها" : "Filter projects"}
        >
          {["all", "product", "website"].map((value, i) => (
            <button
              key={value}
              aria-pressed={filter === value}
              className={filter === value ? "active" : ""}
              onClick={() => setFilter(value)}
            >
              {c.filters[i]}
              <span>
                {value === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === value).length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="project-grid" aria-live="polite">
        {filtered.map((project, i) => (
          <article className="project-card" key={project.slug}>
            <a
              href={`/${locale}/work/${project.slug}`}
              className={`project-visual ${project.theme}`}
              aria-label={`${c.projectLink}: ${project.name}`}
            >
              <div className="project-visual-top">
                <span dir="ltr">{project.name}</span>
                <span className="project-index">
                  0{projects.indexOf(project) + 1}
                </span>
              </div>
              <div className="browser-frame">
                <div className="browser-bar">
                  <span className="browser-dots">● ● ●</span>
                  <span dir="ltr">{new URL(project.url).hostname}</span>
                  <span>↗</span>
                </div>
                <Image
                  src={project.image}
                  alt={
                    locale === "fa"
                      ? `نمای صفحهٔ اصلی ${project.name}`
                      : `${project.name} homepage preview`
                  }
                  width={1280}
                  height={720}
                  sizes="(max-width: 760px) 90vw, 44vw"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
              <span className="project-open">
                <Arrow diagonal />
              </span>
            </a>
            <div className="project-meta">
              <h3>
                <a href={`/${locale}/work/${project.slug}`} dir="ltr">
                  {project.name}
                </a>
              </h3>
              <span>{project.categoryLabel[locale]}</span>
            </div>
            <p>{project.description[locale]}</p>
          </article>
        ))}
      </div>
      <a href="#contact" className="next-project">
        <span className="next-project-icon">
          <Star />
        </span>
        <span>
          <strong>{c.nextTitle}</strong>
          <span>{c.nextText}</span>
        </span>
        <span className="next-project-cta">
          {c.nextCta}
          <Arrow diagonal />
        </span>
      </a>
    </>
  );
}
