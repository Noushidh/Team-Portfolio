import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'Nebula', category: 'Brand Identity', year: '2025', desc: 'Complete visual identity for a next-gen AI platform' },
  { title: 'Vertex', category: '3D Experience', year: '2024', desc: 'Immersive WebGL showcase for architectural visualization' },
  { title: 'Horizon', category: 'Web Platform', year: '2024', desc: 'Full-stack platform redesign with real-time data' },
  { title: 'Prism', category: 'Motion Design', year: '2023', desc: 'Award-winning motion graphics for brand storytelling' },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.project-card'),
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 55%' },
        }
      );

      gsap.fromTo(el.querySelectorAll('.reveal'), { opacity: 0, y: 40, filter: 'blur(8px)' }, {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 65%' },
      });

      gsap.fromTo(el.querySelector('.h-line'), { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 65%' },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 px-6 py-32" style={{ perspective: '1200px' }}>
      <div className="max-w-6xl mx-auto">
        <span className="reveal text-label text-accent mb-4 block tracking-[0.2em]">Selected Work</span>
        <div className="h-line h-[1px] bg-accent/20 mb-8 origin-left" />
        <h2 className="reveal text-display text-foreground text-4xl sm:text-6xl md:text-7xl mb-16 text-balance">
          Projects
        </h2>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-card group relative overflow-hidden rounded-sm border border-foreground/[0.04] glass-panel p-8 md:p-10 cursor-pointer transition-all duration-500 hover:border-accent/20"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
                gsap.to(e.currentTarget, { rotateY: x, rotateX: y, duration: 0.4, ease: 'power2.out' });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-accent/5 to-transparent" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-label text-muted-foreground">{project.category}</span>
                    <span className="w-1 h-1 rounded-full bg-accent/40" />
                    <span className="text-label text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="text-display text-foreground text-3xl md:text-5xl group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-body text-muted-foreground mt-3 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors">
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
