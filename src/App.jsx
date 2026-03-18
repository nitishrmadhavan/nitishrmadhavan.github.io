import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════
const C = {
  cream: "#F5F0E8", cream2: "#EDE8DF", white: "#FFFDF9",
  red: "#E63946", redDark: "#C1121F", redLight: "#FF4D5A",
  redDim: "#E6394612", redBorder: "#E6394630",
  dark: "#1A1A1A", darkCard: "#111111", darkSoft: "#2C2C2C",
  darkMuted: "#9A9A8E", darkDim: "#666",
  muted: "#6B6B6B", dim: "#999",
  border: "#D5CEBC", borderLight: "#E0DAD0", borderDark: "#2A2A2A",
};
const F = {
  display: "'Playfair Display', serif",
  body: "'Sora', sans-serif",
  mono: "'Fira Code', monospace",
};

// ═══════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════
function FadeIn({ children, delay = 0, y = 36, style = {}, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      ...style, opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
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

function SafeImage({ src, alt, style = {}, placeholderLabel = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${C.cream2} 0%, ${C.border} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.4 }}>✦</span>
      {placeholderLabel && <span style={{ fontFamily: F.mono, fontSize: "9px", color: C.dim, letterSpacing: "0.1em" }}>{placeholderLabel}</span>}
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
}

function ScrollBanner({ text, speed = 28, outlined = false, dark = false }) {
  const items = Array(8).fill(text);
  return (
    <div style={{ overflow: "hidden", padding: "14px 0" }}>
      <div style={{ display: "flex", gap: "48px", width: "max-content", animation: `bannerScroll ${speed}s linear infinite` }}>
        {items.map((t, i) => (
          <span key={i} style={{
            fontFamily: F.display, fontSize: "clamp(32px,5vw,72px)",
            fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.02em", whiteSpace: "nowrap",
            color: outlined ? "transparent" : (dark ? "#ffffff" : C.red),
            WebkitTextStroke: outlined ? `1.5px ${dark ? "#ffffff20" : C.redBorder}` : "none",
            opacity: outlined ? 0.5 : 0.1,
          }}>{t} <span style={{ fontStyle: "normal", opacity: 0.3 }}>✦</span></span>
        ))}
      </div>
    </div>
  );
}

function TechMarquee({ items, reverse = false, speed = 34, dark = false }) {
  const d = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div style={{ display: "flex", gap: "10px", width: "max-content", animation: `${reverse ? "bannerScrollR" : "bannerScroll"} ${speed}s linear infinite` }}>
        {d.map((item, i) => (
          <span key={i} style={{ padding: "6px 16px", borderRadius: "999px", border: `1px solid ${dark ? C.borderDark : C.border}`, background: dark ? C.darkSoft : C.white, color: dark ? C.darkMuted : C.muted, fontSize: "11px", fontFamily: F.mono, whiteSpace: "nowrap" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(26,26,26,0.5)", backdropFilter: "blur(8px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "modalFadeIn 0.25s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.white, borderRadius: "20px", padding: "clamp(28px,4vw,44px)", maxWidth: "520px", width: "100%", maxHeight: "80vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.15)", animation: "modalSlideUp 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
        {children}
        <button onClick={onClose} style={{ marginTop: "24px", padding: "10px 24px", borderRadius: "999px", border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: "12px", fontFamily: F.mono, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.target.style.background = C.red; e.target.style.color = "#fff"; e.target.style.borderColor = C.red; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.muted; e.target.style.borderColor = C.border; }}>Close</button>
      </div>
    </div>
  );
}

function LetterReveal({ text, tag: Tag = "h2", style = {}, start = "top 85%", className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = ref.current?.querySelectorAll(".gl");
      if (!letters?.length) return;
      gsap.fromTo(letters,
        { y: "106%", opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.028, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start } }
      );
    });
    return () => ctx.revert();
  }, []);
  return (
    <Tag ref={ref} className={className} style={{ ...style, overflow: "hidden" }}>
      {text.split("").map((char, i) => (
        <span key={i} className="gl" style={{ display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}

function WordReveal({ children, style = {}, start = "top 88%" }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = ref.current?.querySelectorAll(".gw");
      if (!words?.length) return;
      gsap.fromTo(words,
        { y: "120%", opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.018, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start } }
      );
    });
    return () => ctx.revert();
  }, []);
  return (
    <p ref={ref} style={{ ...style, margin: 0 }}>
      {String(children).split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
          <span className="gw" style={{ display: "inline-block" }}>{word}</span>
        </span>
      ))}
    </p>
  );
}


// ═══════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  const links = [
    { l: "Services", h: "#services" }, { l: "Work", h: "#work" },
    { l: "About", h: "#about" }, { l: "Contact", h: "#contact" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      padding: "0 clamp(20px,5vw,72px)", height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? `${C.cream}E8` : "transparent",
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

      </div>
      <button className="mob-nav" onClick={() => setMob(!mob)} style={{ display: "none", background: "none", border: "none", color: C.dark, fontSize: "22px", cursor: "pointer" }}>{mob ? "✕" : "☰"}</button>
      {mob && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, bottom: 0, background: `${C.cream}F8`, backdropFilter: "blur(24px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px", zIndex: 499 }}>
          {links.map(l => (<a key={l.l} href={l.h} onClick={() => setMob(false)} style={{ textDecoration: "none", fontFamily: F.display, fontSize: "28px", color: C.dark, fontStyle: "italic" }}>{l.l}</a>))}
        </div>
      )}
    </nav>
  );
}


// ═══════════════════════════════════════════
// CARD 0 — HERO (dark, reference layout)
// ═══════════════════════════════════════════
function Hero() {
  const nameRef  = useRef(null);
  const photoRef = useRef(null);
  const metaRef  = useRef(null);
  const badgeRef = useRef(null);
  const marqRef  = useRef(null);
  const descRef  = useRef(null);

  useEffect(() => {
    const letters = nameRef.current?.querySelectorAll(".hl");
    if (!letters?.length) return;
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(badgeRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0)
      .fromTo(metaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.15)
      .fromTo(letters, { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.025, duration: 1.0 }, 0.2)
      .fromTo(photoRef.current, { clipPath: "inset(0 0 100% 0)", opacity: 0, scale: 1.08 }, { clipPath: "inset(0 0 0% 0)", opacity: 1, scale: 1, duration: 1.1, ease: "power3.inOut" }, 0.35)
      .fromTo(descRef.current, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, 0.6)
      .fromTo(marqRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.85);
    return () => tl.kill();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", color: C.dark }}>
      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px clamp(20px,5vw,72px) 0" }}>

        {/* Badge row */}
        <div ref={badgeRef} style={{ marginBottom: "clamp(24px,4vh,40px)" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "8px 20px", borderRadius: "999px",
            border: `1px solid ${C.redBorder}`, background: C.redDim,
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E80", animation: "pulse 2s infinite", flexShrink: 0 }} />
            <span style={{ color: C.red, fontSize: "11px", fontFamily: F.mono, letterSpacing: "0.1em" }}>OPEN TO WORK</span>
            <span style={{ color: C.dim, fontSize: "11px", fontFamily: F.mono }}>·</span>
            <span style={{ color: C.dark, fontSize: "11px", fontFamily: F.mono, letterSpacing: "0.08em" }}>MAR '26</span>
          </div>
        </div>

        {/* Two-column: left text, right photo */}
        <div className="hero-grid" style={{
          display: "grid", gridTemplateColumns: "1fr auto",
          gap: "clamp(24px,5vw,80px)", alignItems: "center",
        }}>
          {/* LEFT — text */}
          <div>
            {/* Subtitle */}
            <p ref={metaRef} style={{
              fontFamily: F.mono, fontSize: "clamp(10px,1vw,13px)", color: C.muted,
              letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 clamp(16px,2.5vh,28px)",
            }}>
              Data Engineer · Software Developer · Mentor
            </p>

            {/* Name — NITISH white, MADHAVAN red italic */}
            <div style={{ overflow: "hidden", marginBottom: "clamp(20px,3.5vh,36px)" }}>
              <h1 ref={nameRef} className="hero-name" style={{
                fontFamily: F.display, fontSize: "clamp(40px, 8.5vw, 140px)",
                fontWeight: 700, lineHeight: 0.92,
                letterSpacing: "-0.03em", margin: 0, userSelect: "none",
              }}>
                {"NITISH".split("").map((ch, i) => (
                  <span key={i} className="hl" style={{ display: "inline-block", color: C.dark }}>
                    {ch}
                  </span>
                ))}
                <br />
                {"MADHAVAN".split("").map((ch, i) => (
                  <span key={i + 10} className="hl" style={{ display: "inline-block", color: C.red, fontStyle: "italic" }}>
                    {ch}
                  </span>
                ))}
              </h1>
            </div>

            {/* Description + buttons */}
            <div ref={descRef}>
              <p style={{
                fontFamily: F.body, fontSize: "clamp(14px,1.3vw,18px)",
                color: C.muted, maxWidth: "42ch", lineHeight: 1.72, margin: "0 0 clamp(20px,3vh,32px)",
              }}>
                I build data systems that run reliably, reduce cloud costs, and support real‑time decisions for the teams that depend on them.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "clamp(20px,3vh,32px)" }}>
                <a href="#contact" style={{
                  padding: "13px 32px", borderRadius: "999px", background: C.dark,
                  color: C.cream, textDecoration: "none", fontFamily: F.body,
                  fontWeight: 700, fontSize: "13px", letterSpacing: "0.04em",
                  transition: "background 0.25s, transform 0.25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.dark; e.currentTarget.style.transform = "none"; }}>
                  LET'S TALK
                </a>
                <a href="#work" style={{
                  padding: "13px 32px", borderRadius: "999px",
                  border: `1px solid ${C.border}`, color: C.dark,
                  textDecoration: "none", fontFamily: F.body, fontWeight: 500,
                  fontSize: "13px", transition: "border-color 0.3s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.red}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  MY WORK →
                </a>
              </div>

              {/* Location cities */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.dim, letterSpacing: "0.12em" }}>
                  📍 BRISBANE, AUSTRALIA
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — photo */}
          <div className="hero-photo-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div ref={photoRef} style={{
              width: "clamp(180px,22vw,340px)", aspectRatio: "3/4",
              borderRadius: "16px", overflow: "hidden",
              border: `3px solid ${C.red}`,
              boxShadow: `8px 8px 0 ${C.red}22`,
            }}>
              <SafeImage src="/hero-nitish.jpg" alt="Nitish Madhavan" placeholderLabel="NITISH"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tech marquee */}
      <div ref={marqRef} style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "16px 0" }}>
        <TechMarquee items={["Python", "Java", "SQL", "Rust", "TypeScript", "JavaScript", "Spring", "Flask", "Spark"]} speed={36} />
        <TechMarquee items={["MongoDB", "Kafka", "Airflow", "AWS Glue", "S3", "HDFS", "PostgreSQL", "Docker", "Jenkins"]} reverse speed={32} />
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
// CARD 1 — SERVICES
// ═══════════════════════════════════════════
function Services() {
  const services = [
    { num: "01", title: "Data Engineering & Cloud Optimisation", desc: "Scalable ETL/ELT pipelines, CDC architectures, and FinOps‑aware data platforms. I build systems that process 50K+ records while cutting cloud waste by around 25% without sacrificing reliability.", subs: [{ n: "01", t: "Kafka, Spark, Airflow, AWS Glue" }, { n: "02", t: "CDC Pipelines, Data Lakes, S3" }, { n: "03", t: "FinOps, Cost Governance, Compliance" }] },
    { num: "02", title: "Full-Stack Software Development", desc: "End‑to‑end product ownership from architecture through CI/CD to deployment. Cross‑platform desktop apps, backend APIs, and web platforms built to actually ship and scale in production.", subs: [{ n: "01", t: "React, TypeScript, Rust, Tauri" }, { n: "02", t: "Spring, Flask, Java, Python" }, { n: "03", t: "GitHub Actions, Docker, Jenkins" }] },
    { num: "03", title: "Leadership & Mentorship", desc: "Not a service I sell — a value I bring. I've mentored 70+ students at UQ and regularly bridge communication gaps across teams in India, Australia, and China.", subs: [{ n: "01", t: "Cross-Cultural Communication" }, { n: "02", t: "Team Coordination & Strategy" }, { n: "03", t: "Community Building at Scale" }] },
  ];

  return (
    <div style={{ padding: "clamp(72px,11vh,110px) clamp(20px,5vw,72px) clamp(60px,8vh,80px)" }}>
      <LetterReveal text="What I Do /" tag="h2" style={{
        fontFamily: F.body, fontSize: "clamp(32px,7vw,96px)", fontWeight: 700,
        color: C.cream, letterSpacing: "-0.03em", lineHeight: 1,
        textTransform: "uppercase", marginBottom: "clamp(20px,3vh,36px)",
      }} start="top 90%" />

      <div style={{ display: "flex", gap: "clamp(24px,6vw,80px)", flexWrap: "wrap", alignItems: "flex-start", marginBottom: "clamp(36px,5vh,56px)" }}>
        <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.darkDim, letterSpacing: "0.1em", whiteSpace: "nowrap", paddingTop: "4px" }}>(Services)</span>
        <WordReveal style={{ fontFamily: F.body, fontSize: "clamp(14px,1.5vw,18px)", color: C.darkMuted, maxWidth: "44ch", lineHeight: 1.7, fontWeight: 300 }} start="top 90%">
          I build reliable, cost‑efficient data systems and full‑stack applications that turn raw data into clear, actionable decisions.
        </WordReveal>
      </div>

      <div>
        {services.map((sv, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div style={{ borderTop: `1px solid ${C.borderDark}`, padding: "clamp(28px,4vh,44px) 0" }}>
              <div className="svc-row" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "clamp(20px,4vw,60px)", alignItems: "start" }}>
                <span style={{ fontFamily: F.mono, fontSize: "clamp(13px,1.4vw,18px)", color: C.darkDim, fontWeight: 500, paddingTop: "4px" }}>({sv.num})</span>
                <div>
                  <h3 style={{ fontFamily: F.body, fontSize: "clamp(20px,3.2vw,48px)", color: C.cream, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 clamp(12px,2vh,20px)", lineHeight: 1.1 }}>{sv.title}</h3>
                  <p style={{ fontFamily: F.body, fontSize: "clamp(13px,1.25vw,15px)", color: C.darkMuted, maxWidth: "52ch", lineHeight: 1.8, margin: "0 0 clamp(18px,2.5vh,28px)", fontWeight: 300 }}>{sv.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {sv.subs.map((sub, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2.5vw,28px)", padding: "clamp(10px,1.4vh,16px) 0", borderTop: `1px solid ${C.borderDark}` }}>
                        <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.darkDim, minWidth: "22px", flexShrink: 0 }}>{sub.n}</span>
                        <span style={{ fontFamily: F.body, fontSize: "clamp(14px,1.8vw,24px)", color: C.cream2, fontWeight: 600, letterSpacing: "-0.01em" }}>{sub.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
// CARD 2 — EXPERIENCE
// ═══════════════════════════════════════════
function Work() {
  const digitColRef = useRef(null);
  const item0 = useRef(null);
  const item1 = useRef(null);
  const item2 = useRef(null);
  const itemRefs = [item0, item1, item2];

  const jobs = [
    { num: "01", country: "🇨🇳 CHINA", role: "Backend Developer", company: "YuLan Information Technology", loc: "Shanghai", period: "Jun '25 – Jul '25", desc: "Developed ORM utilities and database abstraction layers in Java, optimising data access and aggregate queries while adapting to a new culture and delivering under tight deadlines.", tags: ["Java", "ORM", "Agile", "System Architecture"], highlight: "Third country in three years — adapted in weeks." },
    { num: "02", country: "🇦🇺 AUSTRALIA", role: "Software Engineer (Full Stack)", company: "Audima Labs", loc: "Gold Coast", period: "Nov '24 – Feb '25", desc: "Designed and shipped SWAY — a cross‑platform desktop application — with end‑to‑end CI/CD on GitHub Actions and full lifecycle ownership from architecture to release.", tags: ["ReactJS", "TypeScript", "Rust", "Tauri", "CI/CD"], highlight: "Full product ownership — from idea to stable release." },
    { num: "03", country: "🇮🇳 INDIA", role: "Data Engineer", company: "Lentra.AI", loc: "Bengaluru", period: "Jul '23 – May '24", desc: "Built TransferX — scalable CDC pipelines processing 50K+ records with around 30% efficiency gains, while bridging communication between interns and management to keep delivery on track.", tags: ["MongoDB", "Kafka", "Spark", "Airflow", "AWS Glue", "S3"], highlight: "🏆 High Five Award — Q3" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.forEach((ref, i) => {
        if (!ref.current || !digitColRef.current) return;
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 60%",
          onEnter: () => slideDigitTo(i),
          onEnterBack: () => slideDigitTo(i),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const slideDigitTo = useCallback((i) => {
    if (!digitColRef.current) return;
    const h = digitColRef.current.children[0]?.offsetHeight || 0;
    gsap.to(digitColRef.current, { y: -(i * h), duration: 0.85, ease: "power3.inOut" });
  }, []);

  return (
    <div style={{ padding: "clamp(72px,11vh,110px) clamp(20px,5vw,72px) clamp(72px,11vh,110px)" }}>
      <LetterReveal text="Experience /" tag="h2" style={{
        fontFamily: F.display, fontSize: "clamp(32px,7vw,96px)",
        fontWeight: 700, fontStyle: "italic", color: C.dark,
        letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "clamp(20px,3vh,36px)",
      }} start="top 88%" />

      <div style={{ display: "flex", gap: "clamp(24px,6vw,80px)", flexWrap: "wrap", alignItems: "flex-start", marginBottom: "clamp(48px,7vh,80px)" }}>
        <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.dim, letterSpacing: "0.1em", whiteSpace: "nowrap", paddingTop: "5px" }}>(WHERE I'VE BUILT)</span>
        <WordReveal style={{ fontFamily: F.body, fontSize: "clamp(14px,1.5vw,17px)", color: C.muted, maxWidth: "42ch", lineHeight: 1.7 }} start="top 88%">
          Three countries. Three cultures. Each one sharpened how I build, communicate, and lead under pressure.
        </WordReveal>
      </div>

      <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "clamp(20px,5vw,72px)", alignItems: "start" }}>
        <div className="work-num-col" style={{
          position: "sticky", top: "80px", height: "fit-content", userSelect: "none",
          lineHeight: 1, display: "flex", fontSize: "clamp(80px,15vw,220px)",
          fontFamily: F.body, fontWeight: 700, color: C.dark, opacity: 0.07, letterSpacing: "-0.04em",
        }}>
          <span style={{ display: "inline-block" }}>0</span>
          <div style={{ display: "inline-block", overflow: "hidden", height: "1em" }}>
            <div ref={digitColRef} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ display: "block", lineHeight: 1 }}>1</span>
              <span style={{ display: "block", lineHeight: 1 }}>2</span>
              <span style={{ display: "block", lineHeight: 1 }}>3</span>
            </div>
          </div>
        </div>

        <div>
          {jobs.map((j, i) => (
            <div key={i} ref={itemRefs[i]} style={{ padding: "clamp(28px,4vh,56px) 0", borderTop: `1px solid ${C.border}` }}>
              <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "8px" }}>
                <div>
                  <p style={{ fontFamily: F.mono, fontSize: "10px", color: C.red, letterSpacing: "0.1em", margin: "0 0 6px", textTransform: "uppercase" }}>{j.country}</p>
                  <h3 style={{ fontFamily: F.body, fontSize: "clamp(18px,2.4vw,28px)", color: C.dark, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.02em" }}>{j.role}</h3>
                  <p style={{ fontFamily: F.body, fontSize: "13px", color: C.red, margin: 0, fontWeight: 500 }}>{j.company} · {j.loc}</p>
                </div>
                <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.dim, padding: "5px 14px", borderRadius: "999px", border: `1px solid ${C.border}`, whiteSpace: "nowrap", alignSelf: "flex-start" }}>{j.period}</span>
              </div>
              {j.highlight && (
                <div style={{ margin: "12px 0", padding: "5px 14px", borderRadius: "8px", background: C.redDim, border: `1px solid ${C.redBorder}`, display: "inline-block" }}>
                  <span style={{ fontFamily: F.body, fontSize: "11px", color: C.red, fontWeight: 600 }}>{j.highlight}</span>
                </div>
              )}
              <p style={{ fontFamily: F.body, fontSize: "13px", color: C.muted, lineHeight: 1.78, margin: "14px 0 18px", maxWidth: "54ch" }}>{j.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {j.tags.map((t, k) => (<span key={k} style={{ fontFamily: F.mono, fontSize: "10px", color: C.dim, padding: "4px 12px", borderRadius: "999px", border: `1px solid ${C.border}`, background: C.white }}>{t}</span>))}
              </div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}` }} />
          <ScrollBanner text="DATA ENGINEER — CLOUD COST OPTIMIZER — BUILDER" speed={28} />
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
// CARD 3 — ABOUT
// ═══════════════════════════════════════════
function About() {
  const [c1, r1] = useCounter(50000, 2000);
  const [c2, r2] = useCounter(70, 1800);
  const [c3, r3] = useCounter(30, 1600);
  const [c4, r4] = useCounter(3, 1000);
  const [modalEdu, setModalEdu] = useState(null);

  const eduData = [
    { flag: "🇦🇺", school: "University of Queensland", degree: "Master of CS (Management)", yr: "2024–26", details: { grade: "5.571 / 7 CGPA", coursework: ["Adv Techniques for High Dim Data", "Software Architecture", "Adv Human-Computer Interaction", "Concurrency: Theory & Practice"], research: "Optimising ETL pipelines in resource‑constrained environments — targeting 25%+ cloud cost reduction while maintaining regulatory compliance.", activities: "UQ Life Mentor (70+ students), Volunteer Champion." } },
    { flag: "🇮🇳", school: "VIT Vellore", degree: "M.Tech CS & Engineering (Integrated)", yr: "2019–24", details: { grade: "8.22 / 10 CGPA", coursework: ["Operating System Principles", "Data Communication & Networks", "Software Verification & Validation", "App Development Architecture", "Software App Architecture"], research: null, activities: null } },
  ];

  const stats = [
    { ref: r1, val: c1.toLocaleString() + "+", label: "Records Engineered" },
    { ref: r2, val: c2 + "+", label: "Students Mentored" },
    { ref: r3, val: c3 + "%", label: "Cost Reduction" },
    { ref: r4, val: c4, label: "Countries Worked In" },
  ];

  return (
    <div style={{ padding: "clamp(72px,10vh,100px) clamp(20px,5vw,72px) clamp(72px,10vh,100px)" }}>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px,6vw,68px)", fontWeight: 700, color: C.dark, lineHeight: 1, margin: 0 }}>About Me <span style={{ fontStyle: "italic", color: C.red }}>/</span></h2>
          <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.dim, letterSpacing: "0.1em" }}>(THE HUMAN)</span>
        </div>
      </FadeIn>

      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "36px" }}>
        <FadeIn delay={0.1}>
          <div>
            <p style={{ fontFamily: F.display, fontSize: "clamp(18px,2.2vw,26px)", color: C.dark, fontWeight: 600, fontStyle: "italic", lineHeight: 1.45, margin: "0 0 20px" }}>
              "I turn complexity into clarity, raw data into decisions, and nervous first‑years into confident professionals."
            </p>
            <p style={{ fontFamily: F.body, fontSize: "13px", color: C.muted, lineHeight: 1.75, margin: "0 0 12px" }}>
              I'm Nitish Madhavan — from Bengaluru to Vellore to Brisbane to Shanghai. Every move taught me how to work with people who think, build, and communicate completely differently.
            </p>
            <p style={{ fontFamily: F.body, fontSize: "13px", color: C.muted, lineHeight: 1.75, margin: "0 0 12px" }}>
              At <span style={{ color: C.dark, fontWeight: 600 }}>Lentra.AI</span>, I helped reduce data transfer time and cost by about 30%. At <span style={{ color: C.dark, fontWeight: 600 }}>Audima Labs</span>, I shipped a cross‑platform desktop app end‑to‑end. At <span style={{ color: C.dark, fontWeight: 600 }}>YuLan</span>, I built ORM tools while getting up to speed in a completely new culture.
            </p>
            <p style={{ fontFamily: F.body, fontSize: "13px", color: C.muted, lineHeight: 1.75, margin: 0 }}>
              My thesis focuses on making ETL pipelines more efficient in resource‑constrained cloud environments — targeting around 25% less wasted compute while keeping compliance intact.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ padding: "20px", borderRadius: "14px", border: `1px solid ${C.border}`, background: C.cream }}>
              <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.red, letterSpacing: "0.1em" }}>MY PHILOSOPHY</span>
              <p style={{ fontFamily: F.display, fontSize: "16px", fontStyle: "italic", color: C.dark, margin: "8px 0 0", lineHeight: 1.5 }}>
                Tools can generate code. They can't build trust.<br />They can't mentor a nervous first‑year student.<br />They can't navigate three cultures in three years.<br /><span style={{ color: C.red }}>That's the part of the work I care most about.</span>
              </p>
            </div>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
              {stats.map((st, i) => (
                <div key={i} ref={st.ref} style={{ padding: "14px 10px", borderRadius: "10px", textAlign: "center", border: `1px solid ${C.border}`, background: C.cream }}>
                  <div style={{ fontFamily: F.display, fontSize: "22px", color: C.red, fontWeight: 700 }}>{st.val}</div>
                  <div style={{ fontFamily: F.mono, fontSize: "8px", color: C.dim, letterSpacing: "0.05em", marginTop: "3px", textTransform: "uppercase" }}>{st.label}</div>
                </div>
              ))}
            </div>
            {eduData.map((e, i) => (
              <div key={i} onClick={() => setModalEdu(i)} style={{ padding: "12px 16px", borderRadius: "10px", border: `1px solid ${C.border}`, background: C.cream, display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", transition: "border-color 0.3s, transform 0.2s" }}
                onMouseEnter={ev => { ev.currentTarget.style.borderColor = C.red; ev.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={ev => { ev.currentTarget.style.borderColor = C.border; ev.currentTarget.style.transform = "none"; }}>
                <span style={{ fontSize: "20px" }}>{e.flag}</span>
                <div style={{ flex: 1 }}><p style={{ fontFamily: F.body, fontSize: "12px", color: C.dark, fontWeight: 600, margin: 0 }}>{e.school}</p><p style={{ fontFamily: F.body, fontSize: "10px", color: C.muted, margin: "1px 0 0" }}>{e.degree}</p></div>
                <span style={{ color: C.red, fontSize: "14px" }}>→</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <Modal open={modalEdu !== null} onClose={() => setModalEdu(null)}>
        {modalEdu !== null && (() => { const e = eduData[modalEdu]; return (<>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}><span style={{ fontSize: "32px" }}>{e.flag}</span><div><h3 style={{ fontFamily: F.display, fontSize: "22px", color: C.dark, fontWeight: 700, margin: 0, fontStyle: "italic" }}>{e.school}</h3><p style={{ fontFamily: F.body, fontSize: "14px", color: C.red, margin: "2px 0 0", fontWeight: 500 }}>{e.degree}</p></div></div>
          <div style={{ padding: "12px 16px", borderRadius: "10px", background: C.cream, marginBottom: "16px" }}><span style={{ fontFamily: F.mono, fontSize: "10px", color: C.red, letterSpacing: "0.08em" }}>GRADE</span><p style={{ fontFamily: F.body, fontSize: "15px", color: C.dark, fontWeight: 600, margin: "4px 0 0" }}>{e.details.grade}</p></div>
          <div style={{ marginBottom: "16px" }}><span style={{ fontFamily: F.mono, fontSize: "10px", color: C.red, letterSpacing: "0.08em" }}>COURSEWORK</span><div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>{e.details.coursework.map((c, ci) => (<span key={ci} style={{ fontFamily: F.body, fontSize: "11px", color: C.muted, padding: "4px 10px", borderRadius: "999px", border: `1px solid ${C.border}`, background: C.cream }}>{c}</span>))}</div></div>
          {e.details.research && (<div style={{ marginBottom: "16px" }}><span style={{ fontFamily: F.mono, fontSize: "10px", color: C.red, letterSpacing: "0.08em" }}>RESEARCH</span><p style={{ fontFamily: F.body, fontSize: "12px", color: C.muted, lineHeight: 1.7, margin: "6px 0 0" }}>{e.details.research}</p></div>)}
          {e.details.activities && (<div><span style={{ fontFamily: F.mono, fontSize: "10px", color: C.red, letterSpacing: "0.08em" }}>ACTIVITIES</span><p style={{ fontFamily: F.body, fontSize: "12px", color: C.muted, lineHeight: 1.7, margin: "6px 0 0" }}>{e.details.activities}</p></div>)}
        </>); })()}
      </Modal>
    </div>
  );
}


// ═══════════════════════════════════════════
// CARD 4 — CONTACT
// ═══════════════════════════════════════════
function Contact() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px clamp(20px,5vw,72px)", textAlign: "center" }}>
      <FadeIn>
        <span style={{ fontFamily: F.display, fontSize: "48px", color: C.red, fontStyle: "italic", display: "block", marginBottom: "16px", opacity: 0.5 }}>✦</span>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(30px,6vw,68px)", fontWeight: 700, color: C.dark, lineHeight: 1.05, margin: "0 0 14px" }}>
          Let's Make It<br /><span style={{ fontStyle: "italic", color: C.red }}>Happen.</span>
        </h2>
        <p style={{ fontFamily: F.body, fontSize: "14px", color: C.muted, maxWidth: "400px", margin: "0 auto 32px", lineHeight: 1.7 }}>
          Whether it's optimising cloud costs, building a product, or building with intention — I'm in.
        </p>
      </FadeIn>
      <FadeIn delay={0.12}>
        <a href="mailto:nitishrmadhavan@gmail.com" style={{ display: "inline-block", padding: "14px 36px", borderRadius: "999px", background: C.red, color: "#fff", textDecoration: "none", fontFamily: F.body, fontWeight: 600, fontSize: "14px", transition: "transform 0.25s, box-shadow 0.25s" }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 14px 44px ${C.red}40`; }}
          onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}>nitishrmadhavan@gmail.com</a>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "24px" }}>
          {[{ label: "LinkedIn", url: "https://linkedin.com/in/nitishrmadhavan" }, { label: "GitHub", url: "https://github.com/nitishrmadhavan" }].map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{ color: C.dim, textDecoration: "none", fontFamily: F.mono, fontSize: "12px", transition: "color 0.25s" }}
              onMouseEnter={e => e.target.style.color = C.red} onMouseLeave={e => e.target.style.color = C.dim}>{l.label} ↗</a>
          ))}
        </div>
        <div style={{ marginTop: "48px", paddingTop: "16px", borderTop: `1px solid ${C.border}`, width: "100%", maxWidth: "500px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.dim }}>© 2026 NITISH MADHAVAN</span>
          <span style={{ fontFamily: F.mono, fontSize: "10px", color: `${C.dim}80` }}>DESIGNED TO BE CLEAR, FAST, AND RELIABLE.</span>
        </div>
      </FadeIn>
    </div>
  );
}


// ═══════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════
const CARD_STYLE = (bg, isFirst = false, isLast = false) => ({
  position: "sticky",
  top: 0,
  height: "100vh",
  overflowY: "auto",
  background: bg,
  borderRadius: isFirst ? 0 : "28px 28px 0 0",
  boxShadow: isFirst ? "none" : "0 -8px 60px rgba(0,0,0,0.15), 0 -2px 0 rgba(0,0,0,0.04)",
  transformOrigin: "center top",
  marginBottom: isLast ? 0 : "60vh",
});

export default function Portfolio() {
  const containerRef = useRef(null);
  const gsapCtxRef = useRef(null);

  useEffect(() => {
    document.title = "Who's Nitish?";

    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll(".stack-card");
      gsapCtxRef.current = gsap.context(() => {
        cards.forEach((card, index) => {
          const isLast = index === cards.length - 1;
          if (isLast) return;

          ScrollTrigger.create({
            trigger: card.nextElementSibling,
            start: "top bottom",
            end: "top top",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              gsap.set(card, {
                scale: 1 - p * 0.05,
                opacity: 1 - p * 0.6,
                borderRadius: `${Math.min(p * 28, 28)}px`,
              });
            },
          });
        });

        ScrollTrigger.refresh();
      }, containerRef.current);
    }, 200);

    return () => {
      clearTimeout(timer);
      gsapCtxRef.current?.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Sora:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.dark}; color: ${C.dark}; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        ::selection { background: ${C.red}25; color: ${C.dark}; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.cream}; }
        ::-webkit-scrollbar-thumb { background: ${C.red}30; border-radius: 3px; }
        .stack-card { scrollbar-width: none; -ms-overflow-style: none; }
        .stack-card::-webkit-scrollbar { display: none; }
        @keyframes bannerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes bannerScrollR { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.85); } }
        @keyframes modalFadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes modalSlideUp { from { opacity:0; transform:translateY(20px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }

        @media (max-width: 768px) {
          .dsk-nav { display: none !important; }
          .mob-nav { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-name { font-size: clamp(36px, 12vw, 56px) !important; }
          .hero-photo-wrap { order: -1; align-items: flex-start !important; }
          .hero-photo-wrap > div:first-child { width: 140px !important; }
          .work-grid { grid-template-columns: 1fr !important; }
          .work-num-col { display: none !important; }
          .svc-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
        @media (min-width: 769px) { .mob-nav { display: none !important; } }
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-grid { gap: 24px !important; }
          .hero-photo-wrap > div:first-child { width: 180px !important; }
        }
      `}</style>

      <Nav />

      <div ref={containerRef}>
        <section className="stack-card" id="hero" style={CARD_STYLE(C.cream, true)}>
          <Hero />
        </section>

        <section className="stack-card" id="services" style={CARD_STYLE(C.darkCard)}>
          <Services />
        </section>

        <section className="stack-card" id="work" style={CARD_STYLE(C.cream)}>
          <Work />
        </section>

        <section className="stack-card" id="about" style={CARD_STYLE(C.white)}>
          <About />
        </section>

        <section className="stack-card" id="contact" style={CARD_STYLE(C.white, false, true)}>
          <Contact />
        </section>
      </div>
    </>
  );
}