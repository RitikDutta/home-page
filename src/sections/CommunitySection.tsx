// @ts-nocheck
/**
 * Community impact marquee + appear animations.
 * Keeps your horizontal marquee intact; adds on-scroll entrance reveals.
 */
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const images = [
  {
    img: "/social_impact_food_drive.jpeg",
    heading: "Food Drive",
    description:
      "As a committed volunteer, I've had the honor of serving our community, especially on meaningful days like Independence Day. I spearheaded food drives, collecting staples like rice, daals, and aata, and distributed them to needy families in neighboring villages, fostering a shared sense of nourishment and hope in our celebrations.",
    date: "Oct 2023",
  },
  {
    img: "/social_impact_food_drive_2.jpeg",
    heading: "Food Drive",
    description:
      "Sharing Meals, Spreading Hope: As the volunteer in the blue shirt, I've experienced the joy of serving meals and smiles to children in need. Each plate is a blend of kindness and compassion, a belief in a brighter future for every child. Together, let's take steps towards eradicating hunger, one meal at a time.",
    date: "Nov 2023",
  },
  {
    img: "/social_impact_plantation.jpeg",
    heading: "Plantation Drive",
    description:
      "Planting Tomorrow: As an Environmental Conservation Volunteer, I embrace the role of Earth's steward, nurturing the future with each tree planted. Each sapling signifies hope, a step towards ecological restoration and a legacy for the coming generations. Together, we stand as guardians of nature's splendor, weaving our efforts into the tapestry of Earth's well-being.",
    date: "Mar 2024",
  },
  {
    img: "/social_impact_food_drive_3.jpeg",
    heading: "Food Drive",
    description:
      "Cultivating Futures: Each meal I serve as a Food Assistance Volunteer brings hope and nourishment to underprivileged children. Beyond sustenance, it's a gesture of kindness and a step towards a world where no child goes hungry. Join in this journey of compassion, one meal at a time.",
    date: "May 2024",
  },
  {
    img: "/social_impact_3.jpeg",
    heading: "Community Impact",
    description: "Making a difference in the community.",
    date: "Jun 2024",
  },
];

const fullList = [...images, ...images];

export default function CommunitySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const setupMarqueeRef = useRef<() => void>();

  useEffect(() => {
    const container = containerRef.current;
    const cards = gsap.utils.toArray<HTMLElement>(".comm-card");
    if (!cards.length || !container) return;

    let boundMouseEnter: (() => void) | null = null;
    let boundMouseLeave: (() => void) | null = null;
    let boundRefreshInit: (() => void) | null = null;
    let boundRefresh: (() => void) | null = null;

    // ---------- marquee (unchanged) ----------
    setupMarqueeRef.current = () => {
      if (!cards[0]) return;
      const cardElement = cards[0];
      const cardStyle = getComputedStyle(cardElement);
      const cardWidth = cardElement.offsetWidth || 300;
      const marginRight = parseFloat(cardStyle.marginRight) || 16;
      const totalCardSpace = cardWidth + marginRight;
      const singleLoopWidth = totalCardSpace * images.length;

      gsap.set(container, { width: singleLoopWidth * 2 });

      if (animationRef.current) animationRef.current.kill();

      animationRef.current = gsap.to(container, {
        x: `-=${singleLoopWidth}`,
        duration: 60,
        ease: "none",
        repeat: -1,
        modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % -singleLoopWidth) },
        overwrite: true,
      });

      const marqueeWrapper = sectionRef.current?.querySelector(".marquee-wrapper");
      if (marqueeWrapper) {
        if (boundMouseEnter) marqueeWrapper.removeEventListener("mouseenter", boundMouseEnter);
        if (boundMouseLeave) marqueeWrapper.removeEventListener("mouseleave", boundMouseLeave);

        boundMouseEnter = () => animationRef.current?.timeScale(0.2);
        boundMouseLeave = () => animationRef.current?.timeScale(1);

        marqueeWrapper.addEventListener("mouseenter", boundMouseEnter);
        marqueeWrapper.addEventListener("mouseleave", boundMouseLeave);
      }
    };

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".community-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // ---------- NEW: card appear animations ----------
      // initial state for cards
      gsap.set(cards, {
        opacity: 0,
        y: 26,
        rotateX: 4,
        filter: "blur(4px)",
        transformOrigin: "center bottom",
        willChange: "transform, opacity, filter",
      });

      cards.forEach((card, i) => {
        const media = card.querySelector(".comm-media") as HTMLElement | null;
        const img = card.querySelector(".comm-card-img") as HTMLElement | null;

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
            invalidateOnRefresh: true,
          },
          delay: i * 0.06, // subtle cascade
        });

        // card fade-up + de-skew + de-blur
        tl.to(card, { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", duration: 0.65 });

        // media reveal (clip mask + de-zoom)
        if (media) {
          tl.fromTo(
            media,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power4.out" },
            "-=0.45"
          );
        }
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.05, opacity: 0.0 },
            { scale: 1.0, opacity: 1, duration: 0.7, ease: "power4.out" },
            "-=0.6"
          );
        }

        // existing hover micro-interactions
        const hoverBorderColor = "#94B8C4";
        const htl = gsap.timeline({ paused: true });
        htl.to(
          card,
          {
            y: -6,
            scale: 1.03,
            boxShadow: "0 12px 28px rgba(148, 184, 196, 0.25)",
            borderColor: hoverBorderColor,
            duration: 0.3,
            ease: "power1.out",
          },
          0
        );
        if (img) {
          htl.to(
            img,
            {
              scale: 1.08,
              duration: 0.35,
              ease: "power1.out",
            },
            0
          );
        }
        card.addEventListener("mouseenter", () => htl.play());
        card.addEventListener("mouseleave", () => htl.reverse());
      });

      // reduced motion: nix animations
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { clearProps: "all", opacity: 1, y: 0, rotateX: 0, filter: "none" });
      });
    }, sectionRef);

    const setupTimeout = setTimeout(() => setupMarqueeRef.current?.(), 150);

    boundRefreshInit = () => {
      clearTimeout(setupTimeout);
      if (animationRef.current) animationRef.current.kill();
    };
    boundRefresh = () => {
      setupMarqueeRef.current?.();
    };

    ScrollTrigger.addEventListener("refreshInit", boundRefreshInit);
    ScrollTrigger.addEventListener("refresh", boundRefresh);

    return () => {
      clearTimeout(setupTimeout);
      if (animationRef.current) animationRef.current.kill();

      ScrollTrigger.removeEventListener("refreshInit", boundRefreshInit);
      ScrollTrigger.removeEventListener("refresh", boundRefresh);
      const marqueeWrapper = sectionRef.current?.querySelector(".marquee-wrapper");
      if (marqueeWrapper) {
        if (boundMouseEnter) marqueeWrapper.removeEventListener("mouseenter", boundMouseEnter);
        if (boundMouseLeave) marqueeWrapper.removeEventListener("mouseleave", boundMouseLeave);
      }

      ctx.revert();
    };
  }, []);

  return (
    <section
      id="community"
      ref={sectionRef}
      className="community-section relative overflow-hidden py-16 md:py-24 lg:py-28 text-center"
    >
      <div aria-hidden="true" className="community-ambient community-ambient--left" />
      <div aria-hidden="true" className="community-ambient community-ambient--right" />
      <div aria-hidden="true" className="community-ambient community-ambient--top" />

      <div className="relative z-20">
        <span className="community-header inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/30 px-4 py-2 text-[0.65rem] uppercase tracking-[0.4em] text-[#5F7E91] backdrop-blur-sm">
          Gentle footprints
        </span>
        <h2 className="community-header mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1f2a37] font-['Playfair Display'] px-4">
          Quiet moments of community care
        </h2>
        <p className="community-header max-w-2xl mx-auto px-4 mt-4 text-base sm:text-lg leading-relaxed font-['Karla'] text-[#5b7186]">
          Slow mornings spent in gardens, shared meals under open skies, and small hands clasped in celebration.
          These scenes remind me to build with softness and intention.
        </p>
      </div>

      <div className="marquee-wrapper relative z-20 mt-12 md:mt-16">
        <div className="overflow-x-hidden">
          <div
            ref={containerRef}
            className="flex space-x-6 sm:space-x-8 md:space-x-10 will-change-transform"
          >
            {fullList.map((item, index) => (
              <article
                key={`${item.heading}-${index}`}
                className="comm-card opacity-0 min-w-[280px] sm:min-w-[320px] md:min-w-[360px] rounded-3xl border border-white/60 bg-white/70 shadow-[0_26px_70px_-48px_rgba(91,113,134,0.5)] overflow-hidden transition-transform duration-300 backdrop-blur-xl"
              >
                {/* media wrapper now has a class for reveal */}
                <div className="comm-media relative h-44 sm:h-48 md:h-56 overflow-hidden bg-[#e7f2f8]">
                  <img
                    src={item.img}
                    alt={item.heading}
                    className="comm-card-img w-full h-full object-cover saturate-95"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f1f2e]/55 via-[#0f1f2e]/10 to-transparent pointer-events-none" />
                </div>
                <div className="p-5 text-left">
                  <h3 className="text-lg sm:text-xl font-semibold font-['Playfair Display'] text-[#1f2a37] mb-2">
                    {item.heading}
                  </h3>
                  <p className="text-sm text-[#567089] leading-relaxed mb-4 font-['Karla']">
                    {item.description}
                  </p>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#7c93a6] font-['Karla']">
                    {item.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* fade edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-14 sm:w-20 md:w-28 bg-gradient-to-r from-[#f4f9ff] via-white/70 to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-20 md:w-28 bg-gradient-to-l from-[#f4f9ff] via-white/70 to-transparent z-10"
        />
      </div>
    </section>
  );
}
