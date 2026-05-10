import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/internships', label: 'Internships' },
  { path: '/projects', label: 'Projects' },
  { path: '/competitions', label: 'Competitions' },
  { path: '/skills', label: 'Skills' },
  { path: '/extracurricular', label: 'Extra' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      setMenuOpen(false);
      prevPath.current = location.pathname;
    }
  }, [location]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrolled(window.scrollY > 20);
      setScrollProgress((window.scrollY / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 24px',
          transition: 'all 0.3s ease',
          background: scrolled
            ? 'rgba(11, 15, 25, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 70,
        }}>
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <motion.span
              whileHover={{ scale: 1.04 }}
              style={{
                fontFamily: 'Space Grotesk',
                fontWeight: 800,
                fontSize: '1.4rem',
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                cursor: 'none',
              }}
            >
              SN
            </motion.span>
          </NavLink>

          {/* Desktop Links */}
          <ul style={{
            display: 'flex',
            gap: 4,
            listStyle: 'none',
            alignItems: 'center',
          }}
            className="desktop-nav"
          >
            {navLinks.map(link => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    fontFamily: 'Space Grotesk',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    padding: '8px 16px',
                    borderRadius: 50,
                    color: isActive ? 'white' : 'var(--text-secondary)',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))'
                      : 'transparent',
                    border: isActive ? '1px solid rgba(139,92,246,0.3)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                    cursor: 'none',
                  })}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="mailto:soumilynayek05@gmail.com"
            className="btn btn-primary desktop-cta"
            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
          >
            Hire Me ✦
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger"
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              flexDirection: 'column',
              gap: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45, y: 7 }
                    : i === 1 ? { opacity: 0 }
                    : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  background: 'var(--text-primary)',
                  borderRadius: 2,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 70,
              left: 0,
              right: 0,
              zIndex: 999,
              background: 'rgba(11, 15, 25, 0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    display: 'block',
                    fontFamily: 'Space Grotesk',
                    fontWeight: 500,
                    fontSize: '1rem',
                    padding: '14px 20px',
                    borderRadius: 12,
                    color: isActive ? 'white' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(59,130,246,0.15)' : 'transparent',
                    border: isActive ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                  })}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
