// @ts-nocheck
/**
 * App shell wiring together all portfolio sections.
 * Linked styles: global Tailwind setup in src/index.css configures fonts and base utilities.
 * External script: GSAP + ScrollTrigger registered via src/lib/gsap.ts; routing handled by react-router.
 */
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Interview from "./pages/Interview";
import StarfieldBackground from "./components/background/StarfieldBackground";
import CursorTrail from "./components/interactive/CursorTrail";
import HeroSection from "./sections/HeroSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import CommunitySection from "./sections/CommunitySection";
import BlogsSection from "./sections/BlogsSection";
import FooterSection from "./sections/FooterSection";
import BottomBanner from "./components/BottomBanner";
import { ScrollTrigger } from "./lib/gsap";

export default function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#FDFDFD";
    document.body.classList.add("overflow-x-hidden");

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 300);

    return () => {
      clearTimeout(refreshTimeout);
      document.body.style.backgroundColor = "";
      document.body.classList.remove("overflow-x-hidden");
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="font-['Karla'] bg-gray-50 text-[#808080] relative">
              <StarfieldBackground />
              <CursorTrail />

              <main>
                <HeroSection />
                <SkillsSection />
                <ProjectsSection />
                <CommunitySection />
                <BlogsSection />
                <FooterSection />
              </main>

              <BottomBanner />
            </div>
          }
        />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </BrowserRouter>
  );
}
