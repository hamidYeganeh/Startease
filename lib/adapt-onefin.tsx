import {
  Children,
  cloneElement,
  createElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import content from "./onefin-content.json";
import type { Locale } from "./content";
import { teamPortraits } from "./team-portraits";
import { StoreButtons } from "@/components/onefin/StoreButtons";

type Props = Record<string, unknown> & {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  src?: string;
  href?: string;
  alt?: string;
};
const dictionaries = content as Record<
  string,
  Record<string, Record<Locale, string>>
>;
const asset = (name: string) => `/agency-content/${name}.svg`;
const assets: Record<string, string> = {
  "L9o68QoionLOT0n8qVJq2jR8.png": asset("hero-scope"),
  "LLKlVGCKmbBn9ZfaasOGfBKso.png": asset("hero-task"),
  "vjfNXT3YtLcFhZPYvUQA52BP4o.png": asset("hero-build"),
  "OBaLn3NhNxon0JBcph43NiC8nw.png": asset("hero-status"),
  "xM1baCUSmEWPm8Hb7zLFKnYuY.png": asset("discovery"),
  "MTWvVbpvgADVbsJWtetKoSw9k0.png": asset("interface"),
  "pZ1TXGZjH7YWJsEXFgwkbMF4l4.png": asset("development"),
  "MKd3uElQsrjY1AFw5Rft2gGCtY.png": asset("improve"),
  "CHHrdeM4uRyWAeIB6i6lK2RfSI.gif": asset("website"),
  "6CbwTWOUsbOpSNj52T15yRoxGM.png": asset("bilingual"),
  "fbSof4jMf1a0EjECjxpbcWkg.png": asset("improve"),
  "UL7hK3woLUjXU0LpurNkooViFeA.png": asset("platform"),
  "2tZI8G4wXWIOPkCvcydUVBiKQrM.png": asset("team-badge"),
  "5INzhiR9y5rJfQCaOayOHoPOfjg.png": asset("avatar"),
  "1oAKuabwjNozu5cwZgBQXUdq8.png": asset("avatar"),
  "TizVi0egAjctc8wDsGt4dja6kA.png": "/projects/gym4me.png",
  "jeUxGRFD6xQMnmLMTwummecM3ak.png": "/projects/tmti.png",
  "zxvlfGlrte13AfXDzK87rvIYuM.png": "/projects/gym4me.png",
  "BJRGyUPHwry4safKJbEJ6KYyvI.png": asset("next-project"),
  "cmMkedPPHQRkAShnmUn1lEZAz8.png": asset("phone"),
  "nTfNJZjOR1uw5CIyILlXQVOkdZo.png": "/startease-mark.svg",
  "0KBf52OLV7mp4BnDFbG6kpvE0nA.png": "/startease-mark.svg",
  "oqfT8NRiJAsL1UUlwOLKNaARAA.png": asset("wordmark"),
};
[
  "2phuXW9stHbgs2KqeS2qJXecQU.png",
  "BABkIc0DHDlPXr264luo8fkOPc.png",
  "6OWI5hWP9XNWB6J7P9DwSjCJ1U.png",
  "10sPZOUu5uOWPPKlnTRTifBhL4.png",
  "naPlymY0TwrMMRjo2oDY1ZIBc.png",
  "XHYAA3kcuQbAQQetwjd4ZkZcE.png",
].forEach((name, i) => {
  assets[name] = asset(`ticker-${i}`);
});
[
  "q4owbhQxf9Kmq9juwTvOHEEbU.png",
  "qGleZC7xGDfonscyA49s7bdiC98.png",
  "dEG7EXKk1gDzEGu2SNp4nMOkc.png",
  "Fm9HcFIxYPW0HmoB7fqxCdLuzgg.png",
  "L8RKjncYrWBNpqnvb218IHTvq3E.png",
  "1zApTDbckoxm6mSnXdSyALMY8k4.png",
  "fdhtbTrc0CtrfrfNImA6Q6jiYw.png",
  "UeyvkdvNWsK9kb0Rr47p9Z7gM.png",
  "hfJUxsRniIJ4msHk78U7QoPeOac.png",
  "RysKxdMhG1SPmz2jF5YEXwjY5Y.png",
  "BsbzD4VCQlmqPoTVDfCXFFqP6E.png",
].forEach((name, i) => {
  assets[name] = asset(`integration-${i}`);
});
const videos: Record<string, string> = {
  "KFtIcX7GdqPTQHZRYZX6qYlc.webm": "discovery",
  "MscrnjR1iuLhruQCSOc1zX0gg.webm": "journey",
  "OffojyX4UvsVJxYMoqZ3HP8K00.webm": "interface",
  "pdMhBaYUg3dnuPdVSTLGur8PQE.webm": "prototype",
  "Nc4Wf8Vq30wog0oQNeUrpRWgB44.webm": "development",
};
const aboutWords: Record<Locale, string[]> = {
  en: [
    "From",
    "your",
    "idea",
    "to",
    "a",
    "product,",
    "our",
    "team",
    "brings",
    "design",
    "and",
    "development",
    "together",
    "to",
    "shape",
    "the",
    "experience",
    "and",
    "build",
    "your",
    "next release",
    "with",
    "clear",
    "steps",
    "and",
    "care",
    "in",
    "every detail.",
  ],
  fa: [
    "از",
    "اولین",
    "ایده",
    "تا",
    "یک",
    "محصول،",
    "تیم",
    "استارت‌ایز",
    "طراحی",
    "و",
    "توسعه",
    "را",
    "کنار",
    "هم",
    "پیش",
    "می‌برد؛",
    "با",
    "نگاه",
    "به",
    "کاربر،",
    "قدم بعدی",
    "را",
    "روشن",
    "می‌کنیم",
    "و",
    "با",
    "دقت",
    "می‌سازیم.",
  ],
};
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<Props>(node)) return textOf(node.props.children);
  return "";
}
function Words({ text }: { text: string }) {
  return text.split(/(\s+)/).map((word, i) =>
    /^\s+$/.test(word) ? (
      word
    ) : (
      <span key={i} data-letter="" style={{ display: "inline-block" }}>
        {word}
      </span>
    ),
  );
}

/** Content-only adaptation: keep the original section tree, classes, geometry, and motion hooks. */
export function adaptOneFin(
  tree: ReactNode,
  section: string,
  locale: Locale,
): ReactNode {
  const dictionary = dictionaries[section] || {};
  let aboutIndex = 0;
  let portraitIndex = 0;
  function visit(node: ReactNode): ReactNode {
    if (!isValidElement<Props>(node)) return node;
    if (node.type === StoreButtons)
      return adaptOneFin(StoreButtons(), "StoreButtons", locale);
    const p = node.props;
    const props: Props = {};
    if (
      (section === "Blog" || section === "Benefits") &&
      p.style?.transform === "scale(0.5)"
    )
      props["data-project-reveal"] = true;
    const label = p["aria-label"];
    if (typeof label === "string" && dictionary[label])
      props["aria-label"] = dictionary[label][locale];
    if (label === "Annual billing")
      props["aria-label"] =
        locale === "fa" ? "همکاری مستمر" : "Ongoing partnership";
    if (label === "Scroll to top") {
      props["data-scroll-top"] = true;
      props["aria-label"] =
        locale === "fa" ? "بازگشت به بالا" : "Scroll to top";
      props.title = props["aria-label"];
    }
    const raw = textOf(p.children).replace(/\s+/g, " ").trim();
    let children: ReactNode;
    if (
      typeof node.type === "string" &&
      /^(p|h[1-6])$/.test(node.type) &&
      (dictionary[raw] || section === "About")
    ) {
      const replacement =
        section === "About"
          ? aboutWords[locale][aboutIndex++ % 28]
          : dictionary[raw][locale];
      props.dir = locale === "fa" ? "rtl" : "ltr";
      // Keep inline links (e.g. the original footer) inside their text containers.
      const linked = Children.toArray(p.children).find(
        (child) => isValidElement(child) && child.type === "a",
      ) as ReactElement<Props> | undefined;
      if (linked)
        children = visit(
          cloneElement(
            linked,
            { "data-content-label": replacement },
            replacement,
          ),
        );
      else
        children =
          p["data-reveal"] !== undefined ? (
            <Words text={replacement} />
          ) : (
            replacement
          );
    } else children = Children.map(p.children, visit);
    if (node.type === "img" && p.src) {
      props.alt = "";
      let replacement = assets[p.src.split("/").pop()!];
      if (
        section === "Testimonials" &&
        p.src.endsWith("5INzhiR9y5rJfQCaOayOHoPOfjg.png")
      ) {
        replacement = teamPortraits[portraitIndex++ % 3] || asset("avatar");
      }
      if (replacement) {
        props.src = replacement;
        if (replacement === "/projects/tmti.png")
          props.style = { ...p.style, filter: "brightness(.3)" };
        props.alt =
          section === "Blog"
            ? replacement.includes("gym4me")
              ? "Gym4me"
              : replacement.includes("tmti")
                ? "Take Me to Iran"
                : locale === "fa"
                  ? "پروژهٔ بعدی شما"
                  : "Your next project"
            : "";
      }
    }
    if (node.type === "video" && p.src) {
      return createElement("img", {
        key: node.key,
        src: asset(videos[p.src.split("/").pop()!] || "development"),
        alt:
          locale === "fa"
            ? "نمای مفهومی فرایند طراحی و توسعه"
            : "Conceptual design and development workflow",
        style: p.style,
        className: p.className,
        "data-agency-preview": true,
      });
    }
    if (node.type === "use" && p.href?.includes("svg-1141095958_3042"))
      props.href = "/agency-content/logo.svg#brand";
    if (section === "Testimonials" && p["data-framer-name"] === "Star") {
      props.style = { ...p.style, visibility: "hidden" };
    }
    if (section === "Testimonials" && p["data-framer-name"] === "Review Icon") {
      children = createElement("img", {
        src: "/startease-mark.svg",
        alt: "",
        style: { width: "65%", height: "65%", objectFit: "contain" },
      });
    }
    if (node.type === "a") {
      const href = p.href || "";
      let next = href;
      if (href === "https://framer.com") next = "#blog";
      if (
        href.includes("the-future-of-digital-payments") ||
        href.includes("the-rise-of-embedded-finance")
      )
        next = "https://gym4me.ir/";
      else if (href.includes("investing-for-beginners"))
        next = "https://takemetoiran.shop/";
      else if (href.includes("how-ai-is-changing")) next = "https://gym4me.ir/";
      else if (href.includes("how-to-create-a-budget")) next = "#contact";
      else if (href.includes("/careers")) next = "#testimonials";
      else if (href.includes("/404")) next = "/en";
      else if (href.includes("/changelog")) next = "/fa";
      else if (href.includes("/terms-of-service"))
        next = "https://takemetoiran.shop/";
      else if (href.includes("/privacy-policy")) next = "#pricing";
      else if (href.includes("/contact")) next = "#contact";
      else if (href.includes("ninhstudio.com")) next = "#home";
      else if (href === "https://www.apple.com/") next = "#contact";
      else if (href === "https://play.google.com/") next = "#blog";
      else if (
        /^https?:\/\//.test(next) &&
        !next.includes("gym4me") &&
        !next.includes("takemetoiran")
      )
        next = "mailto:hamidyeganeh82@gmail.com";
      if (section === "Footer") {
        const destinations: Record<string, string> = {
          Home: "#home",
          About: "#about",
          Features: "#features",
          Pricing: "#pricing",
          Blog: "#blog",
          "Blog Post": "https://gym4me.ir/",
          Careers: "#testimonials",
          "Job Post": "#testimonials",
        };
        for (const [original, destination] of Object.entries(destinations)) {
          if (raw === dictionary[original]?.[locale]) next = destination;
        }
      }
      if (
        section === "Download" &&
        /youtube|instagram|facebook|twitter|linkedin/.test(href)
      ) {
        children = createElement("img", {
          src: "/startease-mark.svg",
          alt: "",
          style: { width: 26, height: 26, objectFit: "contain" },
        });
      }
      if (p["data-download-trigger"] !== undefined) {
        props["aria-label"] =
          locale === "fa" ? "شروع همکاری" : "Discuss your project";
      }
      if (next) {
        props.href = next;
        props.target = next.startsWith("http") ? "_blank" : undefined;
        props.rel = next.startsWith("http") ? "noopener noreferrer" : undefined;
      }
      if (next === "#contact") {
        props["data-download-trigger"] = "true";
        props["aria-label"] =
          locale === "fa" ? "شروع همکاری" : "Discuss your project";
      }
      if (next.startsWith("mailto:"))
        props["aria-label"] =
          locale === "fa" ? "ایمیل به استارت‌ایز" : "Email Startease";
      if (p["data-framer-name"] === "Nav Logo")
        props["aria-label"] = "Startease";
    }
    if (
      section === "StoreButtons" &&
      (p["data-framer-name"] === "Apple" ||
        p["data-framer-name"] === "Playstore")
    ) {
      props.style = { ...p.style, backgroundImage: "none" };
      children = createElement("img", {
        src: "/startease-mark.svg",
        alt: "",
        style: { width: "100%", height: "100%" },
      });
    }
    if (section === "Faqs" && node.type === "a" && p.href === "#home") {
      props.href = "#contact";
      props["data-download-trigger"] = "true";
    }
    return cloneElement(node, props, children);
  }
  return Children.map(tree, visit);
}
