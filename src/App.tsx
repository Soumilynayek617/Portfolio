import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import BackToTop from './components/BackToTop';

import Home from './pages/Home';
import About from './pages/About';
import Internships from './pages/Internships';
import Projects from './pages/Projects';
import Competitions from './pages/Competitions';
import Skills from './pages/Skills';
import Extracurricular from './pages/Extracurricular';

import './index.css';

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Try all scroll containers for maximum compatibility
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
};

// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
);

const AppRoutes = () => {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/internships" element={<PageTransition><Internships /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/competitions" element={<PageTransition><Competitions /></PageTransition>} />
        <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
        <Route path="/extracurricular" element={<PageTransition><Extracurricular /></PageTransition>} />
      </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  const [loaded, setLoaded] = useState(false);
  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <BrowserRouter>
      <CustomCursor />

      <AnimatePresence>
        {!loaded && <LoadingScreen key="loader" onDone={handleDone} />}
      </AnimatePresence>

      {loaded && (
        <>
          <Navbar />
          <AppRoutes />
          <BackToTop />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
