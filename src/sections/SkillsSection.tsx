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
  const gridRef = useRef<HTMLDivElement | null>(null);

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

  // Re-introducing subtle, reliable animations
  useEffect(() => {
    if (!skillsRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Header Animation - Gentle fade up
        gsap.fromTo(
          ".skills-intro-animate",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 85%", // Trigger earlier to ensure visibility
              toggleActions: "play none none reverse",
            },
          }
        );

        // Cards Animation - Subtle stagger
        const cards = gsap.utils.toArray<HTMLElement>(".skill-card-entrance");
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, skillsRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="relative isolate overflow-hidden py-24 sm:py-32 bg-white"
      aria-labelledby="skills-heading"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <div className="skills-intro-animate inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#FF6B6B]" />
              CONSTANTLY LEARNING
            </div>
            <h2
              id="skills-heading"
              className="skills-intro-animate text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl font-serif"
            >
              Skills stitched for playful, production-ready products
            </h2>
            <p className="skills-intro-animate mt-6 text-lg leading-8 text-gray-600 font-sans">
              From strategy to shipping, here are the systems, interfaces, and experiments I iterate on to keep ideas moving forward.
            </p>
          </div>

          <ul className="skills-intro-animate grid gap-6 rounded-2xl border border-gray-100 bg-gray-50/50 p-8 text-sm text-gray-600 shadow-sm backdrop-blur-sm">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#FF6B6B]" aria-hidden="true" />
              <span className="leading-relaxed">
                <strong className="font-semibold text-gray-900">Cross-functional engineer</strong> blending AI systems, creative web, and ops automation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#FF6B6B]" aria-hidden="true" />
              <span className="leading-relaxed">
                Partnered with <strong className="font-semibold text-gray-900">product, research, and growth teams</strong> to ship resilient experiences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#FF6B6B]" aria-hidden="true" />
              <span className="leading-relaxed">
                Motion tuned with <strong className="font-semibold text-gray-900">GSAP and GPU-friendly transforms</strong>, respecting prefers-reduced-motion.
              </span>
            </li>
          </ul>
        </div>

        {/* Skills Grid */}
        <div ref={gridRef} className="skills-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((skill, index) => (
            <div key={skill.category} className="skill-card-entrance h-full">
              <div
                className="animate-float-gentle h-full"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <article
                  className="skill-card-pro group flex flex-col p-6 sm:p-8 h-full"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="skill-icon-container h-12 w-12 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                      {skill.icon}
                    </div>
                    {!skill.blurred && (
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Proficiency</span>
                        <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FF6B6B] rounded-full"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-2">{skill.group}</p>
                    <h3 className="text-xl font-bold text-gray-900 font-serif group-hover:text-[#FF6B6B] transition-colors">
                      {skill.category}
                    </h3>
                  </div>

                  {skill.blurred ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <p className="text-sm text-gray-500 mb-2">Available for vetted engagements</p>
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Private Access Only</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                        {skill.summary}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="skill-tag-pro px-2.5 py-1 rounded-md text-[11px] font-medium uppercase tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-gray-100 mt-auto">
                        {skill.project && (
                          <a
                            href={skill.project.href}
                            target={skill.project.external ? "_blank" : undefined}
                            rel={skill.project.external ? "noreferrer" : undefined}
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 hover:text-[#FF6B6B] transition-colors group/link"
                          >
                            {skill.project.label}
                            <ArrowIcon />
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </article>
              </div>
            </div>
          ))}
        </div>

        {/* Ticker Section */}
        <div className="mt-20 border-t border-gray-100 pt-10">
          <div className="relative flex overflow-hidden py-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex min-w-full animate-ticker items-center gap-12 whitespace-nowrap">
              {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                <span key={`${item}-${i}`} className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                  <span className="h-1 w-1 rounded-full bg-[#FF6B6B]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
