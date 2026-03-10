import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════
// DESIGN TOKENS — RED + BLACK EDITORIAL
// ═══════════════════════════════════════════
const C = {
  bg: "#060606",
  card1: "#0A0A0A",
  card2: "#0E0E0E",
  card3: "#111111",
  red: "#C8102E",
  redLight: "#E63946",
  redDim: "#C8102E18",
  redGlow: "#C8102E12",
  redMuted: "#C8102E80",
  white: "#F0ECE6",
  cream: "#D4D0C8",
  muted: "#7A7A7A",
  dim: "#444",
  border: "#1C1C1C",
  borderRed: "#C8102E30",
  glass: "rgba(6,6,6,0.85)",
};

const F = {
  display: "'Playfair Display', serif",
  body: "'Sora', sans-serif",
  mono: "'Fira Code', monospace",
};

// ═══════════════════════════════════════════
// UTILITY COMPONENTS
// ═══════════════════════════════════════════
function FadeIn({ children, delay = 0, y = 36, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      ...style, opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

function useCounter(end, dur = 2000) {
  const [c, setC] = useState(0);
  const [go, setGo] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return;
    let v = 0; const step = end / (dur / 16);
    const id = setInterval(() => { v += step; if (v >= end) { setC(end); clearInterval(id); } else setC(Math.floor(v)); }, 16);
    return () => clearInterval(id);
  }, [go, end, dur]);
  return [c, ref];
}

// ─── Stacking Card Wrapper ───
function StackCard({ children, index, bg, id }) {
  return (
    <section id={id} style={{
      position: "sticky", top: 0,
      minHeight: "100vh", width: "100%",
      zIndex: 10 + index,
      background: bg || C.bg,
      borderRadius: index > 0 ? "28px 28px 0 0" : 0,
      boxShadow: index > 0 ? "0 -8px 60px rgba(0,0,0,0.6)" : "none",
      overflow: "hidden",
    }}>
      {children}
    </section>
  );
}

// ─── Scrolling Banner ───
function ScrollBanner({ text, speed = 28, outlined = false }) {
  const items = Array(8).fill(text);
  return (
    <div style={{ overflow: "hidden", padding: "18px 0" }}>
      <div style={{ display: "flex", gap: "48px", width: "max-content", animation: `bannerScroll ${speed}s linear infinite` }}>
        {items.map((t, i) => (
          <span key={i} style={{
            fontFamily: F.display, fontSize: "clamp(44px, 7vw, 80px)",
            fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            color: outlined ? "transparent" : C.red,
            WebkitTextStroke: outlined ? `1.5px ${C.redMuted}` : "none",
            opacity: outlined ? 0.5 : 0.12,
          }}>
            {t} <span style={{ fontStyle: "normal", opacity: 0.3, color: C.red }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Tech Marquee ───
function TechMarquee({ items, reverse = false, speed = 34 }) {
  const d = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div style={{ display: "flex", gap: "10px", width: "max-content", animation: `${reverse ? "bannerScrollR" : "bannerScroll"} ${speed}s linear infinite` }}>
        {d.map((item, i) => (
          <span key={i} style={{
            padding: "7px 18px", borderRadius: "999px",
            border: `1px solid ${C.border}`, background: C.card1,
            color: C.muted, fontSize: "12px", fontFamily: F.mono,
            whiteSpace: "nowrap", letterSpacing: "0.02em",
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const links = [{ l: "Services", h: "#services" }, { l: "Work", h: "#work" }, { l: "About", h: "#about" }, { l: "Gallery", h: "#gallery" }, { l: "Contact", h: "#contact" }];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "0 clamp(20px,5vw,72px)", height: "60px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? C.glass : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "5px" }}>
        <span style={{ fontFamily: F.display, fontSize: "26px", fontWeight: 700, color: C.red, fontStyle: "italic" }}>N</span>
        <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.muted, letterSpacing: "0.14em" }}>ITISH</span>
      </a>
      <div className="dsk-nav" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {links.map(l => (
          <a key={l.l} href={l.h} style={{ textDecoration: "none", color: C.muted, fontSize: "12px", fontFamily: F.body, fontWeight: 500, letterSpacing: "0.04em", transition: "color 0.25s" }}
            onMouseEnter={e => e.target.style.color = C.red} onMouseLeave={e => e.target.style.color = C.muted}>{l.l}</a>
        ))}
        <a href="mailto:nitishrmadhavan@gmail.com" style={{
          textDecoration: "none", padding: "7px 18px", borderRadius: "999px",
          background: C.red, color: "#fff", fontSize: "11px",
          fontFamily: F.mono, fontWeight: 500, letterSpacing: "0.05em", transition: "transform 0.2s",
        }} onMouseEnter={e => e.target.style.transform = "translateY(-1px)"} onMouseLeave={e => e.target.style.transform = "none"}>CONTACT ↗</a>
      </div>
      <button className="mob-nav" onClick={() => setMob(!mob)} style={{ display: "none", background: "none", border: "none", color: C.white, fontSize: "22px", cursor: "pointer" }}>{mob ? "✕" : "☰"}</button>
      {mob && (
        <div style={{ position: "fixed", top: 60, left: 0, right: 0, bottom: 0, background: `${C.bg}F8`, backdropFilter: "blur(24px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px", zIndex: 199 }}>
          {links.map(l => (<a key={l.l} href={l.h} onClick={() => setMob(false)} style={{ textDecoration: "none", fontFamily: F.display, fontSize: "28px", color: C.white, fontStyle: "italic" }}>{l.l}</a>))}
        </div>
      )}
    </nav>
  );
}

// ═══════════════════════════════════════════
// 1. HERO — CARD 0
// ═══════════════════════════════════════════
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setTimeout(() => setLoaded(true), 200)); }, []);
  const s = (d) => ({ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)", transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s` });

  return (
    <StackCard index={0} bg={C.bg} id="hero">
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "100px clamp(20px,5vw,72px) 60px", position: "relative",
      }}>
        {/* Ambient red orb */}
        <div style={{ position: "absolute", top: "-200px", right: "-150px", width: "600px", height: "600px", background: `radial-gradient(circle, ${C.red}0A 0%, transparent 60%)`, pointerEvents: "none" }} />

        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(40px,6vw,100px)", alignItems: "center", width: "100%" }}>
          {/* Left — Text */}
          <div>
            <div style={s(0.15)}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "6px 16px", borderRadius: "999px", border: `1px solid ${C.borderRed}`, background: C.redDim, marginBottom: "28px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px #4ADE8080", animation: "pulse 2s infinite" }} />
                <span style={{ color: C.redLight, fontSize: "11px", fontFamily: F.mono, letterSpacing: "0.08em" }}>OPEN TO WORK · MAR '26</span>
              </div>
            </div>

            <p style={{ ...s(0.25), fontFamily: F.body, fontSize: "14px", color: C.muted, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "10px" }}>
              Data Engineer · Software Developer · Mentor
            </p>

            <h1 style={{ ...s(0.35), fontFamily: F.display, fontSize: "clamp(48px,9vw,110px)", fontWeight: 700, color: C.white, lineHeight: 0.92, margin: "0 0 20px", letterSpacing: "-0.03em" }}>
              NITISH<br /><span style={{ color: C.red, fontStyle: "italic" }}>MADHAVAN</span>
            </h1>

            <p style={{ ...s(0.5), fontFamily: F.body, fontSize: "clamp(15px,1.8vw,18px)", color: C.cream, maxWidth: "500px", lineHeight: 1.65, fontWeight: 300 }}>
              I engineer data systems that cut cloud costs and drive real business decisions — while bringing the
              <span style={{ color: C.red, fontWeight: 500 }}> irreplaceably human</span> qualities that no AI can replicate.
            </p>

            <div style={{ ...s(0.65), display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap" }}>
              <a href="#contact" style={{ padding: "13px 32px", borderRadius: "999px", background: C.red, color: "#fff", textDecoration: "none", fontFamily: F.body, fontWeight: 600, fontSize: "13px", letterSpacing: "0.02em", transition: "transform 0.25s, box-shadow 0.25s" }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 12px 40px ${C.red}40`; }}
                onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
              >LET'S TALK</a>
              <a href="#work" style={{ padding: "13px 32px", borderRadius: "999px", border: `1px solid ${C.border}`, color: C.white, textDecoration: "none", fontFamily: F.body, fontWeight: 500, fontSize: "13px", transition: "border-color 0.3s" }}
                onMouseEnter={e => e.target.style.borderColor = C.red} onMouseLeave={e => e.target.style.borderColor = C.border}
              >MY WORK →</a>
            </div>

            <p style={{ ...s(0.8), fontFamily: F.mono, fontSize: "11px", color: C.dim, letterSpacing: "0.06em", marginTop: "48px" }}>
              📍 BRISBANE · BENGALURU · SHANGHAI
            </p>
          </div>

          {/* Right — Passport Photo */}
          <div className="hero-photo" style={{ ...s(0.6), flexShrink: 0 }}>
            <div style={{ position: "relative" }}>
              {/* Red ring */}
              <div style={{ width: "clamp(200px,18vw,280px)", height: "clamp(200px,18vw,280px)", borderRadius: "50%", padding: "4px", background: `linear-gradient(135deg, ${C.red}, ${C.redLight}, ${C.red})` }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: C.card1 }}>
                  {/* REPLACE WITH YOUR PASSPORT PHOTO */}
                  <img src="/hero-nitish.jpg" alt="Nitish Madhavan" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(10%) contrast(1.08)" }}
                    onError={e => { e.target.style.display = "none"; }} />
                </div>
              </div>
              {/* Status tag */}
              <div style={{ position: "absolute", bottom: "-8px", left: "50%", transform: "translateX(-50%)", background: C.bg, border: `1px solid ${C.borderRed}`, borderRadius: "999px", padding: "5px 16px", whiteSpace: "nowrap" }}>
                <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.red, letterSpacing: "0.08em" }}>3 COUNTRIES · 3 CULTURES</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech marquee at bottom of hero */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "16px 0" }}>
          <TechMarquee items={["Python", "Java", "SQL", "Rust", "TypeScript", "JavaScript", "Spring", "Flask", "Spark"]} speed={36} />
          <TechMarquee items={["MongoDB", "Kafka", "Airflow", "AWS Glue", "S3", "HDFS", "PostgreSQL", "Docker", "Jenkins"]} reverse speed={32} />
        </div>
      </div>
    </StackCard>
  );
}

// ═══════════════════════════════════════════
// 2. SERVICES — CARD 1
// ═══════════════════════════════════════════
function Services() {
  const services = [
    { num: "01", title: "Data Engineering & Cloud Cost Optimisation", desc: "Scalable ETL/ELT pipelines, CDC architectures, and FinOps-aware data platforms. I build systems that handle 50K+ records while reducing cloud resource waste by 25%+ — saving money without sacrificing performance.", tags: ["Kafka", "Spark", "Airflow", "AWS Glue", "S3", "FinOps"] },
    { num: "02", title: "Full-Stack Software Development", desc: "End-to-end product ownership — from architecture to CI/CD to deployment. Cross-platform desktop apps, backend APIs, and web platforms built to ship, not to sit in a repo.", tags: ["React", "TypeScript", "Rust", "Tauri", "Spring", "Java"] },
    { num: "03", title: "Leadership & Mentorship", desc: "Not a service I sell — a value I bring. 70+ students mentored at UQ, communication gaps bridged between interns and management, and digital guides that increased resource awareness by 40%.", tags: ["Community", "Mentorship", "Communication", "Cross-Cultural"] },
  ];

  return (
    <StackCard index={1} bg={C.card1} id="services">
      <div style={{ minHeight: "100vh", padding: "clamp(60px,10vh,100px) clamp(20px,5vw,72px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(38px,6vw,68px)", fontWeight: 700, color: C.white, lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>
              What I Do <span style={{ fontStyle: "italic", color: C.red }}>/</span>
            </h2>
            <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.dim, letterSpacing: "0.1em" }}>(SERVICES)</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.6vw,17px)", color: C.muted, maxWidth: "580px", lineHeight: 1.7, margin: "0 0 48px", fontWeight: 300 }}>
            I build data infrastructure and software that delivers <span style={{ color: C.white, fontWeight: 500 }}>measurable business impact</span> — not just technically sound, but cost-aware and compliance-ready.
          </p>
        </FadeIn>

        {services.map((sv, i) => (
          <FadeIn key={i} delay={0.1 + i * 0.08}>
            <div style={{ padding: "32px 12px", borderTop: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: "clamp(16px,3vw,44px)", alignItems: "start", transition: "background 0.3s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.background = `${C.card2}80`} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <span style={{ fontFamily: F.display, fontSize: "15px", color: C.red, fontStyle: "italic", paddingTop: "3px" }}>({sv.num})</span>
              <div>
                <h3 style={{ fontFamily: F.body, fontSize: "clamp(20px,2.5vw,26px)", color: C.white, fontWeight: 600, margin: "0 0 10px" }}>{sv.title}</h3>
                <p style={{ fontFamily: F.body, fontSize: "14px", color: C.muted, lineHeight: 1.7, margin: "0 0 14px", maxWidth: "520px", fontWeight: 300 }}>{sv.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {sv.tags.map((t, j) => (<span key={j} style={{ fontFamily: F.mono, fontSize: "10px", color: C.dim, padding: "4px 12px", borderRadius: "999px", border: `1px solid ${C.border}` }}>{t}</span>))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
        <div style={{ borderTop: `1px solid ${C.border}` }} />

        <ScrollBanner text="DATA ENGINEER — CLOUD COST OPTIMIZER — BUILDER" speed={28} />
      </div>
    </StackCard>
  );
}

// ═══════════════════════════════════════════
// 3. WORK — CARD 2
// ═══════════════════════════════════════════
function Work() {
  const [active, setActive] = useState(0);
  const jobs = [
    { num: "01", type: "INTERNSHIP · CHINA", role: "Backend Developer", company: "YuLan Information Technology", loc: "Shanghai, China", period: "Jun '25 – Jul '25", desc: "Developed ORM tools in Java with aggregate functions, built database abstraction layers requiring deep system architecture understanding. Collaborated in agile sprints under tight deadlines.", tags: ["Java", "ORM", "Agile", "System Architecture"], highlight: "3rd country, 3rd culture — adapted in weeks." },
    { num: "02", type: "INTERNSHIP · AUSTRALIA", role: "Software Engineer", company: "Audima Labs", loc: "Gold Coast, Australia", period: "Nov '24 – Feb '25", desc: "Designed and shipped SWAY Software — a cross-platform desktop app with end-to-end CI/CD. Owned the entire lifecycle: architecture → testing → deployment.", tags: ["ReactJS", "TypeScript", "Rust", "Tauri", "GitHub Actions"], highlight: "Full product ownership — solo." },
    { num: "03", type: "INTERNSHIP · INDIA", role: "Data Engineer", company: "Lentra.AI", loc: "Bengaluru, India", period: "Jul '23 – May '24", desc: "Built TransferX — scalable CDC pipelines processing 50K+ records. Achieved 30% efficiency gains through strategic batch processing. Bridged intern-management communication.", tags: ["MongoDB", "Kafka", "Spark", "Airflow", "AWS Glue", "S3"], highlight: "🏆 High Five Award — Q3 Recognition" },
  ];

  return (
    <StackCard index={2} bg={C.card2} id="work">
      <div style={{ minHeight: "100vh", padding: "clamp(60px,10vh,100px) clamp(20px,5vw,72px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(38px,6vw,68px)", fontWeight: 700, color: C.white, lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>
              Experience <span style={{ fontStyle: "italic", color: C.red }}>/</span>
            </h2>
            <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.dim, letterSpacing: "0.1em" }}>(WHERE I'VE BUILT)</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.6vw,17px)", color: C.muted, maxWidth: "540px", lineHeight: 1.7, margin: "0 0 40px", fontWeight: 300 }}>
            Three countries. Three cultures. Each one sharpened how I <span style={{ color: C.white, fontWeight: 500 }}>build, communicate, and lead.</span>
          </p>
        </FadeIn>

        {/* Progress counter */}
        <FadeIn delay={0.12}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <span style={{ fontFamily: F.display, fontSize: "44px", color: C.red, fontWeight: 700, fontStyle: "italic" }}>{active + 1}</span>
            <div style={{ width: "56px", height: "2px", background: C.border, borderRadius: "1px", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${((active + 1) / jobs.length) * 100}%`, background: C.red, borderRadius: "1px", transition: "width 0.4s ease" }} />
            </div>
            <span style={{ fontFamily: F.mono, fontSize: "12px", color: C.dim }}>{jobs.length}</span>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {jobs.map((j, i) => (
            <FadeIn key={i} delay={0.12 + i * 0.08}>
              <div onClick={() => setActive(i)} style={{
                padding: "clamp(24px,3vw,40px)", borderRadius: "18px",
                border: `1px solid ${active === i ? C.borderRed : C.border}`,
                background: active === i ? C.card3 : "transparent",
                cursor: "pointer", transition: "all 0.35s ease", position: "relative", overflow: "hidden",
              }}
                onMouseEnter={e => { if (active !== i) e.currentTarget.style.background = `${C.card3}50`; }}
                onMouseLeave={e => { if (active !== i) e.currentTarget.style.background = "transparent"; }}>
                <span style={{ position: "absolute", top: "-8px", right: "16px", fontFamily: F.display, fontSize: "clamp(70px,10vw,120px)", fontWeight: 700, color: C.red, opacity: 0.04, lineHeight: 1, pointerEvents: "none" }}>{j.num}</span>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.red, letterSpacing: "0.1em" }}>{j.type}</span>
                      <h3 style={{ fontFamily: F.display, fontSize: "clamp(24px,3.5vw,36px)", color: C.white, fontWeight: 700, margin: "4px 0 2px", fontStyle: "italic" }}>{j.role}</h3>
                      <p style={{ fontFamily: F.body, fontSize: "14px", color: C.red, margin: 0, fontWeight: 500 }}>{j.company} · {j.loc}</p>
                    </div>
                    <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.dim, padding: "5px 13px", borderRadius: "999px", border: `1px solid ${C.border}` }}>{j.period}</span>
                  </div>
                  {active === i && (
                    <div style={{ marginTop: "18px", animation: "fadeUp 0.35s ease forwards" }}>
                      {j.highlight && (
                        <div style={{ padding: "7px 14px", borderRadius: "10px", background: C.redDim, border: `1px solid ${C.borderRed}`, display: "inline-block", marginBottom: "12px" }}>
                          <span style={{ fontFamily: F.body, fontSize: "12px", color: C.redLight, fontWeight: 500 }}>{j.highlight}</span>
                        </div>
                      )}
                      <p style={{ fontFamily: F.body, fontSize: "14px", color: C.muted, lineHeight: 1.7, margin: "0 0 14px", maxWidth: "520px", fontWeight: 300 }}>{j.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                        {j.tags.map((t, k) => (<span key={k} style={{ padding: "4px 13px", borderRadius: "999px", border: `1px solid ${C.border}`, background: C.bg, color: C.muted, fontSize: "10px", fontFamily: F.mono }}>{t}</span>))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </StackCard>
  );
}

// ═══════════════════════════════════════════
// 4. ABOUT — CARD 3
// ═══════════════════════════════════════════
function About() {
  const [c1, r1] = useCounter(50000, 2000);
  const [c2, r2] = useCounter(70, 1800);
  const [c3, r3] = useCounter(30, 1600);
  const [c4, r4] = useCounter(3, 1000);

  return (
    <StackCard index={3} bg={C.card1} id="about">
      <div style={{ minHeight: "100vh", padding: "clamp(60px,10vh,100px) clamp(20px,5vw,72px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(38px,6vw,68px)", fontWeight: 700, color: C.white, lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>
              About Me <span style={{ fontStyle: "italic", color: C.red }}>/</span>
            </h2>
            <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.dim, letterSpacing: "0.1em" }}>(THE HUMAN)</span>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
          <FadeIn delay={0.1}>
            <div>
              <p style={{ fontFamily: F.display, fontSize: "clamp(20px,2.5vw,28px)", color: C.white, fontWeight: 600, fontStyle: "italic", lineHeight: 1.45, margin: "0 0 24px" }}>
                "I turn complexity into clarity, raw data into decisions, and new students into confident professionals."
              </p>
              <p style={{ fontFamily: F.body, fontSize: "14px", color: C.muted, lineHeight: 1.75, margin: "0 0 14px", fontWeight: 300 }}>
                I'm Nitish Madhavan — from Bengaluru to Vellore to Brisbane to Shanghai. Every move taught me something code can't: how to work with people who think completely differently than you.
              </p>
              <p style={{ fontFamily: F.body, fontSize: "14px", color: C.muted, lineHeight: 1.75, margin: "0 0 14px", fontWeight: 300 }}>
                At <span style={{ color: C.white, fontWeight: 500 }}>Lentra.AI</span>, I engineered CDC pipelines that cut data transfer costs by 30%. At <span style={{ color: C.white, fontWeight: 500 }}>Audima Labs</span>, I shipped a desktop app solo. At <span style={{ color: C.white, fontWeight: 500 }}>YuLan</span>, I built ORM tools in an entirely new culture and language.
              </p>
              <p style={{ fontFamily: F.body, fontSize: "14px", color: C.muted, lineHeight: 1.75, margin: 0, fontWeight: 300 }}>
                My thesis research focuses on <span style={{ color: C.red, fontWeight: 500 }}>AI-driven ETL optimization</span> — reducing cloud waste by 25%+ while staying compliant. It's where FinOps meets engineering.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Philosophy */}
              <div style={{ padding: "24px", borderRadius: "16px", border: `1px solid ${C.border}`, background: C.bg }}>
                <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.red, letterSpacing: "0.1em" }}>MY PHILOSOPHY</span>
                <p style={{ fontFamily: F.display, fontSize: "18px", fontStyle: "italic", color: C.white, margin: "10px 0 0", lineHeight: 1.5 }}>
                  AI can write code. It can't build trust.<br />
                  It can't mentor a scared first-year student.<br />
                  It can't navigate three cultures in three years.<br />
                  <span style={{ color: C.red }}>That's where I live.</span>
                </p>
              </div>

              {/* Stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                {[
                  { ref: r1, val: c1.toLocaleString() + "+", label: "Records Engineered" },
                  { ref: r2, val: c2 + "+", label: "Students Mentored" },
                  { ref: r3, val: c3 + "%", label: "Cost Reduction" },
                  { ref: r4, val: c4, label: "Countries Worked In" },
                ].map((st, i) => (
                  <div key={i} ref={st.ref} style={{ padding: "18px 14px", borderRadius: "12px", textAlign: "center", border: `1px solid ${C.border}`, background: C.bg }}>
                    <div style={{ fontFamily: F.display, fontSize: "26px", color: C.red, fontWeight: 700 }}>{st.val}</div>
                    <div style={{ fontFamily: F.mono, fontSize: "9px", color: C.dim, letterSpacing: "0.06em", marginTop: "5px", textTransform: "uppercase" }}>{st.label}</div>
                  </div>
                ))}
              </div>

              {/* Education mini */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { flag: "🇦🇺", school: "University of Queensland", degree: "Master of CS (Management)", yr: "2024–26" },
                  { flag: "🇮🇳", school: "VIT Vellore", degree: "M.Tech CS & Engineering", yr: "2019–24" },
                ].map((e, i) => (
                  <div key={i} style={{ padding: "14px 18px", borderRadius: "12px", border: `1px solid ${C.border}`, background: C.bg, display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ fontSize: "22px" }}>{e.flag}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: F.body, fontSize: "13px", color: C.white, fontWeight: 600, margin: 0 }}>{e.school}</p>
                      <p style={{ fontFamily: F.body, fontSize: "11px", color: C.muted, margin: "2px 0 0" }}>{e.degree}</p>
                    </div>
                    <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.dim }}>{e.yr}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </StackCard>
  );
}

// ═══════════════════════════════════════════
// 5. GALLERY — CARD 4
// ═══════════════════════════════════════════
function Gallery() {
  const [hovered, setHovered] = useState(null);

  // ──── ADD YOUR PHOTOS HERE ────
  // Just add filenames to this array — put the actual images in public/gallery/
  const photos = [
    { src: "/gallery/1.jpg", caption: "Brisbane Vibes" },
    { src: "/gallery/2.jpg", caption: "Work Mode" },
    { src: "/gallery/3.jpg", caption: "Campus Life" },
    { src: "/gallery/4.jpg", caption: "The Engineer" },
    { src: "/gallery/5.jpg", caption: "Off Duty" },
    { src: "/gallery/6.jpg", caption: "Exploring" },
  ];

  return (
    <StackCard index={4} bg={C.bg} id="gallery">
      <div style={{ minHeight: "100vh", padding: "clamp(60px,10vh,100px) clamp(20px,5vw,72px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(38px,6vw,68px)", fontWeight: 700, color: C.white, lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>
              Gallery <span style={{ fontStyle: "italic", color: C.red }}>/</span>
            </h2>
            <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.dim, letterSpacing: "0.1em" }}>(THE MODEL)</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.6vw,17px)", color: C.muted, maxWidth: "480px", lineHeight: 1.7, margin: "0 0 48px", fontWeight: 300 }}>
            Not just a developer. <span style={{ color: C.white, fontWeight: 500 }}>A whole person.</span>
          </p>
        </FadeIn>

        <ScrollBanner text="IRREPLACEABLY HUMAN" speed={32} outlined />

        <FadeIn delay={0.15}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "14px", marginTop: "40px",
          }}>
            {photos.map((p, i) => (
              <div key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative", borderRadius: "14px", overflow: "hidden",
                  border: `1px solid ${hovered === i ? C.borderRed : C.border}`,
                  aspectRatio: "3/4",
                  background: `linear-gradient(135deg, ${C.card1} 0%, ${C.card2} 100%)`,
                  cursor: "pointer",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.4s",
                  transform: hovered === i ? "translateY(-10px) scale(1.03)" : "translateY(0) scale(1)",
                  boxShadow: hovered === i ? `0 20px 50px ${C.red}20` : "none",
                  zIndex: hovered === i ? 10 : 1,
                }}>
                <img src={p.src} alt={p.caption} style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: hovered === i ? "grayscale(0%) brightness(1.05)" : "grayscale(30%) brightness(0.9)",
                  transition: "filter 0.4s ease, transform 0.5s ease",
                  transform: hovered === i ? "scale(1.08)" : "scale(1)",
                }} onError={e => { e.target.style.display = "none"; }} />
                
                {/* Red gradient overlay */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                  background: hovered === i ? `linear-gradient(to top, ${C.bg}DD 0%, transparent 100%)` : `linear-gradient(to top, ${C.bg}90 0%, transparent 100%)`,
                  transition: "all 0.3s ease", pointerEvents: "none",
                }} />

                {/* Caption */}
                <div style={{
                  position: "absolute", bottom: "14px", left: "14px", right: "14px",
                  opacity: hovered === i ? 1 : 0, transform: hovered === i ? "translateY(0)" : "translateY(8px)",
                  transition: "all 0.3s ease",
                }}>
                  <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.red, letterSpacing: "0.08em", background: `${C.bg}C0`, padding: "5px 12px", borderRadius: "999px", backdropFilter: "blur(8px)" }}>
                    {p.caption}
                  </span>
                </div>

                {/* Red corner accent */}
                <div style={{
                  position: "absolute", top: "12px", right: "12px",
                  width: "24px", height: "24px", borderRadius: "50%",
                  background: hovered === i ? C.red : "transparent",
                  border: `1.5px solid ${hovered === i ? C.red : C.border}`,
                  transition: "all 0.3s ease",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {hovered === i && <span style={{ color: "#fff", fontSize: "10px", fontWeight: 700 }}>↗</span>}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </StackCard>
  );
}

// ═══════════════════════════════════════════
// 6. CONTACT — CARD 5
// ═══════════════════════════════════════════
function Contact() {
  return (
    <StackCard index={5} bg={C.card2} id="contact">
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px clamp(20px,5vw,72px)", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", background: `radial-gradient(circle, ${C.red}0A 0%, transparent 55%)`, pointerEvents: "none" }} />

        <FadeIn>
          <span style={{ fontFamily: F.display, fontSize: "52px", color: C.red, fontStyle: "italic", display: "block", marginBottom: "20px", opacity: 0.6 }}>✦</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(34px,6vw,68px)", fontWeight: 700, color: C.white, lineHeight: 1.05, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            Let's Make It<br /><span style={{ fontStyle: "italic", color: C.red }}>Happen.</span>
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "15px", color: C.muted, maxWidth: "420px", margin: "0 auto 36px", lineHeight: 1.7, fontWeight: 300 }}>
            Whether it's optimising cloud costs, building a product from scratch, or just talking about what it means to build with intention — I'm in.
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <a href="mailto:nitishrmadhavan@gmail.com" style={{
            display: "inline-block", padding: "15px 38px", borderRadius: "999px",
            background: C.red, color: "#fff", textDecoration: "none",
            fontFamily: F.body, fontWeight: 600, fontSize: "14px",
            transition: "transform 0.25s, box-shadow 0.25s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 14px 44px ${C.red}40`; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
          >nitishrmadhavan@gmail.com</a>

          <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "28px" }}>
            {[
              { label: "LinkedIn", url: "https://linkedin.com/in/nitishrmadhavan" },
              { label: "GitHub", url: "https://github.com/nitishrmadhavan" },
            ].map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{ color: C.dim, textDecoration: "none", fontFamily: F.mono, fontSize: "12px", letterSpacing: "0.05em", transition: "color 0.25s" }}
                onMouseEnter={e => e.target.style.color = C.red} onMouseLeave={e => e.target.style.color = C.dim}>{l.label} ↗</a>
            ))}
          </div>

          <div style={{ marginTop: "60px", padding: "20px", borderTop: `1px solid ${C.border}`, width: "100%", maxWidth: "600px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.dim, letterSpacing: "0.05em" }}>© 2026 NITISH MADHAVAN</span>
              <span style={{ fontFamily: F.mono, fontSize: "10px", color: `${C.dim}80`, letterSpacing: "0.05em" }}>DESIGNED TO BE HUMAN IN AN AI WORLD.</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </StackCard>
  );
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function Portfolio() {
  useEffect(() => { document.title = "Who's Nitish?"; }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Sora:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; color: ${C.white}; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

        ::selection { background: ${C.red}35; color: ${C.white}; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.red}30; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.red}55; }

        @keyframes bannerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes bannerScrollR { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.85); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

        @media (max-width: 768px) {
          .dsk-nav { display: none !important; }
          .mob-nav { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-photo { margin: 0 auto 32px !important; order: -1; }
        }
        @media (min-width: 769px) {
          .mob-nav { display: none !important; }
        }

        /* Noise grain overlay */
        body::before {
          content: ''; position: fixed; top:0; left:0; right:0; bottom:0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.35;
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav />
        <Hero />
        <Services />
        <Work />
        <About />
        <Gallery />
        <Contact />
      </div>
    </>
  );
}