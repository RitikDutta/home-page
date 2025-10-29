// @ts-nocheck
/**
 * Community section – scroll driven storytelling inspired by community/index.html.
 * Uses GSAP ScrollTrigger so the layered photo stack works across browsers.
 */
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import "../styles/community-scroll.css";

const communityStories = [
  {
    id: "community-nourish",
    title: "Nourishing Journeys",
    accent: "Food drives that wrap families in care.",
    description:
      "As a committed volunteer, I've had the honor of supporting nearby villages on festival days. We collected rice, daals, and aata, then delivered them door-to-door so families could celebrate without worry.",
    date: "Oct 2023",
    image: {
      src: "/social_impact_food_drive.jpg",
      alt: "Volunteers distributing staple food items during a food drive.",
    },
  },
  {
    id: "community-shared-table",
    title: "Shared Tables",
    accent: "Serving meals that ignite hope.",
    description:
      "Sharing Meals, Spreading Hope: leading school holiday kitchens has shown me how a warm plate can soften the day for dozens of children. Kindness and compassion are the key ingredients we never run short of.",
    date: "Nov 2023",
    image: {
      src: "/social_impact_food_drive_2.jpeg",
      alt: "Smiling volunteers serving lunch to children.",
    },
  },
  {
    id: "community-planting",
    title: "Planting Tomorrow",
    accent: "Every sapling is a promise we tend together.",
    description:
      "As an environmental conservation volunteer, each tree we plant becomes a living reminder that restoration is possible. These drives nurture the land while strengthening the bonds between us.",
    date: "Mar 2024",
    image: {
      src: "/social_impact_plantation.jpeg",
      alt: "Volunteers planting a young tree during a community drive.",
    },
  },
  {
    id: "community-cultivating",
    title: "Cultivating Futures",
    accent: "Meals that nourish bodies and confidence.",
    description:
      "Serving hot lunches to under-resourced children taught me that steady nutrition builds more than strength—it builds belief. Each plate is garnished with encouragement and care.",
    date: "May 2024",
    image: {
      src: "/social_impact_food_drive_3.jpg",
      alt: "Volunteer serving food to children during a mid-day meal drive.",
    },
  },
  {
    id: "community-celebrate",
    title: "Celebration Circles",
    accent: "Festive gatherings powered by shared giving.",
    description:
      "From independence day parades to evening cultural meets, I love hosting spaces where every family feels invited. Crafting those moments of belonging keeps the circle growing.",
    date: "Jun 2024",
    image: {
      src: "/social_impact_3.jpeg",
      alt: "Community members celebrating together at a neighborhood event.",
    },
  },
];

const ordinalClass = ["first", "second", "third", "fourth", "fifth"];
const rotationAngles = [8, -6, 16, -12, 6];
const stackLayouts = [
  { xPercent: 0, yPercent: 0, scale: 1, opacity: 1, blur: 0, zIndex: 50 },
  { xPercent: 12, yPercent: 8, scale: 0.95, opacity: 0.85, blur: 2, zIndex: 40 },
  { xPercent: 26, yPercent: 18, scale: 0.9, opacity: 0.7, blur: 4, zIndex: 30 },
  { xPercent: 38, yPercent: 26, scale: 0.84, opacity: 0.55, blur: 5, zIndex: 20 },
  { xPercent: 46, yPercent: 32, scale: 0.8, opacity: 0.48, blur: 6, zIndex: 10 },
];

const exitLayout = {
  xPercent: -40,
  yPercent: -18,
  scale: 0.82,
  opacity: 0,
  blur: 8,
  zIndex: 5,
};

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeStoryIndexRef = useRef(0);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const mobileTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const introItems = gsap.utils.toArray<HTMLElement>(".community-scroll-section__intro > *");

      if (introItems.length) {
        gsap.from(introItems, {
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      mm.add("(max-width: 1023px)", () => {
        const track = mobileTrackRef.current;
        if (!track) return () => {};

        const cards = Array.from(track.querySelectorAll<HTMLElement>(".community-scroll__mobile-card"));
        if (!cards.length) return () => {};

        const baseCount = communityStories.length;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        const teardownTween = () => {
          mobileTweenRef.current?.kill();
          mobileTweenRef.current = null;
          gsap.set(track, { x: 0 });
        };

        const computeLoopWidth = () => {
          const primary = cards.slice(0, baseCount);
          if (!primary.length) return 0;
          const style = window.getComputedStyle(track);
          const gap = parseFloat(style.columnGap || style.gap || "0");
          let total = 0;
          primary.forEach((card, idx) => {
            total += card.offsetWidth;
            if (idx !== primary.length - 1) total += gap;
          });
          return total;
        };

        const setupTween = () => {
          const loopWidth = computeLoopWidth();
          if (!loopWidth) {
            teardownTween();
            return;
          }

          gsap.set(track, { x: 0 });
          gsap.set(track, { x: 0 });
          mobileTweenRef.current?.kill();

          const duration = Math.max(28, loopWidth / 60);

          mobileTweenRef.current = gsap.to(track, {
            x: -loopWidth,
            duration,
            ease: "none",
            repeat: -1,
            modifiers: {
              x: (value) => {
                const current = parseFloat(value);
                if (!loopWidth || Number.isNaN(current)) return value;
                let mod = current % -loopWidth;
                if (mod > 0) mod -= loopWidth;
                return `${mod}px`;
              },
            },
          });
        };

        if (prefersReducedMotion.matches) {
          teardownTween();
        } else {
          setupTween();
        }

        const handleResize = () => {
          if (prefersReducedMotion.matches) return;
          setupTween();
        };

        window.addEventListener("resize", handleResize);
        ScrollTrigger.addEventListener("refreshInit", handleResize);

        let motionHandler: ((event: MediaQueryListEvent) => void) | null = null;
        if (typeof prefersReducedMotion.addEventListener === "function") {
          motionHandler = (event) => {
            if (event.matches) {
              teardownTween();
            } else {
              setupTween();
            }
          };
          prefersReducedMotion.addEventListener("change", motionHandler);
        }

        const carousel = track.closest<HTMLElement>(".community-scroll__mobile-carousel");
        const handlePointerEnter = () => mobileTweenRef.current?.timeScale(0.35);
        const handlePointerLeave = () => mobileTweenRef.current?.timeScale(1);

        if (carousel && !prefersReducedMotion.matches) {
          carousel.addEventListener("pointerenter", handlePointerEnter);
          carousel.addEventListener("pointerleave", handlePointerLeave);
          carousel.addEventListener("pointerdown", handlePointerEnter);
          carousel.addEventListener("pointerup", handlePointerLeave);
        }

        requestAnimationFrame(() => {
          if (!prefersReducedMotion.matches) setupTween();
        });

        return () => {
          window.removeEventListener("resize", handleResize);
          ScrollTrigger.removeEventListener("refreshInit", handleResize);

          if (motionHandler && typeof prefersReducedMotion.removeEventListener === "function") {
            prefersReducedMotion.removeEventListener("change", motionHandler);
          }

          if (carousel && !prefersReducedMotion.matches) {
            carousel.removeEventListener("pointerenter", handlePointerEnter);
            carousel.removeEventListener("pointerleave", handlePointerLeave);
            carousel.removeEventListener("pointerdown", handlePointerEnter);
            carousel.removeEventListener("pointerup", handlePointerLeave);
          }

          teardownTween();
        };
      });

      mm.add("(min-width: 1024px)", () => {
        const pictures = gsap.utils.toArray<HTMLElement>(".community-scroll__picture");
        const lockups = gsap.utils.toArray<HTMLElement>(".community-scroll__lockup");
        const dots = gsap.utils.toArray<HTMLElement>(".community-scroll__pagination-dots a");
        const visual = sectionRef.current?.querySelector<HTMLElement>(".community-scroll__visual");
        const storiesContainer = sectionRef.current?.querySelector<HTMLElement>(".community-scroll__stories");
        const scrollContainer = sectionRef.current?.querySelector<HTMLElement>(".community-scroll");

        if (!pictures.length || !lockups.length || !visual || !storiesContainer || !scrollContainer) {
          return () => {};
        }

        const dynamicTriggers: ScrollTrigger[] = [];

        const applyStack = (activeIndex: number, immediate = false) => {
          const total = pictures.length;
          const targetIndex = Math.max(0, Math.min(total - 1, activeIndex));

          pictures.forEach((picture, idx) => {
            const delta = idx - targetIndex;
            let layout;

            if (delta === 0) {
              layout = stackLayouts[0];
            } else if (delta > 0) {
              layout = stackLayouts[Math.min(delta, stackLayouts.length - 1)];
            } else {
              layout = exitLayout;
            }

            const baseProps = {
              xPercent: layout.xPercent,
              yPercent: layout.yPercent,
              scale: layout.scale,
              opacity: layout.opacity,
              filter: `blur(${layout.blur}px)`,
              zIndex: layout.zIndex,
              rotate: rotationAngles[idx] ?? rotationAngles[rotationAngles.length - 1] ?? 0,
              transformOrigin: "bottom left",
            };

            if (immediate) {
              gsap.set(picture, baseProps);
            } else {
              gsap.to(picture, {
                ...baseProps,
                duration: 0.85,
                ease: "power3.out",
              });
            }
          });
        };

        const setBaseState = (activeIndex = activeStoryIndexRef.current) => {
          const currentIndex = Math.max(0, Math.min(pictures.length - 1, activeIndex));
          applyStack(currentIndex, true);

          dots.forEach((dot, index) => {
            const isActive = index === currentIndex;
            gsap.set(dot, {
              backgroundColor: isActive ? "rgba(217, 75, 107, 0.95)" : "transparent",
              scale: isActive ? 1.05 : 1,
            });
          });

          lockups.forEach((lockup, index) => {
            gsap.set(lockup, { opacity: index === currentIndex ? 1 : 0.25 });
          });

          activeStoryIndexRef.current = currentIndex;
        };

        const activate = (index: number) => {
          const clampedIndex = Math.max(0, Math.min(pictures.length - 1, index));
          if (clampedIndex === activeStoryIndexRef.current) return;
          activeStoryIndexRef.current = clampedIndex;

          applyStack(clampedIndex);

          dots.forEach((dot, idx) => {
            gsap.to(dot, {
              backgroundColor: idx === clampedIndex ? "rgba(217, 75, 107, 0.95)" : "transparent",
              scale: idx === clampedIndex ? 1.08 : 1,
              duration: 0.35,
              ease: "power2.out",
            });
          });

          lockups.forEach((lockup, idx) => {
            const isActive = idx === clampedIndex;
            gsap.to(lockup, {
              opacity: isActive ? 1 : 0.25,
              duration: 0.6,
              ease: "power2.out",
            });
          });
        };

        setBaseState(0);

        const computePinDistance = () => {
          const storiesHeight = storiesContainer.scrollHeight;
          const visualHeight = visual.offsetHeight;
          const minDistance = window.innerHeight * Math.max(communityStories.length - 1, 1);
          const difference = storiesHeight - visualHeight;
          return Math.max(difference, minDistance);
        };

        const pinTrigger = ScrollTrigger.create({
          trigger: scrollContainer,
          start: "top top",
          end: () => `+=${computePinDistance()}`,
          pin: visual,
          pinSpacing: true,
          anticipatePin: 0.8,
          invalidateOnRefresh: true,
          onRefresh: () => {
            setBaseState(activeStoryIndexRef.current);
          },
        });
        dynamicTriggers.push(pinTrigger);

        lockups.forEach((lockup, index) => {
          const inner = lockup.querySelector<HTMLElement>(".community-scroll__lockup-inner");
          if (inner) {
            gsap.from(inner, {
              opacity: 0,
              y: 60,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: lockup,
                start: "top 85%",
                once: true,
              },
            });
          }

          const trigger = ScrollTrigger.create({
            trigger: lockup,
            start: "top 70%",
            end: "bottom 70%",
            onEnter: () => activate(index),
            onEnterBack: () => activate(index),
          });

          dynamicTriggers.push(trigger);
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          dynamicTriggers.forEach((trigger) => trigger.kill());
        };
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  const baseStoryCount = communityStories.length;
  const mobileCarouselItems = [...communityStories, ...communityStories];

  return (
    <section
      id="community"
      ref={sectionRef}
      className="community-scroll-section relative overflow-hidden py-16 md:py-24 lg:py-28"
    >
      <div className="community-scroll-section__intro text-center">
        <span className="community-scroll-kicker inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/40 px-4 py-2 text-[0.65rem] uppercase tracking-[0.4em] text-[#4c6a7a] backdrop-blur-sm">
          Gentle footprints
        </span>
        <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#15202b] font-['Playfair Display'] px-4">
          Quiet moments of community care
        </h2>
        <p className="max-w-2xl mx-auto px-4 mt-4 text-base sm:text-lg leading-relaxed font-['Karla'] text-[#4c6577]">
          Slow mornings spent in gardens, shared meals under open skies, and small hands clasped in celebration. These
          stories remind me to build with softness and intention.
        </p>
      </div>

      <div className="community-scroll">
        <div className="community-scroll__visual" aria-hidden="true">
          {communityStories.map((story, index) => (
            <picture
              key={story.id}
              className={`community-scroll__picture community-scroll__picture--${ordinalClass[index]}`}
            >
              <img src={story.image.src} alt={story.image.alt} loading="lazy" />
            </picture>
          ))}
        </div>

        <div className="community-scroll__stories">
          {communityStories.map((story, index) => (
            <article
              key={story.id}
              id={story.id}
              className={`community-scroll__lockup community-scroll__lockup--${ordinalClass[index]}`}
            >
              <div className="community-scroll__lockup-inner">
                <p className="community-scroll__meta">{story.date}</p>
                <h3>{story.title}</h3>
                <p className="community-scroll__accent">{story.accent}</p>
                <p className="community-scroll__body">{story.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="community-scroll__mobile">
          <div className="community-scroll__mobile-carousel">
            <div className="community-scroll__mobile-track" ref={mobileTrackRef}>
              {mobileCarouselItems.map((story, index) => {
                const isDuplicate = index >= baseStoryCount;
                return (
                  <article
                    key={`${story.id}-${index}`}
                    className="community-scroll__mobile-card"
                    aria-hidden={isDuplicate ? "true" : undefined}
                  >
                    <div className="community-scroll__mobile-media">
                      <img src={story.image.src} alt={story.image.alt} loading="lazy" />
                    </div>
                    <div className="community-scroll__mobile-content">
                      <p className="community-scroll__mobile-meta">{story.date}</p>
                      <h3>{story.title}</h3>
                      <p className="community-scroll__mobile-accent">{story.accent}</p>
                      <p className="community-scroll__mobile-body">{story.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="community-scroll__mobile-fade community-scroll__mobile-fade--left" aria-hidden="true" />
            <div className="community-scroll__mobile-fade community-scroll__mobile-fade--right" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="community-scroll__pagination" aria-hidden="true">
        <div className="community-scroll__pagination-dots">
          {communityStories.map((story) => (
            <a key={story.id} href={`#${story.id}`} aria-label={`Jump to ${story.title}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
