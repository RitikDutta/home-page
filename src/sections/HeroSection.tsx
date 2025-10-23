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
  const imageRef = useRef<HTMLImageElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  const firstName = "Ritik";
  const lastName = "Dutta";

  const firstNameSpans = useMemo(
    () =>
      firstName.split("").map((char, i) => (
        <span
          key={`first-${i}`}
          className="inline-block hero-name-char opacity-0 translate-y-4"
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
          className="inline-block hero-name-char opacity-0 translate-y-4"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      )),
    [lastName]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.35 });

      tl.fromTo(
        ".hero-orb",
        { opacity: 0, scale: 0.85 },
        {
          opacity: 0.8,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.2,
        }
      )
        .fromTo(
          ".background-about-text",
          { opacity: 0, y: 20, scale: 1.08 },
          {
            opacity: 0.45,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
          },
          0
        )
        .fromTo(
          logoRef.current,
          { opacity: 0, y: -25, rotate: -10 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.7)",
          },
          0.2
        )
        .fromTo(
          ".hero-glass-card",
          { y: 30, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
          },
          0.35
        )
        .fromTo(
          imageRef.current,
          { yPercent: 18, opacity: 0, scale: 0.92 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1.3,
            ease: "expo.out",
          },
          0.45
        )
        .to(
          ".hero-name-char",
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.7,
            ease: "back.out(1.5)",
          },
          0.6
        )
        .fromTo(
          ".hero-pill-intro, .hero-keypoints li",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          },
          0.75
        )
        .fromTo(
          ".hero-description-new",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          0.9
        )
        .from(
          ".hero-pill-badge",
          {
            y: 18,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          1.05
        )
        .from(
          ".hero-buttons > *",
          {
            y: 25,
            opacity: 0,
            scale: 0.9,
            stagger: 0.12,
            duration: 0.7,
            ease: "back.out(1.6)",
          },
          1.1
        )
        .from(
          ".hero-stat",
          {
            y: 18,
            opacity: 0,
            stagger: 0.14,
            duration: 0.7,
            ease: "power3.out",
          },
          1.2
        )
        .from(
          ".hero-floating-card",
          {
            y: 25,
            opacity: 0,
            scale: 0.95,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          1.25
        )
        .from(
          ".hero-scroll-indicator",
          { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" },
          1.35
        )
        .from(
          ".social-icons a",
          {
            y: 25,
            opacity: 0,
            scale: 0.8,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          1.35
        );

      gsap.to(".background-about-text", {
        yPercent: 100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      heroRef.current
        ?.querySelectorAll(".hero-buttons a")
        .forEach((button) => {
          const isPrimary = button.classList.contains("btn-primary");
          const hoverBg = isPrimary ? "#E55A5A" : "#F0F0F0";
          const hoverColor = isPrimary ? "#FFFFFF" : "#FF6B6B";
          const hoverBorder = isPrimary ? "transparent" : "#FF6B6B";
          const hoverShadow = "0 4px 15px -3px rgba(0,0,0,0.1)";
          const tlBtn = gsap.timeline({ paused: true });
          tlBtn.to(button, {
            y: -3,
            scale: 1.03,
            backgroundColor: hoverBg,
            borderColor: hoverBorder,
            color: hoverColor,
            boxShadow: hoverShadow,
            duration: 0.25,
            ease: "power1.out",
          });

          button.addEventListener("mouseenter", () => tlBtn.play());
          button.addEventListener("mouseleave", () => tlBtn.reverse());
          button.addEventListener("mousedown", () =>
            gsap.to(button, { scale: 0.98, duration: 0.1 })
          );
          button.addEventListener("mouseup", () =>
            gsap.to(button, { scale: 1.03, duration: 0.2 })
          );
          button.addEventListener("mouseleave", () => {
            if (
              !tlBtn.isActive() &&
              (gsap.getProperty(button, "scale") < 1 ||
                gsap.getProperty(button, "scale") > 1)
            ) {
              gsap.to(button, { scale: 1, y: 0, duration: 0.2 });
            }
          });
        });

      heroRef.current
        ?.querySelectorAll(".social-icons a")
        .forEach((icon) => {
          const svg = icon.querySelector("svg");
          const hoverColor = icon.dataset.hoverColor || "#3B82F6";
          const iconTl = gsap.timeline({ paused: true });
          iconTl
            .to(
              icon,
              { y: -5, scale: 1.15, duration: 0.3, ease: "back.out(2)" },
              0
            )
            .to(
              svg,
              { color: hoverColor, duration: 0.3, ease: "power1.out" },
              0
            );
          icon.addEventListener("mouseenter", () => iconTl.play());
          icon.addEventListener("mouseleave", () => iconTl.reverse());
        });

      const logo = logoRef.current;
      if (logo) {
        const logoTl = gsap.timeline({ paused: true });
        logoTl
          .to(logo, {
            x: "+=2",
            y: "-=1",
            rotate: 1,
            duration: 0.05,
            ease: "steps(1)",
          })
          .to(logo, {
            x: "-=3",
            y: "+=2",
            rotate: -1.5,
            duration: 0.05,
            ease: "steps(1)",
          })
          .to(logo, {
            x: "+=1",
            y: "-=1",
            rotate: 0.5,
            duration: 0.05,
            ease: "steps(1)",
          })
          .to(logo, {
            x: 0,
            y: 0,
            rotate: 0,
            duration: 0.05,
            ease: "steps(1)",
          })
          .to(logo, { filter: "brightness(1.2)", duration: 0.1 }, 0)
          .to(
            logo,
            { scale: 1.05, duration: 0.15, ease: "power1.out" },
            0
          );

        logo.addEventListener("mouseenter", () => logoTl.play(0));
        logo.addEventListener("mouseleave", () => {
          gsap.to(logo, { x: 0, y: 0, rotate: 0, duration: 0.1 });
          gsap.to(logo, {
            filter: "brightness(1)",
            scale: 1,
            duration: 0.3,
            ease: "power1.inOut",
            delay: 0.05,
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center text-center md:text-left px-6 sm:px-8 lg:px-12 overflow-hidden bg-gradient-to-b from-white via-white/95 to-[#FFF7F4]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="hero-orb absolute -top-32 right-[-12%] w-[320px] sm:w-[380px] aspect-square rounded-full blur-3xl opacity-60 animate-hero-pulse"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255, 107, 107, 0.45), rgba(255, 194, 163, 0.08), transparent 65%)",
          }}
        />
        <div
          className="hero-orb absolute bottom-[-18%] left-[-10%] w-[300px] sm:w-[360px] aspect-square rounded-full blur-3xl opacity-60 animate-hero-pulse"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, rgba(255, 209, 102, 0.4), rgba(255, 255, 255, 0.08), transparent 70%)",
          }}
        />
        <div className="hero-orb absolute inset-x-1/4 top-[22%] h-[420px] rounded-full border border-white/60 bg-white/30 mix-blend-lighten opacity-60 animate-hero-float-delay" />
        <div className="background-about-text text-[20vw] sm:text-[16vw] md:text-[12vw] font-bold text-[#F1F1F1] uppercase tracking-[0.2em] md:tracking-[0.3em] leading-none select-none">
          Ritik Dutta
        </div>
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12 md:top-16 md:left-16 flex items-center space-x-3 md:space-x-4">
          <div
            ref={logoRef}
            className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white font-bold tracking-widest shadow-lg"
          >
            RD
          </div>
          <div className="hidden sm:flex flex-col items-start font-['Karla'] text-[#707070] bg-white/70 px-3 py-2 rounded-xl backdrop-blur-md border border-white/60 shadow-sm">
            <span className="text-[0.6rem] uppercase tracking-[0.35em] text-[#FF6B6B]">
              Portfolio
            </span>
            <span className="text-sm font-semibold">
              Building playful AI experiences
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-10 lg:gap-14 xl:gap-20 items-center">
        <div className="order-2 md:order-none md:w-1/2 flex justify-center md:justify-start">
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px]">
            <div className="pointer-events-none absolute -inset-8 rounded-[32px] border border-white/40 bg-gradient-to-br from-white/30 via-white/5 to-transparent blur-sm mix-blend-lighten" />
            <div className="hero-image-container relative w-full aspect-[3/4] overflow-hidden rounded-[30px] border border-white/60 bg-white/70 shadow-xl backdrop-blur-xl">
              <img
                ref={imageRef}
                src="/me.jpeg"
                alt="Ritik Dutta"
                className="w-full h-full object-cover opacity-0 transform-gpu transition-transform duration-700 ease-out hover:scale-[1.04]"
              />
            </div>
            <div className="hero-floating-card absolute -left-10 sm:-left-12 top-8 hidden sm:flex items-center gap-3 rounded-2xl bg-white/85 px-4 py-3 shadow-lg border border-white/60 backdrop-blur-lg animate-hero-float-slow">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B6B]/10 border border-[#FF6B6B]/30">
                <span className="h-2 w-2 rounded-full bg-[#FF6B6B]" />
              </div>
              <div className="flex flex-col text-left font-['Karla']">
                <span className="text-[0.6rem] uppercase tracking-[0.35em] text-[#FF6B6B]">
                  Now
                </span>
                <span className="text-sm font-semibold text-[#2E2E2E] leading-tight">
                  Exploring multimodal agents
                </span>
              </div>
            </div>
            <div className="hero-floating-card absolute -right-8 sm:-right-10 bottom-8 flex items-center gap-3 rounded-2xl bg-[#111827] px-4 py-3 shadow-2xl border border-white/20 text-white backdrop-blur-sm animate-hero-float-delay">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FFB199] flex items-center justify-center text-xs font-semibold tracking-[0.2em]">
                RD
              </div>
              <div className="flex flex-col text-left font-['Karla']">
                <span className="text-[0.6rem] uppercase tracking-[0.35em] text-white/60">
                  Recent
                </span>
                <span className="text-sm font-semibold leading-tight">
                  Agentic storytelling lab
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-none md:w-1/2 flex flex-col justify-center relative text-center md:text-left">
          <div className="hero-glass-card relative flex flex-col gap-6 md:gap-7 bg-white/75 border border-white/60 rounded-[28px] px-6 py-7 sm:px-8 sm:py-9 shadow-lg backdrop-blur-xl">
            <span className="hero-pill-intro inline-flex items-center justify-center md:justify-start px-4 py-2 rounded-full bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 text-[0.6rem] sm:text-xs uppercase tracking-[0.3em] text-[#FF6B6B] font-['Karla']">
              Creative Technologist & Storyteller
            </span>
            <h1
              ref={nameRef}
              className="hero-name-new font-['Playfair Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-black leading-tight"
            >
              {firstNameSpans} {lastNameSpans}
            </h1>

            <p className="hero-description-new font-['Karla'] text-base md:text-lg text-[#464646] leading-relaxed opacity-0">
              A tech explorer blending logic with playful storytelling. I help
              teams experiment fast, build intelligent products, and ship human
              moments into ambitious AI, IoT, and web journeys.
            </p>

            <ul className="hero-keypoints flex flex-col gap-2 font-['Karla'] text-[#363636] text-sm sm:text-base">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF6B6B]" />
                AI-first product strategy & automation pipelines
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF6B6B]" />
                Immersive interfaces that feel cinematic yet practical
              </li>
            </ul>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
              <span className="hero-pill-badge inline-flex items-center px-4 py-2 rounded-full bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 text-[0.6rem] sm:text-xs uppercase tracking-[0.3em] text-[#FF6B6B] font-['Karla']">
                Available for collaborations
              </span>
              <span className="hero-pill-badge inline-flex items-center px-4 py-2 rounded-full bg-white/60 border border-white/80 text-[0.6rem] sm:text-xs uppercase tracking-[0.3em] text-[#454545] font-['Karla']">
                Based in Kolkata, India
              </span>
            </div>

            <div className="hero-buttons flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 sm:gap-4">
              <a
                href="https://slides.ritikdutta.com/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary px-6 py-2.5 sm:px-7 sm:py-2.5 w-full max-w-[280px] sm:max-w-none sm:w-auto text-center bg-[#FF6B6B] text-white rounded-full text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                Slides
              </a>
              <a
                href="https://docs.ritikdutta.com/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 sm:px-7 sm:py-2.5 w-full max-w-[280px] sm:max-w-none sm:w-auto text-center bg-transparent text-[#FF6B6B] rounded-full border-2 border-[#FF6B6B] text-sm md:text-base font-semibold hover:bg-[#FF6B6B]/10 transition-colors duration-300"
              >
                System Designs
              </a>
              <a
                href="https://notebooks.ritikdutta.com/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 sm:px-7 sm:py-2.5 w-full max-w-[280px] sm:max-w-none sm:w-auto text-center bg-transparent text-[#FF6B6B] rounded-full border-2 border-[#FF6B6B] text-sm md:text-base font-semibold hover:bg-[#FF6B6B]/10 transition-colors duration-300"
              >
                Notebooks
              </a>
            </div>
          </div>

          <div className="hero-stats-grid grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-6 md:mt-8">
            <div className="hero-stat rounded-2xl bg-white/70 border border-white/60 px-5 py-6 shadow-md backdrop-blur-xl text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-[#FF6B6B]/80 mb-3 font-['Karla']">
                Focus
              </p>
              <p className="font-['Karla'] text-sm sm:text-base text-[#2F2F2F] leading-relaxed">
                Shipping AI-led tools, smart environments, and cinematic web
                experiences that invite curiosity.
              </p>
            </div>
            <div className="hero-stat rounded-2xl bg-white/70 border border-white/60 px-5 py-6 shadow-md backdrop-blur-xl text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-[#FF6B6B]/80 mb-3 font-['Karla']">
                Latest
              </p>
              <p className="font-['Karla'] text-sm sm:text-base text-[#2F2F2F] leading-relaxed">
                Rapid prototyping an agentic toolkit and audiovisual stories to
                make complex tech delightful.
              </p>
            </div>
          </div>

          <div className="social-icons mt-8 flex space-x-6 sm:space-x-8 md:space-x-10 justify-center md:justify-start">
            <a
              href="https://github.com/RitikDutta"
              target="_blank"
              rel="noreferrer"
              data-hover-color="#181717"
              className="relative group"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/ritikdutta/"
              target="_blank"
              rel="noreferrer"
              data-hover-color="#0A66C2"
              className="relative group"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://x.com/RitikDutta7"
              target="_blank"
              rel="noreferrer"
              data-hover-color="#1DA1F2"
              className="relative group"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator pointer-events-none absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 font-['Karla'] text-[0.6rem] uppercase tracking-[0.3em] text-[#8A8A8A]">
        <div className="relative h-12 w-[2px] overflow-hidden rounded-full bg-gradient-to-b from-transparent via-[#FF6B6B]/40 to-[#FF6B6B]">
          <span className="absolute top-0 left-0 right-0 h-1/3 bg-[#FF6B6B] animate-hero-scroll" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
