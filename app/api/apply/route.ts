import { NextResponse } from "next/server";
import { Resend } from "resend";

// Where applications are delivered / who they come from (override via env).
const DEFAULT_TO = process.env.CAREERS_TO || "careers@rits-it.com";
const FROM = process.env.CONTACT_FROM || "RITS Website <onboarding@resend.dev>";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXT = ["pdf", "doc", "docx", "rtf", "txt"];

function esc(s: string) {
  return String(s || "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
}

// Only allow delivery to our own domain, so the form can't be abused to email arbitrary addresses.
function safeRecipients(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^[^\s@]+@rits-it\.com$/i.test(s));
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const linkedin = String(form.get("linkedin") || "").trim();
    const message = String(form.get("message") || "").trim();
    const jobTitle = String(form.get("jobTitle") || "").trim();
    const honeypot = String(form.get("company") || "").trim(); // hidden anti-spam field
    const applyTo = String(form.get("applyTo") || "").trim();
    const resume = form.get("resume");

    // Spam honeypot: real users never fill this hidden field.
    if (honeypot) return NextResponse.json({ ok: true });

    if (!fullName || !email || !phone) {
      return NextResponse.json({ ok: false, error: "Please fill in your name, email, and phone." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json({ ok: false, error: "Please attach your resume." }, { status: 400 });
    }
    if (resume.size > MAX_FILE_BYTES) {
      return NextResponse.json({ ok: false, error: "Resume is too large (max 5 MB)." }, { status: 400 });
    }
    const ext = (resume.name.split(".").pop() || "").toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) {
      return NextResponse.json(
        { ok: false, error: "Resume must be a PDF, DOC, DOCX, RTF, or TXT file." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ ok: false, error: "Email service not configured." }, { status: 500 });
    }

    // Recipients: the job's own address(es) if valid + on our domain, otherwise the careers inbox.
    const recipients = safeRecipients(applyTo);
    const to = recipients.length > 0 ? recipients : [DEFAULT_TO];

    const buffer = Buffer.from(await resume.arrayBuffer());
    const safeName = fullName.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "") || "candidate";
    const filename = `${safeName}_resume.${ext}`;

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#0f2447;font-size:14px;line-height:1.6">
        <h2 style="color:#1B3C6E;margin:0 0 4px">New job application</h2>
        <p style="margin:0 0 16px;color:#5E82AE;font-weight:700">${esc(jobTitle) || "General application"}</p>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 12px;font-weight:700;background:#f5f7fa">Name</td><td style="padding:6px 12px">${esc(fullName)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:700;background:#f5f7fa">Email</td><td style="padding:6px 12px"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:700;background:#f5f7fa">Phone</td><td style="padding:6px 12px">${esc(phone)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:700;background:#f5f7fa">LinkedIn</td><td style="padding:6px 12px">${linkedin ? `<a href="${esc(linkedin)}">${esc(linkedin)}</a>` : "-"}</td></tr>
        </table>
        <h3 style="color:#1B3C6E;margin:20px 0 6px">Message</h3>
        <p style="white-space:pre-wrap;margin:0">${esc(message) || "(none provided)"}</p>
        <p style="margin:20px 0 0;color:#94a3b8;font-size:12px">Resume attached: ${esc(filename)}</p>
      </div>`;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      replyTo: email,
      subject: `Job application: ${jobTitle || "General"} — ${fullName}`,
      html,
      attachments: [{ filename, content: buffer }],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send application." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Apply route error:", err);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
