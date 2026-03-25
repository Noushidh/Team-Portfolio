import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.reveal'),
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 65%' },
        }
      );

      gsap.fromTo(el.querySelectorAll('.h-line'), { scaleX: 0 }, {
        scaleX: 1, duration: 1.4, ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 60%' },
      });

      const stats = [50, 12, 8];
      counterRefs.current.forEach((ref, i) => {
        if (!ref) return;
        gsap.fromTo(ref, { innerText: '0' }, {
          innerText: stats[i],
          duration: 2.5,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: { trigger: ref, start: 'top 80%' },
          onUpdate: function() {
            if (ref) {
              const val = Math.round(gsap.getProperty(ref, 'innerText') as number);
              ref.textContent = i === 0 ? val + '+' : i === 2 ? val + 'Y' : String(val);
            }
          }
        });
      });

      gsap.to(el.querySelector('.parallax-heading'), {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 min-h-screen flex items-center px-6 py-32">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="reveal text-label text-accent mb-4 block tracking-[0.2em]">About Us</span>
            <div className="h-line h-[1px] bg-accent/20 mb-8 origin-left" />
            <h2 className="reveal parallax-heading text-display text-foreground text-4xl sm:text-6xl md:text-7xl text-balance">
              Precision<br />Meets Vision
            </h2>
          </div>
          <div className="glass-panel rounded-sm p-8 md:p-10">
            <p className="reveal font-body text-muted-foreground text-base sm:text-lg leading-relaxed">
              We are a creative studio obsessed with the intersection of design and technology.
              Every pixel is intentional. Every interaction is crafted to evoke emotion.
            </p>
            <p className="reveal font-body text-muted-foreground text-base sm:text-lg leading-relaxed mt-6">
              From brand identity to immersive 3D experiences, we push the boundaries of what's possible in digital.
            </p>
            <div className="reveal mt-10 flex gap-12">
              {[
                { num: '0', label: 'Projects' },
                { num: '0', label: 'Awards' },
                { num: '0', label: 'Experience' },
              ].map((stat, i) => (
                <div key={stat.label}>
                  <div
                    ref={(el) => { counterRefs.current[i] = el; }}
                    className="text-display text-accent text-3xl tabular-nums"
                  >
                    {stat.num}
                  </div>
                  <div className="text-label text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
