// @ts-nocheck
/**
 * Projects showcase cards — premium layout with tech stack, pro animations.
 * Uses your Tailwind + theme tokens from src/index.css and gsap from ../lib/gsap
 */
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const projectsData = [
  {
    title: "Company Work Environment Management System",
    img: "/project_company_management.gif",
    description:
      "Facial recognition & activity analytics for privacy-aware productivity insights across teams and zones.",
    liveLink: "https://cwem.space/",
    codeLink: "https://github.com/RitikDutta/Company-work-environment-management",
    tech: ["Python", "OpenCV", "Face-Recog", "Flask", "Pandas", "Docker"],
    tags: ["Computer Vision", "Data Analytics", "UX Psychology"],
  },
  {
    title: "Datamigrato",
    img: "/project_datamigrato.gif",
    description:
      "A versatile Python package to migrate data across Cassandra, MongoDB, Firebase, Firestore, SQL — with clean APIs & batch strategies.",
    liveLink: "https://pypi.org/project/datamigrato/",
    codeLink: "https://github.com/RitikDutta/datamigrato",
    tech: ["Python", "SQL", "ETL", "Cassandra", "MongoDB", "CI/CD"],
    tags: ["Backend", "Data Engineering"],
  },
  {
    title: "Interview Ready",
    img: "/project_interview_ready.png",
    description:
      "Gen-AI mock interviews with resume-aware Q&A, multi-lingual evaluators, instant feedback & scoring dashboards.",
    liveLink: "https://irready.site/",
    codeLink: "https://github.com/RitikDutta/Interview_mentor",
    tech: ["React", "Node.js", "LLM", "RAG", "Pinecone", "Firebase/Auth"],
    tags: ["Generative AI", "NLP", "Psychology"],
  },
  {
    title: "Inventory Management Chatbot",
    img: "/project_food_chatbot.gif",
    description:
      "Dialog-driven sales & stock assistant with trending items, monthly rollups, and fast restock cues.",
    liveLink: "https://bot.dialogflow.com/food2bot",
    codeLink: "https://github.com/RitikDutta/Food-Divilery-chatbot",
    tech: ["Python", "Flask", "Dialogflow", "NLP", "SQL"],
    tags: ["Chatbot", "Ops"],
  },
  {
    title: "Raaga Rhythms",
    img: "/project_raaga_rhythm.jpg",
    description:
      "Explore Indian classical ragas with interactive song cards, metadata, and smooth GSAP micro-interactions.",
    liveLink: "https://ritikdutta.github.io/RaagaRhythms/",
    codeLink: "https://github.com/RitikDutta/RaagaRhythms",
    tech: ["React", "GSAP", "TypeScript", "Data Viz"],
    tags: ["Web Dev", "Music Tech", "Creative Coding"],
  },
];

const TechPill = ({ label }: { label: string }) => (
  <span
    className="tech-pill select-none"
    title={label}
  >
    {label}
  </span>
);

export default function ProjectsSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Section header
      gsap.from(".projects-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Card reveal + parallax
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        const mediaWrap = card.querySelector(".project-media") as HTMLElement;
        const mediaImg  = card.querySelector("img.project-img") as HTMLElement;
        const details   = card.querySelector(".project-details") as HTMLElement;

        // entrance
        gsap.from(card, {
          y: 70,
          opacity: 0,
          rotateX: 6,
          duration: 1.0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        });

        // media reveal
        if (mediaWrap && mediaImg) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: mediaWrap,
              start: "top 85%",
              once: true,
            },
          });
          tl.fromTo(
            mediaWrap,
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "power4.out" }
          ).fromTo(
            mediaImg,
            { scale: 1.08, opacity: 0.0 },
            { scale: 1.0, opacity: 1, duration: 0.9, ease: "power4.out" },
            "-=0.7"
          );
        }

        // parallax
        if (mediaWrap && mediaImg) {
          gsap.to(mediaWrap, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.to(mediaImg, {
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // tech pills cascade
        const pills = details?.querySelectorAll(".tech-pill");
        if (pills?.length) {
          gsap.from(pills, {
            y: 14,
            opacity: 0,
            stagger: 0.05,
            duration: 0.35,
            ease: "power1.out",
            scrollTrigger: {
              trigger: details,
              start: "top 90%",
              once: true,
            },
          });
        }

        // magnetic buttons
        card.querySelectorAll(".magnet").forEach((btn: any) => {
          const strength = 18;
          const bounds = btn.getBoundingClientRect();
          const cx = bounds.left + bounds.width / 2;
          const cy = bounds.top + bounds.height / 2;
          const move = (e: MouseEvent) => {
            const dx = (e.clientX - cx) / strength;
            const dy = (e.clientY - cy) / strength;
            gsap.to(btn, { x: dx, y: dy, duration: 0.25, ease: "power2.out" });
          };
          const reset = () => gsap.to(btn, { x: 0, y: 0, duration: 0.35, ease: "power2.out" });
          btn.addEventListener("mousemove", move);
          btn.addEventListener("mouseleave", reset);
        });

        // 3D hover tilt
        const inner = card.querySelector(".card-inner") as HTMLElement;
        if (inner) {
          const tilt = (e: MouseEvent) => {
            const r = inner.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(inner, {
              rotateX: -py * 4,
              rotateY: px * 6,
              duration: 0.35,
              ease: "power2.out",
            });
          };
          const leave = () =>
            gsap.to(inner, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
          card.addEventListener("mousemove", tilt);
          card.addEventListener("mouseleave", leave);
        }
      });

      // prefers-reduced-motion: remove animations
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.globalTimeline.clear();
      });
    }, rootRef);

    return () => {
      ctx.revert();
      mm.kill();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={rootRef}
      className="relative py-16 md:py-24 lg:py-28 bg-gray-50 text-[#808080] overflow-hidden"
    >
      {/* ambient gradient */}
      <div className="absolute -top-24 -left-24 w-[46rem] h-[46rem] project-ambient" aria-hidden />
      <div className="absolute -bottom-28 -right-20 w-[36rem] h-[36rem] project-ambient alt" aria-hidden />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="projects-header text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 tracking-tight font-['Playfair Display'] text-black">
          Projects — Building With Clarity
        </h2>
        <p className="projects-header text-center mb-14 md:mb-20 text-base sm:text-lg font-['Karla'] leading-relaxed text-[#606060] max-w-3xl mx-auto">
          A selection of work where engineering meets design, data, and user psychology.
        </p>

        <div className="grid gap-10 md:gap-14">
          {projectsData.map((p, i) => (
            <article
              key={p.title}
              className={`project-card group will-change-transform`}
              style={{ perspective: "1200px" }}
            >
              <div
                className={`card-inner relative overflow-hidden bg-white/80 border border-[var(--border-soft)] rounded-2xl shadow-[0_20px_60px_-35px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_28px_80px_-30px_var(--accent-glow)]`}
              >
                {/* split layout */}
                <div className={`grid md:grid-cols-2 gap-0 items-stretch`}>
                  {/* media */}
                  <div className={`project-media relative ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    {/* shine */}
                    <div className="pointer-events-none project-shine" />
                    <div className="aspect-[16/10] md:h-full overflow-hidden bg-gray-100">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="project-img w-full h-full object-contain md:object-cover"
                      />
                    </div>
                  </div>

                  {/* details */}
                  <div className={`project-details relative p-6 sm:p-8 md:p-10 flex flex-col`}>
                    <header className="mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-black font-['Playfair Display'] tracking-tight">
                        {p.title}
                      </h3>
                      {p.tags?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span key={t} className="project-tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </header>

                    <p className="text-[15px] md:text-base leading-relaxed text-[#5a5a5a]">
                      {p.description}
                    </p>

                    {/* tech stack */}
                    <div className="mt-6">
                      <div className="text-[13px] font-semibold text-black/80 mb-2 tracking-wide uppercase">
                        Tech Stack
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {p.tech?.map((t) => <TechPill key={t} label={t} />)}
                      </div>
                    </div>

                    {/* actions */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      {p.codeLink && (
                        <a
                          href={p.codeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="magnet inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-300 text-[#404040] hover:text-black hover:border-gray-400 bg-white/70 backdrop-blur transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.35.73-4.05-1.61-4.05-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.25 1.86 1.25 1.08 1.86 2.83 1.32 3.52 1.01.11-.8.42-1.32.76-1.62-2.67-.3-5.48-1.33-5.48-5.9 0-1.3.47-2.36 1.24-3.19-.12-.3-.54-1.51.12-3.14 0 0 1.01-.32 3.3 1.22a11.5 11.5 0 016 0c2.28-1.54 3.29-1.22 3.29-1.22.66 1.63.24 2.84.12 3.14.77.83 1.23 1.89 1.23 3.19 0 4.58-2.81 5.6-5.49 5.9.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57A12 12 0 0012 0z" />
                          </svg>
                          Code
                        </a>
                      )}
                      {p.liveLink && (
                        <a
                          href={p.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="magnet inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-strong)] shadow-md transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.03 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {p.title === "Datamigrato" ? "View on PyPI" : "Live Demo"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
