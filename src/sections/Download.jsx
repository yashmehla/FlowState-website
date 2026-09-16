import { useState } from 'react';
import { Monitor, Apple, Terminal, Smartphone, ArrowRight } from 'lucide-react';
import { endpoints } from '../lib/api.js';
import { useDownloadCount } from '../hooks/useDownloadCount.js';
import './Download.css';

const platforms = [
  {
    icon: Monitor,
    label: 'Windows',
    tag: 'Available now',
    available: true,
  },
  {
    icon: Apple,
    label: 'macOS',
    tag: 'Coming in v2',
    available: false,
  },
  {
    icon: Terminal,
    label: 'Linux',
    tag: 'Coming in v2',
    available: false,
  },
  {
    icon: Smartphone,
    label: 'Mobile',
    tag: 'Coming later',
    available: false,
  },
];

export default function Download() {
  const { count } = useDownloadCount();
  const [hover, setHover] = useState(false);

  return (
    <section className="download" id="download" aria-label="Download FlowState">
      <div className="download__glow" aria-hidden="true" />

      <div className="container download__inner">
        
        <h2 className="download__heading font-serif reveal">
          Ready to get in the <span className="download__heading-secondary">flow?</span>
        </h2>

        <div className="download__layout reveal reveal-delay-1">
          {/* Product Card */}
          <div className="download__card">
            <div className="download__card-header font-mono">
              FLOWSTATE.EXE
            </div>
            
            <div className="download__card-body">
              <p className="download__card-desc">Windows desktop productivity app</p>
              
              <ul className="download__features">
                <li><span className="check">✓</span> Local-first</li>
                <li><span className="check">✓</span> No account</li>
                <li><span className="check">✓</span> Open source</li>
                <li><span className="check">✓</span> Free</li>
              </ul>
              
              <a
                href={endpoints.downloadWindows}
                className="btn btn-primary download__cta"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                aria-label="Download FlowState"
              >
                <span className="cta-icon">✦</span>
                <span className="cta-text" style={{ marginLeft: '8px' }}>
                  {hover ? 'Enter FlowState' : 'Download FlowState'}
                </span>
              </a>

              {count !== null && (
                <p className="download__count font-mono">
                  {count.toLocaleString()} downloads
                </p>
              )}
              
              <a 
                href="https://github.com/xevesklabs/FlowState" 
                target="_blank" 
                rel="noopener noreferrer"
                className="download__source-link"
              >
                GitHub source
              </a>
            </div>
          </div>

          {/* Platforms List */}
          <div className="download__platforms">
            {platforms.map(({ icon: Icon, label, tag, available }) => (
              <div 
                key={label} 
                className={`platform-item ${available ? 'platform-item--active' : 'platform-item--disabled'}`}
              >
                <div className="platform-item__icon">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div className="platform-item__text">
                  <span className="platform-item__label">{label}</span>
                  <span className="platform-item__tag font-mono">{tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
