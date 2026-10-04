import { Brand, Arrow } from "./Brand";
import Link from "next/link";
import { copy, type Locale } from "@/lib/content";
export function Footer({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <a href={`/${locale}`} aria-label="Startease">
          <Brand />
        </a>
        <p>{c.footer}</p>
        <a href="#top" className="back-top">
          {c.top}
          <Arrow diagonal />
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {c.rights}
        </span>
        <span dir="ltr">DESIGN × DEVELOPMENT</span>
        <div>
          <Link href="/fa" lang="fa">
            فارسی
          </Link>
          <span>/</span>
          <Link href="/en" lang="en">
            English
          </Link>
        </div>
      </div>
    </footer>
  );
}
