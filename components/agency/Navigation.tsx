"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Brand, Arrow } from "./Brand";
import { copy, type Locale } from "@/lib/content";

export function Navigation({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const c = copy[locale];
  const other = locale === "fa" ? "en" : "fa";
  const languagePath = pathname.replace(/^\/(fa|en)(?=\/|$)/, `/${other}`);
  return (
    <header className="header" id="top">
      <a href={`/${locale}`} aria-label="Startease" className="brand-link">
        <Brand />
      </a>
      <nav
        className={`desktop-nav ${open ? "is-open" : ""}`}
        id="main-navigation"
        aria-label={locale === "fa" ? "منوی اصلی" : "Main navigation"}
      >
        {["work", "services", "process", "team"].map((id, i) => (
          <a href={`/${locale}#${id}`} key={id} onClick={() => setOpen(false)}>
            {c.nav[i]}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <a
          className="language-switch"
          href={languagePath}
          hrefLang={other}
          lang={other}
          aria-label={
            locale === "fa" ? "Switch to English" : "تغییر زبان به فارسی"
          }
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="4"
              ry="9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {locale === "fa" ? "EN" : "فارسی"}
        </a>
        <a
          className="button button-small button-dark nav-contact"
          href={`/${locale}#contact`}
        >
          {c.start}
          <Arrow diagonal />
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? c.close : c.menu}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {open ? (
            "×"
          ) : (
            <>
              <span />
              <span />
            </>
          )}
        </button>
      </div>
    </header>
  );
}
