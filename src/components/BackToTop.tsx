import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

// Scroll the page to the top, covering all browser/container cases
const scrollToTop = () => {
  // Standard window scroll
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // document.documentElement covers cases where the <html> element scrolls
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  // document.body covers older browsers / quirks mode
  document.body.scrollTo({ top: 0, behavior: 'smooth' });
};

// Returns the current scroll position from whichever container is actually scrolling
const getScrollY = () =>
  window.scrollY ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0;

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(getScrollY() > 400);

    // Listen on window AND document to catch all scroll sources
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });

    // Check immediately in case the page starts scrolled
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.12, y: -5 }}
          whileTap={{ scale: 0.93 }}
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            border: 'none',
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 900,
            boxShadow: '0 8px 32px rgba(59,130,246,0.45)',
            color: 'white',
          }}
          aria-label="Back to top"
        >
          <FiArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
