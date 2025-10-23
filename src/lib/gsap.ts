// @ts-nocheck
// Centralised GSAP setup so all sections share the same plugin registration.
// Linked styles: Tailwind utility classes live in src/index.css. External script: GSAP ScrollTrigger plugin.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
