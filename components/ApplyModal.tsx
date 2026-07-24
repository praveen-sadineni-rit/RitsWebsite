"use client";

import { useEffect, useRef, useState } from "react";

export type ApplyTarget = {
  jobTitle: string;
  applyTo?: string[]; // rits-it.com addresses; falls back to careers inbox server-side
};

export default function ApplyModal({
  target,
  onClose,
}: {
  target: ApplyTarget | null;
  onClose: () => void;
}) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [target, onClose]);

  // Reset state each time a new job modal opens.
  useEffect(() => {
    if (target) {
      setSending(false);
      setError(null);
      setDone(false);
      setFileName("");
    }
  }, [target]);

  if (!target) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    fd.set("jobTitle", target!.jobTitle);
    fd.set("applyTo", (target!.applyTo || []).join(","));
    try {
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        setSending(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
      setSending(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 overflow-y-auto"
      style={{ background: "rgba(10,22,40,0.6)", backdropFilter: "blur(2px)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Apply for ${target.jobTitle}`}
        className="relative w-full max-w-lg my-8 bg-white rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#B0810E]">Apply for</p>
            <h3 className="text-lg font-bold text-[#0f2447] leading-snug">{target.jobTitle}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {done ? (
          <div className="px-6 py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FBF4DD] text-[#B0810E] flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h4 className="text-xl font-bold text-[#0f2447] mb-2">Application received</h4>
            <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
              Thanks for applying! Our team will review your resume and get back to you if there&apos;s a fit.
            </p>
            <button onClick={onClose} className="btn-primary">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {/* Honeypot (hidden from users) */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name" required>
                <input name="fullName" required type="text" autoComplete="name" className={inputCls} placeholder="Jane Doe" />
              </Field>
              <Field label="Phone" required>
                <input name="phone" required type="tel" autoComplete="tel" className={inputCls} placeholder="+1 555 000 0000" />
              </Field>
            </div>

            <Field label="Email" required>
              <input name="email" required type="email" autoComplete="email" className={inputCls} placeholder="jane@example.com" />
            </Field>

            <Field label="LinkedIn / portfolio" hint="optional">
              <input name="linkedin" type="url" className={inputCls} placeholder="https://linkedin.com/in/…" />
            </Field>

            <Field label="Resume" required hint="PDF, DOC, DOCX · max 5 MB">
              <label className="flex items-center gap-3 w-full cursor-pointer rounded-lg border border-dashed border-gray-300 hover:border-[#E8B53D] bg-gray-50 px-4 py-3 transition">
                <span className="w-9 h-9 rounded-lg bg-[#EAF1F8] text-[#3D5A80] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span className="text-sm text-gray-600 truncate">
                  {fileName || "Click to upload your resume"}
                </span>
                <input
                  name="resume"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,.rtf,.txt"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                />
              </label>
            </Field>

            <Field label="Message" hint="optional">
              <textarea name="message" rows={3} className={inputCls} placeholder="Anything you'd like us to know…" />
            </Field>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
            )}

            <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
              {sending ? "Submitting…" : "Submit Application"}
            </button>
            <p className="text-[11px] text-gray-400 text-center">
              By applying you consent to RITS storing your details for recruitment purposes.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8B53D]/50 focus:border-[#E8B53D] transition";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500">*</span>}
        {hint && <span className="text-gray-400 font-normal">· {hint}</span>}
      </label>
      {children}
    </div>
  );
}
