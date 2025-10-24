// @ts-nocheck
/**
 * Skills overview grid redesigned for always-on visibility and motion-responsive polish.
 * Linked styles: shared color tokens + utilities in src/index.css, including .skill-card-v2 and ambient background flourishes.
 * External script: GSAP ScrollTrigger animations configured below with prefers-reduced-motion handling.
 */
import { useEffect, useMemo, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const ArrowIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-1"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5.5 4h6.5v6.5"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 11L11.8 4.2"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const getDepthLabel = (value: number) => {
  if (value >= 90) return "Principal depth";
  if (value >= 85) return "Advanced depth";
  if (value >= 75) return "Seasoned practice";
  return "Emerging focus";
};

export default function SkillsSection() {
  const skillsRef = useRef<HTMLDivElement | null>(null);

  const tickerItems = useMemo(
    () => [
      "Fine-tuning tiny reasoning models",
      "Experimenting with agentic storyboards",
      "Exploring WebGPU motion studies",
      "Designing evaluation sandboxes for RAG",
      "Automating growth experiments with AI copilots",
    ],
    []
  );

  const skillsData = useMemo(
    () => [
      {
        category: "AI & ML Systems",
        icon: "🧠",
        tone: "ai",
        group: "AI/ML",
        summary:
          "Designing retrieval-augmented agents and evaluation loops that turn AI ideas into reliable products.",
        proficiency: 92,
        application: "Applied in Interview Mentor — AI interview platform delivering structured feedback.",
        project: { label: "View project", href: "/interview", external: false },
        tags: ["LangChain", "RAG Pipelines", "LLM Evaluation", "Vertex AI", "MLflow"],
        learning: "realtime multimodal reasoning",
      },
      {
        category: "Computer Vision & Perception",
        icon: "👁️",
        tone: "ai",
        group: "AI/ML",
        summary:
          "Deploying detection, tracking, and AR overlays that help smart environments see and respond in real-time.",
        proficiency: 88,
        application: "Used in smart retail pilots and DataMigrato visual QA workflows.",
        project: {
          label: "Notebook demos",
          href: "https://notebooks.ritikdutta.com/",
          external: true,
        },
        tags: ["YOLOv8", "OpenCV", "MediaPipe", "Edge Deployment"],
        learning: "self-supervised perception for low-light footage",
      },
      {
        category: "Creative Web & Storytelling",
        icon: "✨",
        tone: "web",
        group: "Web",
        summary:
          "Crafting playful React experiences with cinematic motion, expressive copy, and thoughtful accessibility.",
        proficiency: 90,
        application: "Powers this portfolio, slides.ritikdutta.com, and immersive product launches.",
        project: {
          label: "Slides showcase",
          href: "https://slides.ritikdutta.com/",
          external: true,
        },
        tags: ["React", "TypeScript", "GSAP", "Framer Motion", "Tailwind CSS"],
        learning: "procedural motion with WebGPU",
      },
      {
        category: "Backend & API Engineering",
        icon: "⚙️",
        tone: "systems",
        group: "Systems",
        summary:
          "Building resilient services with clean architecture, observability, and secure auth for ambitious teams.",
        proficiency: 87,
        application: "Supports automation backends and IoT orchestration layers across client work.",
        project: {
          label: "System designs",
          href: "https://docs.ritikdutta.com/",
          external: true,
        },
        tags: ["Node.js", "Flask", "PostgreSQL", "GraphQL", "Redis"],
        learning: "event-driven patterns for agent orchestration",
      },
      {
        category: "DevOps & MLOps Pipelines",
        icon: "🚀",
        tone: "ops",
        group: "Ops",
        summary:
          "Automating delivery, experiment tracking, and safeguards so models and features ship with confidence.",
        proficiency: 85,
        application: "Keeps Interview Mentor and internal agents shipping on dependable rails.",
        project: {
          label: "Automation playbooks",
          href: "https://docs.ritikdutta.com/",
          external: true,
        },
        tags: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "MLflow"],
        learning: "policy-as-code for AI evaluations",
      },
      {
        category: "Product Engineering Toolkit",
        icon: "🧰",
        tone: "ops",
        group: "Ops",
        summary:
          "Accelerating research ops with analytics, growth experiments, and custom automation stacks.",
        proficiency: 82,
        application: "Speeds up insights across DataMigrato and rapid product sprints.",
        project: {
          label: "Toolkit repo",
          href: "https://github.com/RitikDutta",
          external: true,
        },
        tags: ["Notion API", "dbt", "Amplitude", "Low-code automations", "Figma systems"],
        learning: "AI copilots for product ops",
      },
      {
        category: "Secure Systems & Red Teaming",
        icon: "🛡️",
        tone: "ops",
        group: "Ops",
        summary:
          "Hands-on threat modelling, red teaming drills, and network hardening for sensitive engagements.",
        proficiency: 80,
        application: "Shared privately for vetted collaborations.",
        tags: ["Pen-testing", "Threat Modelling", "Network Hardening", "Incident Response"],
        blurred: true,
      },
    ],
    []
  );

  useEffect(() => {
    if (!skillsRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".skills-intro-animate", {
          y: 32,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 82%",
          },
        });
      }, skillsRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!skillsRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".skill-card-v2");

        gsap.from(cards, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 78%",
          },
        });

        cards.forEach((card) => {
          const tags = card.querySelectorAll<HTMLElement>(".skill-tag");

          if (tags.length) {
            gsap.fromTo(
              tags,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power2.out",
                stagger: 0.06,
                scrollTrigger: {
                  trigger: card,
                  start: "top 78%",
                },
              }
            );
          }
        });
      }, skillsRef);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28"
      aria-labelledby="skills-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              color-mix(in srgb, var(--surface-section) 92%, transparent) 0%,
              color-mix(in srgb, var(--surface-page) 85%, transparent) 55%,
              var(--surface-page) 100%
            )
          `,
        }}
      />
      <div aria-hidden="true" className="skills-ambient-gradient" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 text-center md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:items-end md:text-left">
          <div className="space-y-6">
            <div className="skills-intro-animate inline-flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-card-strong)] px-4 py-2 text-xs uppercase tracking-[0.35em] text-[color:var(--accent-primary)] shadow-sm backdrop-blur-md">
              <span aria-hidden="true">⚡</span>
              Constantly learning
            </div>
            <div className="space-y-4">
              <h2
                id="skills-heading"
                className="skills-intro-animate text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[color:var(--text-strong)] font-['Playfair Display']"
              >
                Skills stitched for playful, production-ready products
              </h2>
              <p className="skills-intro-animate text-base sm:text-lg md:text-xl leading-relaxed text-[color:var(--text-muted)] font-['Karla']">
                From strategy to shipping, here are the systems, interfaces, and experiments I iterate on to keep ideas
                moving forward.
              </p>
            </div>
          </div>
          <ul className="skills-intro-animate grid gap-4 rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--surface-card)] p-6 text-left text-sm text-[color:var(--text-secondary)] font-['Karla'] shadow-sm backdrop-blur-lg">
            <li className="flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-full"
                aria-hidden="true"
                style={{
                  background: "var(--accent-primary)",
                  boxShadow: "0 0 12px var(--accent-glow)",
                }}
              />
              Cross-functional engineer blending AI systems, creative web, and ops automation.
            </li>
            <li className="flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-full"
                aria-hidden="true"
                style={{
                  background: "var(--accent-primary)",
                  boxShadow: "0 0 12px var(--accent-glow)",
                }}
              />
              Partnered with product, research, and growth teams to ship resilient experiences.
            </li>
            <li className="flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-full"
                aria-hidden="true"
                style={{
                  background: "var(--accent-primary)",
                  boxShadow: "0 0 12px var(--accent-glow)",
                }}
              />
              Motion tuned with GSAP and GPU-friendly transforms, respecting prefers-reduced-motion.
            </li>
          </ul>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillsData.map((skill) => (
            <article
              key={skill.category}
              className="skill-card-v2 group flex h-full flex-col gap-6 px-5 py-6 focus-visible:outline-none sm:px-6 sm:py-7 md:px-7 md:py-8"
              data-tone={skill.tone}
              tabIndex={0}
            >
              <div className="relative z-10 flex flex-1 flex-col gap-6">
                <div className="flex flex-wrap items-start justify-between gap-4 sm:gap-6">
                  <div className="flex min-w-0 items-center gap-4">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color:var(--surface-card-strong)] text-2xl shadow-sm text-[color:var(--text-strong)]"
                      role="img"
                      aria-label={`${skill.category} icon`}
                    >
                      {skill.icon}
                    </span>
                    <div className="text-left">
                      <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--text-subtle)]">
                        {skill.group}
                      </p>
                      <h3 className="mt-1 text-lg sm:text-xl font-semibold text-[color:var(--text-strong)] font-['Playfair Display']">
                        {skill.category}
                      </h3>
                    </div>
                  </div>
                  {!skill.blurred && (
                    <span className="inline-flex items-center rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-card-strong)] px-3 py-1 text-[0.6rem] uppercase tracking-[0.35em] text-[color:var(--text-subtle)]">
                      {getDepthLabel(skill.proficiency).toUpperCase()}
                    </span>
                  )}
                </div>

                {skill.blurred ? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--surface-card-overlay)] px-6 py-10 text-center text-sm text-[color:var(--text-secondary)] backdrop-blur-xl">
                    <p>This track is available for vetted engagements.</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-subtle)]">
                      Reach out directly for a private walkthrough.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm sm:text-base leading-relaxed text-balance text-[color:var(--text-muted)] font-['Karla']">
                      {skill.summary}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skill.tags.map((tag) => (
                        <span
                          key={`${skill.category}-${tag}`}
                          className="skill-tag inline-flex items-center rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-[0.25em]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-col gap-3 text-left font-['Karla'] text-sm text-[color:var(--text-muted)]">
                      <p>{skill.application}</p>
                      {skill.project && (
                        <a
                          href={skill.project.href}
                          target={skill.project.external ? "_blank" : undefined}
                          rel={skill.project.external ? "noreferrer" : undefined}
                          className="group inline-flex w-max items-center gap-2 text-xs uppercase tracking-[0.3em] text-[color:var(--accent-primary)] transition-transform transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-card-strong)]"
                        >
                          {skill.project.label}
                          <ArrowIcon />
                        </a>
                      )}
                      {skill.learning && (
                        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-subtle)]">
                          Currently exploring {skill.learning}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-card)] px-4 py-2 shadow-sm backdrop-blur-lg">
          <div className="relative flex items-center gap-6">
            <div className="skills-ticker text-[0.65rem] uppercase tracking-[0.35em] text-[color:var(--accent-primary)]">
              {tickerItems.map((item) => (
                <span key={item} className="flex items-center gap-3">
                  {item}
                  <span
                    className="h-1 w-1 rounded-full"
                    aria-hidden="true"
                    style={{
                      background: "color-mix(in srgb, var(--accent-primary) 55%, transparent)",
                    }}
                  />
                </span>
              ))}
            </div>
            <div
              className="skills-ticker text-[0.65rem] uppercase tracking-[0.35em] text-[color:var(--accent-primary)]"
              aria-hidden="true"
            >
              {tickerItems.map((item) => (
                <span key={`${item}-duplicate`} className="flex items-center gap-3">
                  {item}
                  <span
                    className="h-1 w-1 rounded-full"
                    aria-hidden="true"
                    style={{
                      background: "color-mix(in srgb, var(--accent-primary) 55%, transparent)",
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
