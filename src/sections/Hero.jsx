import { useState, useRef, useEffect } from 'react';
import { Download as DownloadIcon, ExternalLink } from 'lucide-react';
import { endpoints } from '../lib/api.js';
import { DashboardMockup } from '../components/DashboardMockup.jsx';
import './Hero.css';

export default function Hero() {
  const mockupRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!mockupRef.current) return;
      
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 4; // max 2 deg rotation
      const y = (e.clientY / innerHeight - 0.5) * -4;
      
      setRotation({ x: y, y: x });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" id="hero" aria-label="Hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow font-mono reveal">
            Local-first productivity for developers
          </p>

          <h1 className="hero__headline font-serif reveal reveal-delay-1">
            Your focus,<br />
            <span className="hero__headline-secondary">uninterrupted.</span>
          </h1>

          <p className="hero__subheadline reveal reveal-delay-2">
            FlowState is a local-first productivity app for developers.<br />
            Plan tasks, track habits, write notes and run focused work sessions — entirely on your device.
          </p>

          <div className="hero__cta-group reveal reveal-delay-3">
            <a
              href={endpoints.downloadWindows}
              className="btn btn-primary hero__cta-download"
              aria-label="Download FlowState"
            >
              <span className="cta-icon">✦</span>
              <span className="cta-text">Download FlowState</span>
            </a>
            <a
              href="https://github.com/xevesklabs/FlowState"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              aria-label="View source on GitHub"
            >
              <span className="cta-text">View on GitHub</span>
              <ExternalLink size={14} strokeWidth={1.5} className="cta-icon-secondary" />
            </a>
          </div>

          <div className="hero__trust reveal reveal-delay-4 font-mono">
            <span>100% Local Data</span>
            <span className="hero__trust-dot" />
            <span>No Account Required</span>
            <span className="hero__trust-dot" />
            <span>Free Forever</span>
            <span className="hero__trust-dot" />
            <span>Open Source</span>
          </div>
        </div>

        <div className="hero__mockup-wrapper reveal reveal-delay-3">
          <div 
            className="hero__mockup-frame" 
            ref={mockupRef}
            style={{ 
              transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(${rotation.x * 2}px)`
            }}
            aria-hidden="true"
          >
            <div className="hero__mockup-chrome">
              <div className="chrome-dots">
                <span className="chrome-dot red" />
                <span className="chrome-dot yellow" />
                <span className="chrome-dot green" />
              </div>
            </div>
            <div className="hero__mockup-content">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
