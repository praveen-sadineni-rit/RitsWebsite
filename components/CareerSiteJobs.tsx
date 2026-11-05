"use client";

import { useEffect, useState } from "react";

/**
 * Live job list from the RITS ATS (AtsIcloud) career-site widget.
 * Shows approved, Active-status jobs only. Values come from the ATS admin
 * portal → Settings → Career Site → "React / Next.js". The Supabase key is a
 * *publishable* key, intended to be embedded in public pages.
 */
const WIDGET_SRC =
  "https://cyeqqgqjmwnnenfnzrwy.supabase.co/storage/v1/object/public/rits-public-assets/00000000-0000-4000-8000-000000000001/rits-jobs-widget.js";
const SUPABASE_URL = "https://cyeqqgqjmwnnenfnzrwy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_yIO_LV4ckHqiginFFjUl0g_rz1V0Ns6";

export default function CareerSiteJobs() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const mount = document.getElementById("rits-jobs-mount");
    if (!mount) return;

    const script = document.createElement("script");
    // Widget is served with max-age=3600; roll the URL hourly so a re-published
    // (fixed) widget is picked up without visitors needing a hard refresh.
    script.src = `${WIDGET_SRC}?v=${Math.floor(Date.now() / 3600000)}`;
    script.async = true;
    script.setAttribute("data-supabase-url", SUPABASE_URL);
    script.setAttribute("data-supabase-key", SUPABASE_PUBLISHABLE_KEY);
    script.setAttribute("data-target", "#rits-jobs");
    // A script can "load" yet fail to run (e.g. a syntax error upstream) — so
    // only count it as ready once the widget has actually rendered something.
    let poll: ReturnType<typeof setInterval> | undefined;
    let giveUp: ReturnType<typeof setTimeout> | undefined;
    script.onload = () => {
      const target = document.getElementById("rits-jobs");
      poll = setInterval(() => {
        if (target && target.childElementCount > 0) {
          setStatus("ready");
          clearInterval(poll);
          clearTimeout(giveUp);
        }
      }, 250);
      giveUp = setTimeout(() => {
        clearInterval(poll);
        setStatus((s) => (s === "ready" ? s : "error"));
      }, 8000);
    };
    script.onerror = () => setStatus("error");
    mount.appendChild(script);

    // The widget counts every job it rendered, but our CSS hides test
    // requisitions (RITS-TEST-*). Keep the visible count honest.
    const target = document.getElementById("rits-jobs");
    const syncCount = () => {
      if (!target) return;
      const countEl = target.querySelector(".rits-jobs-count");
      if (!countEl) return;
      const visible = Array.from(target.querySelectorAll(".rits-job-card")).filter(
        (c) => getComputedStyle(c).display !== "none"
      ).length;
      const text = `Showing ${visible} ${visible === 1 ? "opportunity" : "opportunities"}`;
      if (countEl.textContent !== text) countEl.textContent = text;
    };
    const observer = target ? new MutationObserver(syncCount) : undefined;
    if (target && observer) observer.observe(target, { childList: true, subtree: true });

    return () => {
      clearInterval(poll);
      clearTimeout(giveUp);
      observer?.disconnect();
      script.remove();
    };
  }, []);

  return (
    <div id="rits-jobs-mount" className="rits-jobs-widget">
      {status === "loading" && (
        <div className="flex items-center justify-center gap-3 py-10 text-sm text-gray-500">
          <span className="w-2 h-2 rounded-full bg-[#E8B53D] animate-pulse" />
          Loading live openings…
        </div>
      )}
      {status === "error" && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
          We couldn&apos;t load the live job list right now. Please see the openings listed below, or{" "}
          <a href="mailto:careers@rits-it.com" className="font-semibold text-[#1B3C6E] underline">email us your resume</a>.
        </div>
      )}
      <div id="rits-jobs" />
    </div>
  );
}
