// @ts-nocheck
import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure Tailwind CSS is set up and fonts are imported in your project's main CSS/index file
// Example:
// @import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
// Add base styles if needed: body { background-color: #FDFDFD; overflow-x: hidden; }

gsap.registerPlugin(ScrollTrigger);

// ====================== CREATIVE BACKGROUND: STARFIELD ======================
// (No layout changes needed, inherently responsive)
function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    const numStars = 150; // Adjust density

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = []; // Reinitialize stars on resize
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.3, // Star size
          alpha: Math.random() * 0.5 + 0.5, // Star opacity
          speed: Math.random() * 0.1 + 0.05 // Star speed
        });
      }
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Removed faint trail effect as it might impact performance or look odd with blend mode
      // ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

      stars.forEach(star => {
        // Move stars subtly
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width; // Reset x position
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(128, 128, 128, ${star.alpha})`; // Gray stars #808080
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // Using bg-gray-50 directly, ensure it matches PortfolioLight's bg if needed
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none bg-gray-50"
      style={{ mixBlendMode: 'multiply' }} // Blend stars with background
    />
  );
}


// ====================== CREATIVE INTERACTION: CURSOR TRAIL ======================
// (No layout changes needed, inherently responsive)
function CursorTrail() {
  const [particles, setParticles] = useState([]);
  const particleId = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

  const addParticle = useCallback((x, y) => {
    const newId = particleId.current++;
    const newParticle = {
      id: newId,
      x,
      y,
      size: Math.random() * 4 + 2, // Size of particle
      opacity: 1,
      createdAt: Date.now(),
      // Random slight velocity for variety
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    };
    setParticles(prev => [...prev, newParticle]);

    // Auto-remove particle after a duration
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newId));
    }, 600); // Lifespan of particle
  }, []);

  const handleMouseMove = useCallback((e) => {
    // Basic check to avoid particle spamming on touch devices if mousemove fires unexpectedly
    if (e.clientX === undefined || e.clientY === undefined) return;

    const distance = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);
    // Add particle only if mouse moved a certain distance
    if (distance > 15) {
        addParticle(e.clientX, e.clientY);
        lastPos.current = { x: e.clientX, y: e.clientY };
    }
  }, [addParticle]);

  const updateParticles = useCallback(() => {
      setParticles(prev =>
          prev.map(p => {
              const life = (Date.now() - p.createdAt) / 600; // Normalized lifespan (0 to 1)
              return {
                  ...p,
                  x: p.x + p.vx, // Apply velocity
                  y: p.y + p.vy,
                  opacity: 1 - life, // Fade out
                  size: p.size * (1 - life * 0.5) // Shrink slightly
              };
          }).filter(p => p.opacity > 0) // Keep only visible particles
      );
      animationFrameId.current = requestAnimationFrame(updateParticles);
  }, []);


  useEffect(() => {
    // Check if it's likely a touch device to potentially disable the trail
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return; // Optionally disable on touch devices

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId.current = requestAnimationFrame(updateParticles);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleMouseMove, updateParticles]);

  // Conditionally render based on particles array length to avoid an empty div
  if (particles.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#FF6B6B]" // Trail color
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)', // Center particle on cursor
            transition: 'opacity 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out', // Smooth fade/shrink
            filter: 'blur(1px)' // Slight blur for softness
          }}
        />
      ))}
    </div>
  );
}


// ====================== SVG ICONS (Responsive size adjustments) ======================
// Added base size w-6 h-6, responsive up to md:w-8 md:h-8
const GithubSvg = () => ( <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#808080] transition-colors duration-300 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>);
const LinkedinSvg = () => ( <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#808080] transition-colors duration-300 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>);
const TwitterSvg = () => ( <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#808080] transition-colors duration-300 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>);


// ====================== HERO SECTION (Responsive - Revised) ======================
function HeroRedesignedFixed() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const logoRef = useRef(null);

  const firstName = "Ritik";
  const lastName = "Dutta";
  const firstNameSpans = firstName.split("").map((char, i) => (
    <span key={`first-${i}`} className="inline-block hero-name-char opacity-0 translate-y-4">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
  const lastNameSpans = lastName.split("").map((char, i) => (
    <span key={`last-${i}`} className="inline-block hero-name-char opacity-0 translate-y-4">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  useEffect(() => {
    // Keep existing GSAP animations - they should adapt to the new layout
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(
        ".background-about-text", { opacity: 0, scale: 1.1 },
        { opacity: 0.5, scale: 1, duration: 1.5, ease: "power3.out" }, 0
      )
      .fromTo(
        logoRef.current, { opacity: 0, y: -25, rotate: -10 },
        { opacity: 1, y: 0, rotate: 0, duration: 0.9, ease: "elastic.out(1, 0.7)" }, 0.2
      )
      .fromTo(
        imageRef.current, { yPercent: 100, opacity: 0, scale: 0.95 },
        { yPercent: 0, opacity: 1, scale: 1, duration: 1.3, ease: "expo.out" }, 0.5
      )
      .fromTo(
        ".hero-about-label", { opacity: 0, x: -35 },
        { opacity: 1, x: 0, duration: 1.1, ease: "power3.out" }, 0.7
      )
      .to(
        ".hero-name-char", { opacity: 1, y: 0, stagger: 0.05, duration: 0.7, ease: "back.out(1.5)" }, 0.9
      )
      .fromTo(
        ".hero-description-new", { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 1.2
      )
      .from(".hero-buttons > *", {
        y: 25, opacity: 0, scale: 0.9, stagger: 0.12, duration: 0.7, ease: "back.out(1.6)",
      }, 1.4)
      .from(".social-icons a", {
        y: 25, opacity: 0, scale: 0.8, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)",
      }, 1.5);

      // Parallax for background text
      gsap.to(".background-about-text", {
        yPercent: 100, // Adjust speed if needed
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5, // Adjust scrub smoothness
          invalidateOnRefresh: true,
        },
      });

      // Button hover animations (keep as is)
      heroRef.current?.querySelectorAll('.hero-buttons a').forEach(button => {
        const isPrimary = button.classList.contains('btn-primary');
        const hoverBg = isPrimary ? "#E55A5A" : "#F0F0F0";
        const hoverColor = isPrimary ? "#FFFFFF" : "#FF6B6B";
        const hoverBorder = isPrimary ? "transparent" : "#FF6B6B";
        const hoverShadow = "0 4px 15px -3px rgba(0,0,0,0.1)";
        const tlBtn = gsap.timeline({ paused: true });
        tlBtn.to(button, { y: -3, scale: 1.03, backgroundColor: hoverBg, borderColor: hoverBorder, color: hoverColor, boxShadow: hoverShadow, duration: 0.25, ease: "power1.out" });
        button.addEventListener('mouseenter', () => tlBtn.play());
        button.addEventListener('mouseleave', () => tlBtn.reverse());
        button.addEventListener('mousedown', () => gsap.to(button, { scale: 0.98, duration: 0.1 }));
        button.addEventListener('mouseup', () => gsap.to(button, { scale: 1.03, duration: 0.2 }));
        button.addEventListener('mouseleave', () => {
          if (!tlBtn.isActive() && (gsap.getProperty(button, "scale") < 1 || gsap.getProperty(button, "scale") > 1)) {
            gsap.to(button, { scale: 1, y: 0, duration: 0.2 });
          }
        });
      });

      // Social Icon hover (keep as is)
      heroRef.current?.querySelectorAll('.social-icons a').forEach(icon => {
        const svg = icon.querySelector('svg');
        const hoverColor = icon.dataset.hoverColor || "#3B82F6";
        const iconTl = gsap.timeline({ paused: true });
        iconTl.to(icon, { y: -5, scale: 1.15, duration: 0.3, ease: 'back.out(2)' }, 0)
               .to(svg, { color: hoverColor, duration: 0.3, ease: 'power1.out' }, 0);
        icon.addEventListener('mouseenter', () => iconTl.play());
        icon.addEventListener('mouseleave', () => iconTl.reverse());
      });

      // Logo hover effect (keep as is)
      const logo = logoRef.current;
      if (logo) {
          const logoTl = gsap.timeline({ paused: true });
          logoTl.to(logo, { x: '+=2', y:'-=1', rotate: 1, duration: 0.05, ease: "steps(1)"})
                .to(logo, { x: '-=3', y:'+=2', rotate: -1.5, duration: 0.05, ease: "steps(1)"})
                .to(logo, { x: '+=1', y:'-=1', rotate: 0.5, duration: 0.05, ease: "steps(1)"})
                .to(logo, { x: 0, y:0, rotate: 0, duration: 0.05, ease: "steps(1)"})
                .to(logo, { filter: 'brightness(1.2)', duration: 0.1}, 0)
                .to(logo, { scale: 1.05, duration: 0.15, ease: 'power1.out'}, 0);
          logo.addEventListener('mouseenter', () => logoTl.play(0));
          logo.addEventListener('mouseleave', () => {
              gsap.to(logo, { x: 0, y: 0, rotate: 0, duration: 0.1 });
              gsap.to(logo, { filter: 'brightness(1)', scale: 1, duration: 0.3, ease: 'power1.inOut', delay: 0.05 });
          });
      }

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    // Use min-h-screen, flex column, justify center, and responsive padding
    <section
        ref={heroRef}
        className="relative w-full min-h-screen flex flex-col justify-center bg-white text-[#808080] px-4 sm:px-6 md:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20 md:py-20 overflow-hidden"
    >
      {/* Background Text - Much smaller base size, overflow hidden */}
      <div aria-hidden="true" className="background-about-text absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden opacity-0 w-full">
        <span className="text-7xl sm:text-8xl md:text-[16rem] lg:text-[24rem] xl:text-[30rem] font-bold text-[#EAEAEA] leading-none select-none whitespace-nowrap">
          About
        </span>
      </div>

      {/* Logo - Responsive Position */}
      <div ref={logoRef} className="hero-logo absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-20 opacity-0 cursor-pointer">
        <div className="bg-black text-white px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm md:text-base font-bold tracking-widest select-none">
            RD
        </div>
      </div>

      {/* Main Content Flex Container - Stacks on mobile */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 xl:gap-16 items-center">

        {/* Image Container - Order 1 on mobile, smaller max-width */}
        <div className="order-1 md:order-none md:w-1/2 flex justify-center md:justify-start">
          <div className="hero-image-container w-full max-w-[150px] sm:max-w-[260px] md:max-w-none aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
            <img
              ref={imageRef}
              src="/me.jpeg"
              alt="Ritik Dutta"
              className="w-full h-full object-cover opacity-0 transform-gpu"
            />
          </div>
        </div>

        {/* Text Content - Order 2 on mobile, takes remaining width on desktop */}
        <div className="order-2 md:order-none md:w-1/2 flex flex-col justify-center relative text-center md:text-left">
          {/* Vertical "About" Label - Adjusted position, size, consider hiding on xs */}
          {/* Hidden on very small screens, flex shown from sm up */}
          <div className="hero-about-label absolute left-[-20px] sm:left-[-30px] md:left-[-50px] lg:left-[-70px] top-0 bottom-0 hidden sm:flex items-center opacity-0">
            <div className="flex items-center rotate-180" style={{ writingMode: 'vertical-lr' }}>
              <span className="text-[0.6rem] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap font-['Karla'] text-[#B0B0B0]">About</span>
              <hr className="w-4 sm:w-6 md:w-8 lg:w-10 ml-1 sm:ml-2 md:ml-3 border-gray-300 rotate-180"/>
            </div>
          </div>

          {/* Name - Responsive Font Size */}
          <h1 ref={nameRef} className="hero-name-new font-['Playfair Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-black leading-tight mb-3 md:mb-5">
            {firstNameSpans}{' '} {/* Add space or keep br based on design pref */}
            {lastNameSpans}
          </h1>

          {/* Description - Responsive Text Size */}
          <p className="hero-description-new font-['Karla'] text-base md:text-lg text-[#707070] leading-relaxed mb-6 md:mb-8 max-w-md mx-auto md:mx-0 opacity-0">
            A tech explorer mixing logic with imagination. Fascinated by AI/ML transforming businesses, building smart IoT ecosystems, the elegance of code, the vastness of space, and the complexities of the mind. Ready to build something amazing.
          </p>

          {/* Buttons - Option 1: One Primary, Two Secondary */}
          <div className="hero-buttons flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 sm:gap-4 mb-8 md:mb-10">
            {/* Button 1: Slides (Primary) */}
            <a href="https://slides.ritikdutta.com/" target="_blank" rel="noreferrer"
               className="btn-primary px-6 py-2.5 sm:px-7 sm:py-2.5 w-full max-w-[280px] sm:max-w-none sm:w-auto text-center bg-[#FF6B6B] text-white rounded-full text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition-shadow duration-300">
              Slides
            </a>
            {/* Button 2: System Designs (Secondary) */}
            <a href="https://docs.ritikdutta.com/" target="_blank" rel="noreferrer"
               className="px-6 py-2.5 sm:px-7 sm:py-2.5 w-full max-w-[280px] sm:max-w-none sm:w-auto text-center bg-transparent text-[#FF6B6B] rounded-full border-2 border-[#FF6B6B] text-sm md:text-base font-semibold hover:bg-[#FF6B6B]/10 transition-colors duration-300">
              System Designs
            </a>
            {/* Button 3: Notebooks (Secondary) */}
            <a href="https://notebooks.ritikdutta.com/" target="_blank" rel="noreferrer"
               className="px-6 py-2.5 sm:px-7 sm:py-2.5 w-full max-w-[280px] sm:max-w-none sm:w-auto text-center bg-transparent text-[#FF6B6B] rounded-full border-2 border-[#FF6B6B] text-sm md:text-base font-semibold hover:bg-[#FF6B6B]/10 transition-colors duration-300">
              Notebooks
            </a>
          </div>

          {/* Social Icons - Responsive Spacing */}
          <div className="social-icons flex space-x-6 sm:space-x-8 md:space-x-10 justify-center md:justify-start">
            {/* SVG components are already responsive */}
            <a href="https://github.com/RitikDutta" target="_blank" rel="noreferrer" data-hover-color="#181717" className="relative group" aria-label="GitHub">
              <GithubSvg />
            </a>
            <a href="https://www.linkedin.com/in/ritikdutta/" target="_blank" rel="noreferrer" data-hover-color="#0A66C2" className="relative group" aria-label="LinkedIn">
              <LinkedinSvg />
            </a>
            <a href="https://x.com/RitikDutta7" target="_blank" rel="noreferrer" data-hover-color="#1DA1F2" className="relative group" aria-label="Twitter">
              <TwitterSvg />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


// ====================== SKILLS SECTION (Responsive) ======================
function Skills() {
  const skillsRef = useRef(null);
  const skillsData = [
    { category: "Machine Learning", icon: "🧠", list: ["ML Algorithms", "Data Analysis", "ML Pipelines", "Sklearn", "XGBoost"] },
    { category: "Deep Learning", icon: "💡", list: ["TensorFlow", "Detection", "CNN Architectures"] },
    { category: "DevOps", icon: "🚀", list: ["Deployment", "Automation", "Docker", "Jenkins", "Git", "AWS", "MLflow", "Circle CI", "CICD", "Cloud", "GCP"] },
    { category: "Backend", icon: "⚙️", list: ["Architecture", "Flask", "Databases", "NoSQL", "Cassandra", "Firebase", "Security", "OAuth", "GCP/AWS", "Nginx", "API"] },
    { category: "Computer Vision", icon: "👁️‍🗨️", list: ["Detection", "Tracking", "Classification", "OpenCV", "Yolo", "MediaPipe"] },
    { category: "Natural Language Processing", icon: "💬", list: ["Langchain", "Classification", "Sentiment", "GPT", "BERT", "Transformers"] },
    { category: "Web Development", icon: "💻", list: ["React", "Node.js", "TailwindCSS", "GSAP", "HTML/CSS/JS"] },
    { category: "Creative Tech", icon: "✨", list: ["Interactive Design", "Generative Art", "Web Animations"] },
    { category: "Cybersecurity", icon: "🔒", list: ["Penetration Testing", "Network Security", "Ethical Hacking"], blurred: true },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-header", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: skillsRef.current, start: "top 85%", once: true, invalidateOnRefresh: true },
      });
      gsap.from(".skill-card", {
        y: 50, opacity: 0, scale: 0.95, duration: 0.7, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".skills-grid", start: "top 80%", once: true, invalidateOnRefresh: true },
      });
      gsap.utils.toArray('.skill-card').forEach((card) => {
        const listItems = card.querySelectorAll('.skill-list li');
        const icon = card.querySelector('.skill-icon');

        // GSAP animations are generally okay with responsive changes
        if (icon) {
            gsap.from(icon, {
            scale: 0, rotate: -120, opacity: 0, duration: 0.7, ease: "back.out(1.8)", delay: 0.15,
            scrollTrigger: { trigger: card, start: "top 80%", once: true, invalidateOnRefresh: true }
            });
        }
        if (listItems.length > 0 && !card.classList.contains('blurred-card')) {
          gsap.from(listItems, {
            opacity: 0, x: -25, duration: 0.5, ease: "power2.out", stagger: 0.07,
            scrollTrigger: { trigger: card, start: "top 75%", once: true, invalidateOnRefresh: true }
          });
        }
      });

      // Enhanced Skill Card Hover (non-blurred)
      skillsRef.current.querySelectorAll('.skill-card:not(.blurred-card)').forEach(card => {
        const hoverBorderColor = "#FF6B6B";
        const icon = card.querySelector('.skill-icon');
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl.to(card, {
          y: -8, rotateY: -5, borderColor: hoverBorderColor,
          boxShadow: `0 10px 30px -10px rgba(255, 107, 107, 0.35)`,
          duration: 0.35, ease: "power2.out",
        }, 0);
        if (icon) {
             hoverTl.to(icon, {
             scale: 1.18, rotate: 8, y: -3,
             duration: 0.4, ease: "elastic.out(1, 0.5)",
            }, 0);
        }

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());
      });
    }, skillsRef);
    return () => ctx.revert();
  }, []); // Empty dependency array

  return (
    <section id="skills" ref={skillsRef} className="relative py-16 md:py-24 lg:py-28 bg-white text-[#808080] overflow-hidden font-['Karla']">
      {/* Creative Grid Background */}
      <div aria-hidden="true" className="absolute inset-0 z-[-1] opacity-20" style={{
        backgroundImage: `linear-gradient(to right, #E5E7EB 1px, transparent 1px),
                         linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)`,
        backgroundSize: '30px 30px sm:40px sm:40px', // Smaller grid on mobile
        maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)'
      }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header - Responsive Font Size & Margin */}
        <h2 className="skills-header text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 tracking-tight font-['Playfair Display'] text-black">
          My Creative Toolkit
        </h2>
        <p className="skills-header text-center mb-12 md:mb-16 text-base sm:text-lg leading-relaxed font-['Karla'] text-[#808080] max-w-3xl mx-auto">
          Blending technical skills from diverse domains – from the logical realm of code to... other classified operations.
        </p>
        {/* Grid - Responsive Columns */}
        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillsData.map((skillCat, index) => (
            <div key={index} className={`skill-card relative bg-white rounded-xl p-5 sm:p-6 border border-gray-200 transition-all duration-300 group ${skillCat.blurred ? 'blurred-card' : ''}`}
                 style={{ transformOrigin: 'center', perspective: '1000px' }}
            >
              {/* Content inside the card */}
              <div className={`relative z-10 flex flex-col h-full ${skillCat.blurred ? 'opacity-50 select-none' : ''}`}>
                <div className="flex items-center mb-3 sm:mb-4">
                  <span className="skill-icon text-2xl sm:text-3xl mr-3 transform-gpu">{skillCat.icon}</span>
                  <h3 className="font-semibold text-lg sm:text-xl tracking-tight font-['Playfair Display'] text-black">
                    {skillCat.category}
                  </h3>
                </div>
                <ul className="skill-list text-sm pl-1 space-y-1.5 list-disc list-inside font-['Karla'] text-[#808080]">
                  {skillCat.list.map((skill, i) => (
                    <li key={i} className="transition-colors duration-200">{skill}</li>
                  ))}
                </ul>
              </div>
              {/* Blurred Overlay */}
              {skillCat.blurred && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[1.5px] flex items-center justify-center font-semibold text-[#808080] z-20 rounded-xl text-xs sm:text-sm pointer-events-none">
                  (Confidential)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ====================== PROJECTS SECTION (Responsive) ======================
function Projects() {
  const projectsRef = useRef(null);
  const projectsData = [
    { 
      title: "Company Work Environment Management System", 
      img: "/project_company_management.gif", 
      description: "This project aims to use facial recognition technology to monitor employee productivity and track specific activities in the workplace.", 
      liveLink: "https://cwem.space/", 
      codeLink: "https://github.com/RitikDutta/Company-work-environment-management", 
      tags: ["Computer Vision", "Python", "OpenCV", "Data Analytics", "UX Psychology"] 
    },
    { 
      title: "Datamigrato", 
      img: "/project_datamigrato.gif", 
      description: "Datamigrato: Simplifying complex data migrations. Versatile Python package for seamless transfer across databases. Effortlessly streamline your backend operations.", 
      liveLink: "https://pypi.org/project/datamigrato/", 
      codeLink: "https://github.com/RitikDutta/datamigrato", 
      tags: ["Python", "SQL", "Databases", "ETL", "Backend"] 
    },
    { 
      title: "Interview Ready", 
      img: "/project_interview_ready.png", 
      description: "Generative AI-based Interview Coach: Revolutionize your interview preparation with our AI-Powered Mock Interview Platform. Experience realistic interview simulations tailored to a wide range of professional fields—from IT and business management to psychology and civil services. Enhance your preparation with our dynamic user profile system, featuring secure authentication and efficient session management. Personalize your practice sessions by selecting interviewers based on gender, language preferences (English or Hindi), and specific career domains. Gain invaluable insights through instant feedback, track your progress with quantifiable scoring, and prepare for real-world scenarios by engaging in mock interviews that replicate actual job interview experiences in your chosen field.", 
      liveLink: "https://irready.site/", 
      codeLink: "https://github.com/RitikDutta/Interview_mentor", 
      tags: ["Generative AI", "LLM", "React", "Node.js", "NLP", "Psychology"] 
    },
    { 
      title: "Inventory Management Chatbot", 
      img: "/project_food_chatbot.gif", 
      description: "This advanced chatbot streamlines inventory management and sales tracking, offering real-time insights into customer orders and popular items, enabling efficient inventory adjustments based on monthly sales trends.", 
      liveLink: "https://bot.dialogflow.com/food2bot", 
      codeLink: "https://github.com/RitikDutta/Food-Divilery-chatbot", 
      tags: ["Chatbot", "NLP", "Python", "Flask", "Database"] 
    },
    { 
      title: "Raaga Rhythms", 
      img: "/project_raaga_rhythm.jpg", 
      description: "Immerse in the melodious realms of Indian classical music, where each raga unfolds a unique story. Delve into the harmony of tradition through symphonic streams and full insights on each song, echoing the soulful rhythm of timeless ragas.", 
      liveLink: "https://ritikdutta.github.io/RaagaRhythms/", 
      codeLink: "https://github.com/RitikDutta/RaagaRhythms", 
      tags: ["Web Dev", "Music Tech", "React", "GSAP", "Data Viz", "Creative Coding"] 
    },
    // { 
    //   title: "Generative Cosmos Explorer", 
    //   img: "/project_company_management.gif", 
    //   description: "An interactive web app allowing users to tweak parameters and algorithms, generating unique, abstract visuals inspired by space and natural phenomena.", 
    //   liveLink: "#", 
    //   codeLink: "#", 
    //   tags: ["Creative Coding", "JavaScript", "p5.js", "Generative Art", "UI/UX", "Space"] 
    // },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-header", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: projectsRef.current, start: "top 85%", once: true, invalidateOnRefresh: true },
      });

      gsap.utils.toArray('.project-block').forEach((block) => {
        const imageWrapper = block.querySelector('.project-image-wrapper');
        const image = block.querySelector('.project-image');
        const details = block.querySelector('.project-details');
        const title = details?.querySelector('h3');
        const description = details?.querySelector('p');
        const tags = gsap.utils.toArray(details?.querySelectorAll('.project-tag') ?? []);
        const links = details?.querySelector('.project-links');

        // Initial reveal animation
        gsap.fromTo(block,
          { y: 80, opacity: 0, skewY: 3, scale: 0.98 },
          { y: 0, opacity: 1, skewY: 0, scale: 1, duration: 1.1, ease: "expo.out",
            scrollTrigger: { trigger: block, start: "top 90%", once: true, invalidateOnRefresh: true }
          }
        );

        // Image reveal
        if (imageWrapper && image) {
           gsap.fromTo(image,
            { yPercent: 101, opacity: 0.5 },
            { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out",
              scrollTrigger: { trigger: imageWrapper, start: "top 85%", once: true, invalidateOnRefresh: true }
            }
          );
        }

        // Text content reveal
        if (details) {
            const revealElements = [title, description, ...(tags.length > 0 ? [tags] : []), links].filter(Boolean);
            gsap.fromTo(revealElements,
              { y: 35, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12,
                scrollTrigger: { trigger: details, start: "top 80%", once: true, invalidateOnRefresh: true }
              }
            );
        }

        // Image Parallax Scroll
        if (image) {
          gsap.to(image, {
            yPercent: -12, scale: 1.05, ease: "none",
            scrollTrigger: { trigger: block, start: "top bottom", end: "bottom top", scrub: 1.8, invalidateOnRefresh: true }
          });
        }

        // Creative Hover Effect for the entire block
        const innerCard = block.querySelector('.project-inner-card');
        if (innerCard && image) {
            const hoverTl = gsap.timeline({ paused: true });
            hoverTl.to(innerCard, {
                y: -8, rotateY: -4,
                boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.15)',
                borderColor: '#FF6B6B',
                duration: 0.35, ease: 'power2.out'
            }, 0)
            .to(image, {
                scale: 1.08, // Will be combined with parallax scale
                duration: 0.4, ease: 'power2.out'
            }, 0);

            block.addEventListener('mouseenter', () => hoverTl.play());
            block.addEventListener('mouseleave', () => hoverTl.reverse());
        }

        // Tag hover effect
        tags.forEach(tag => {
            const tagTl = gsap.timeline({ paused: true });
            tagTl.to(tag, {
                backgroundColor: '#FFD166', color: '#4A4A4A', scale: 1.05,
                duration: 0.2, ease: 'power1.out'
            });
            tag.addEventListener('mouseenter', () => tagTl.play());
            tag.addEventListener('mouseleave', () => tagTl.reverse());
        });

      });
    }, projectsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={projectsRef} className="relative py-16 md:py-24 lg:py-28 bg-gray-50 text-[#808080] overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header - Responsive Font Size & Margin */}
        <h2 className="projects-header text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 tracking-tight font-['Playfair Display'] text-black">
          Showcase of Creation
        </h2>
        <p className="projects-header text-center mb-16 md:mb-24 text-base sm:text-lg font-['Karla'] leading-relaxed text-[#808080] max-w-3xl mx-auto">
          Selected projects where technology meets creativity, science, and user understanding.
        </p>
        {/* Stack projects vertically, responsive spacing */}
        <div className="space-y-16 md:space-y-24 lg:space-y-28">
          {projectsData.map((project, index) => (
            <div key={index} className="project-block opacity-0" style={{ perspective: '1200px' }}>
              {/* Inner card for hover - Responsive Padding */}
              <div className="project-inner-card bg-white rounded-xl shadow-lg border border-gray-200 p-5 sm:p-6 md:p-8 lg:p-10 overflow-hidden transition-all duration-300 ease-out" style={{ transformOrigin: 'center' }}>
                <div className="project-image-wrapper mb-5 sm:mb-6 md:mb-8 aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 shadow-inner">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="project-image w-full h-full object-contain bg-gray-50 transform-gpu transition-transform duration-300 ease-out"
                  />
                </div>
                {/* Details - Responsive Text Alignment & Sizes */}
                <div className="project-details text-center md:text-left">
                  <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-black mb-2 sm:mb-3 font-['Playfair Display']">
                    {project.title}
                  </h3>
                  <p className="text-base md:text-lg mb-4 sm:mb-5 font-['Karla'] leading-relaxed text-[#808080] max-w-3xl mx-auto md:mx-0">
                    {project.description}
                  </p>
                  {/* Tags - Responsive Justification */}
                  <div className="project-tags flex flex-wrap justify-center md:justify-start gap-2 mb-5 sm:mb-6">
                    {project.tags?.map(tag => (
                      <span key={tag} className="project-tag text-xs font-medium bg-[#EBF4FF] px-3 py-1 rounded-full font-['Karla'] text-[#3B82F6] transition-all duration-200 cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Links - Responsive Layout & Justification */}
                  <div className="project-links flex flex-col sm:flex-row justify-center md:justify-start items-center gap-3 sm:gap-4 mt-5 sm:mt-6">
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-2.5 border border-gray-300 rounded-full text-sm font-semibold font-['Karla'] text-[#808080] hover:bg-gray-100 hover:border-gray-400 hover:text-black transition duration-200 ease-in-out"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 01-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        View Code
                      </a>
                    )}
                    {project.liveLink && project.title === "Inventory Management Chatbot" ? (
                      <>
                        <a
                          href="https://t.me/Foodtest2bot"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-2.5 bg-[#3B82F6] text-white rounded-full text-sm font-semibold font-['Karla'] hover:bg-blue-700 transition duration-200 ease-in-out shadow hover:shadow-md"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.03 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                          Live Demo
                        </a>
                        <a
                          href="https://bot.dialogflow.com/food2bot"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-2.5 bg-[#FF6B6B] text-white rounded-full text-sm font-semibold font-['Karla'] hover:bg-red-600 transition duration-200 ease-in-out shadow hover:shadow-md group"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.03 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                          <span className="group-hover:hidden">Lite Demo</span>
                          <span className="hidden group-hover:inline">Limited Functionality</span>
                        </a>
                      </>
                    ) : project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-2.5 bg-[#3B82F6] text-white rounded-full text-sm font-semibold font-['Karla'] hover:bg-blue-700 transition duration-200 ease-in-out shadow hover:shadow-md"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.03 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                        {project.title === "Datamigrato" ? "PyPi Library" : "Live Demo"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ====================== COMMUNITY SECTION (Responsive Marquee) ======================
function Community() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- setupMarqueeRef needs stable identity or be outside effect
  const setupMarqueeRef = useRef(null);

  const images = [
    { img: "/social_impact_food_drive.jpeg", heading: "Food Drive", description: "As a committed volunteer, I've had the honor of serving our community, especially on meaningful days like Independence Day. I spearheaded food drives, collecting staples like rice, daals, and aata, and distributed them to needy families in neighboring villages, fostering a shared sense of nourishment and hope in our celebrations.", date: "Oct 2023" },
    { img: "/social_impact_food_drive_2.jpeg", heading: "Food Drive", description: "Sharing Meals, Spreading Hope: As the volunteer in the blue shirt, I've experienced the joy of serving meals and smiles to children in need. Each plate is a blend of kindness and compassion, a belief in a brighter future for every child. Together, let's take steps towards eradicating hunger, one meal at a time.", date: "Nov 2023" },
    { img: "/social_impact_plantation.jpeg", heading: "Plantation Drive", description: "Planting Tomorrow: As an Environmental Conservation Volunteer, I embrace the role of Earth's steward, nurturing the future with each tree planted. Each sapling signifies hope, a step towards ecological restoration and a legacy for the coming generations. Together, we stand as guardians of nature's splendor, weaving our efforts into the tapestry of Earth's well-being.", date: "Mar 2024" },
    { img: "/social_impact_food_drive_3.jpeg", heading: "Food Drive", description: "Cultivating Futures: Each meal I serve as a Food Assistance Volunteer brings hope and nourishment to underprivileged children. Beyond sustenance, it's a gesture of kindness and a step towards a world where no child goes hungry. Join in this journey of compassion, one meal at a time.", date: "May 2024" },
    { img: "/social_impact_3.jpeg", heading: "Community Impact", description: "Making a difference in the community.", date: "Jun 2024" },
  ];
  const fullList = [...images, ...images]; // Duplicate for seamless loop

  useEffect(() => {
      const container = containerRef.current;
      const cards = gsap.utils.toArray(".comm-card");
      if (!cards.length || !container) return;

      // Store bound functions for removal
      let boundMouseEnter = null;
      let boundMouseLeave = null;
      let boundRefreshInit = null;
      let boundRefresh = null;

      // Marquee setup function defined inside useEffect
      setupMarqueeRef.current = () => {
          if (!cards[0]) return; // Guard against no cards

          // Get computed width and margin, fallback values added
          const cardElement = cards[0];
          const cardStyle = getComputedStyle(cardElement);
          const cardWidth = cardElement.offsetWidth || 300; // Fallback width
          const marginRight = parseFloat(cardStyle.marginRight) || 16; // Fallback margin
          // Assuming symmetrical margin, use marginRight * 2 for total horizontal spacing around one card
          const totalCardSpace = cardWidth + marginRight; // Use only right margin since flex handles spacing
          const singleLoopWidth = totalCardSpace * images.length;

          gsap.set(container, { width: singleLoopWidth * 2 });

          if (animationRef.current) animationRef.current.kill();

          animationRef.current = gsap.to(container, {
              x: `-=${singleLoopWidth}`,
              duration: 60,
              ease: "none",
              repeat: -1,
              modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % -singleLoopWidth) },
              overwrite: true
          });

          // Pause on hover for the wrapper
          const marqueeWrapper = sectionRef.current?.querySelector('.marquee-wrapper');
          if (marqueeWrapper) {
              // Remove previous listeners before adding new ones
              if (boundMouseEnter) marqueeWrapper.removeEventListener('mouseenter', boundMouseEnter);
              if (boundMouseLeave) marqueeWrapper.removeEventListener('mouseleave', boundMouseLeave);

              boundMouseEnter = () => animationRef.current?.timeScale(0.2);
              boundMouseLeave = () => animationRef.current?.timeScale(1);

              marqueeWrapper.addEventListener('mouseenter', boundMouseEnter);
              marqueeWrapper.addEventListener('mouseleave', boundMouseLeave);
          }
      };

      // GSAP Context for cleanup
      const ctx = gsap.context(() => {
          // Header animation
          gsap.from(".community-header", {
              y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
              stagger: 0.1,
              scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true, invalidateOnRefresh: true },
          });

          // Card Hover Animation (Refined)
          cards.forEach(card => {
              const img = card.querySelector('.comm-card-img');
              const hoverBorderColor = "#FF6B6B";
              const tl = gsap.timeline({ paused: true });

              tl.to(card, {
                  y: -6, scale: 1.03,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.09)",
                  borderColor: hoverBorderColor,
                  duration: 0.3, ease: "power1.out"
              }, 0);
              if (img) {
                 tl.to(img, {
                     scale: 1.08,
                     duration: 0.35, ease: "power1.out"
                 }, 0);
              }

              card.addEventListener('mouseenter', () => tl.play());
              card.addEventListener('mouseleave', () => tl.reverse());
          });

      }, sectionRef); // Scope GSAP animations

      // Initial setup with a slight delay
      const setupTimeout = setTimeout(() => setupMarqueeRef.current(), 150);

      // Refresh marquee on window resize/ScrollTrigger refresh
      boundRefreshInit = () => {
          clearTimeout(setupTimeout);
          if (animationRef.current) animationRef.current.kill();
      };
      boundRefresh = () => {
          setupMarqueeRef.current(); // Re-run setup after refresh
      };

      ScrollTrigger.addEventListener("refreshInit", boundRefreshInit);
      ScrollTrigger.addEventListener("refresh", boundRefresh);


      // Cleanup function
      return () => {
          clearTimeout(setupTimeout);
          if (animationRef.current) animationRef.current.kill();

          // Remove event listeners using the stored bound functions
          ScrollTrigger.removeEventListener("refreshInit", boundRefreshInit);
          ScrollTrigger.removeEventListener("refresh", boundRefresh);
          const marqueeWrapper = sectionRef.current?.querySelector('.marquee-wrapper');
          if (marqueeWrapper) {
              if (boundMouseEnter) marqueeWrapper.removeEventListener('mouseenter', boundMouseEnter);
              if (boundMouseLeave) marqueeWrapper.removeEventListener('mouseleave', boundMouseLeave);
          }

          ctx.revert(); // Revert GSAP animations and ScrollTriggers
      };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]); // Rerun effect if number of images changes


  return (
    <section id="community" ref={sectionRef} className="relative py-16 md:py-24 lg:py-28 text-center bg-white text-[#808080] overflow-hidden">
      <div className="relative z-10">
        {/* Header - Responsive Font Size & Margin */}
        <h2 className="community-header text-3xl sm:text-4xl md:text-5xl font-bold mb-3 font-['Playfair Display'] text-black tracking-tight px-4">
          Beyond the Code
        </h2>
        <p className="community-header max-w-2xl mx-auto px-4 text-base sm:text-lg mb-12 md:mb-16 leading-relaxed font-['Karla'] text-[#808080]">
          Beyond my passion for tech and innovation, I'm committed to giving back—volunteering to support underprivileged children with food and education. It's my way of helping build a brighter, more equitable future.        </p>
        <div className="marquee-wrapper relative w-full cursor-grab active:cursor-grabbing overflow-hidden group py-4">
          {/* Container for doubled items */}
          <div ref={containerRef} className="flex will-change-transform">
            {fullList.map((item, i) => (
              // Card - Responsive Width & Margin
              <div key={i} className="comm-card flex-shrink-0 w-64 sm:w-72 md:w-80 mx-2 bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-left transition-all duration-300 ease-out transform-gpu" style={{ marginRight: '16px' }}> {/* Consistent right margin */}
                <div className="overflow-hidden rounded-lg mb-4 aspect-[3/4] bg-gray-100"> {/* Changed to portrait aspect ratio */}
                  <img 
                    src={item.img} 
                    alt={item.heading} 
                    className="comm-card-img w-full h-full object-cover bg-gray-50" // Changed back to object-cover
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold font-['Playfair Display'] text-black mb-1 truncate">
                  {item.heading}
                </h3>
                <p className="text-sm mb-2 font-['Karla'] text-[#808080] line-clamp-2">{item.description}</p>
                <p className="text-xs italic mt-auto pt-2 font-['Karla'] text-[#A0A0A0]">{item.date}</p>
              </div>
            ))}
          </div>
          {/* Fades for edges - Responsive Width */}
          <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none z-10"></div>
          <div aria-hidden="true" className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
}

// ====================== BLOGS SECTION (Responsive) ======================
function Blogs() {
  const blogsRef = useRef(null);
  const blogData = [
    { 
      title: "AlexNet in a Nutshell", 
      date: "May 2020", 
      img: "/blog_alexnet.png", 
      snippet: "AlexNet was trained on ImageNet datasets consists of 1.2 million data(images) which contains 1000 different classes having 60 million parameters and 650000 neurons consist of 5 convolutional layers", 
      link: "https://medium.com/analytics-vidhya/alexnet-in-a-nutshell-4a9445e92d6d?source=user_profile---------3----------------------------" 
    },
    { 
      title: "LeNet in a nutshell", 
      date: "May 2020", 
      img: "/blog_lenet.jpg", 
      snippet: "How LeNet works, Architecture, how to train model using LeNet architecture on keras and also how to design a better model than LeNet using same architecture but with different activation, loss functions etc, and compare the accuracy of new LeNet and original LeNet model.", 
      link: "https://medium.com/@ritikduttagd/lenet-in-a-nutshell-2303330cc7db?source=user_profile---------4----------------------------" 
    },
    { 
      title: "Principal Component Analysis(PCA) in a Nutshell", 
      date: "Nov 2022", 
      img: "/blog_pca.png", 
      snippet: "With increase in dimensions(like 100's/features) leads to problems like: Time Complexity increases, Difficult to generalize relations, All the time all features are not going to contribute, Hard to find shape of data", 
      link: "https://medium.com/@ritikduttagd/principal-component-analysis-pca-in-a-nutshell-6e422e1bb529?source=user_profile---------2----------------------------" 
    },
    { 
      title: "K-means in a Nutshell", 
      date: "Nov 2022", 
      img: "/blog_kmeans.png", 
      snippet: "The K-means clustering algorithm computes centroids and repeats until the optimal centroid is found. It is presumptively known how many clusters there are. It is also known as the flat clustering algorithm.", 
      link: "https://medium.com/@ritikduttagd/k-means-in-a-nutshell-6d06c7a78ff7?source=user_profile---------1----------------------------" 
    },
    { 
      title: "Project Management", 
      date: "Dec 2022", 
      img: "/blog_project_management.png", 
      snippet: "A data science project is the most important aspect of a data scientist's work. It is the culmination of all their work and efforts. The structure for a data science project should be set up in such a way that it can be easily followed by other team members.", 
      link: "https://medium.com/@ritikduttagd/master-the-art-of-data-science-and-launch-a-top-notch-project-today-4075f46f9dfe?source=user_profile---------0----------------------------" 
    },
    // { 
    //   title: "Animating Interfaces with GSAP & React", 
    //   date: "Feb 2024", 
    //   img: "/blog_project_management.png", 
    //   snippet: "Leveraging GreenSock (GSAP) within React to create fluid, engaging user experiences.", 
    //   link: "#" 
    // },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blogs-header", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: blogsRef.current, start: "top 85%", once: true, invalidateOnRefresh: true },
      });
      gsap.from(".blog-card", {
        opacity: 0, y: 60, scale: 0.95, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".blogs-grid", start: "top 80%", once: true, invalidateOnRefresh: true },
      });

      blogsRef.current.querySelectorAll('.blog-card').forEach(card => {
        const img = card.querySelector('.blog-card-img');
        const readMoreLink = card.querySelector('.read-more-link');
        const readMoreArrow = readMoreLink?.querySelector('span');

        // Card Hover Effect
        const tl = gsap.timeline({ paused: true });
        tl.to(card, {
            y: -8, rotateY: 5,
            boxShadow: "0 10px 25px -8px rgba(0, 0, 0, 0.12)",
            borderColor: "#3B82F6",
            duration: 0.35, ease: "power2.out"
        }, 0);
        if (img) {
            tl.to(img, {
                scale: 1.07, filter: 'brightness(1.05)',
                duration: 0.4, ease: "power2.out"
            }, 0);
        }

        // Read More Link Hover
        if (readMoreArrow && readMoreLink) {
           const linkTl = gsap.timeline({ paused: true });
           linkTl.to(readMoreLink, { color: '#3B82F6', duration: 0.2}, 0)
                 .to(readMoreArrow, { x: 5, scaleX: 1.2, duration: 0.3, ease: "power2.inOut" }, 0);

           readMoreLink.addEventListener('mouseenter', () => linkTl.play());
           readMoreLink.addEventListener('mouseleave', () => linkTl.reverse());
        }

        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
      });
    }, blogsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="blogs" ref={blogsRef} className="relative py-16 md:py-24 lg:py-28 bg-gray-50 text-[#808080] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header - Responsive Font Size & Margin */}
        <h2 className="blogs-header text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 font-['Playfair Display'] text-black tracking-tight">
          Ideas & Insights
        </h2>
        <p className="blogs-header text-center mb-12 md:mb-16 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-['Karla'] text-[#808080]">
          Exploring the intersections of technology, creativity, science, and the human experience.
        </p>
        {/* Grid - Responsive columns and gap */}
        <div className="blogs-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogData.map((blog, index) => (
            <div key={index} className="blog-card bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-md transition-all duration-300 ease-out group transform-gpu hover:shadow-lg" style={{ perspective: '1000px', transformOrigin: 'center' }}>
              <div className="overflow-hidden h-48 sm:h-56 bg-gray-100"> {/* Adjusted height and made it consistent */}
                <img 
                  src={blog.img} 
                  alt={blog.title} 
                  className="blog-card-img w-full h-full object-contain bg-gray-50" // Changed to object-contain
                />
              </div>
              {/* Card Content - Responsive Padding */}
              <div className="p-4 sm:p-5 flex flex-col flex-grow bg-white">
                {/* Responsive Title Size */}
                <h3 className="font-semibold text-base sm:text-lg mb-1 font-['Playfair Display'] text-black tracking-tight transition-colors duration-300">
                  {blog.title}
                </h3>
                <p className="text-xs mb-2 sm:mb-3 font-['Karla'] text-[#A0A0A0]">{blog.date}</p>
                <p className="text-sm flex-grow leading-relaxed mb-3 sm:mb-4 font-['Karla'] text-[#808080] line-clamp-3">{blog.snippet}</p>
                <a href={blog.link} target="_blank" rel="noopener noreferrer" className="read-more-link mt-auto self-start text-sm font-semibold transition-colors duration-300 font-['Karla'] text-[#808080] group/link">
                  Read more <span className="inline-block transition-transform duration-300 ease-in-out group-hover/link:translate-x-1 origin-left">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ====================== FOOTER SECTION (Responsive) ======================
function Footer() {
  const footerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([".footer-icons", ".footer-text", ".footer-pulse"], {
        y: 25, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { trigger: footerRef.current, start: "top 95%", once: true, invalidateOnRefresh: true }
      });

      // Icon hover - Use slightly smaller base icons defined in SVG components
      footerRef.current.querySelectorAll('.footer-icons a').forEach(icon => {
        const svg = icon.querySelector('svg');
        if (!svg) return;
        const hoverColor = icon.dataset.hoverColor || '#FF6B6B';
        const initialColor = '#808080';
        icon.addEventListener('mouseenter', () => gsap.to(svg, { color: hoverColor, scale: 1.15, y: -3, duration: 0.25, ease: 'power1.out' }));
        icon.addEventListener('mouseleave', () => gsap.to(svg, { color: initialColor, scale: 1, y: 0, duration: 0.2, ease: 'power1.in' }));
      });

      // Pulse animation for the dot
       gsap.to(".footer-pulse-dot", {
         scale: 1.5, opacity: 0.5,
         repeat: -1, yoyo: true, duration: 1.2,
         ease: "power1.inOut", delay: 1
       });

    }, footerRef);
    return () => ctx.revert();
  }, []);

  // Using the responsive SVG components defined earlier
  const githubIcon = <GithubSvg />;
  const linkedinIcon = <LinkedinSvg />;
  const twitterIcon = <TwitterSvg />;


  return (
    <footer id="contact" ref={footerRef} className="relative bg-gray-100 text-[#808080] py-10 sm:py-12 z-10 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        {/* Icons - Responsive Spacing */}
        <div className="footer-icons flex justify-center space-x-6 sm:space-x-8 mb-5 sm:mb-6">
           <a href="https://github.com/RitikDutta" target="_blank" rel="noreferrer" data-hover-color="#181717" className="group" aria-label="GitHub">{githubIcon}</a>
           <a href="https://www.linkedin.com/in/ritikdutta/" target="_blank" rel="noreferrer" data-hover-color="#0A66C2" className="group" aria-label="LinkedIn">{linkedinIcon}</a>
           <a href="https://x.com/RitikDutta7" target="_blank" rel="noreferrer" data-hover-color="#1DA1F2" className="group" aria-label="Twitter">{twitterIcon}</a>
        </div>
        <p className="footer-text text-sm font-light font-['Karla'] text-[#808080]">
          Designed & Crafted with <span className="text-[#FF6B6B] mx-1" aria-label="love">♡</span> by Ritik Dutta
          <span className="footer-pulse inline-block ml-2 relative top-[1px]" aria-hidden="true">
             <span className="footer-pulse-dot absolute w-1.5 h-1.5 bg-[#FF6B6B] rounded-full opacity-100"></span>
             <span className="w-1.5 h-1.5 inline-block"></span> {/* Placeholder */}
          </span>
           © {new Date().getFullYear()}
        </p>
        {/* <p className="footer-text text-xs font-light mt-1.5 font-['Karla'] text-[#A0A0A0]">
          Powered by React, Tailwind CSS, GSAP, and a sprinkle of cosmic dust.
        </p> */}
      </div>
    </footer>
  );
}

// ====================== BOTTOM BANNER (Fixed Display Issue) ======================
function BottomBanner() {
  const bannerRef = useRef(null);
  const marqueeText = "Always exploring... Building with curiosity... Connecting ideas... Debugging the universe... ";

  useEffect(() => {
    // Ensure bannerRef.current exists before animating
    if (!bannerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate FROM yPercent: 100 (below screen) and opacity: 0
      // TO the default state (yPercent: 0, opacity: 1)
      gsap.from(bannerRef.current, {
        duration: 0.8,
        yPercent: 100,
        opacity: 0, // GSAP handles setting the initial opacity
        ease: "power2.out",
        delay: 2 // Adjust delay as needed
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      {/* CSS for marquee and pulse (Keep this as is) */}
      <style>{`
        @keyframes marqueeLight { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        @keyframes simplePulse { 0%, 100% { opacity: 0.5; box-shadow: 0 0 6px 0px rgba(255, 107, 107, 0.4); } 50% { opacity: 1; box-shadow: 0 0 10px 2px rgba(255, 107, 107, 0.6); } }

        .marquee-container-light {
            position: absolute; top: 0; right: 0; height: 100%;
            overflow: hidden; display: flex; align-items: center;
            left: 2.5rem; /* Default for mobile */
            mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }
        .bannerTextWrapper-light {
             white-space: nowrap; will-change: transform; display: flex;
             animation: marqueeLight 30s linear infinite; /* Base animation speed */
         }
        .bannerText-light {
            display: inline-block;
            padding-right: 30px; /* Base padding */
            font-family: 'Karla', Arial, sans-serif;
            font-size: 0.75rem; /* Base font size */
            font-style: italic;
            color: #808080;
        }
        .status-indicator {
            position: absolute;
            left: 1rem; /* Base position */
            top: 50%; transform: translateY(-50%);
            width: 8px; height: 8px;
            background-color: #FF6B6B; border-radius: 50%;
            animation: simplePulse 2s ease-in-out infinite;
        }
        /* Apply adjustments for sm screens and up */
        @media (min-width: 640px) {
            .marquee-container-light { left: 3rem; }
            .bannerTextWrapper-light { animation-duration: 40s; } /* Slower on larger screens */
            .bannerText-light { font-size: 0.8rem; padding-right: 40px; }
            .status-indicator { left: 1.25rem; }
        }
      `}</style>

      {/* *** REMOVED opacity-0 from className *** */}
      <div
        ref={bannerRef}
        className="fixed bottom-0 left-0 w-full h-10 bg-white/85 backdrop-blur-sm text-[#808080] z-[50] border-t border-gray-200/80 shadow-[0_-2px_5px_rgba(0,0,0,0.03)]"
      >
        <div className="w-full h-full relative">
          <div className="status-indicator"></div>
          <div className="marquee-container-light">
            <div className="bannerTextWrapper-light">
              <span className="bannerText-light">{marqueeText}</span>
              <span className="bannerText-light" aria-hidden="true">{marqueeText}</span> {/* Duplicate */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


// ====================== MAIN EXPORT ======================
export default function PortfolioLight() {
  useEffect(() => {
    // Apply body styles needed globally
    document.body.style.backgroundColor = '#FDFDFD'; // Slightly off-white background
    document.body.classList.add('overflow-x-hidden'); // Prevent horizontal scroll globally

    // Force ScrollTrigger refresh after initial layout settle
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 300);

    // Cleanup on component unmount
    return () => {
      clearTimeout(refreshTimeout);
      document.body.style.backgroundColor = ''; // Reset body background
      document.body.classList.remove('overflow-x-hidden');
      // It's good practice to kill ScrollTriggers created by components,
      // GSAP context in each component should handle this via .revert()
      // ScrollTrigger.killAll(); // Maybe too aggressive if other parts use ST
    };
  }, []);

  return (
    // Base font, background, text color set here or on body
    // Perspective can be useful for 3D transforms if needed globally
    <div className="font-['Karla'] bg-gray-50 text-[#808080] relative">
      <StarfieldBackground />
      <CursorTrail />

      <main> {/* Wrap sections in main for semantics */}
        <HeroRedesignedFixed />
        <Skills />
        <Projects />
        <Community />
        <Blogs />
        <Footer />
      </main>

      <BottomBanner />
    </div>
  );
}