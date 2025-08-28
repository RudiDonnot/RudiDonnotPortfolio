import './style.sass';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setHasScrolledDown(true);
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current) {
        if (hasScrolledDown && currentScrollY > 0) {
          setShowHeader(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolledDown]);

  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <nav className={`header-nav${showHeader ? ' visible' : ''}`}>
      <Link
        to="/business"
        className={`header-link${hovered === 'business' ? ' hovered' : ''}`}
        onMouseEnter={() => setHovered('business')}
        onMouseLeave={() => setHovered(null)}
      >
        Vous êtes une entreprise&nbsp;?
      </Link>
      <Link
        to="/portfolio"
        className={`header-link${hovered === 'portfolio' ? ' hovered' : ''}`}
        onMouseEnter={() => setHovered('portfolio')}
        onMouseLeave={() => setHovered(null)}
      >
        Projets
      </Link>
      <Link
        to="/about"
        className={`header-link${hovered === 'about' ? ' hovered' : ''}`}
        onMouseEnter={() => setHovered('about')}
        onMouseLeave={() => setHovered(null)}
      >
        A propos
      </Link>
    </nav>
  );
};

export default Header;
