import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, projects, isLocale } from "@/lib/content";
import { Navigation } from "@/components/agency/Navigation";
import { Footer } from "@/components/agency/Footer";
import { Arrow } from "@/components/agency/Brand";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
type Props = { params: Promise<{ lang: string; slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!isLocale(lang) || !project) notFound();
  return {
    title: project.name,
    description: project.description[lang],
    ...(process.env.SITE_URL
      ? {
          alternates: {
            canonical: `/${lang}/work/${slug}`,
            languages: { fa: `/fa/work/${slug}`, en: `/en/work/${slug}` },
          },
        }
      : {}),
    openGraph: {
      title: `${project.name} | Startease`,
      description: project.description[lang],
      ...(process.env.SITE_URL
        ? { images: [{ url: project.image, width: 1280, height: 720 }] }
        : {}),
    },
  };
}
export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!isLocale(lang) || !project) notFound();
  const c = copy[lang];
  return (
    <>
      <Navigation locale={lang} />
      <main className="case-study wrap">
        <a className="back-link" href={`/${lang}#work`}>
          <Arrow />
          {c.back}
        </a>
        <div className="case-heading">
          <div>
            <span className="eyebrow">{project.categoryLabel[lang]}</span>
            <h1 dir="ltr">{project.name}</h1>
            <p>{project.title[lang]}</p>
          </div>
          <a
            className="button button-dark"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${c.live} (${c.newTab})`}
          >
            {c.live}
            <Arrow diagonal />
          </a>
        </div>
        <div className={`case-image ${project.theme}`}>
          <Image
            src={project.image}
            alt={
              lang === "fa"
                ? `نمای وب‌سایت ${project.name}`
                : `${project.name} website`
            }
            width={1280}
            height={720}
            sizes="(max-width: 760px) 94vw, 1100px"
            priority
          />
        </div>
        <div className="case-overview">
          <div>
            <span className="eyebrow">{c.overview}</span>
            <p>{project.details[lang]}</p>
          </div>
          <div>
            <span className="eyebrow">{c.highlights}</span>
            <ul>
              {project.features[lang].map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="case-next">
          <span>{c.otherWork}</span>
          {projects
            .filter((p) => p.slug !== slug)
            .map((p) => (
              <a key={p.slug} href={`/${lang}/work/${p.slug}`}>
                <span dir="ltr">{p.name}</span>
                <Arrow diagonal />
              </a>
            ))}
        </div>
        <div className="case-cta">
          <h2>{c.projectContact}</h2>
          <a className="button button-purple" href={`/${lang}#contact`}>
            {c.cta}
            <Arrow diagonal />
          </a>
        </div>
      </main>
      <Footer locale={lang} />
    </>
  );
}
