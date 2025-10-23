// @ts-nocheck
/**
 * Blog highlight grid — upgraded reveals & micro-interactions.
 * Tailwind tokens preserved; GSAP powers appear + hover.
 */
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const blogData = [
  {
    title: "AlexNet in a Nutshell",
    date: "May 2020",
    img: "/blog_alexnet.png",
    snippet:
      "AlexNet was trained on ImageNet datasets consists of 1.2 million data(images) which contains 1000 different classes having 60 million parameters and 650000 neurons consist of 5 convolutional layers",
    link: "https://medium.com/analytics-vidhya/alexnet-in-a-nutshell-4a9445e92d6d?source=user_profile---------3----------------------------",
  },
  {
    title: "LeNet in a nutshell",
    date: "May 2020",
    img: "/blog_lenet.jpg",
    snippet:
      "How LeNet works, Architecture, how to train model using LeNet architecture on keras and also how to design a better model than LeNet using same architecture but with different activation, loss functions etc, and compare the accuracy of new LeNet and original LeNet model.",
    link: "https://medium.com/@ritikduttagd/lenet-in-a-nutshell-2303330cc7db?source=user_profile---------4----------------------------",
  },
  {
    title: "Principal Component Analysis(PCA) in a Nutshell",
    date: "Nov 2022",
    img: "/blog_pca.png",
    snippet:
      "With increase in dimensions(like 100's/features) leads to problems like: Time Complexity increases, Difficult to generalize relations, All the time all features are not going to contribute, Hard to find shape of data",
    link: "https://medium.com/@ritikduttagd/principal-component-analysis-pca-in-a-nutshell-6e422e1bb529?source=user_profile---------2----------------------------",
  },
  {
    title: "K-means in a Nutshell",
    date: "Nov 2022",
    img: "/blog_kmeans.png",
    snippet:
      "The K-means clustering algorithm computes centroids and repeats until the optimal centroid is found. It is presumptively known how many clusters there are. It is also known as the flat clustering algorithm.",
    link: "https://medium.com/@ritikduttagd/k-means-in-a-nutshell-6d06c7a78ff7?source=user_profile---------1----------------------------",
  },
  {
    title: "Project Management",
    date: "Dec 2022",
    img: "/blog_project_management.png",
    snippet:
      "A data science project is the most important aspect of a data scientist's work. It is the culmination of all their work and efforts. The structure for a data science project should be set up in such a way that it can be easily followed by other team members.",
    link: "https://medium.com/@ritikduttagd/master-the-art-of-data-science-and-launch-a-top-notch-project-today-4075f46f9dfe?source=user_profile---------0----------------------------",
  },
];

export default function BlogsSection() {
  const blogsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".blogs-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: blogsRef.current,
          start: "top 85%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".blog-card");

      // initial state
      gsap.set(cards, {
        opacity: 0,
        y: 32,
        rotateX: 5,
        filter: "blur(6px)",
        transformOrigin: "center bottom",
        willChange: "transform, opacity, filter",
      });

      // appear animation per card (staggered)
      cards.forEach((card, i) => {
        const media = card.querySelector(".blog-media") as HTMLElement | null;
        const img = card.querySelector(".blog-card-img") as HTMLElement | null;
        const arrow = card.querySelector(".read-arrow") as HTMLElement | null;

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            once: true,
            invalidateOnRefresh: true,
          },
          delay: i * 0.06,
        });

        // card fade-up + de-blur
        tl.to(card, { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", duration: 0.7 });

        // image reveal (clip + scale)
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
            { scale: 1.06, opacity: 0 },
            { scale: 1.0, opacity: 1, duration: 0.7, ease: "power4.out" },
            "-=0.55"
          );
        }

        // hover micro-interactions (tilt + image lift)
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(
          card,
          {
            y: -10,
            rotateY: 5,
            boxShadow: "0 18px 36px -18px rgba(0,0,0,0.18)",
            borderColor: "rgba(59,130,246,0.6)", // blue-500-ish
            duration: 0.35,
            ease: "power2.out",
          },
          0
        );
        if (img) {
          hoverTl.to(
            img,
            {
              scale: 1.07,
              filter: "brightness(1.05)",
              duration: 0.35,
              ease: "power2.out",
            },
            0
          );
        }
        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());

        // link hover (arrow nudge + color)
        if (arrow) {
          const link = arrow.closest("a") as HTMLElement | null;
          if (link) {
            const linkTl = gsap.timeline({ paused: true });
            linkTl
              .to(link, { color: "#3B82F6", duration: 0.2 }, 0)
              .to(arrow, { x: 6, scaleX: 1.15, duration: 0.25, ease: "power2.inOut" }, 0);

            link.addEventListener("mouseenter", () => linkTl.play());
            link.addEventListener("mouseleave", () => linkTl.reverse());
            link.addEventListener("focus", () => linkTl.play());
            link.addEventListener("blur", () => linkTl.reverse());
          }
        }
      });

      // reduced motion support
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".blog-card", { clearProps: "all", opacity: 1, y: 0, rotateX: 0, filter: "none" });
      });
    }, blogsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blogs"
      ref={blogsRef}
      className="relative py-16 md:py-24 lg:py-28 bg-gray-50 text-[#808080] overflow-hidden"
    >
      {/* ambient background (very subtle) */}
      <div className="blog-ambient pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="blogs-header text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 font-['Playfair Display'] text-black tracking-tight">
          Ideas & Insights
        </h2>
        <p className="blogs-header text-center mb-12 md:mb-16 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-['Karla'] text-[#808080]">
          Exploring the intersections of technology, creativity, science, and the human experience.
        </p>

        <div className="blogs-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogData.map((blog) => (
            <article
              key={blog.title}
              className="blog-card bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-lg focus-within:shadow-lg"
              style={{ perspective: "1000px", transformOrigin: "center" }}
            >
              <div className="blog-media relative overflow-hidden h-48 sm:h-56 bg-gray-100">
                {/* optional shine overlay */}
                <div className="blog-shine pointer-events-none" aria-hidden />
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="blog-card-img w-full h-full object-contain bg-gray-50"
                />
                {/* bottom gradient for text harmony if images are busy */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-grow bg-white">
                <h3 className="font-semibold text-base sm:text-lg mb-1 font-['Playfair Display'] text-black tracking-tight">
                  {blog.title}
                </h3>
                <p className="text-xs mb-2 sm:mb-3 font-['Karla'] text-[#A0A0A0]">
                  {blog.date}
                </p>
                <p className="text-sm flex-grow leading-relaxed mb-3 sm:mb-4 font-['Karla'] text-[#606060] line-clamp-3">
                  {blog.snippet}
                </p>
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto self-start text-sm font-semibold font-['Karla'] text-[#404040] hover:text-[#3B82F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-full px-1"
                >
                  Read more <span className="read-arrow inline-block align-baseline">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
