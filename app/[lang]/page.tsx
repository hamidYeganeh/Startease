import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, isLocale, team } from "@/lib/content";
import { contactEmail } from "@/lib/site";
import { Navigation } from "@/components/agency/Navigation";
import { Footer } from "@/components/agency/Footer";
import { ProjectGrid } from "@/components/agency/ProjectGrid";
import { ContactForm } from "@/components/agency/ContactForm";
import { Star, Arrow } from "@/components/agency/Brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return process.env.SITE_URL
    ? {
        alternates: {
          canonical: `/${lang}`,
          languages: { fa: "/fa", en: "/en", "x-default": "/fa" },
        },
      }
    : {};
}
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = copy[lang];
  return (
    <>
      <a className="skip-link" href="#work">
        {c.skip}
      </a>
      <Navigation locale={lang} />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grain" />
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-content">
            <span className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              {c.eyebrow}
            </span>
            <h1 id="hero-title">
              {c.hero[0]}
              <br />
              <span>{c.hero[1]}</span>
            </h1>
            <p className="hero-intro">{c.intro}</p>
            <div className="hero-actions">
              <a className="button button-purple" href="#contact">
                {c.cta}
                <Arrow diagonal />
              </a>
              <a className="button button-ghost" href="#work">
                {c.viewWork}
                <Arrow />
              </a>
            </div>
            <p className="hero-note">
              <Star />
              {c.heroNote}
            </p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="sculpture">
              <Star />
              <Star className="star-reflection" />
            </div>
            <div className="orbital-label">
              <span />
              {c.orbitNote}
            </div>
          </div>
          <div className="hero-bottom wrap">
            <span dir="ltr">IDEA → DESIGN → BUILD → LAUNCH</span>
            <a href="#work">
              {c.scroll}
              <span>↓</span>
            </a>
          </div>
        </section>
        <div className="principles">
          <div className="wrap">
            {c.strip.map((text) => (
              <span key={text}>
                <Star />
                {text}
              </span>
            ))}
          </div>
        </div>
        <section id="work" className="section wrap work-section">
          <span className="eyebrow">{c.workLabel}</span>
          <div className="section-heading">
            <h2>{c.workTitle}</h2>
            <span className="section-doodle" aria-hidden="true">
              ↘
            </span>
          </div>
          <ProjectGrid locale={lang} />
        </section>
        <section id="services" className="services-section">
          <div className="wrap section">
            <span className="eyebrow">{c.servicesLabel}</span>
            <div className="section-heading">
              <h2>{c.servicesTitle}</h2>
              <p>{c.servicesIntro}</p>
            </div>
            <div className="services-grid">
              {c.services.map((service, i) => (
                <article key={service.title} className="service-card">
                  <div className={`service-art art-${i}`} aria-hidden="true">
                    {i === 0 ? (
                      <>
                        <span />
                        <span />
                        <span />
                      </>
                    ) : i === 1 ? (
                      <>
                        <span>&lt;</span>
                        <i />
                        <span>/&gt;</span>
                      </>
                    ) : (
                      <>
                        <span />
                        <i />
                        <b />
                      </>
                    )}
                  </div>
                  <span className="service-number">0{i + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="process" className="section wrap process-section">
          <div className="process-intro">
            <span className="eyebrow">{c.processLabel}</span>
            <h2>{c.processTitle}</h2>
            <p>{c.processIntro}</p>
            <div className="process-sketch" aria-hidden="true">
              <span>✳</span>
              <span className="sketch-line" />
              <Star />
              <span className="sketch-line" />
              <span>↗</span>
            </div>
          </div>
          <div className="steps">
            {c.steps.map((step, i) => (
              <article className="step" key={step.title}>
                <span className="step-number">0{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="team" className="team-section">
          <div className="wrap section">
            <div className="team-heading">
              <div>
                <span className="eyebrow">{c.teamLabel}</span>
                <h2>{c.teamTitle}</h2>
              </div>
              <p>{c.teamIntro}</p>
            </div>
            {team.length > 0 ? (
              <div className="team-grid">
                {team.map((member) => (
                  <article key={member.name.en} className="person-card">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name[lang]}
                        width={400}
                        height={440}
                      />
                    ) : (
                      <div className="person-initial">
                        {member.name[lang].slice(0, 1)}
                      </div>
                    )}
                    <h3>{member.name[lang]}</h3>
                    <span>{member.role[lang]}</span>
                    <p>{member.bio[lang]}</p>
                    {member.url && (
                      <a
                        href={member.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {lang === "fa" ? "پروفایل" : "Profile"}
                        <Arrow diagonal />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <>
                <div className="team-values">
                  {c.disciplines.map((item, i) => (
                    <article key={item.title}>
                      <div
                        className={`value-symbol value-${i}`}
                        aria-hidden="true"
                      >
                        {i === 0 ? (
                          <Star />
                        ) : i === 1 ? (
                          <span>{"{ }"}</span>
                        ) : (
                          <span>↗</span>
                        )}
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
                <p className="team-note">
                  <span className="status-dot" />
                  {c.teamNote}
                </p>
              </>
            )}
          </div>
        </section>
        <section className="section wrap faq-section">
          <div>
            <span className="eyebrow">{c.faqLabel}</span>
            <h2>{c.faqTitle}</h2>
          </div>
          <div className="faqs">
            {c.faqs.map((faq) => (
              <details key={faq.q}>
                <summary>
                  {faq.q}
                  <span className="faq-plus" aria-hidden="true" />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="wrap contact-grid">
            <div className="contact-intro">
              <span className="eyebrow">{c.contactLabel}</span>
              <h2>{c.contactTitle}</h2>
              <p>{c.contactIntro}</p>
              <Star className="contact-star" />
              <a
                className="contact-email"
                href={`mailto:${contactEmail}`}
                dir="ltr"
              >
                {contactEmail}
                <Arrow diagonal />
              </a>
            </div>
            <ContactForm
              locale={lang}
              delivery={Boolean(process.env.INQUIRY_WEBHOOK_URL)}
              email={contactEmail}
            />
          </div>
        </section>
      </main>
      <Footer locale={lang} />
    </>
  );
}
