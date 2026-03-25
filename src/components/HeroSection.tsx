import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.4, delay: 0.5 })
      .fromTo(labelRef.current, { opacity: 0, y: 20, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, '-=0.8')
      .fromTo(titleRef.current?.querySelectorAll('.word') || [], { opacity: 0, y: 100, rotateX: 50 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' }, '-=0.5')
      .fromTo(subtitleRef.current, { opacity: 0, y: 30, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, '-=0.6');

    const container = containerRef.current;
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      gsap.to(titleRef.current, { x: x * 0.4, y: y * 0.4, duration: 1.2, ease: 'power2.out' });
    };
    container?.addEventListener('mousemove', handleMouse);
    return () => container?.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 flex min-h-screen items-center justify-center px-6 overflow-hidden">
      <div className="max-w-5xl text-center" style={{ perspective: '1000px' }}>
        <div ref={lineRef} className="w-20 h-[1px] bg-accent mx-auto mb-6 origin-left" />
        <span ref={labelRef} className="text-label text-muted-foreground mb-6 block opacity-0 tracking-[0.2em]">
          Digital Studio
        </span>
        <h1 ref={titleRef} className="text-display text-foreground text-5xl sm:text-7xl md:text-[9rem] leading-[0.85]">
          <span className="word inline-block opacity-0">We </span>
          <span className="word inline-block opacity-0">Build</span>
          <br />
          <span className="word inline-block text-accent opacity-0">Worlds</span>
        </h1>
        <p ref={subtitleRef} className="font-body text-muted-foreground mt-8 max-w-lg mx-auto text-base sm:text-lg opacity-0">
          Crafting immersive digital experiences through design, technology, and bold storytelling.
        </p>
        <div className="mt-20">
          <div className="scroll-indicator w-[1px] h-20 bg-gradient-to-b from-transparent via-accent/60 to-transparent mx-auto animate-pulse" />
          <span className="text-label text-muted-foreground/40 text-[10px] mt-3 block tracking-[0.3em]">SCROLL</span>
        </div>
      </div>
    </section>
  );
}
