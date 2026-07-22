/* Certifications & cloud-partnership trust strip (navy + gold). */

const SHIELD_ICON = "M12 2l7 3v6c0 4.5-3 7.9-7 9-4-1.1-7-4.5-7-9V5l7-3z";
const CHECK_ICON = "M9 12l2 2 4-4";
const CLOUD_ICON = "M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z";

const COMPLIANCE = [
  { label: "SOC 2", sub: "Type II controls" },
  { label: "HIPAA", sub: "Compliant processes" },
  { label: "GDPR", sub: "EU data ready" },
];
const CLOUD_PARTNERS = [
  { label: "Microsoft Azure", sub: "Partner" },
  { label: "AWS", sub: "Partner" },
  { label: "Google Cloud", sub: "Partner" },
];

function Chip({ label, sub, tint, iconColor, icon }: { label: string; sub: string; tint: string; iconColor: string; icon: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 border border-gray-200" style={{ boxShadow: "0 1px 6px rgba(27,60,110,0.05)" }}>
      <span className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0" style={{ background: tint }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d={icon} stroke={iconColor} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <span>
        <span className="block text-sm font-extrabold text-[#0f2447] leading-tight">{label}</span>
        <span className="block text-[11px] text-gray-500 leading-tight">{sub}</span>
      </span>
    </div>
  );
}

export default function TrustStrip({ compact = false }: { compact?: boolean }) {
  return (
    <section style={{ background: "#F8FAFC" }} className={`${compact ? "py-10" : "py-14"} px-6 border-y border-gray-100`}>
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-[11px] font-bold tracking-[0.15em] uppercase mb-8" style={{ color: "#B0810E" }}>
          Enterprise-grade · Secure · Compliant
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d={SHIELD_ICON} stroke="#1B3C6E" strokeWidth="1.7" strokeLinejoin="round" /><path d={CHECK_ICON} stroke="#E8B53D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B3C6E]">Certifications & Compliance</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {COMPLIANCE.map((c) => (
                <Chip key={c.label} label={c.label} sub={c.sub} tint="rgba(232,181,61,0.14)" iconColor="#B0810E" icon={SHIELD_ICON} />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d={CLOUD_ICON} stroke="#1B3C6E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B3C6E]">Cloud Partnerships</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {CLOUD_PARTNERS.map((c) => (
                <Chip key={c.label} label={c.label} sub={c.sub} tint="rgba(94,130,174,0.14)" iconColor="#5E82AE" icon={CLOUD_ICON} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
