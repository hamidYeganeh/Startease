import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/content";
import { adaptOneFin } from "@/lib/adapt-onefin";
import { Navigation } from "@/components/onefin/Navigation";
import { Hero } from "@/components/onefin/Hero";
import { Benefits } from "@/components/onefin/Benefits";
import { About } from "@/components/onefin/About";
import { Statistics } from "@/components/onefin/Statistics";
import { Features } from "@/components/onefin/Features";
import { Integrations } from "@/components/onefin/Integrations";
import { Testimonials } from "@/components/onefin/Testimonials";
import { Pricing } from "@/components/onefin/Pricing";
import { Blog } from "@/components/onefin/Blog";
import { Faqs } from "@/components/onefin/Faqs";
import { Download } from "@/components/onefin/Download";
import { Footer } from "@/components/onefin/Footer";
import { PageInteractions } from "@/components/onefin/PageInteractions";
import layout from "@/components/onefin/layout-data.json";
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
          languages: { fa: "/fa", en: "/en" },
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
  const sections = {
    Hero,
    Benefits,
    About,
    Statistics,
    Features,
    Integrations,
    Testimonials,
    Pricing,
    Blog,
    Faqs,
    Download,
  };
  return (
    <div id="main" data-agency-locale={lang}>
      <a className="skip-link" href="#benefits">
        {lang === "fa" ? "رفتن به محتوا" : "Skip to content"}
      </a>
      <a
        className="original-language-switch"
        href={lang === "fa" ? "/en" : "/fa"}
        lang={lang === "fa" ? "en" : "fa"}
      >
        {lang === "fa" ? "EN" : "فارسی"}
      </a>
      <div
        className={layout.rootClass}
        data-layout-template
        style={{ minHeight: "100vh", width: "auto" }}
      >
        {adaptOneFin(Navigation(), "Navigation", lang)}
        <main
          className={layout.mainClass}
          data-framer-root
          style={{ minHeight: "100vh", width: "auto", display: "contents" }}
        >
          {Object.entries(sections).map(([name, Section]) => (
            <Fragment key={name}>{adaptOneFin(Section(), name, lang)}</Fragment>
          ))}
        </main>
        {adaptOneFin(Footer(), "Footer", lang)}
      </div>
      <PageInteractions locale={lang} />
    </div>
  );
}
