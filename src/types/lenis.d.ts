declare module '@studio-freight/lenis' {
  export default class Lenis {
    constructor(options?: any);
    raf(time: number): void;
    scrollTo(target: Element): void;
    // Add other methods as needed
  }
} 