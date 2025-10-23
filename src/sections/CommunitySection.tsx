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
        const hoverBorderColor = "#FF6B6B";
        const htl = gsap.timeline({ paused: true });
        htl.to(
          card,
          {
            y: -6,
            scale: 1.03,
            boxShadow: "0 8px 20px rgba(0,0,0,0.09)",
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
      className="relative py-16 md:py-24 lg:py-28 text-center bg-white text-[#808080] overflow-hidden"
    >
      <div className="relative z-10">
        <h2 className="community-header text-3xl sm:text-4xl md:text-5xl font-bold mb-3 font-['Playfair Display'] text-black tracking-tight px-4">
          Beyond the Code
        </h2>
        <p className="community-header max-w-2xl mx-auto px-4 text-base sm:text-lg mb-12 md:mb-16 leading-relaxed font-['Karla'] text-[#808080]">
          Giving back fuels the things I build. A snapshot of the community moments that inspire me.
        </p>
      </div>

      <div className="marquee-wrapper relative">
        <div className="overflow-x-hidden">
          <div
            ref={containerRef}
            className="flex space-x-6 sm:space-x-8 md:space-x-10 will-change-transform"
          >
            {fullList.map((item, index) => (
              <article
                key={`${item.heading}-${index}`}
                className="comm-card opacity-0 min-w-[280px] sm:min-w-[320px] md:min-w-[360px] bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-transform duration-300"
              >
                {/* media wrapper now has a class for reveal */}
                <div className="comm-media relative h-44 sm:h-48 md:h-56 overflow-hidden bg-gray-100">
                  <img
                    src={item.img}
                    alt={item.heading}
                    className="comm-card-img w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="p-5 text-left">
                  <h3 className="text-lg sm:text-xl font-semibold font-['Playfair Display'] text-black mb-2">
                    {item.heading}
                  </h3>
                  <p className="text-sm text-[#707070] leading-relaxed mb-4 font-['Karla']">
                    {item.description}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A0A0A0] font-['Karla']">
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
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 md:w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 md:w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-10"
        />
      </div>
    </section>
  );
}
