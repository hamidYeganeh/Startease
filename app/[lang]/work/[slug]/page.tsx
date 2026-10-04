import { notFound, redirect } from "next/navigation";
import { projects, isLocale } from "@/lib/content";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Preserve previously shared portfolio URLs while using the original landing layout.
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!isLocale(lang) || !project) notFound();
  redirect(project.url);
}
