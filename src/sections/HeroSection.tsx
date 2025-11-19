// @ts-nocheck
/**
 * Hero section introducing Ritik.
 * Linked styles: Tailwind CSS utilities declared in src/index.css and font imports handled globally.
 * External script: GSAP with ScrollTrigger (see src/lib/gsap.ts); uses shared brand icons from src/components/icons/SocialIcons.tsx.
 */
import { useEffect, useMemo, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../components/icons/SocialIcons";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const firstName = "Ritik";
  const lastName = "Dutta";

  const firstNameSpans = useMemo(
    () =>
      firstName.split("").map((char, i) => (
        <span
          key={`first-${i}`}
          className="inline-block hero-name-char opacity-0 translate-y-12 rotate-6 origin-bottom-left"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      )),
    [firstName]
  );

  const lastNameSpans = useMemo(
    () =>
      lastName.split("").map((char, i) => (
        <span
          key={`last-${i}`}
          className="inline-block hero-name-char opacity-0 translate-y-12 rotate-6 origin-bottom-left"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      )),
    [lastName]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      const isMobile = window.innerWidth < 768;

      // 1. Background Elements Entrance
      tl.fromTo(
        ".hero-orb-primary",
        { opacity: 0, scale: 0.5, x: -50 },
        { opacity: 0.6, scale: 1, x: 0, duration: 1.8, ease: "power3.out" }
      )
        .fromTo(
          ".hero-orb-secondary",
          { opacity: 0, scale: 0.5, x: 50 },
          { opacity: 0.5, scale: 1, x: 0, duration: 1.8, ease: "power3.out" },
          "<0.2"
        )
        .fromTo(
          ".hero-grid-lines",
          { opacity: 0 },
          { opacity: 0.4, duration: 2, ease: "power2.inOut" },
          "<"
        );

      // 2. Main Content Entrance
      tl.fromTo(
        imageContainerRef.current,
        { opacity: 0, scale: 0.9, y: 40, rotationY: 15 },
        { opacity: 1, scale: 1, y: 0, rotationY: 0, duration: 1.4, ease: "power3.out" },
        "-=1.2"
      )
        .fromTo(
          ".hero-glass-panel",
          { opacity: 0, y: 30, backdropFilter: "blur(0px)" },
          { opacity: 1, y: 0, backdropFilter: "blur(16px)", duration: 1.2, ease: "power3.out" },
          "-=1"
        );

      // 3. Typography Reveal
      tl.to(
        ".hero-name-char",
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          stagger: 0.04,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      )
        .fromTo(
          ".hero-role-pill",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );

      // 4. Interactive Elements
      tl.fromTo(
        ".hero-action-btn",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.4"
      )
        .fromTo(
          ".hero-stat-item",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".social-link",
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: "back.out(2)" },
          "-=0.4"
        );

      // 5. Floating Cards (Only animate if visible)
      if (!isMobile) {
        tl.fromTo(
          ".hero-float-card",
          { opacity: 0, y: 40, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.2, duration: 1, ease: "elastic.out(1, 0.8)" },
          "-=0.2"
        );
      }

      // Parallax Effect on Scroll
      gsap.to(".hero-bg-parallax", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Mouse Move Parallax for Image (Desktop only)
      const handleMouseMove = (e: MouseEvent) => {
        if (!imageContainerRef.current || window.innerWidth < 1024) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;

        gsap.to(imageContainerRef.current, {
          rotationY: xPos,
          rotationX: -yPos,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(".hero-orb-primary", {
          x: xPos * 2,
          y: yPos * 2,
          duration: 2,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#fffbf9] to-[#fff0eb] pt-24 pb-12 lg:pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-bg-parallax absolute inset-0">
          <div className="hero-orb-primary absolute top-[-10%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-gradient-to-br from-[#FF6B6B]/20 to-[#FFC65C]/20 blur-[60px] md:blur-[100px]" />
          <div className="hero-orb-secondary absolute bottom-[-10%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-gradient-to-tr from-[#FF9E7C]/20 to-[#FF6B6B]/15 blur-[50px] md:blur-[80px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] hero-grid-lines" />
        </div>
        <div className="bg-grain" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

          {/* Left Content */}
          <div ref={contentRef} className="flex-1 text-center lg:text-left order-2 lg:order-1 w-full">
            <div className="hero-glass-panel inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/50 border border-white/60 backdrop-blur-md mb-6 md:mb-8 hero-role-pill">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#FF6B6B] animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#FF6B6B]">
                Creative Technologist
              </span>
            </div>

            <h1 ref={nameRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-[#1a1a1a] leading-[1.1] mb-5 md:mb-6 tracking-tight">
              <div className="overflow-hidden pb-1 md:pb-2">{firstNameSpans}</div>
              <div className="overflow-hidden pb-1 md:pb-2 text-[#4a4a4a]">{lastNameSpans}</div>
            </h1>

            <p className="hero-description text-base md:text-lg lg:text-xl text-[#5a5a5a] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 md:mb-10 font-sans">
              Blending <span className="text-[#FF6B6B] font-medium">logic</span> with playful storytelling.
              I build intelligent products and cinematic web experiences that invite curiosity.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 mb-10 md:mb-12">
              <a
                href="#projects"
                className="hero-action-btn btn-primary px-6 py-3 md:px-8 md:py-3.5 bg-[#FF6B6B] text-white rounded-full text-sm md:text-base font-semibold shadow-lg shadow-[#FF6B6B]/25 hover:shadow-xl hover:shadow-[#FF6B6B]/40 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                View Projects
              </a>
              <a
                href="https://docs.ritikdutta.com/"
                target="_blank"
                rel="noreferrer"
                className="hero-action-btn px-6 py-3 md:px-8 md:py-3.5 bg-white text-[#4a4a4a] border border-[#e0e0e0] rounded-full text-sm md:text-base font-semibold hover:border-[#FF6B6B] hover:text-[#FF6B6B] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                System Designs
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 md:gap-8 border-t border-[#000000]/5 pt-6 md:pt-8">
              <div className="hero-stat-item text-center lg:text-left">
                <div className="text-xl md:text-2xl font-bold text-[#1a1a1a]">3+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-[#888]">Years Exp.</div>
              </div>
              <div className="hero-stat-item text-center lg:text-left">
                <div className="text-xl md:text-2xl font-bold text-[#1a1a1a]">15+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-[#888]">Projects</div>
              </div>
              <div className="flex gap-4 ml-auto lg:ml-8">
                <a href="https://github.com/RitikDutta" target="_blank" rel="noreferrer" className="social-link text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors"><GithubIcon /></a>
                <a href="https://www.linkedin.com/in/ritikdutta/" target="_blank" rel="noreferrer" className="social-link text-[#4a4a4a] hover:text-[#0077b5] transition-colors"><LinkedinIcon /></a>
                <a href="https://x.com/RitikDutta7" target="_blank" rel="noreferrer" className="social-link text-[#4a4a4a] hover:text-[#1DA1F2] transition-colors"><TwitterIcon /></a>
              </div>
            </div>
          </div>

          {/* Right Image Area */}
          <div className="flex-1 relative order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000 w-full max-w-[320px] md:max-w-[480px]">
            <div
              ref={imageContainerRef}
              className="relative w-full aspect-[4/5] transform-style-3d"
            >
              <div className="absolute inset-4 bg-gradient-to-tr from-[#FF6B6B] to-[#FFC65C] rounded-[32px] blur-2xl opacity-40 animate-hero-pulse" />

              <div className="relative h-full w-full rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/40 shadow-2xl shadow-[#FF6B6B]/10 bg-white/20 backdrop-blur-sm">
                <img
                  ref={imageRef}
                  src="/me.gif"
                  alt="Ritik Dutta"
                  className="w-full h-full object-cover"
                />

                {/* Floating Cards Overlay - Hidden on mobile */}
                <div className="hero-float-card absolute top-8 right-[-20px] glass-panel p-4 rounded-2xl hidden md:flex items-center gap-3 max-w-[200px] animate-hero-float-slow">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center text-xl">🚀</div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#888] font-bold">Currently</div>
                    <div className="text-xs font-semibold text-[#333]">Building Agents</div>
                  </div>
                </div>

                <div className="hero-float-card absolute bottom-12 left-[-20px] glass-panel p-4 rounded-2xl hidden md:flex items-center gap-3 max-w-[200px] animate-hero-float-delay">
                  <div className="w-10 h-10 rounded-full bg-[#FFC65C]/10 flex items-center justify-center text-xl">✨</div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#888] font-bold">Focus</div>
                    <div className="text-xs font-semibold text-[#333]">Cinematic UI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#888]">Scroll</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[#FF6B6B] to-transparent" />
      </div>
    </section>
  );
}
