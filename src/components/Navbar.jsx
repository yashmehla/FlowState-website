import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { endpoints } from '../lib/api.js';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Showcase', href: '#showcase' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <a href="/" className="navbar__logo" aria-label="FlowState home">
          <img src="/logo.png" alt="FlowState Icon" className="navbar__logo-icon" />
          <span className="navbar__logo-text">Flow<span className="navbar__logo-accent">State.</span></span>
        </a>

        {/* Desktop nav links */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="navbar__link">
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={endpoints.downloadWindows}
          className="btn btn-primary navbar__cta"
          aria-label="Download FlowState for Windows"
        >
          ✦ Download
        </a>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href={endpoints.downloadWindows}
            className="btn btn-primary"
            style={{ marginTop: '1rem', justifyContent: 'center' }}
          >
            ✦ Download for Windows
          </a>
        </div>
      )}
    </header>
  );
}
