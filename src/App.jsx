import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Stats from './sections/Stats.jsx';
import Features from './sections/Features.jsx';
import Philosophy from './sections/Philosophy.jsx';
import Showcase from './sections/Showcase.jsx';
import Download from './sections/Download.jsx';
import Starfield from './components/Starfield.jsx';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    const targets = document.querySelectorAll('.reveal');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function CursorAtmosphere() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = document.getElementById('cursor-glow');
    if (!el) return;

    let rafId;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    const ease = 0.06;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;
      el.style.transform = `translate3d(calc(${currentX}px - 50vw), calc(${currentY}px - 50vh), 0)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div id="cursor-glow" aria-hidden="true" />;
}

export default function App() {
  useScrollReveal();

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <CursorAtmosphere />
      <Starfield />

      <Navbar />

      <main>
        <Hero />
        <Stats />
        <Features />
        <Philosophy />
        <Showcase />
        <Download />
      </main>

      <Footer />
    </>
  );
}
