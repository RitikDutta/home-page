import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- NEW COLOR & FONT DEFINITIONS ---
// Base: #1a2035
// Card BG: #2a304d
// Accent 1 (Nebula Pink): #e6398a / #ff7eb3
// Accent 2 (Starlight Gold): #facc15 / #ffda47
// Text Light: #e0e0e0
// Text Muted: #b0b0b0
// Font: Using 'Poppins' for headings, 'Lato' for body (ensure these are imported/linked in your project)

// ====================== STARFIELD BACKGROUND COMPONENT ======================
function StarfieldBackground() {
  // Creates a reusable starfield layer
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Layer 1 - Small Stars */}
      <div className="absolute inset-0 star-layer star-layer-1"></div>
      {/* Layer 2 - Medium Stars */}
      <div className="absolute inset-0 star-layer star-layer-2"></div>
      {/* Layer 3 - Large Stars */}
      <div className="absolute inset-0 star-layer star-layer-3"></div>
      {/* Soft Nebula Gradients */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#e6398a]/10 via-transparent to-transparent blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#facc15]/10 via-transparent to-transparent blur-3xl opacity-40 animation-delay-2000"></div>
       <style>{`
        .star-layer {
          background-image: radial-gradient(1px 1px at 25px 5px, #e0e0e0, transparent),
                            radial-gradient(1px 1px at 50px 25px, #b0b0b0, transparent),
                            radial-gradient(1px 1px at 100px 60px, #e0e0e0, transparent),
                            radial-gradient(1px 1px at 150px 100px, #b0b0b0, transparent),
                            radial-gradient(1px 1px at 200px 150px, #e0e0e0, transparent);
          background-repeat: repeat;
          background-size: 200px 200px; /* Control density */
          animation: drift 150s linear infinite alternate;
        }
        .star-layer-1 { opacity: 0.5; animation-duration: 120s; }
        .star-layer-2 { opacity: 0.7; background-size: 300px 300px; animation-duration: 180s; animation-delay: -30s; transform: scale(1.2); }
        .star-layer-3 { opacity: 0.4; background-size: 400px 400px; animation-duration: 240s; animation-delay: -60s; transform: scale(1.5); }

        @keyframes drift {
          from { transform: translateX(0) translateY(0); }
          to { transform: translateX(50px) translateY(30px); }
        }
        /* Improve performance on animations */
        .star-layer, .glowing-orb {
            will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}


// ====================== HERO SECTION ======================
function Hero() {
  const heroRef = useRef(null);
  const subtitleIntervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold interval ID

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Overall Section Fade In ---
      gsap.from(heroRef.current, { opacity: 0, duration: 1.5, ease: "power3.inOut" });

      // --- Floating Orbs ---
      gsap.fromTo(".glowing-orb",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: gsap.utils.random(0.3, 0.7),
          duration: 2,
          stagger: 0.3,
          ease: "elastic.out(1, 0.5)",
          delay: 0.5,
        }
      );
      gsap.to(".glowing-orb", {
        x: () => "+=" + gsap.utils.random(-50, 50),
        y: () => "+=" + gsap.utils.random(-50, 50),
        rotation: () => "+=" + gsap.utils.random(-30, 30),
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        delay: 2.5, // Start floating after initial appearance
      });

      // --- Profile Image ---
       gsap.from(".profile-container", {
            yPercent: 50,
            opacity: 0,
            scale: 0.8,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: 0.8
      });
       gsap.to(".profile-img", { // Subtle float
           yPercent: -5,
           duration: 3,
           ease: "sine.inOut",
           repeat: -1,
           yoyo: true,
           delay: 2
       });


      // --- Text Elements (Staggered Fade & Drift Up) ---
      const timeline = gsap.timeline({ delay: 1.2 }); // Start after orbs appear
      timeline
        .from(".hero-name span", { // Assuming name is wrapped in spans
          y: 50,
          opacity: 0,
          rotationX: -60,
          stagger: 0.06,
          duration: 0.8,
          ease: "back.out(1.7)",
          transformOrigin: "50% 100%",
        })
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .from(".hero-description", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(".hero-buttons a", { y: 30, opacity: 0, scale: 0.9, stagger: 0.15, duration: 0.6, ease: "back.out(1.4)" }, "-=0.4")
        .from(".social-icons a", { y: 20, opacity: 0, scale: 0.8, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3");

        // Subtitle Morphing (adapted style)
        const subtitles = ["Full Stack Developer", "AI / ML Specialist", "Creative Technologist", "Digital Dreamer"];
        let currentIndex = 0;
        const subtitleElement = document.querySelector(".hero-subtitle");

        const animateSubtitle = () => {
            if (!subtitleElement) return; // Guard clause
            gsap.to(subtitleElement, {
                duration: 0.4,
                opacity: 0,
                y: 10,
                ease: "power2.in",
                onComplete: () => {
                    if (subtitleElement) { // Check again inside onComplete
                        currentIndex = (currentIndex + 1) % subtitles.length;
                        subtitleElement.textContent = subtitles[currentIndex];
                        gsap.to(subtitleElement, {
                            duration: 0.4,
                            opacity: 1,
                            y: 0,
                            ease: "power2.out"
                        });
                    }
                }
            });
        };
        // Store interval ID in ref for cleanup
        subtitleIntervalRef.current = setInterval(animateSubtitle, 3500);

        // --- Button Hover Effects ---
        document.querySelectorAll('.hero-buttons a').forEach(button => {
            const hoverColor = button.dataset.hoverColor || "#ff7eb3"; // Nebula Pink default
            const initialBorder = gsap.getProperty(button, "borderColor");

            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    boxShadow: `0 0 25px 5px ${hoverColor}33`, // Soft glow
                    borderColor: hoverColor,
                    y: -3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    boxShadow: '0 0 0px 0px transparent',
                    borderColor: initialBorder,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.in"
                });
            });
             // Click remains similar
             button.addEventListener('mousedown', () => gsap.to(button, { scale: 0.97, duration: 0.1 }));
             button.addEventListener('mouseup', () => gsap.to(button, { scale: 1.05, duration: 0.2, ease: "back.out(2)" }));
             button.addEventListener('mouseleave', () => { // Ensure it resets if mouse leaves while pressed
                 if (gsap.getProperty(button, "scale") !== 1) {
                     gsap.to(button, { scale: 1, y: 0, duration: 0.2, overwrite: true }); // Overwrite any pending scale down
                 }
             });
        });

         // --- Social Icon Hover Effects ---
         document.querySelectorAll('.social-icons a').forEach(icon => {
            const hoverColor = icon.dataset.hoverColor || "#ffda47"; // Starlight Gold default
            const svgElement = icon.querySelector('svg');
            if (!svgElement) return; // Guard clause
            const initialColor = gsap.getProperty(svgElement, "color");
            const glowElement = icon.querySelector('.icon-glow');

             icon.addEventListener('mouseenter', () => {
                gsap.to(icon, { y: -4, scale: 1.1, duration: 0.3, ease: 'power2.out' });
                gsap.to(svgElement, { color: hoverColor, duration: 0.3 });
                if (glowElement) gsap.to(glowElement, { opacity: 0.5, scale: 1.5, duration: 0.3 });
            });
            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, { y: 0, scale: 1, duration: 0.3, ease: 'power2.in' });
                gsap.to(svgElement, { color: initialColor, duration: 0.3 });
                if (glowElement) gsap.to(glowElement, { opacity: 0, scale: 1, duration: 0.3 });
            });
        });

    }, heroRef);

    // Cleanup function
    return () => {
        if (subtitleIntervalRef.current) {
            clearInterval(subtitleIntervalRef.current); // Clear the interval
        }
        ctx.revert(); // Cleanup GSAP animations
    };
  }, []); // Empty dependency array ensures this runs once on mount

   // Wrap name for animation
   const name = "Hey, I'm Ritik Dutta";
   const nameSpans = name.split("").map((char, i) => (
     <span key={i} className="inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
       {char}
     </span>
   ));

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center text-center bg-[#1a2035] text-[#e0e0e0] px-4 overflow-hidden font-['Lato']"
    >
      <StarfieldBackground />

      {/* Floating Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="glowing-orb absolute w-40 h-40 top-[15%] left-[10%] bg-gradient-radial from-[#e6398a]/50 to-transparent rounded-full blur-2xl"></div>
         <div className="glowing-orb absolute w-32 h-32 top-[65%] right-[15%] bg-gradient-radial from-[#facc15]/40 to-transparent rounded-full blur-xl"></div>
         <div className="glowing-orb absolute w-24 h-24 top-[30%] right-[30%] bg-gradient-radial from-[#8b5cf6]/30 to-transparent rounded-full blur-lg"></div> {/* Added a violet one */}
         <div className="glowing-orb absolute w-20 h-20 bottom-[10%] left-[25%] bg-gradient-radial from-[#2dd4bf]/30 to-transparent rounded-full blur-md"></div> {/* Added a teal one */}
      </div>


      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl">

        {/* Profile Image */}
        <div className="profile-container relative mb-6">
           <div className="absolute -inset-3 bg-gradient-radial from-[#ffda47]/20 to-transparent rounded-full blur-xl animate-pulse"/>
           <img
              src="https://placehold.co/200/2a304d/e0e0e0?text=RD&font=poppins" // Updated placeholder
              alt="Ritik Dutta"
              className="profile-img w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#2a304d]/50 shadow-xl relative z-10"
            />
        </div>

        {/* Name */}
        <h1 className="hero-name text-4xl md:text-6xl font-bold tracking-tight font-['Poppins'] text-transparent bg-clip-text bg-gradient-to-r from-[#ffda47] via-[#e0e0e0] to-[#ff7eb3] mb-2">
             {nameSpans}
        </h1>

        {/* Subtitle */}
        <h2 className="hero-subtitle text-xl md:text-2xl mt-1 font-medium tracking-wide text-[#ff7eb3]"> {/* Nebula Pink */}
           Full Stack Developer
        </h2>

        {/* Description */}
        <p className="hero-description max-w-2xl mt-5 text-base md:text-lg font-light leading-relaxed text-[#b0b0b0]"> {/* Muted Gray */}
           Crafting digital experiences where technology meets creativity. Exploring the frontiers of web development, AI, and beyond.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full">
           <a
             href="#"
             data-hover-color="#ff7eb3" // Nebula Pink
             className="px-7 py-3 w-52 text-center bg-[#2a304d]/60 backdrop-blur-sm rounded-full border border-[#e6398a]/50 hover:border-[#ff7eb3] transition-colors duration-300 text-sm md:text-base font-semibold text-[#e0e0e0] shadow-md hover:shadow-[#e6398a]/20" // Rounded-full
           >
             Explore Work
           </a>
           <a
             href="#"
             data-hover-color="#ffda47" // Starlight Gold
             className="px-7 py-3 w-52 text-center bg-[#2a304d]/60 backdrop-blur-sm rounded-full border border-[#facc15]/50 hover:border-[#ffda47] transition-colors duration-300 text-sm md:text-base font-semibold text-[#e0e0e0] shadow-md hover:shadow-[#facc15]/20" // Rounded-full
           >
             Get In Touch
           </a>
        </div>

         {/* Social Icons */}
        <div className="social-icons flex space-x-8 md:space-x-10 mt-16 mb-8 justify-center w-full">
            {/* GitHub */}
            <a href="https://github.com/" target="_blank" rel="noreferrer" data-hover-color="#ff7eb3" className="relative group">
                <div className="icon-glow absolute -inset-1 bg-gradient-to-br from-[#e6398a] to-[#facc15] rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <svg className="w-7 h-7 md:w-8 md:h-8 text-[#b0b0b0] group-hover:text-[#ff7eb3] transition-colors duration-300 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" data-hover-color="#ffda47" className="relative group">
                 <div className="icon-glow absolute -inset-1 bg-gradient-to-br from-[#facc15] to-[#e6398a] rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <svg className="w-7 h-7 md:w-8 md:h-8 text-[#b0b0b0] group-hover:text-[#ffda47] transition-colors duration-300 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
             {/* Twitter */}
             <a href="https://twitter.com/" target="_blank" rel="noreferrer" data-hover-color="#87CEFA" className="relative group"> {/* Light Sky Blue */}
                 <div className="icon-glow absolute -inset-1 bg-gradient-to-br from-[#87CEFA] to-[#facc15] rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <svg className="w-7 h-7 md:w-8 md:h-8 text-[#b0b0b0] group-hover:text-[#87CEFA] transition-colors duration-300 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
        </div>
      </div>
    </section>
  );
}


// ====================== SKILLS SECTION (Cosmic Canvas Design + Animation Fix) ======================
function Skills() {
    const skillsRef = useRef(null);

    // Data for skills (ensure this matches your needs)
    const skillsData = [
        { category: "Machine Learning", icon: "🧠", list: ["ML Algorithms", "Data Analysis", "ML Pipelines", "Sklearn", "XGBoost"] },
        { category: "Deep Learning", icon: "🔬", list: ["TensorFlow", "Detection", "CNN Architectures"] },
        { category: "DevOps", icon: "🔄", list: ["Deployment", "Automation", "Docker", "Jenkins", "Git", "AWS", "MLflow", "Circle CI", "CICD", "Cloud", "GCP"] },
        { category: "Backend", icon: "⚙️", list: ["Architecture", "Flask", "Databases", "NoSQL", "Cassandra", "Firebase", "Security", "OAuth", "GCP/AWS", "Nginx", "API"] },
        { category: "Computer Vision", icon: "👁️", list: ["Detection", "Tracking", "Classification", "OpenCV", "Yolo", "MediaPipe"] },
        { category: "Natural Language Processing", icon: "💬", list: ["Langchain", "Classification", "Sentiment", "GPT", "BERT", "Transformers"] },
        { category: "Web Development", icon: "🌐", list: ["React", "Node.js", "TailwindCSS", "GSAP", "HTML/CSS/JS"] },
        { category: "Creative Tech", icon: "✨", list: ["Interactive Design", "Generative Art", "Web Animations"] },
        { category: "Cybersecurity", icon: "🔒", list: ["Penetration Testing", "Network Security", "Ethical Hacking"], blurred: true },
    ];

    useEffect(() => {
      const ctx = gsap.context(() => {
         // Section Header Animation
         gsap.from(".skills-header", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: skillsRef.current,
                start: "top 85%",
                once: true // <<< FIX: Ensure it runs only once reliably
            },
         });

         // Card Animations
         gsap.from(".skill-card", {
            y: 70,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".skills-grid",
                start: "top 80%",
                once: true // <<< FIX: Ensure it runs only once reliably
            },
         });

         // Icon Animation (Triggered relative to grid)
         gsap.from(".skill-icon", {
             scale: 0,
             rotate: -180,
             opacity: 0,
             duration: 0.7,
             stagger: 0.05, // Adjust stagger timing slightly if needed
             ease: "back.out(1.7)",
             scrollTrigger: {
                 trigger: ".skills-grid",
                 start: "top 75%", // Slightly later start for icons after cards appear
                 once: true // <<< FIX: Ensure it runs only once reliably
             }
         });

         // Hover animations for skill cards (These don't need 'once: true')
         document.querySelectorAll('.skill-card').forEach(card => {
            // Ensure icon exists before trying to animate it
            const icon = card.querySelector('.skill-icon');
            if (!icon) return;

            const initialBorderColor = gsap.getProperty(card, "borderColor");
            const hoverBorderColor = "#ff7eb3"; // Light Nebula Pink

            const hoverTl = gsap.timeline({ paused: true });
            hoverTl
                .to(card, {
                    y: -8,
                    borderColor: hoverBorderColor,
                    boxShadow: `0 8px 25px -5px rgba(255, 126, 179, 0.2)`, // Nebula Pink shadow
                    duration: 0.3,
                    ease: "power2.out",
                }, 0)
                .to(icon, { // Use the icon variable
                    scale: 1.2,
                    rotate: 10, // Slight tilt
                    duration: 0.4,
                    ease: "elastic.out(1, 0.5)",
                }, 0);

            card.addEventListener("mouseenter", () => hoverTl.play());
            card.addEventListener("mouseleave", () => hoverTl.reverse());
         });
      }, skillsRef);

      // Cleanup function
      return () => ctx.revert();
    }, []); // Empty dependency array ensures this runs once on mount

    // --- JSX with Cosmic Canvas Design ---
    return (
        <section
            ref={skillsRef}
            // Base background for the section
            className="relative py-20 md:py-28 bg-[#1a2035] text-[#e0e0e0] overflow-hidden font-['Lato']"
        >
            {/* Re-include the background component */}
            <StarfieldBackground />

            {/* Gradient overlay for smooth transition at the top */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1a2035] via-[#1a2035]/80 to-transparent z-10 pointer-events-none"></div>

            {/* Main content container */}
            <div className="relative z-20 max-w-6xl mx-auto px-4">
                {/* Section Header - Styled as per Cosmic Canvas */}
                <h2 className="skills-header text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight font-['Poppins'] text-transparent bg-clip-text bg-gradient-to-r from-[#ffda47] to-[#ff7eb3]"> {/* Gold to Pink Gradient */}
                    My Creative Toolkit
                </h2>
                <p className="skills-header text-center mb-12 md:mb-16 text-[#b0b0b0] max-w-3xl mx-auto text-lg"> {/* Muted text color */}
                    Blending technical skills with creative vision to build unique digital solutions.
                </p>

                {/* Skills Grid Layout */}
                <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Map over skills data to create cards */}
                    {skillsData.map((skillCat, index) => (
                        <div
                            key={index}
                            // Card Styling - Background, blur, border, corners etc.
                            className={`skill-card relative bg-[#2a304d]/70 backdrop-blur-md rounded-2xl p-6 border border-[#e6398a]/30 transition-all duration-300 overflow-hidden group`}
                        >
                            {/* Inner Glow Effect on Hover */}
                            <div className="absolute inset-0 bg-gradient-radial from-[#e6398a]/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10 blur-md"></div>

                            {/* Card Content Area */}
                            <div className="relative z-10">
                                {/* Icon and Title Area */}
                                <div className="flex items-center mb-4">
                                    {/* Icon */}
                                    <span className="skill-icon text-3xl mr-4">{skillCat.icon}</span>
                                    {/* Title - Styled with accent color */}
                                    <h3 className="font-semibold text-xl tracking-tight font-['Poppins'] text-[#ffda47]"> {/* Starlight Gold Title */}
                                        {skillCat.category}
                                    </h3>
                                </div>
                                {/* Skills List */}
                                <ul
                                    className={`skill-list text-sm pl-1 space-y-1.5 list-disc list-inside ${
                                        // Apply blur if needed
                                        skillCat.blurred ? "blur-sm cursor-not-allowed select-none" : ""
                                    }`}
                                >
                                    {/* Map over individual skills */}
                                    {skillCat.list.map((skill, i) => (
                                        <li key={i} className="text-[#b0b0b0] hover:text-[#e0e0e0] transition-colors duration-200"> {/* Muted list item color */}
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                                {/* Blurred Overlay (Conditional) */}
                                {skillCat.blurred && (
                                    <div className="absolute inset-0 bg-[#2a304d]/80 backdrop-blur-sm flex items-center justify-center font-semibold text-[#e6398a] z-20 rounded-2xl text-sm"> {/* Use card background color for overlay */}
                                        (Confidential Details)
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             {/* Gradient overlay for smooth transition at the bottom */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a2035] via-[#1a2035]/80 to-transparent z-10 pointer-events-none"></div>
        </section>
    );
}


// ====================== PROJECTS SECTION ======================
function Projects() {
    const projectsRef = useRef(null);
    const projectsData = [ /* Keep projectsData same, update placeholders */
        { title: "Work Environment System", img: "https://placehold.co/800x500/1a2035/e6398a?text=Project+1&font=poppins", description: "Facial recognition for productivity insights.", liveLink: null, detailsLink: "#" },
        { title: "Datamigrato", img: "https://placehold.co/800x500/1a2035/facc15?text=Project+2&font=poppins", description: "Python package for seamless data migrations.", liveLink: "#", detailsLink: "#" },
        { title: "AI Interview Coach", img: "https://placehold.co/800x500/1a2035/e6398a?text=Project+3&font=poppins", description: "Generative AI for realistic interview practice.", liveLink: "#", detailsLink: "#" },
        { title: "Inventory Chatbot", img: "https://placehold.co/800x500/1a2035/facc15?text=Project+4&font=poppins", description: "Streamlined inventory and sales tracking.", liveLink: null, detailsLink: "#" },
        { title: "Raaga Rhythms", img: "https://placehold.co/800x500/1a2035/e6398a?text=Project+5&font=poppins", description: "Exploring Indian classical music digitally.", liveLink: "#", detailsLink: "#" },
        { title: "Generative Art Explorer", img: "https://placehold.co/800x500/1a2035/facc15?text=Project+6&font=poppins", description: "Interactive platform for creating abstract visuals.", liveLink: "#", detailsLink: "#" }, // Added creative project
    ];

    useEffect(() => {
      const ctx = gsap.context(() => {
         // Section Header Animation
         gsap.from(".projects-header", {
            y: 50, opacity: 0, duration: 1, ease: "power3.out",
            scrollTrigger: {
                trigger: projectsRef.current,
                start: "top 85%",
                once: true // <<< FIX: Ensure it runs only once reliably
            },
         });

         // Card Animations
         gsap.from(".project-card", {
            opacity: 0, y: 60, scale: 0.95, duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: {
                trigger: ".projects-grid",
                start: "top 80%",
                once: true // <<< FIX: Ensure it runs only once reliably
            },
         });

         // Hover effects (These don't need 'once: true')
         document.querySelectorAll('.project-card').forEach(card => {
            const img = card.querySelector('img');
            const overlay = card.querySelector('.project-overlay');
            const title = overlay?.querySelector('h3'); // Add null checks
            const desc = overlay?.querySelector('p');
            const links = overlay?.querySelector('.project-links');
            const hoverBorderColor = "#ffda47"; // Starlight Gold accent

            if (!img || !overlay || !title || !desc || !links) return; // Exit if elements not found

            const tl = gsap.timeline({ paused: true });
            tl.to(card, { borderColor: hoverBorderColor, boxShadow: `0 8px 25px -5px rgba(250, 204, 21, 0.2)`, y:-5, duration: 0.3, ease: "power2.out"}, 0)
              .to(img, { scale: 1.05, duration: 0.4, ease: "power2.out" }, 0)
              .to(overlay, { opacity: 1, backdropFilter: 'blur(4px)', duration: 0.4, ease: "power2.out" }, 0) // Add blur to overlay
              .fromTo([title, desc, links], { y: 15, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.3, ease: "power2.out" }, 0.1);

            card.addEventListener('mouseenter', () => tl.play());
            card.addEventListener('mouseleave', () => tl.reverse());
        });

      }, projectsRef);
      return () => ctx.revert();
    }, []);

    return (
        <section ref={projectsRef} className="relative py-20 md:py-28 bg-[#2a304d] text-[#e0e0e0] overflow-hidden"> {/* Slightly lighter base */}
            <StarfieldBackground /> {/* Keep subtle stars */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#2a304d] via-[#2a304d]/80 to-transparent z-10"></div>

            <div className="relative z-20 max-w-6xl mx-auto px-4">
                <h2 className="projects-header text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight font-['Poppins'] text-transparent bg-clip-text bg-gradient-to-r from-[#ffda47] to-[#ff7eb3]">
                    Showcase of Creation
                </h2>
                 <p className="projects-header text-center mb-12 md:mb-16 text-[#b0b0b0] max-w-3xl mx-auto text-lg font-['Lato']">
                    Selected projects demonstrating practical application and creative exploration.
                </p>
                <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <div
                            key={index}
                            className="project-card bg-[#1a2035]/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-[#facc15]/30 group relative transition-all duration-300" // Darker card, gold border
                        >
                            <div className="relative overflow-hidden aspect-video"> {/* Ensure consistent image ratio */}
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-400 ease-in-out"
                                />
                                {/* Overlay for hover effect */}
                                <div className="project-overlay absolute inset-0 bg-gradient-to-t from-[#1a2035]/90 via-[#1a2035]/70 to-transparent opacity-0 flex flex-col justify-end p-5 transition-all duration-400 ease-in-out"> {/* Increased padding */}
                                    <h3 className="font-semibold text-xl text-[#ffda47] mb-1 opacity-0 font-['Poppins']"> {/* Gold Title */}
                                        {project.title}
                                    </h3>
                                    <p className="text-[#b0b0b0] text-sm mb-3 opacity-0 font-['Lato']">
                                        {project.description}
                                    </p>
                                    <div className="project-links flex justify-start space-x-4 opacity-0">
                                        {project.detailsLink && (
                                            <a href={project.detailsLink} className="text-[#ff7eb3] hover:text-[#e6398a] hover:underline text-sm font-medium transition-colors">
                                                Details
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-[#ffda47] hover:text-[#facc15] hover:underline text-sm font-medium transition-colors">
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Optional: Static title visible when not hovered */}
                             <div className="p-4 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none">
                               <h3 className="font-semibold text-lg text-[#e0e0e0] truncate font-['Poppins']">{project.title}</h3>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#2a304d] via-[#2a304d]/80 to-transparent z-10"></div>
        </section>
    );
}


// ====================== COMMUNITY SECTION ======================
function Community() {
    const containerRef = useRef<HTMLDivElement>(null); // Type the ref
    const sectionRef = useRef<HTMLElement>(null); // Type the ref
    const animationRef = useRef<gsap.core.Tween | null>(null); // Type the ref for the tween
    const images = [ /* Update Placeholders */
        { img: "https://placehold.co/600x400/1a2035/b0b0b0?text=Community+1", heading: "Nurturing Young Minds", description: "Food Assistance Volunteer.", date: "Aug 2023" },
        { img: "https://placehold.co/600x400/1a2035/ff7eb3?text=Community+2", heading: "Food Drive", description: "Collected staples for families.", date: "Aug 2023" },
        { img: "https://placehold.co/600x400/1a2035/ffda47?text=Community+3", heading: "Plantations", description: "Planting hope for tomorrow.", date: "Aug 2023" },
        { img: "https://placehold.co/600x400/1a2035/b0b0b0?text=Community+4", heading: "Meal Distribution", description: "Sharing Meals, Spreading Hope.", date: "Aug 2023" },
        { img: "https://placehold.co/600x400/1a2035/ff7eb3?text=Community+5", heading: "Education Support", description: "Helping with learning activities.", date: "Sep 2023" },
        { img: "https://placehold.co/600x400/1a2035/ffda47?text=Community+6", heading: "Local Cleanup", description: "Community cleanup initiative.", date: "Sep 2023" },
    ];
    // Create the doubled list directly
    const fullList = [...images, ...images];

    useEffect(() => {
        // Check if sectionRef.current exists before creating context
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Section Header Animation
            gsap.from(".community-header", {
                y: 50, opacity: 0, duration: 1, ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current, // Use the typed ref
                    start: "top 85%",
                    once: true // <<< FIX: Ensure it runs only once reliably
                },
            });

            const container = containerRef.current;
            const cards = gsap.utils.toArray<HTMLDivElement>(".comm-card"); // Type the array elements
            if (!cards.length || !container) return; // Check elements exist

            const cardWidth = cards[0]?.offsetWidth ?? 320; // Use optional chaining and provide default
            const gap = 16; // Tailwind mx-2 = 8px margin-left + 8px margin-right = 16px total gap
            const singleLoopWidth = (cardWidth + gap) * images.length; // Width of the original set of images

            // Ensure width is set correctly based on the calculated loop width
            gsap.set(container, { width: singleLoopWidth * 2 + gap }); // Add one extra gap to prevent jump with odd number of cards if needed, or just ensure enough width

            // Kill previous animation if it exists before creating a new one
            if (animationRef.current) {
                animationRef.current.kill();
            }

            // Marquee Animation
            animationRef.current = gsap.to(container, {
                x: `-=${singleLoopWidth}`, // Move left by the width of one full set
                duration: 40, // Slower, gentler scroll
                ease: "none",
                repeat: -1,
                modifiers: {
                    // Use modulo to wrap the x value seamlessly
                    x: gsap.utils.unitize(x => parseFloat(x) % -singleLoopWidth)
                }
            });

            // Pause/Play on hover for the container
            container.addEventListener('mouseenter', () => animationRef.current?.pause());
            container.addEventListener('mouseleave', () => animationRef.current?.play());

            // Card hover effects (These don't need 'once: true')
             cards.forEach(card => {
                 card.addEventListener('mouseenter', () => {
                     gsap.to(card, {
                         y: -5, scale: 1.02,
                         boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                         borderColor: "#ffda47", // Gold border
                         duration: 0.3, ease: "power2.out"
                     });
                 });
                 card.addEventListener('mouseleave', () => {
                     gsap.to(card, {
                         y: 0, scale: 1,
                         boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                         borderColor: "#e6398a4D", // Reset to dim pink border
                         duration: 0.3, ease: "power2.in"
                     });
                 });
             });

        }, sectionRef); // Scope context to the sectionRef

        // Cleanup function
        return () => ctx.revert();

    }, [images.length]); // Re-run if the number of images changes (though unlikely here)

    return (
        <section ref={sectionRef} className="relative py-20 md:py-28 text-center bg-[#1a2035] text-[#e0e0e0] overflow-hidden">
             <StarfieldBackground />
             <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1a2035] via-[#1a2035]/80 to-transparent z-10"></div>
            <div className="relative z-20">
                <h2 className="community-header text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ffda47] to-[#ff7eb3] tracking-tight font-['Poppins']">
                    Beyond the Code
                </h2>
                <p className="community-header max-w-2xl mx-auto text-[#b0b0b0] px-4 leading-relaxed text-lg mb-12 md:mb-16 font-['Lato']">
                    Giving back to the community and making a positive social impact.
                </p>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing">
                    {/* Flex container holding the doubled items */}
                    <div ref={containerRef} className="flex py-4">
                        {fullList.map((item, i) => (
                            <div
                                key={i}
                                // Use ml-2 mr-2 for consistent spacing handled by the 'gap' calculation
                                className="comm-card flex-shrink-0 w-72 md:w-80 ml-2 mr-2 bg-[#2a304d]/80 backdrop-blur-sm border border-[#e6398a]/30 rounded-xl shadow-md p-4 text-left transition-all duration-300 hover:shadow-xl" // Use card bg, pink border
                            >
                                <img src={item.img} alt={item.heading} className="w-full h-40 md:h-48 object-cover rounded-md mb-3"/>
                                <h3 className="text-lg font-semibold text-[#ffda47] mb-1 font-['Poppins']"> {/* Gold heading */}
                                    {item.heading}
                                </h3>
                                <p className="text-[#b0b0b0] text-sm mb-2 font-['Lato']">
                                    {item.description}
                                </p>
                                <p className="text-[#e6398a]/70 text-xs italic font-['Lato']"> {/* Dim pink date */}
                                    {item.date}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
             <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a2035] via-[#1a2035]/80 to-transparent z-10"></div>
        </section>
    );
}


// ====================== BLOGS SECTION ======================
function Blogs() {
    const blogsRef = useRef(null);
    const blogData = [ /* Update Placeholders */
        { title: "AlexNet Explored", date: "May 2020", img: "https://placehold.co/300x200/1a2035/ff7eb3?text=Blog+1", snippet: "Deep dive into the AlexNet architecture...", link: "#" },
        { title: "LeNet Architecture", date: "May 2020", img: "https://placehold.co/300x200/1a2035/ffda47?text=Blog+2", snippet: "Understanding LeNet and its Keras implementation...", link: "#" },
        { title: "PCA Simplified", date: "Nov 2022", img: "https://placehold.co/300x200/1a2035/ff7eb3?text=Blog+3", snippet: "Dimensionality reduction with Principal Component Analysis...", link: "#" },
        { title: "K-means Fundamentals", date: "Nov 2022", img: "https://placehold.co/300x200/1a2035/ffda47?text=Blog+4", snippet: "The core concepts of the K-means clustering algorithm...", link: "#" },
        { title: "Creative Coding Intro", date: "Jan 2024", img: "https://placehold.co/300x200/1a2035/ff7eb3?text=Blog+5", snippet: "Getting started with generative art on the web...", link: "#" },
        { title: "GSAP for UI/UX", date: "Feb 2024", img: "https://placehold.co/300x200/1a2035/ffda47?text=Blog+6", snippet: "Enhancing user experience with GreenSock animations...", link: "#" },
    ];

     useEffect(() => {
        const ctx = gsap.context(() => {
            // Section Header Animation
            gsap.from(".blogs-header", {
                y: 50, opacity: 0, duration: 1, ease: "power3.out",
                scrollTrigger: {
                    trigger: blogsRef.current,
                    start: "top 85%",
                    once: true // <<< FIX: Ensure it runs only once reliably
                },
            });
            // Card Animations
            gsap.from(".blog-card", {
                opacity: 0, y: 60, scale: 0.95, duration: 0.8, stagger: 0.1, ease: "power3.out",
                scrollTrigger: {
                    trigger: ".blogs-grid",
                    start: "top 80%",
                    once: true // <<< FIX: Ensure it runs only once reliably
                },
            });
            // Hover effects (These don't need 'once: true')
            document.querySelectorAll('.blog-card').forEach(card => {
                 const img = card.querySelector('img');
                 if (!img) return; // Guard clause

                 const tl = gsap.timeline({ paused: true });
                 tl.to(card, { y: -8, scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)", borderColor: "#ff7eb3", duration: 0.3, ease: "power2.out" }, 0) // Pink Border
                   .to(img, { scale: 1.1, duration: 0.3, ease: "power2.out"}, 0);
                 card.addEventListener('mouseenter', () => tl.play());
                 card.addEventListener('mouseleave', () => tl.reverse());
            });
        }, blogsRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={blogsRef} className="relative py-20 md:py-28 bg-[#2a304d] text-[#e0e0e0] overflow-hidden"> {/* Lighter base */}
             <StarfieldBackground />
             <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#2a304d] via-[#2a304d]/80 to-transparent z-10"></div>
            <div className="relative z-20 max-w-6xl mx-auto px-4">
                <h2 className="blogs-header text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ffda47] to-[#ff7eb3] tracking-tight font-['Poppins']">
                    Ideas & Insights
                </h2>
                <p className="blogs-header text-center mb-12 md:mb-16 text-[#b0b0b0] max-w-3xl mx-auto text-lg font-['Lato']">
                    Sharing thoughts on technology, creativity, and the learning process.
                </p>
                <div className="blogs-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogData.map((blog, index) => (
                        <div
                            key={index}
                            className="blog-card bg-[#1a2035]/60 backdrop-blur-md border border-[#facc15]/30 rounded-xl overflow-hidden flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 group" // Added group class for potential group-hover usage
                        >
                            <div className="overflow-hidden h-44"> {/* Fixed height */}
                                <img src={blog.img} alt={blog.title} className="w-full h-full object-cover transition-transform duration-300"/>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-semibold text-lg mb-1 text-[#e0e0e0] tracking-tight group-hover:text-[#ffda47] transition-colors duration-300 font-['Poppins']">
                                    {blog.title}
                                </h3>
                                <p className="text-xs text-[#e6398a]/80 mb-3 font-['Lato']">{blog.date}</p> {/* Dim pink date */}
                                <p className="text-sm text-[#b0b0b0] flex-grow leading-relaxed mb-4 font-['Lato']">
                                    {blog.snippet}
                                </p>
                                <a
                                    href={blog.link}
                                    className="text-[#ff7eb3] hover:text-[#e6398a] mt-auto hover:underline self-start text-sm font-semibold transition-colors duration-300 font-['Lato']"
                                >
                                    Read more →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#2a304d] via-[#2a304d]/80 to-transparent z-10"></div>
        </section>
    );
}


// ====================== FOOTER SECTION ======================
function Footer() {
    // Re-add SVG paths or placeholders
    const githubPath = "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z";
    const linkedinPath = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";
    const twitterPath = "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84";

    return (
        <footer className="relative bg-gradient-to-t from-[#1a2035] via-[#141a2e] to-[#141a2e] text-[#b0b0b0] py-10 z-10"> {/* Darkest footer */}
             {/* Optional subtle top border */}
             {/* <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#facc15]/30 to-transparent"></div> */}
            <div className="max-w-6xl mx-auto px-4 text-center">
                 <div className="flex justify-center space-x-6 mb-5">
                    {/* Re-style footer icons to match hero */}
                    <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-[#ff7eb3] transition-colors">
                        <span className="sr-only">GitHub</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d={githubPath} clipRule="evenodd" /></svg>
                    </a>
                    <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-[#ffda47] transition-colors">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d={linkedinPath} /></svg>
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="hover:text-[#87CEFA] transition-colors">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d={twitterPath} /></svg>
                    </a>
                </div>
                <p className="text-sm font-light font-['Lato']">
                    Designed & Crafted with ✨ by Ritik Dutta © {new Date().getFullYear()}
                </p>
                 <p className="text-xs font-light mt-1 text-[#e6398a]/60 font-['Lato']">Powered by React, Tailwind, GSAP</p>
            </div>
        </footer>
    );
}


// ====================== BOTTOM BANNER FIXED ======================
function BottomBanner() {
  const bannerRef = useRef(null);
  // Use a more abstract/cosmic text
  const marqueeText = "Exploring digital realms... Currently tuned into cosmic frequencies... Designing the future... ";

  useEffect(() => {
    // Check if bannerRef.current exists before creating context
    if (!bannerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(bannerRef.current, { duration: 1, yPercent: 100, ease: "power3.out", delay: 1.5 });
      // Orb Animation (spin handled by CSS)
      gsap.from(".celestial-orb-container", { duration: 1.2, yPercent: 150, rotation: -270, scale: 0.5, ease: "elastic.out(1, 0.6)", delay: 1.8 });
    }, bannerRef); // Scope context to bannerRef
    return () => ctx.revert();
  }, []); // Empty dependency array

  return (
    <>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes subtlePulse { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }

        .celestial-orb-container {
          position: absolute;
          left: 15px;
          top: -25px; /* Position center near top edge */
          width: 50px;
          height: 50px;
          z-index: 10;
        }
        .celestial-orb {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #ffda47, #e6398a 60%, #2a304d 90%); /* Gold/Pink/Dark */
          animation: spin 6s linear infinite, subtlePulse 4s ease-in-out infinite;
          box-shadow: 0 0 15px 2px #ff7eb366; /* Soft pink glow */
          transform-origin: center;
          will-change: transform, opacity; /* Performance hint */
        }
         /* Optional: Add rings? */
        /* .celestial-orb::before { content:''; ... } */

        .marquee-container-styled {
          position: absolute; top: 0; left: 75px; /* Space for orb */ right: 0; height: 100%;
          overflow: hidden; display: flex; align-items: center;
        }
        .bannerTextWrapper-styled { white-space: nowrap; }
        .bannerText-styled {
            display: inline-block; padding-right: 60px; /* Wider space */
            font-family: 'Lato', sans-serif; font-size: 0.8rem; font-style: italic;
            animation: marquee 25s linear infinite; /* Slower marquee */
            will-change: transform;
            color: #b0b0b0; /* Muted text */
            opacity: 0.8;
        }
         @media (max-width: 640px) {
          .celestial-orb-container { left: 10px; width: 40px; height: 40px; top: -20px; }
          .marquee-container-styled { left: 60px; }
          .bannerText-styled { font-size: 0.75rem; padding-right: 40px; animation-duration: 20s; }
        }
      `}</style>

      <div ref={bannerRef} className="fixed bottom-0 left-0 w-full h-12 bg-[#1a2035]/90 backdrop-blur-sm text-[#b0b0b0] z-[50] overflow-visible"> {/* Slightly shorter, use base bg */}
        <div className="w-full h-full relative">
          {/* Celestial Orb Element */}
          <div className="celestial-orb-container">
            <div className="celestial-orb"></div>
          </div>

          {/* Marquee Text Container */}
          <div className="marquee-container-styled">
            <div className="bannerTextWrapper-styled">
                {/* Render text twice for seamless loop */}
                <span className="bannerText-styled">{marqueeText}</span>
                <span className="bannerText-styled">{marqueeText}</span>
            </div>
          </div>
        </div>
         {/* Subtle top border line */}
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e6398a]/40 to-transparent"></div>
      </div>
    </>
  );
}


// ====================== MAIN EXPORT ======================
export default function Portfolio() {
  useEffect(() => {
     // Optional: Add smooth scrolling if desired (Requires installing ScrollSmoother)
     // gsap.registerPlugin(ScrollSmoother);
     // let smoother = ScrollSmoother.create({ smooth: 1, effects: true });
     // Ensure proper cleanup if you use ScrollSmoother:
     // return () => smoother.kill();

     // Set body background color to match the theme base
     document.body.style.backgroundColor = '#1a2035';
     // Clean up background color when component unmounts (optional, good practice in SPA)
     return () => {
         document.body.style.backgroundColor = ''; // Reset to default or previous value
     };
  }, []);

  return (
    // Main container - apply base background and font, hide x-overflow
    <div className="font-['Lato'] bg-[#1a2035] text-[#e0e0e0] overflow-x-hidden">
      {/* Optional: Add a global noise/grain overlay */}
      {/* <div className="fixed inset-0 z-[-2] opacity-5 bg-[url(noise.png)] pointer-events-none"></div> */}

      <Hero />
      <Skills />
      <Projects />
      <Community />
      <Blogs />
      <Footer />
      <BottomBanner />
    </div>
  );
}