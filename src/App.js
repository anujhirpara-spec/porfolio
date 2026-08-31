import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Anuj Hirpara — UI/UX Designer Portfolio
 * React single-file component, mobile-first responsive.
 * Contact form sends via EmailJS REST API (no external script needed).
 */

const EMAILJS_PUBLIC_KEY = "Gh85-Gl-Uj10Q9Em9";
const EMAILJS_SERVICE_ID = "service_r37ckyw";
const EMAILJS_TEMPLATE_ID = "template_wtjp7im";

const SKILLS = [
  {
    name: "Figma",
    desc: "High-fidelity prototypes, component libraries, and auto-layout mastery. Production-ready screens with full interaction flows.",
    bar: 90,
    icon: (
      <svg width="22" height="22" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 28.5C19 23.25 23.25 19 28.5 19C33.75 19 38 23.25 38 28.5C38 33.75 33.75 38 28.5 38C23.25 38 19 33.75 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.25 4.25 38 9.5 38H19V47.5C19 52.75 14.75 57 9.5 57C4.25 57 0 52.75 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.75 19 38 14.75 38 9.5C38 4.25 33.75 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.75 4.25 19 9.5 19H19V0H9.5C4.25 0 0 4.25 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.75 4.25 38 9.5 38H19V19H9.5C4.25 19 0 23.25 0 28.5Z" fill="#FF7262"/>
      </svg>
    ),
  },
  {
    name: "Adobe XD",
    desc: "Creating responsive designs and interactive prototypes using Adobe XD with smooth animations and design specs for developers.",
    bar: 72,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#FF61F6"/>
        <path d="M13.5 16H11.9l-.9-2.4H7.7L6.8 16H5.2l3.3-8.8h1.7L13.5 16zm-3-3.6-1.3-3.5L8 12.4h2.5zM14.4 16V7.2h1.5v3.4c.2-.2.5-.4.7-.5.3-.1.6-.2.9-.2.4 0 .7.1 1 .2.3.1.5.3.7.6.2.2.4.5.5.9.1.3.2.7.2 1.1 0 .4-.1.8-.2 1.2-.1.3-.3.6-.5.9-.2.2-.5.4-.8.6-.3.1-.6.2-1 .2-.3 0-.6-.1-.9-.2a1.9 1.9 0 0 1-.7-.5L15.7 16h-1.3z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Adobe Illustrator",
    desc: "Vector graphics, icon design, and brand identity creation. Crafting scalable visuals and illustrations for digital products.",
    bar: 68,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#FF9A00"/>
        <path d="M8.4 14.8L7.6 17H6l3.2-9h1.8l3.2 9h-1.65l-.8-2.2H8.4zm1.6-4.4L8.85 13.6h2.3L10 10.4zM15.5 17v-6h1.4v1c.2-.4.4-.6.7-.8.3-.2.6-.3 1-.3h.3v1.4a2 2 0 0 0-.3 0c-.3 0-.6.1-.9.3-.2.2-.4.5-.5.8V17h-1.4z" fill="white"/>
      </svg>
    ),
  },
  { name: "UX Research", desc: "Understanding users through observation, interviews, and usability testing. Using insights to validate and refine design decisions.", bar: 75, icon: "🔍" },
  { name: "Wireframing", desc: "Rapid sketching and digital wireframes to map out user journeys before investing in high-fidelity visuals.", bar: 85, icon: "📐" },
  { name: "User Journey Mapping", desc: "Mapping user experiences to identify friction points and opportunities to delight users across every touchpoint.", bar: 80, icon: "🗺️" },
  { name: "Accessibility & Hierarchy", desc: "Designing with accessibility, consistency, and visual hierarchy at the core — ensuring every user navigates with ease.", bar: 78, icon: "♿" },
  { name: "Communication", desc: "Presenting design rationale clearly to stakeholders and collaborating with cross-functional teams throughout the product lifecycle.", bar: 82, icon: "🤝" },
];

const FIGMA_ICON = (
  <svg width="22" height="22" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 28.5C19 23.25 23.25 19 28.5 19C33.75 19 38 23.25 38 28.5C38 33.75 33.75 38 28.5 38C23.25 38 19 33.75 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.25 4.25 38 9.5 38H19V47.5C19 52.75 14.75 57 9.5 57C4.25 57 0 52.75 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.75 19 38 14.75 38 9.5C38 4.25 33.75 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.75 4.25 19 9.5 19H19V0H9.5C4.25 0 0 4.25 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.75 4.25 38 9.5 38H19V19H9.5C4.25 19 0 23.25 0 28.5Z" fill="#FF7262"/>
  </svg>
);

const WORK_ITEMS = [
  {
    href: "https://www.figma.com/design/gG9WIg5AY2rGBXNvqEg5wi/Uxce1",
    icon: FIGMA_ICON,
    tag: "Figma",
    title: "Uxce1 — Mobile App UI",
    desc: "Complete mobile app UI/UX flow covering onboarding, authentication, user preferences, and dashboard setup. View the full design on Figma.",
    cta: "View on Figma ↗",
  },
  {
    href: "https://www.behance.net/gallery/254544891/Laozi-wallet",
    icon: "👛",
    tag: "Behance",
    title: "Laozi — Leather Wallet E-Commerce",
    desc: "A minimal e-commerce landing page for a premium leather wallet brand, designed to feel as crafted and trustworthy as the product itself.",
    cta: "View on Behance ↗",
  },
  {
    href: "https://www.linkedin.com/in/anuj-hirpara-2b58432a6",
    icon: "💼",
    tag: "LinkedIn",
    title: "Professional Profile",
    desc: "Connect with me on LinkedIn to explore my professional journey, education, certifications, and design-related activity.",
    cta: "View Profile ↗",
  },
  {
    href: "https://www.figma.com/design/gG9WIg5AY2rGBXNvqEg5wi/Uxce1",
    icon: "📱",
    tag: "Case Study",
    title: "Mobile App Redesign",
    desc: "A complete UX overhaul — login/signup flows, interest selection, goal-setting screens, and step-by-step user journey mapping to reduce friction.",
    cta: "View Project ↗",
  },
];

const CERTS = [
  {
    href: "https://www.udemy.com/certificate/UC-5ad0120d-a855-4322-bf23-7f50e398f311/",
    icon: "🏆",
    title: "Complete UI/UX Design Course 2025",
    meta: "Figma + AI + Real Project · Udemy",
  },
  {
    href: "https://www.udemy.com/certificate/UC-6afc184d-bb86-406b-9c4b-547085aa6706/",
    icon: "🎨",
    title: "Figma UI UX Design Essentials",
    meta: "Core Figma skills · Professional Certification",
  },
  {
    href: "https://www.linkedin.com/in/anuj-hirpara-2b58432a6",
    icon: "🔗",
    title: "LinkedIn Profile",
    meta: "linkedin.com/in/anuj-hirpara",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `all 0.65s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function AnujPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", error: "" }); // idle | sending | sent

  const sectionRefs = {
    home: useRef(null),
    work: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    contact: useRef(null),
  };

  const scrollToSection = useCallback((id) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const { name, email, message } = form;
    if (!name.trim()) return "Please enter your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid email address.";
    if (!message.trim()) return "Please write a message.";
    return "";
  };

  const sendMessage = async () => {
    const err = validate();
    if (err) {
      setStatus({ state: "idle", error: err });
      return;
    }
    setStatus({ state: "sending", error: "" });
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            name: form.name,
            email: form.email,
            message: form.message,
            from_name: form.name,
            from_email: form.email,
            reply_to: form.email,
          },
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus({ state: "sent", error: "" });
    } catch {
      setStatus({
        state: "idle",
        error: "Failed to send. Please email directly: anujhirpara@gmail.com",
      });
    }
  };

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <a
          href="javascript:void(0)"
          onClick={() => scrollToSection("home")}
          style={styles.navLogo}
        >
          Anuj <span style={{ color: "var(--accent)" }}>Hirpara</span>
        </a>

        <ul style={styles.navLinks} className="nav-links-desktop">
          {["work", "about", "skills", "contact"].map((id) => (
            <li key={id}>
              <a onClick={() => scrollToSection(id)} style={styles.navLink} className="nav-link">
                {id}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            onClick={() => scrollToSection("contact")}
            style={styles.btnHire}
            className="btn-hire nav-hire-desktop"
          >
            Hire Me
          </a>
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
            style={styles.hamburger}
            className="hamburger-btn"
          >
            <span style={{
              ...styles.hamburgerSpan,
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }} />
            <span style={{ ...styles.hamburgerSpan, opacity: menuOpen ? 0 : 1 }} />
            <span style={{
              ...styles.hamburgerSpan,
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        style={{
          ...styles.mobileMenu,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
        }}
        className="mobile-menu"
      >
        {["work", "about", "skills", "contact"].map((id) => (
          <a key={id} onClick={() => scrollToSection(id)} style={styles.mobileMenuLink}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
        <a onClick={() => scrollToSection("contact")} style={{ ...styles.btnHire, fontSize: 14, padding: "13px 36px" }}>
          Hire Me
        </a>
      </div>

      {/* HERO */}
      <section ref={sectionRefs.home} id="home" style={styles.hero} className="hero">
        <div style={styles.heroBgGlow} />
        <div style={styles.heroGrid} className="hero-grid">
          <div>
            <h1 style={styles.heroName} className="hero-name">
              Anuj
              <br />
              <span style={styles.outline}>Hirpara</span>
            </h1>
            <p style={styles.heroDesc} className="hero-desc">
              Aspiring UI/UX Designer with a background in Computer Engineering. I
              specialise in creating user-centred digital experiences through
              research, wireframing, and high-fidelity prototyping in Figma.
              Currently seeking an internship where I can contribute to
              meaningful product design.
            </p>
            <div style={styles.heroCta} className="hero-cta">
              <a onClick={() => scrollToSection("contact")} style={styles.btnPrimary} className="btn-primary">
                Let's Connect
              </a>
              <a onClick={() => scrollToSection("work")} style={styles.btnGhost} className="btn-ghost">
                See My Work <span>→</span>
              </a>
            </div>
          </div>

          <div>
            <div style={styles.heroCard} className="hero-card">
              <div style={styles.heroCardTop} />
              <p style={styles.heroCardLabel}>At a Glance</p>
              <div style={styles.statGrid}>
                <div>
                  <div style={styles.statNum}>3+</div>
                  <div style={styles.statLabel}>Projects Designed</div>
                </div>
                <div>
                  <div style={styles.statNum}>2</div>
                  <div style={styles.statLabel}>Certificates Earned</div>
                </div>
                <div>
                  <div style={styles.statNum}>7.62</div>
                  <div style={styles.statLabel}>CGPI</div>
                </div>
              </div>
              <div style={styles.heroDivider} />
              <div style={styles.chips}>
                {["Figma", "Adobe XD", "Wireframing", "Prototyping", "UX Research"].map((c) => (
                  <span key={c} style={styles.chip} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={styles.marqueeWrap}>
        <div style={styles.marqueeTrack} className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex", gap: 56 }}>
              {[
                "UI Design", "UX Research", "Figma", "Adobe XD", "Wireframing",
                "Prototyping", "Interaction Design", "Visual Hierarchy", "User-Centred Design",
              ].map((t) => (
                <div key={t} style={styles.marqueeItem}>
                  <span style={styles.marqueeDot} />
                  {t}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WORK */}
      <section ref={sectionRefs.work} id="work" style={{ ...styles.section, background: "var(--surface)" }} className="section">
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>Selected Work</div>
          <h2 style={styles.sectionTitle} className="section-title">
            My <span style={styles.outline}>Projects</span>
          </h2>
          <div style={styles.workGrid} className="work-grid">
            {WORK_ITEMS.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.workCard}
                  className="work-card"
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={styles.workIcon}>{w.icon}</div>
                    <span style={styles.workTag}>{w.tag}</span>
                  </div>
                  <div>
                    <div style={styles.workTitle}>{w.title}</div>
                    <div style={styles.workDesc}>{w.desc}</div>
                  </div>
                  <div style={styles.workLink} className="work-link">{w.cta}</div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={sectionRefs.about} id="about" style={styles.section} className="section">
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>Who I Am</div>
          <h2 style={styles.sectionTitle} className="section-title">
            Designing with <span style={styles.outline}>Purpose</span>
          </h2>
          <div style={styles.aboutGrid} className="about-grid">
            <Reveal>
              <h3 style={styles.aboutSubtitle}>Background &amp; Education</h3>
              <p style={styles.aboutBody}>
                I'm a Computer Engineering student at V.V.P. Engineering
                College, Rajkot, graduating in 2026. My engineering foundation
                blends with a deep passion for design — I believe the best
                digital products live at the intersection of logic and
                empathy.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  ["📍", "Location:", "Rajkot, Gujarat"],
                  ["🎓", "Degree:", "B.E. Computer Engineering — CGPI 7.62"],
                  ["📞", "Phone:", "+91 9723643508"],
                ].map(([icon, label, val]) => (
                  <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={styles.aboutDetailIcon}>{icon}</div>
                    <div style={styles.aboutDetailText}>
                      <strong style={{ color: "var(--text)", fontWeight: 500 }}>{label}</strong> {val}
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={styles.aboutDetailIcon}>✉️</div>
                  <div style={styles.aboutDetailText}>
                    <strong style={{ color: "var(--text)", fontWeight: 500 }}>Email:</strong>{" "}
                    <a href="mailto:anujhirpara@gmail.com" style={{ color: "var(--accent)", textDecoration: "none", wordBreak: "break-all" }}>
                      anujhirpara@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h3 style={styles.aboutSubtitle}>Certificates</h3>
              {CERTS.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.certCard}
                  className="cert-card"
                >
                  <div style={styles.certIcon}>{c.icon}</div>
                  <div>
                    <div style={styles.certTitle}>{c.title}</div>
                    <div style={styles.certMeta}>
                      {c.meta} <span style={{ color: "var(--accent)" }}>View ↗</span>
                    </div>
                  </div>
                </a>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section ref={sectionRefs.skills} id="skills" style={{ ...styles.section, background: "var(--surface)" }} className="section">
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>What I Bring</div>
          <h2 style={styles.sectionTitle} className="section-title">
            Skills &amp; <span style={styles.outline}>Expertise</span>
          </h2>
          <div style={styles.skillsGrid} className="skills-grid">
            {SKILLS.map((s, i) => (
              <Reveal key={s.name} delay={(i % 4) * 60}>
                <div style={styles.skillCard} className="skill-card">
                  <div style={styles.skillIconWrap}>{s.icon}</div>
                  <div style={styles.skillName}>{s.name}</div>
                  <div style={styles.skillDesc}>{s.desc}</div>
                  <div style={styles.skillBarWrap}>
                    <div style={{ ...styles.skillBar, width: `${s.bar}%` }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section ref={sectionRefs.contact} id="contact" style={styles.section} className="section">
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>Get In Touch</div>
          <h2 style={styles.sectionTitle} className="section-title">
            Let's Work
            <br />
            <span style={styles.outline}>Together</span>
          </h2>
          <div style={styles.contactGrid} className="contact-grid">
            <Reveal>
              <div style={styles.contactBig} className="contact-big">
                Have an
                <br />
                <em style={{ fontStyle: "normal", color: "transparent", WebkitTextStroke: "1.5px var(--accent)" }}>
                  idea?
                </em>
                <br />
                Tell me.
              </div>
              <p style={styles.contactDesc}>
                I'm actively seeking internship opportunities where I can
                apply my UI/UX skills and grow alongside a passionate product
                team. Let's create something meaningful.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="mailto:anujhirpara@gmail.com" style={styles.contactItem} className="contact-item">
                  <div style={styles.ciIcon}>✉️</div>
                  <div>
                    <span style={styles.ciLabel}>Email</span>
                    <span style={styles.ciValue}>anujhirpara@gmail.com</span>
                  </div>
                </a>
                <a href="tel:+919723643508" style={styles.contactItem} className="contact-item">
                  <div style={styles.ciIcon}>📞</div>
                  <div>
                    <span style={styles.ciLabel}>Phone</span>
                    <span style={styles.ciValue}>+91 9723643508</span>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/anuj-hirpara-2b58432a6"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.contactItem}
                  className="contact-item"
                >
                  <div style={styles.ciIcon}>💼</div>
                  <div>
                    <span style={styles.ciLabel}>LinkedIn</span>
                    <span style={styles.ciValue}>anuj-hirpara ↗</span>
                  </div>
                </a>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div style={styles.contactForm} className="contact-form">
                <h3 style={styles.contactFormH3}>Send a Message</h3>

                {status.state !== "sent" ? (
                  <>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Your Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        autoComplete="off"
                        value={form.name}
                        onChange={handleChange("name")}
                        style={styles.formInput}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Email Address</label>
                      <input
                        type="email"
                        placeholder="hello@example.com"
                        autoComplete="off"
                        value={form.email}
                        onChange={handleChange("email")}
                        style={styles.formInput}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Message</label>
                      <textarea
                        placeholder="Tell me about your project or opportunity…"
                        value={form.message}
                        onChange={handleChange("message")}
                        style={{ ...styles.formInput, height: 110, resize: "none" }}
                      />
                    </div>
                    {status.error && (
                      <div style={styles.formError}>{status.error}</div>
                    )}
                    <button
                      type="button"
                      onClick={sendMessage}
                      disabled={status.state === "sending"}
                      style={{
                        ...styles.formBtn,
                        opacity: status.state === "sending" ? 0.7 : 1,
                      }}
                      className="form-btn"
                    >
                      {status.state === "sending" ? "Sending…" : "Send Message →"}
                    </button>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                    <p style={{ fontSize: 15, color: "var(--muted2)", lineHeight: 1.6 }}>
                      <strong style={{ color: "var(--text)" }}>Message sent!</strong>
                      <br />
                      Thanks for reaching out. Anuj will get back to you soon.
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer} className="footer">
        <a href="javascript:void(0)" onClick={() => scrollToSection("home")} style={styles.footerLogo}>
          Anuj <span style={{ color: "var(--accent)" }}>Hirpara</span>
        </a>
        <p style={styles.footerP}>© 2025 Anuj Hirpara. Crafted with intention.</p>
        <p style={styles.footerP}>UI/UX Designer · Rajkot, Gujarat</p>
      </footer>
    </div>
  );
}

/* ─────────────────────────  Inline style objects (shared / structural)  ───────────────────────── */

const styles = {
  page: {
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    overflowX: "hidden",
    lineHeight: 1.6,
    minHeight: "100vh",
  },
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
    height: "var(--nav-h)", display: "flex", alignItems: "center",
    justifyContent: "space-between", padding: "0 60px",
    background: "rgba(13,13,18,0.92)", backdropFilter: "blur(20px)",
    borderBottom: "1px solid var(--border)",
  },
  navLogo: {
    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
    fontSize: 20, color: "var(--text)", textDecoration: "none", cursor: "pointer",
  },
  navLinks: { display: "flex", gap: 36, listStyle: "none" },
  navLink: {
    fontSize: 13, letterSpacing: "0.07em", textTransform: "uppercase",
    color: "var(--muted2)", textDecoration: "none", fontWeight: 500, cursor: "pointer",
  },
  btnHire: {
    background: "var(--accent)", color: "#fff", padding: "9px 22px",
    borderRadius: 6, fontSize: 12, fontWeight: 600, letterSpacing: "0.07em",
    textTransform: "uppercase", textDecoration: "none", cursor: "pointer", display: "inline-block",
  },
  hamburger: {
    display: "none", flexDirection: "column", gap: 5, cursor: "pointer",
    padding: 4, background: "none", border: "none",
  },
  hamburgerSpan: {
    display: "block", width: 24, height: 2, background: "var(--text)",
    borderRadius: 2, transition: "all 0.3s ease",
  },
  mobileMenu: {
    display: "none", position: "fixed", inset: 0, top: "var(--nav-h)",
    background: "rgba(13,13,18,0.97)", backdropFilter: "blur(20px)", zIndex: 190,
    flexDirection: "column", alignItems: "center", justifyContent: "center",
    gap: 40, transition: "opacity 0.3s ease",
  },
  mobileMenuLink: {
    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 700,
    color: "var(--muted2)", textDecoration: "none", cursor: "pointer",
  },
  hero: {
    minHeight: "100vh", display: "flex", alignItems: "center",
    padding: "calc(var(--nav-h) + 60px) 60px 80px", position: "relative", overflow: "hidden",
  },
  heroBgGlow: {
    content: "''", position: "absolute", top: -100, left: -200, width: 700, height: 700,
    background: "radial-gradient(circle, rgba(232,71,10,0.07) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroGrid: {
    display: "grid", gridTemplateColumns: "1fr 420px", gap: 64, alignItems: "center",
    width: "100%", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1,
  },
  heroName: {
    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(48px, 6.5vw, 88px)",
    fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, paddingBottom: 4,
  },
  outline: { color: "transparent", WebkitTextStroke: "1.5px rgba(238,234,228,0.6)" },
  heroDesc: { marginTop: 24, fontSize: 17, lineHeight: 1.8, color: "var(--muted2)", maxWidth: 480 },
  heroCta: { marginTop: 40, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" },
  btnPrimary: {
    background: "var(--accent)", color: "#fff", padding: "13px 30px", borderRadius: 6,
    fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
    textDecoration: "none", cursor: "pointer", display: "inline-block",
  },
  btnGhost: {
    color: "var(--muted2)", fontSize: 13, fontWeight: 500, letterSpacing: "0.06em",
    textTransform: "uppercase", textDecoration: "none", display: "inline-flex",
    alignItems: "center", gap: 6, border: "1px solid var(--border)", padding: "12px 20px",
    borderRadius: 6, cursor: "pointer",
  },
  heroCard: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 36 },
  heroCardTop: {
    height: 3, background: "linear-gradient(90deg, var(--accent), var(--accent2))",
    borderRadius: "var(--radius) var(--radius) 0 0", margin: "-1px -1px 0",
  },
  heroCardLabel: { fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24, marginTop: 28 },
  statGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 },
  statNum: {
    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: -1,
    background: "linear-gradient(135deg, var(--accent), var(--accent2))",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  },
  statLabel: { fontSize: 12, color: "var(--muted)", marginTop: 2 },
  heroDivider: { height: 1, background: "var(--border)", marginBottom: 24 },
  chips: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: { fontSize: 12, padding: "5px 13px", border: "1px solid var(--border)", borderRadius: 100, color: "var(--muted2)" },
  marqueeWrap: {
    overflow: "hidden", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
    padding: "16px 0", background: "var(--surface)",
  },
  marqueeTrack: { display: "flex", gap: 56, whiteSpace: "nowrap" },
  marqueeItem: {
    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700,
    letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)",
    display: "flex", alignItems: "center", gap: 18,
  },
  marqueeDot: { width: 4, height: 4, background: "var(--accent)", borderRadius: "50%", flexShrink: 0 },
  section: { padding: "96px 60px" },
  sectionInner: { maxWidth: 1200, margin: "0 auto" },
  sectionLabel: { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14, fontWeight: 500 },
  sectionTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(32px, 4.5vw, 54px)",
    fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.07,
  },
  workGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24, marginTop: 52 },
  workCard: {
    background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)",
    padding: "36px 32px", minHeight: 280, textDecoration: "none", color: "var(--text)", display: "flex",
    flexDirection: "column", gap: 16, position: "relative", overflow: "hidden",
  },
  workIcon: {
    width: 48, height: 48, borderRadius: 10, background: "var(--accent-soft)",
    border: "1px solid rgba(232,71,10,0.15)", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: 22,
  },
  workTitle: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 700 },
  workDesc: { fontSize: 14, color: "var(--muted2)", lineHeight: 1.65, flex: 1 },
  workLink: { fontSize: 12, color: "var(--accent)", display: "flex", alignItems: "center", gap: 6, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" },
  workTag: {
    display: "inline-flex", alignItems: "center", fontSize: 11, padding: "4px 10px",
    borderRadius: 100, background: "rgba(245,166,35,0.1)", color: "var(--accent2)",
    border: "1px solid rgba(245,166,35,0.2)", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 500,
  },
  aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, marginTop: 52, alignItems: "start" },
  aboutSubtitle: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 18 },
  aboutBody: { fontSize: 15, lineHeight: 1.8, color: "var(--muted2)", marginBottom: 32 },
  aboutDetailIcon: {
    width: 28, height: 28, background: "var(--accent-soft)", borderRadius: 6,
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0,
  },
  aboutDetailText: { fontSize: 14, color: "var(--muted2)", lineHeight: 1.5 },
  certCard: {
    background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)",
    padding: "22px 24px", marginBottom: 14, display: "flex", gap: 16, alignItems: "flex-start",
    textDecoration: "none", color: "inherit",
  },
  certIcon: {
    width: 40, height: 40, background: "var(--accent-soft)", borderRadius: 8,
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0,
  },
  certTitle: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 4 },
  certMeta: { fontSize: 12, color: "var(--muted)" },
  skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginTop: 52 },
  skillCard: {
    background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)",
    padding: 28, position: "relative", overflow: "hidden",
  },
  skillIconWrap: {
    width: 44, height: 44, borderRadius: 10, background: "var(--accent-soft)",
    border: "1px solid rgba(232,71,10,0.12)", display: "flex", alignItems: "center",
    justifyContent: "center", marginBottom: 16, fontSize: 22,
  },
  skillName: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 8 },
  skillDesc: { fontSize: 13, color: "var(--muted2)", lineHeight: 1.6 },
  skillBarWrap: { marginTop: 18, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" },
  skillBar: { height: "100%", background: "linear-gradient(90deg, var(--accent), var(--accent2))", borderRadius: 2 },
  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, marginTop: 52, alignItems: "start" },
  contactBig: {
    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(36px, 4.5vw, 64px)",
    fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginBottom: 20,
  },
  contactDesc: { fontSize: 15, color: "var(--muted2)", lineHeight: 1.75, maxWidth: 360, marginBottom: 36 },
  contactItem: {
    display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "var(--text)",
    padding: "14px 18px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10,
  },
  ciIcon: {
    width: 34, height: 34, background: "var(--accent-soft)", borderRadius: 7,
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0,
  },
  ciLabel: { fontSize: 10, color: "var(--muted)", display: "block", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 1 },
  ciValue: { fontSize: 13, color: "var(--text)", fontWeight: 500 },
  contactForm: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 36 },
  contactFormH3: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 24 },
  formGroup: { marginBottom: 18 },
  formLabel: { display: "block", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8, fontWeight: 500 },
  formInput: {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)",
    borderRadius: 8, padding: "13px 16px", color: "var(--text)", fontFamily: "'DM Sans', sans-serif",
    fontSize: 14, outline: "none", boxSizing: "border-box",
  },
  formError: {
    color: "#ff6b6b", fontSize: 13, marginBottom: 14, padding: "10px 14px",
    background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.2)", borderRadius: 8,
  },
  formBtn: {
    width: "100%", background: "var(--accent)", color: "#fff", border: "none", padding: 14,
    borderRadius: 8, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
  },
  footer: {
    borderTop: "1px solid var(--border)", padding: "28px 60px", display: "flex",
    justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
  },
  footerLogo: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 18, textDecoration: "none", color: "var(--text)", cursor: "pointer" },
  footerP: { fontSize: 12, color: "var(--muted)" },
};

/* ─────────────────────────  Global CSS: variables, fonts, hover, responsive  ───────────────────────── */

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --bg: #0d0d12;
    --surface: #13131a;
    --card: #18181f;
    --accent: #e8470a;
    --accent2: #f5a623;
    --accent-soft: rgba(232,71,10,0.1);
    --text: #eeeae4;
    --muted: #6b6b7e;
    --muted2: #9494a8;
    --border: rgba(255,255,255,0.06);
    --border-hover: rgba(232,71,10,0.25);
    --radius: 12px;
    --nav-h: 70px;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  .nav-link:hover { color: var(--text) !important; }
  .btn-hire:hover, .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn-ghost:hover { color: var(--text) !important; border-color: rgba(255,255,255,0.15) !important; }
  .chip:hover { border-color: var(--border-hover) !important; color: var(--accent) !important; }
  .work-card:hover, .skill-card:hover { border-color: var(--border-hover) !important; transform: translateY(-4px); }
  .cert-card:hover { border-color: var(--border-hover) !important; transform: translateX(4px); }
  .contact-item:hover { border-color: var(--border-hover) !important; transform: translateX(4px); }
  .work-card, .skill-card, .cert-card, .contact-item { transition: all 0.25s ease; }
  .form-btn:hover { opacity: 0.88; }

  .marquee-track { animation: marquee 22s linear infinite; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* ── MOBILE RESPONSIVE ── */
  @media (max-width: 1024px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
  }

  @media (max-width: 768px) {
    nav { padding: 0 20px !important; }
    .nav-links-desktop { display: none !important; }
    .nav-hire-desktop { display: none !important; }
    .hamburger-btn { display: flex !important; }
    .mobile-menu { display: flex !important; }

    .hero { padding: calc(var(--nav-h) + 36px) 20px 60px !important; min-height: auto !important; }
    .hero-name { font-size: clamp(40px, 11vw, 64px) !important; letter-spacing: -1.5px !important; }
    .hero-desc { font-size: 16px !important; }
    .hero-cta { flex-direction: column !important; align-items: stretch !important; }
    .hero-cta a { text-align: center !important; justify-content: center !important; }
    .hero-card { padding: 24px 20px !important; }

    .section { padding: 56px 20px !important; }
    .section-title { font-size: clamp(28px, 8vw, 40px) !important; }

    .work-grid { grid-template-columns: 1fr !important; }
    .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .skills-grid { grid-template-columns: 1fr 1fr !important; gap: 14px !important; }
    .contact-form { padding: 24px 18px !important; }
    .contact-big { font-size: clamp(30px, 9vw, 44px) !important; }

    .footer { padding: 20px !important; flex-direction: column !important; text-align: center !important; }

    input, textarea, button { font-size: 16px !important; } /* prevents iOS zoom on focus */
  }

  @media (max-width: 480px) {
    .skills-grid { grid-template-columns: 1fr !important; }
  }

  /* Touch-friendly tap targets */
  @media (hover: none) {
    a, button { -webkit-tap-highlight-color: rgba(232,71,10,0.15); }
  }
`;
