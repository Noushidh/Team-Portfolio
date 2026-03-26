import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.reveal'),
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative z-10 overflow-hidden">
      <main className="px-6 py-32 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto w-full">
          <Link 
            to="/" 
            className="reveal inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-300 mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-label uppercase tracking-widest">Back to Studio</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <span className="reveal text-label text-accent mb-4 block tracking-[0.2em]">Contact Us</span>
              <h1 className="reveal text-display text-foreground text-5xl sm:text-7xl mb-8 leading-tight">
                Let's Make<br />Magic.
              </h1>
              <p className="reveal text-muted-foreground text-lg max-w-md leading-relaxed">
                We're always looking for new opportunities and collaborations. 
                Reach out and let's build something extraordinary together.
              </p>
            </div>

            <div className="reveal glass-panel rounded-sm p-8 md:p-10 space-y-8">
              <div className="space-y-6">
                {[
                  { label: 'Email', value: 'hello@studio.com', href: 'mailto:hello@studio.com' },
                  { label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
                  { label: 'Location', value: 'New York, NY', href: '#' },
                ].map((item) => (
                  <a 
                    key={item.label} 
                    href={item.href}
                    className="block border-b border-foreground/[0.04] pb-4 group cursor-pointer"
                  >
                    <span className="text-label text-muted-foreground block mb-1">{item.label}</span>
                    <span className="font-body text-foreground text-xl group-hover:text-accent transition-colors duration-300">
                      {item.value}
                    </span>
                  </a>
                ))}
              </div>

              <div className="pt-4 flex gap-8">
                {['Twitter', 'Instagram', 'Dribbble'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-label text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
