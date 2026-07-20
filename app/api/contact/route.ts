import { NextResponse } from "next/server";
import { Resend } from "resend";

// Where submissions are delivered / who they come from (override via env).
const TO = process.env.CONTACT_TO || "info@rits-it.com";
const FROM = process.env.CONTACT_FROM || "RITS Website <onboarding@resend.dev>";

const LOOKING_FOR: Record<string, string> = {
  "software-dev": "Software Development",
  "product-dev": "Product Development",
  "ai-ml": "AI/ML Solutions",
  "staff-aug": "Staff Augmentation",
  "not-sure": "Not sure yet",
};

function esc(s: string) {
  return String(s || "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
}

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));
    const {
      fullName = "",
      workEmail = "",
      companyName = "",
      lookingFor = "",
      projectDetails = "",
      hearAboutUs = "",
      company = "", // honeypot (should stay empty)
    } = data as Record<string, string>;

    // Spam honeypot: real users never fill this hidden field.
    if (company) return NextResponse.json({ ok: true });

    if (!fullName.trim() || !workEmail.trim() || !lookingFor.trim()) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ ok: false, error: "Email service not configured." }, { status: 500 });
    }

    const interest = LOOKING_FOR[lookingFor] || lookingFor;
    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#0f2447;font-size:14px;line-height:1.6">
        <h2 style="color:#1B3C6E;margin:0 0 16px">New contact form submission</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 12px;font-weight:700;background:#f5f7fa">Name</td><td style="padding:6px 12px">${esc(fullName)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:700;background:#f5f7fa">Email</td><td style="padding:6px 12px"><a href="mailto:${esc(workEmail)}">${esc(workEmail)}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:700;background:#f5f7fa">Company</td><td style="padding:6px 12px">${esc(companyName) || "-"}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:700;background:#f5f7fa">Looking for</td><td style="padding:6px 12px">${esc(interest)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:700;background:#f5f7fa">Heard via</td><td style="padding:6px 12px">${esc(hearAboutUs) || "-"}</td></tr>
        </table>
        <h3 style="color:#1B3C6E;margin:20px 0 6px">Project details</h3>
        <p style="white-space:pre-wrap;margin:0">${esc(projectDetails) || "(none provided)"}</p>
      </div>`;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO.split(",").map((s) => s.trim()),
      replyTo: workEmail,
      subject: `New inquiry from ${fullName}${companyName ? ` (${companyName})` : ""}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
