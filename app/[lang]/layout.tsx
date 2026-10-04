import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, copy } from "@/lib/content";
import "../reference.css";
import "../globals.css";
import "../agency-content.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "fa" }, { lang: "en" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const title =
    lang === "fa"
      ? "استارت‌ایز — استودیوی طراحی و توسعهٔ محصول"
      : "Startease — Product Design & Development Studio";
  return {
    title: { default: title, template: "%s | Startease" },
    description: copy[lang].intro,
    ...(process.env.SITE_URL
      ? { metadataBase: new URL(process.env.SITE_URL) }
      : {}),
    openGraph: {
      title,
      description: copy[lang].intro,
      siteName: "Startease",
      locale: lang === "fa" ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy[lang].intro,
    },
  };
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} dir={lang === "fa" ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}
