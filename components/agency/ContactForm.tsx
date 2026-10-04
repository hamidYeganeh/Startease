"use client";
import { useState, type FormEvent } from "react";
import { copy, type Locale } from "@/lib/content";
import { Arrow } from "./Brand";

export function ContactForm({
  locale,
  delivery,
  email,
}: {
  locale: Locale;
  delivery: boolean;
  email: string;
}) {
  const c = copy[locale].form;
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "saved" | "mail" | "error"
  >("idle");
  const [brief, setBrief] = useState("");
  function save(text: string) {
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + text], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "startease-project-brief.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form));
    const text = `Startease — ${locale === "fa" ? "شرح پروژه" : "Project brief"}\n\n${c.name}: ${values.name}\n${c.email}: ${values.email}\n${c.service}: ${values.service}\n${c.budget}: ${values.budget}\n\n${values.message}`;
    setBrief(text);
    if (!delivery) {
      if (email) {
        window.location.href = `mailto:${email}?subject=${encodeURIComponent("Startease project inquiry")}&body=${encodeURIComponent(text)}`;
        setStatus("mail");
      } else {
        save(text);
        setStatus("saved");
      }
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!response.ok) throw new Error("Delivery failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          {c.name}
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder={c.namePlaceholder}
          />
        </label>
        <label>
          {c.email}
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder={c.emailPlaceholder}
            dir="ltr"
          />
        </label>
      </div>
      <fieldset>
        <legend>{c.service}</legend>
        <div className="service-options">
          {c.choices.map((choice, i) => (
            <label key={choice}>
              <input
                type="radio"
                name="service"
                value={choice}
                defaultChecked={i === 0}
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label>
        {c.message}
        <textarea
          name="message"
          rows={4}
          required
          minLength={10}
          maxLength={4000}
          placeholder={c.messagePlaceholder}
        />
      </label>
      <label>
        {c.budget}
        <select name="budget">
          {c.budgets.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <div className="honey" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        className="button button-purple submit-button"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending"
          ? c.sending
          : delivery
            ? c.submit
            : email
              ? c.mail
              : c.draft}
        <Arrow diagonal />
      </button>
      <p className="privacy-note">
        {delivery ? c.privacy : email ? c.mailNote : c.fallback}
      </p>
      <div role="status" aria-live="polite" className={`form-status ${status}`}>
        {status === "success" && c.success}
        {status === "saved" && c.saved}
        {status === "mail" && c.mailNote}
        {status === "error" && c.error}
        {["saved", "mail", "error"].includes(status) && (
          <button
            type="button"
            className="text-button"
            onClick={() => save(brief)}
          >
            {c.download}
            <Arrow />
          </button>
        )}
      </div>
    </form>
  );
}
