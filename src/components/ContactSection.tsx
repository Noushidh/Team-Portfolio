import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.reveal'),
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 70%' },
        }
      );

      el.querySelectorAll('.magnetic').forEach((link) => {
        const el2 = link as HTMLElement;
        el2.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el2.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el2, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
        });
        el2.addEventListener('mouseleave', () => {
          gsap.to(el2, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        });
      });

      gsap.fromTo(el.querySelectorAll('.h-line'), { scaleX: 0 }, {
        scaleX: 1, duration: 1, ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 70%' },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 px-6 py-32 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 items-end">
          <div>
            <span className="reveal text-label text-accent mb-4 block tracking-[0.2em]">Get in Touch</span>
            <div className="h-line h-[1px] bg-accent/20 mb-8 origin-left" />
            <h2 className="reveal text-display text-foreground text-4xl sm:text-6xl md:text-8xl text-balance">
              Let's<br />Create
            </h2>
          </div>
          <div className="reveal flex flex-col items-start">
            <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
              Have a project in mind? We'd love to hear about it. Let's create something remarkable together.
            </p>
            <Link to="/contact">
              <button className="magnetic group relative px-10 py-5 bg-transparent border border-accent/30 rounded-full overflow-hidden transition-all duration-500 hover:border-accent">
                <span className="relative z-10 text-label text-foreground group-hover:text-background transition-colors duration-500 uppercase tracking-[0.2em]">
                  Let's Connect
                </span>
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              </button>
            </Link>
          </div>
        </div>

        <div className="reveal mt-32 pt-8 border-t border-foreground/[0.04] flex justify-between items-center">
          <span className="text-label text-muted-foreground">© 2025 Studio</span>
          <span className="text-label text-muted-foreground">All Rights Reserved</span>
        </div>
      </div>
    </section>
  );
}
