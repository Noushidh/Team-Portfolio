import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import Scene3D from '@/components/Scene3D';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="relative bg-background transition-colors duration-700">
        <Scene3D />
        <ThemeToggle />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
