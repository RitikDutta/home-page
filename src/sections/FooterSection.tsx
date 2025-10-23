// @ts-nocheck
/**
 * Footer with social links and pulse indicator.
 * Linked styles: Tailwind utilities from src/index.css, uses shared brand icons.
 * External script: GSAP (src/lib/gsap.ts) for entrance and hover animations.
 */
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../components/icons/SocialIcons";

export default function FooterSection() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([".footer-icons", ".footer-text", ".footer-pulse"], {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      footerRef.current
        ?.querySelectorAll(".footer-icons a")
        .forEach((icon) => {
          const svg = icon.querySelector("svg");
          if (!svg) return;
          const hoverColor = icon.dataset.hoverColor || "#FF6B6B";
          const initialColor = "#808080";
          icon.addEventListener("mouseenter", () =>
            gsap.to(svg, {
              color: hoverColor,
              scale: 1.15,
              y: -3,
              duration: 0.25,
              ease: "power1.out",
            })
          );
          icon.addEventListener("mouseleave", () =>
            gsap.to(svg, {
              color: initialColor,
              scale: 1,
              y: 0,
              duration: 0.2,
              ease: "power1.in",
            })
          );
        });

      gsap.to(".footer-pulse-dot", {
        scale: 1.5,
        opacity: 0.5,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
        delay: 1,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative bg-gray-100 text-[#808080] py-10 sm:py-12 z-10 border-t border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <div className="footer-icons flex justify-center space-x-6 sm:space-x-8 mb-5 sm:mb-6">
          <a
            href="https://github.com/RitikDutta"
            target="_blank"
            rel="noreferrer"
            data-hover-color="#181717"
            className="group"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/ritikdutta/"
            target="_blank"
            rel="noreferrer"
            data-hover-color="#0A66C2"
            className="group"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://x.com/RitikDutta7"
            target="_blank"
            rel="noreferrer"
            data-hover-color="#1DA1F2"
            className="group"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </a>
        </div>
        <p className="footer-text text-sm font-light font-['Karla'] text-[#808080]">
          Designed & Crafted with <span className="text-[#FF6B6B] mx-1" aria-label="love">
            ♡
          </span>{" "}
          by Ritik Dutta
          <span className="footer-pulse inline-block ml-2 relative top-[1px]" aria-hidden="true">
            <span className="footer-pulse-dot absolute w-1.5 h-1.5 bg-[#FF6B6B] rounded-full opacity-100"></span>
            <span className="w-1.5 h-1.5 inline-block"></span>
          </span>
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
