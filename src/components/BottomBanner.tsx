// @ts-nocheck
/**
 * Fixed marquee banner at the bottom of the viewport.
 * Linked styles: inline keyframes plus Tailwind utility classes from src/index.css.
 * External script: GSAP (src/lib/gsap.ts) animates entrance on mount.
 */
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function BottomBanner() {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const marqueeText =
    "Always exploring... Building with curiosity... Connecting ideas... Debugging the universe... ";

  useEffect(() => {
    if (!bannerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(bannerRef.current, {
        duration: 0.8,
        yPercent: 100,
        opacity: 0,
        ease: "power2.out",
        delay: 2,
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes marqueeLight { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        @keyframes simplePulse { 0%, 100% { opacity: 0.5; box-shadow: 0 0 6px 0px rgba(255, 107, 107, 0.4); } 50% { opacity: 1; box-shadow: 0 0 10px 2px rgba(255, 107, 107, 0.6); } }

        .marquee-container-light {
            position: absolute; top: 0; right: 0; height: 100%;
            overflow: hidden; display: flex; align-items: center;
            left: 2.5rem;
            mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }
        .bannerTextWrapper-light {
             white-space: nowrap; will-change: transform; display: flex;
             animation: marqueeLight 30s linear infinite;
         }
        .bannerText-light {
            display: inline-block;
            padding-right: 30px;
            font-family: 'Karla', Arial, sans-serif;
            font-size: 0.75rem;
            font-style: italic;
            color: #808080;
        }
        .status-indicator {
            position: absolute;
            left: 1rem;
            top: 50%; transform: translateY(-50%);
            width: 8px; height: 8px;
            background-color: #FF6B6B; border-radius: 50%;
            animation: simplePulse 2s ease-in-out infinite;
        }
        @media (min-width: 640px) {
            .marquee-container-light { left: 3rem; }
            .bannerTextWrapper-light { animation-duration: 40s; }
            .bannerText-light { font-size: 0.8rem; padding-right: 40px; }
            .status-indicator { left: 1.25rem; }
        }
      `}</style>

      <div
        ref={bannerRef}
        className="fixed bottom-0 left-0 w-full h-10 bg-white/85 backdrop-blur-sm text-[#808080] z-[50] border-t border-gray-200/80 shadow-[0_-2px_5px_rgba(0,0,0,0.03)]"
      >
        <div className="w-full h-full relative">
          <div className="status-indicator"></div>
          <div className="marquee-container-light">
            <div className="bannerTextWrapper-light">
              <span className="bannerText-light">{marqueeText}</span>
              <span className="bannerText-light" aria-hidden="true">
                {marqueeText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
