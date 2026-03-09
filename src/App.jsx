import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ───
const C = {
  bg: "#08080A",
  card: "#111113",
  border: "#1A1A1E",
  borderHover: "#D4A85350",
  amber: "#D4A853",
  amberLight: "#E8C97A",
  amberDim: "#D4A85320",
  text: "#E2DFD8",
  textMuted: "#8A8A8A",
  textDim: "#555",
  green: "#6BCB77",
};

const F = {
  display: "'Cormorant Garamond', serif",
  body: "'Outfit', sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

// ─── HOOKS ───
function FadeIn({ children, delay = 0, y = 40, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function useCounter(end, duration = 2200) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      cur += step;
      if (cur >= end) { setCount(end); clearInterval(id); } else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [started, end, duration]);
  return [count, ref];
}

// ─── SCROLLING BANNER ───
function ScrollBanner({ text, speed = 25, outlined = false }) {
  const items = Array(8).fill(text);
  return (
    <div style={{ overflow: "hidden", padding: "22px 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{
        display: "flex", gap: "48px", width: "max-content",
        animation: `scrollBanner ${speed}s linear infinite`,
      }}>
        {items.map((t, i) => (
          <span key={i} style={{
            fontFamily: F.display, fontSize: "clamp(48px, 8vw, 88px)",
            fontWeight: 600, fontStyle: "italic", letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            color: outlined ? "transparent" : C.amber,
            WebkitTextStroke: outlined ? `1.5px ${C.amber}40` : "none",
            opacity: outlined ? 0.5 : 0.12,
          }}>
            {t} <span style={{ fontStyle: "normal", opacity: 0.4 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── TECH MARQUEE ───
function TechMarquee({ items, reverse = false, speed = 32 }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div style={{
        display: "flex", gap: "10px", width: "max-content",
        animation: `${reverse ? "scrollBannerR" : "scrollBanner"} ${speed}s linear infinite`,
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            padding: "7px 18px", borderRadius: "999px",
            border: `1px solid ${C.border}`, background: C.card,
            color: C.textMuted, fontSize: "12px", fontFamily: F.mono,
            whiteSpace: "nowrap", letterSpacing: "0.03em",
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── NAVIGATION ───
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 clamp(20px, 5vw, 80px)", height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? `${C.bg}E6` : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span style={{ fontFamily: F.display, fontSize: "28px", fontWeight: 700, color: C.amber, fontStyle: "italic" }}>N</span>
        <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.textMuted, letterSpacing: "0.12em", textTransform: "uppercase" }}>itish</span>
      </a>

      <div className="nav-links" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {links.map(l => (
          <a key={l.label} href={l.href} style={{
            textDecoration: "none", color: C.textMuted, fontSize: "13px",
            fontFamily: F.body, fontWeight: 500, letterSpacing: "0.04em",
            transition: "color 0.25s",
          }}
            onMouseEnter={e => e.target.style.color = C.amber}
            onMouseLeave={e => e.target.style.color = C.textMuted}
          >{l.label}</a>
        ))}
        <a href="mailto:nitishrmadhavan@gmail.com" style={{
          textDecoration: "none", padding: "8px 20px", borderRadius: "999px",
          background: C.amber, color: C.bg, fontSize: "12px",
          fontFamily: F.mono, fontWeight: 500, letterSpacing: "0.04em",
          transition: "transform 0.2s",
        }}
          onMouseEnter={e => e.target.style.transform = "translateY(-1px)"}
          onMouseLeave={e => e.target.style.transform = "none"}
        >CONTACT ↗</a>
      </div>

      <button className="nav-mobile" onClick={() => setMobileOpen(!mobileOpen)} style={{
        display: "none", background: "none", border: "none",
        color: C.text, fontSize: "22px", cursor: "pointer", padding: "4px",
      }}>{mobileOpen ? "✕" : "☰"}</button>

      {mobileOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, bottom: 0,
          background: `${C.bg}F5`, backdropFilter: "blur(24px)",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: "36px", zIndex: 99,
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} style={{
              textDecoration: "none", fontFamily: F.display, fontSize: "28px",
              color: C.text, fontWeight: 500, fontStyle: "italic",
            }}>{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HERO ───
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setTimeout(() => setLoaded(true), 150)); }, []);

  const s = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "120px clamp(20px, 5vw, 80px) 80px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "-300px", right: "-200px", width: "700px", height: "700px", background: `radial-gradient(circle, ${C.amber}0C 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-200px", left: "-150px", width: "500px", height: "500px", background: `radial-gradient(circle, ${C.amber}08 0%, transparent 65%)`, pointerEvents: "none" }} />

      <div className="hero-grid" style={{
        display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(32px, 5vw, 80px)",
        alignItems: "center", width: "100%",
      }}>
        {/* Left — Text */}
        <div style={{ minWidth: 0 }}>
          <div style={s(0.15)}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "7px 18px", borderRadius: "999px",
              border: `1px solid ${C.amber}30`, background: C.amberDim, marginBottom: "32px",
            }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}80`, animation: "pulse 2s infinite" }} />
              <span style={{ color: C.amberLight, fontSize: "11px", fontFamily: F.mono, letterSpacing: "0.08em" }}>AVAILABLE FOR WORK · MAR '26</span>
            </div>
          </div>

          <p style={{ ...s(0.25), fontFamily: F.body, fontSize: "15px", color: C.textMuted, fontWeight: 500, letterSpacing: "0.02em", marginBottom: "12px" }}>
            Data Engineer & Software Developer
          </p>

          <h1 style={{
            ...s(0.35), fontFamily: F.display, fontSize: "clamp(48px, 8vw, 110px)",
            fontWeight: 700, color: C.text, lineHeight: 0.95, margin: "0 0 24px", letterSpacing: "-0.03em",
          }}>
            NITISH<br /><span style={{ color: C.amber, fontStyle: "italic" }}>MADHAVAN</span>
          </h1>

          <p style={{
            ...s(0.5), fontFamily: F.body, fontSize: "clamp(16px, 2vw, 20px)",
            color: C.textMuted, maxWidth: "520px", lineHeight: 1.65, fontWeight: 400,
          }}>
            I build data systems that power real decisions, and I believe the most
            valuable thing in tech is still <span style={{ color: C.text, fontWeight: 500 }}>being irreplaceably human.</span>
          </p>

          <div style={{ ...s(0.65), display: "flex", gap: "16px", marginTop: "36px", flexWrap: "wrap" }}>
            <a href="#contact" style={{
              padding: "14px 34px", borderRadius: "999px", background: C.amber,
              color: C.bg, textDecoration: "none", fontFamily: F.body,
              fontWeight: 600, fontSize: "14px", letterSpacing: "0.02em",
              transition: "transform 0.25s, box-shadow 0.25s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 12px 40px ${C.amber}35`; }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
            >LET'S TALK</a>
            <a href="#work" style={{
              padding: "14px 34px", borderRadius: "999px",
              border: `1px solid ${C.border}`, background: "transparent",
              color: C.text, textDecoration: "none", fontFamily: F.body,
              fontWeight: 500, fontSize: "14px", transition: "border-color 0.3s",
            }}
              onMouseEnter={e => e.target.style.borderColor = C.amber}
              onMouseLeave={e => e.target.style.borderColor = C.border}
            >SEE MY WORK →</a>
          </div>

          <div style={{ ...s(0.8), marginTop: "56px" }}>
            <span style={{ fontFamily: F.mono, fontSize: "12px", color: C.textDim, letterSpacing: "0.06em" }}>
              📍 BRISBANE, AU · FROM BENGALURU, IN
            </span>
          </div>
        </div>

        {/* Right — Hero Photo */}
        <div className="hero-photo-wrap" style={{
          ...s(0.6),
          position: "relative",
          width: "clamp(280px, 22vw, 380px)",
          flexShrink: 0,
        }}>
          <div style={{
            position: "absolute", inset: "-20px",
            background: `radial-gradient(circle at 50% 40%, ${C.amber}12 0%, transparent 70%)`,
            borderRadius: "24px", pointerEvents: "none", zIndex: 0,
          }} />
          <div style={{
            position: "relative", zIndex: 1,
            borderRadius: "20px", overflow: "hidden",
            border: `1px solid ${C.border}`,
            aspectRatio: "3/4",
            background: `linear-gradient(135deg, ${C.card} 0%, ${C.bg} 100%)`,
          }}>
            {/* ──── REPLACE src WITH YOUR PHOTO ──── */}
            <img
              src="/hero-nitish.jpg"
              alt="Nitish Madhavan"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: "grayscale(15%) contrast(1.05)",
                transition: "filter 0.5s ease, transform 0.5s ease",
              }}
              onMouseEnter={e => { e.target.style.filter = "grayscale(0%) contrast(1.1)"; e.target.style.transform = "scale(1.03)"; }}
              onMouseLeave={e => { e.target.style.filter = "grayscale(15%) contrast(1.05)"; e.target.style.transform = "scale(1)"; }}
              onError={e => { e.target.style.display = "none"; }}
            />
            {/* Amber gradient overlay at bottom */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
              background: `linear-gradient(to top, ${C.bg}CC 0%, transparent 100%)`,
              pointerEvents: "none",
            }} />
            {/* Name tag on photo */}
            <div style={{
              position: "absolute", bottom: "20px", left: "20px", zIndex: 2,
            }}>
              <span style={{
                fontFamily: F.mono, fontSize: "11px", color: C.amber,
                letterSpacing: "0.1em", background: `${C.bg}B0`,
                padding: "6px 14px", borderRadius: "999px",
                backdropFilter: "blur(8px)",
              }}>NITISH · BRISBANE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TECH STACK ───
function TechStack() {
  const r1 = ["Python", "Java", "SQL", "Rust", "TypeScript", "JavaScript", "C++", "CSS", "HTML"];
  const r2 = ["MongoDB", "Kafka", "Spark", "Airflow", "AWS Glue", "S3", "HDFS", "PostgreSQL", "MySQL"];
  const r3 = ["ReactJS", "Tauri", "Docker", "Jenkins", "Git", "Debezium", "Spring", "Hibernate", "Livy", "Linux"];
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "30px 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <TechMarquee items={r1} speed={38} />
      <TechMarquee items={r2} reverse speed={34} />
      <TechMarquee items={r3} speed={42} />
    </section>
  );
}

// ─── SERVICES ───
function Services() {
  const services = [
    { num: "01", title: "Data Engineering", desc: "Scalable ETL/ELT pipelines, CDC architectures, and data lake solutions. I design systems that handle tens of thousands of records and transform raw data into business intelligence.", tags: ["Kafka", "Spark", "Airflow", "AWS Glue", "MongoDB"] },
    { num: "02", title: "Software Development", desc: "Full lifecycle application development — architecture to deployment. Cross-platform desktop apps, web platforms, and backend services built with modern stacks and shipped with ownership.", tags: ["React", "TypeScript", "Rust", "Tauri", "Spring"] },
    { num: "03", title: "Leadership & Mentorship", desc: "Not a service I sell — a value I bring. I've mentored 30+ students, bridged teams, and created resources that helped entire cohorts navigate new environments and careers.", tags: ["Community", "Mentorship", "Communication", "Strategy"] },
  ];

  return (
    <section id="services" style={{ padding: "100px clamp(20px, 5vw, 80px)" }}>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 700, color: C.text, lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>
            What I Do <span style={{ fontStyle: "italic", color: C.amber }}>/</span>
          </h2>
          <span style={{ fontFamily: F.mono, fontSize: "12px", color: C.textDim, letterSpacing: "0.08em" }}>(SERVICES)</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p style={{ fontFamily: F.body, fontSize: "clamp(15px, 1.8vw, 18px)", color: C.textMuted, maxWidth: "640px", lineHeight: 1.7, margin: "0 0 56px" }}>
          I specialize in building data infrastructure and software that actually matters.
          Not just technically sound — <span style={{ color: C.text }}>built with purpose, shipped with care.</span>
        </p>
      </FadeIn>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {services.map((s, i) => (
          <FadeIn key={i} delay={0.1 + i * 0.1}>
            <div style={{
              padding: "36px 12px", borderTop: `1px solid ${C.border}`,
              display: "grid", gridTemplateColumns: "auto 1fr", gap: "clamp(20px, 4vw, 48px)",
              alignItems: "start", transition: "background 0.3s", cursor: "default",
            }}
              onMouseEnter={e => e.currentTarget.style.background = `${C.card}80`}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ fontFamily: F.display, fontSize: "16px", color: C.amber, fontStyle: "italic", paddingTop: "4px" }}>({s.num})</span>
              <div>
                <h3 style={{ fontFamily: F.body, fontSize: "clamp(22px, 3vw, 28px)", color: C.text, fontWeight: 600, margin: "0 0 12px" }}>{s.title}</h3>
                <p style={{ fontFamily: F.body, fontSize: "15px", color: C.textMuted, lineHeight: 1.7, margin: "0 0 16px", maxWidth: "540px" }}>{s.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {s.tags.map((t, j) => (
                    <span key={j} style={{ fontFamily: F.mono, fontSize: "11px", color: C.textDim, padding: "4px 12px", borderRadius: "999px", border: `1px solid ${C.border}` }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
        <div style={{ borderTop: `1px solid ${C.border}` }} />
      </div>
    </section>
  );
}

// ─── PROJECTS ───
function Projects() {
  const [active, setActive] = useState(0);
  const projects = [
    { num: "01", type: "DESKTOP APPLICATION", title: "SWAY Software", year: "2025", desc: "A cross-platform desktop application built with ReactJS, TypeScript, Rust, and Tauri. Full lifecycle ownership from architecture to deployment at Audima Labs — design, build, ship.", tags: ["ReactJS", "TypeScript", "Rust", "Tauri", "CSS"], highlight: "Owned the entire product — solo." },
    { num: "02", type: "DATA PIPELINE", title: "TransferX", year: "2024", desc: "Scalable CDC data pipeline processing 50,000+ records in batches using Debezium, Kafka, and Spark. Enhanced efficiency by 30% through automation, reduced manual intervention to near-zero.", tags: ["MongoDB", "Debezium", "Kafka", "Spark", "Airflow", "AWS Glue", "S3"], highlight: "🏆 Won the High Five Award at Lentra.AI" },
    { num: "03", type: "COMMUNITY IMPACT", title: "UQ Student Guide", year: "2024–26", desc: "Created and distributed a comprehensive digital guide for new international students at UQ. Increased resource awareness by 40%, resolved 95% of student concerns within 24 hours.", tags: ["Mentorship", "Content", "Community", "Leadership"], highlight: "30+ students mentored personally" },
  ];

  return (
    <section id="work" style={{ padding: "100px clamp(20px, 5vw, 80px)" }}>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 700, color: C.text, lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>
            Selected Work <span style={{ fontStyle: "italic", color: C.amber }}>/</span>
          </h2>
          <span style={{ fontFamily: F.mono, fontSize: "12px", color: C.textDim, letterSpacing: "0.08em" }}>(PROJECTS)</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p style={{ fontFamily: F.body, fontSize: "clamp(15px, 1.8vw, 18px)", color: C.textMuted, maxWidth: "580px", lineHeight: 1.7, margin: "0 0 48px" }}>
          Thoughtfully crafted systems that blend engineering rigor with <span style={{ color: C.text }}>real-world impact</span> — not just code, but outcomes.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "36px" }}>
          <span style={{ fontFamily: F.display, fontSize: "48px", color: C.amber, fontWeight: 700, fontStyle: "italic" }}>{active + 1}</span>
          <div style={{ width: "60px", height: "2px", background: C.border, borderRadius: "1px", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${((active + 1) / projects.length) * 100}%`, background: C.amber, borderRadius: "1px", transition: "width 0.4s ease" }} />
          </div>
          <span style={{ fontFamily: F.mono, fontSize: "12px", color: C.textDim }}>{projects.length}</span>
        </div>
      </FadeIn>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {projects.map((p, i) => (
          <FadeIn key={i} delay={0.15 + i * 0.1}>
            <div onClick={() => setActive(i)} style={{
              padding: "clamp(28px, 4vw, 44px)", borderRadius: "20px",
              border: `1px solid ${active === i ? C.borderHover : C.border}`,
              background: active === i ? C.card : "transparent",
              cursor: "pointer", transition: "all 0.4s ease", position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => { if (active !== i) e.currentTarget.style.background = `${C.card}60`; }}
              onMouseLeave={e => { if (active !== i) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ position: "absolute", top: "-10px", right: "20px", fontFamily: F.display, fontSize: "clamp(80px, 12vw, 140px)", fontWeight: 700, color: C.amber, opacity: 0.04, lineHeight: 1, pointerEvents: "none" }}>{p.num}</span>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.amber, letterSpacing: "0.1em" }}>{p.type}</span>
                    <h3 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 42px)", color: C.text, fontWeight: 700, margin: "6px 0 0", fontStyle: "italic", letterSpacing: "-0.01em" }}>{p.title}</h3>
                  </div>
                  <span style={{ fontFamily: F.mono, fontSize: "12px", color: C.textDim, padding: "6px 14px", borderRadius: "999px", border: `1px solid ${C.border}` }}>{p.year}</span>
                </div>

                {active === i && (
                  <div style={{ marginTop: "20px", animation: "fadeSlideIn 0.4s ease forwards" }}>
                    {p.highlight && (
                      <div style={{ padding: "8px 16px", borderRadius: "10px", background: C.amberDim, border: `1px solid ${C.amber}25`, display: "inline-block", marginBottom: "14px" }}>
                        <span style={{ fontFamily: F.body, fontSize: "13px", color: C.amberLight, fontWeight: 500 }}>{p.highlight}</span>
                      </div>
                    )}
                    <p style={{ fontFamily: F.body, fontSize: "15px", color: C.textMuted, lineHeight: 1.7, margin: "0 0 18px", maxWidth: "560px" }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {p.tags.map((t, j) => (
                        <span key={j} style={{ padding: "5px 14px", borderRadius: "999px", border: `1px solid ${C.border}`, background: C.bg, color: C.textMuted, fontSize: "11px", fontFamily: F.mono }}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── ABOUT ───
function About() {
  const [c1, r1] = useCounter(50000, 2000);
  const [c2, r2] = useCounter(30, 1800);
  const [c3, r3] = useCounter(30, 1600);
  const stats = [
    { ref: r1, val: c1.toLocaleString() + "+", label: "Records Engineered" },
    { ref: r2, val: c2 + "+", label: "Students Mentored" },
    { ref: r3, val: c3 + "%", label: "Efficiency Improved" },
  ];

  return (
    <section id="about" style={{ padding: "100px clamp(20px, 5vw, 80px)", background: C.card }}>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 700, color: C.text, lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>
            About Me <span style={{ fontStyle: "italic", color: C.amber }}>/</span>
          </h2>
          <span style={{ fontFamily: F.mono, fontSize: "12px", color: C.textDim, letterSpacing: "0.08em" }}>(THE HUMAN)</span>
        </div>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", marginTop: "40px" }}>
        <FadeIn delay={0.1}>
          <div>
            {/* About photo */}
            <div style={{
              borderRadius: "16px", overflow: "hidden", marginBottom: "28px",
              border: `1px solid ${C.border}`, position: "relative",
              aspectRatio: "16/10",
              background: `linear-gradient(135deg, ${C.card} 0%, ${C.bg} 100%)`,
            }}>
              {/* ──── REPLACE src WITH YOUR 2ND PHOTO ──── */}
              <img
                src="/about-nitish.jpg"
                alt="Nitish working"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%) contrast(1.05)" }}
                onError={e => { e.target.style.display = "none"; }}
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                background: `linear-gradient(to top, ${C.card}DD 0%, transparent 100%)`,
                pointerEvents: "none",
              }} />
              <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.amber, letterSpacing: "0.1em", background: `${C.bg}B0`, padding: "5px 12px", borderRadius: "999px", backdropFilter: "blur(8px)" }}>
                  THE PERSON BEHIND THE CODE
                </span>
              </div>
            </div>

            <p style={{ fontFamily: F.display, fontSize: "clamp(22px, 3vw, 30px)", color: C.text, fontWeight: 600, fontStyle: "italic", lineHeight: 1.4, margin: "0 0 24px" }}>
              "I'm a software engineer driven by a passion for turning complexity into clarity — and raw data into real decisions."
            </p>
            <p style={{ fontFamily: F.body, fontSize: "15px", color: C.textMuted, lineHeight: 1.75, margin: "0 0 16px" }}>
              I'm Nitish Madhavan. I grew up in Bengaluru, earned my M.Tech from VIT Vellore, and moved to Brisbane to pursue my Master's at the University of Queensland. That journey — across cultures, continents, and codebases — shaped how I think about building things.
            </p>
            <p style={{ fontFamily: F.body, fontSize: "15px", color: C.textMuted, lineHeight: 1.75, margin: 0 }}>
              At <span style={{ color: C.text, fontWeight: 500 }}>Lentra.AI</span>, I built CDC pipelines handling 50K+ records and won the High Five Award.
              At <span style={{ color: C.text, fontWeight: 500 }}>Audima Labs</span>, I shipped a desktop app solo — from first commit to production.
              But what I'm most proud of is <span style={{ color: C.amber }}>mentoring 30+ students at UQ</span>,
              because I remember what it's like to arrive somewhere new and feel completely lost.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ padding: "28px", borderRadius: "16px", border: `1px solid ${C.border}`, background: C.bg }}>
              <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.amber, letterSpacing: "0.1em" }}>MY PHILOSOPHY</span>
              <p style={{ fontFamily: F.display, fontSize: "20px", fontStyle: "italic", color: C.text, margin: "12px 0 0", lineHeight: 1.5 }}>
                AI can write code. It can't build trust.<br />
                It can't mentor a scared first-year student.<br />
                It can't carry the weight of cross-cultural empathy.<br />
                <span style={{ color: C.amber }}>That's where I live.</span>
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {stats.map((s, i) => (
                <div key={i} ref={s.ref} style={{ padding: "20px 16px", borderRadius: "12px", textAlign: "center", border: `1px solid ${C.border}`, background: C.bg }}>
                  <div style={{ fontFamily: F.display, fontSize: "28px", color: C.amber, fontWeight: 700 }}>{s.val}</div>
                  <div style={{ fontFamily: F.mono, fontSize: "10px", color: C.textDim, letterSpacing: "0.06em", marginTop: "6px", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: "20px 24px", borderRadius: "12px", border: `1px solid ${C.border}`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.amber, letterSpacing: "0.08em" }}>TIMEZONE</span>
                <p style={{ fontFamily: F.body, fontSize: "14px", color: C.textMuted, margin: "6px 0 0" }}>Based in Australia, from India</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ fontSize: "24px" }}>🇦🇺</span>
                <span style={{ fontSize: "24px" }}>🇮🇳</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── EDUCATION ───
function Education() {
  const edu = [
    { flag: "🇦🇺", school: "University of Queensland", degree: "Master of CS (Management)", period: "2024 – 2026", loc: "Brisbane, AU" },
    { flag: "🇮🇳", school: "VIT Vellore", degree: "M.Tech CS & Engineering (Integrated)", period: "2019 – 2024", loc: "Vellore, IN", extra: "CGPA: 8.22/10" },
  ];

  return (
    <section style={{ padding: "80px clamp(20px, 5vw, 80px)" }}>
      <FadeIn>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: C.text, lineHeight: 1, margin: "0 0 40px", letterSpacing: "-0.02em" }}>
          Education <span style={{ fontStyle: "italic", color: C.amber }}>/</span>
        </h2>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {edu.map((e, i) => (
          <FadeIn key={i} delay={i * 0.12}>
            <div style={{ padding: "28px", borderRadius: "16px", border: `1px solid ${C.border}`, background: C.card, transition: "border-color 0.3s" }}
              onMouseEnter={ev => ev.currentTarget.style.borderColor = `${C.amber}40`}
              onMouseLeave={ev => ev.currentTarget.style.borderColor = C.border}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ fontSize: "28px" }}>{e.flag}</span>
                <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.textDim, padding: "4px 12px", borderRadius: "999px", border: `1px solid ${C.border}` }}>{e.period}</span>
              </div>
              <h3 style={{ fontFamily: F.body, fontSize: "18px", color: C.text, fontWeight: 600, margin: "0 0 4px" }}>{e.school}</h3>
              <p style={{ fontFamily: F.body, fontSize: "14px", color: C.amber, margin: "0 0 4px" }}>{e.degree}</p>
              <p style={{ fontFamily: F.mono, fontSize: "11px", color: C.textDim, margin: 0 }}>{e.loc}{e.extra ? ` · ${e.extra}` : ""}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── VALUES ───
function Values() {
  const values = [
    { icon: "🤝", title: "People Over Pipelines", text: "Technology is a tool. The people using it are what matter. I've mentored 30+ students because empathy isn't optional." },
    { icon: "🧭", title: "Full Ownership", text: "I don't wait to be told. At Audima Labs, I owned a product end-to-end. I see gaps and I fill them." },
    { icon: "🌏", title: "Cross-Cultural Mind", text: "India → Australia. I communicate across cultures, navigate ambiguity, and bring perspective that's lived, not learned." },
    { icon: "⚡", title: "Systems Over Scripts", text: "I think in systems — data architectures, team workflows, mentorship programs. Anyone can write a script. I design what endures." },
  ];

  return (
    <section style={{ padding: "80px clamp(20px, 5vw, 80px)" }}>
      <FadeIn>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: C.text, lineHeight: 1, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
          What I Stand For <span style={{ fontStyle: "italic", color: C.amber }}>/</span>
        </h2>
        <p style={{ fontFamily: F.body, fontSize: "15px", color: C.textMuted, maxWidth: "480px", lineHeight: 1.7, margin: "0 0 40px" }}>
          These are the things that make me valuable — and none of them can be automated.
        </p>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
        {values.map((v, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div style={{
              padding: "28px", borderRadius: "16px", border: `1px solid ${C.border}`,
              background: C.card, transition: "border-color 0.3s, transform 0.3s",
              cursor: "default", height: "100%",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.amber}40`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; }}
            >
              <span style={{ fontSize: "28px", display: "block", marginBottom: "14px" }}>{v.icon}</span>
              <h3 style={{ fontFamily: F.body, fontSize: "17px", color: C.text, fontWeight: 600, margin: "0 0 8px" }}>{v.title}</h3>
              <p style={{ fontFamily: F.body, fontSize: "13px", color: C.textMuted, lineHeight: 1.7, margin: 0 }}>{v.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ───
function Contact() {
  return (
    <section id="contact" style={{ padding: "120px clamp(20px, 5vw, 80px) 80px", textAlign: "center", position: "relative" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "500px", height: "500px", background: `radial-gradient(circle, ${C.amber}0A 0%, transparent 60%)`, pointerEvents: "none" }} />

      <FadeIn>
        <span style={{ fontFamily: F.display, fontSize: "56px", color: C.amber, fontStyle: "italic", display: "block", marginBottom: "24px", opacity: 0.7 }}>✦</span>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px, 7vw, 72px)", fontWeight: 700, color: C.text, lineHeight: 1.05, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
          Let's Make It<br /><span style={{ fontStyle: "italic", color: C.amber }}>Happen.</span>
        </h2>
        <p style={{ fontFamily: F.body, fontSize: "16px", color: C.textMuted, maxWidth: "440px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Whether it's a data pipeline, a product idea, or just a conversation about what it means to build with intention — I'm in.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <a href="mailto:nitishrmadhavan@gmail.com" style={{
          display: "inline-block", padding: "16px 40px", borderRadius: "999px",
          background: C.amber, color: C.bg, textDecoration: "none",
          fontFamily: F.body, fontWeight: 600, fontSize: "15px",
          transition: "transform 0.25s, box-shadow 0.25s",
        }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 12px 40px ${C.amber}35`; }}
          onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
        >nitishrmadhavan@gmail.com</a>

        <div style={{ display: "flex", gap: "28px", justifyContent: "center", marginTop: "32px" }}>
          {[
            { label: "LinkedIn", url: "https://linkedin.com/in/nitishrmadhavan" },
            { label: "GitHub", url: "https://github.com/nitishrmadhavan" },
          ].map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{
              color: C.textDim, textDecoration: "none", fontFamily: F.mono,
              fontSize: "13px", letterSpacing: "0.05em", transition: "color 0.25s",
            }}
              onMouseEnter={e => e.target.style.color = C.amber}
              onMouseLeave={e => e.target.style.color = C.textDim}
            >{l.label} ↗</a>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer style={{
      padding: "28px clamp(20px, 5vw, 80px)", borderTop: `1px solid ${C.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",
    }}>
      <span style={{ fontFamily: F.mono, fontSize: "11px", color: C.textDim, letterSpacing: "0.04em" }}>© 2026 NITISH MADHAVAN</span>
      <span style={{ fontFamily: F.mono, fontSize: "11px", color: `${C.textDim}80`, letterSpacing: "0.04em" }}>DESIGNED TO BE HUMAN IN AN AI WORLD.</span>
    </footer>
  );
}

// ─── MAIN ───
export default function Portfolio() {
  useEffect(() => { document.title = "Who's Nitish?"; }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; color: ${C.text}; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

        ::selection { background: ${C.amber}35; color: ${C.text}; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.amber}30; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.amber}50; }

        @keyframes scrollBanner {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollBannerR {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-mobile { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-photo-wrap { width: 100% !important; max-width: 320px !important; margin: 32px auto 0 !important; order: -1 !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }

        body::before {
          content: '';
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.4;
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.bg, position: "relative", zIndex: 1 }}>
        <Nav />
        <Hero />
        <TechStack />
        <Services />
        <ScrollBanner text="DATA ENGINEER — SOFTWARE DEVELOPER — MENTOR — BUILDER" speed={30} />
        <Projects />
        <About />
        <ScrollBanner text="IRREPLACEABLY HUMAN" speed={35} outlined />
        <Education />
        <Values />
        <Contact />
        <Footer />
      </div>
    </>
  );
}