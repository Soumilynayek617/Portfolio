import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 400);
          return 100;
        }
        return p + Math.random() * 18 + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0B0F19',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
      }}
    >
      {/* Blobs */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'var(--accent-violet)', opacity: 0.08, filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 250, height: 250, borderRadius: '50%', background: 'var(--accent-cyan)', opacity: 0.08, filter: 'blur(80px)' }} />

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-sora"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em',
        }}
      >
        Soumily Nayek
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
      >
        Portfolio Loading...
      </motion.p>

      {/* Progress */}
      <div style={{ width: 260, position: 'relative' }}>
        <div className="progress-bar-track">
          <motion.div
            className="progress-bar-fill"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
            }}
          />
        </div>
        <p style={{
          position: 'absolute',
          right: 0,
          top: 12,
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontFamily: 'Space Grotesk',
        }}>
          {Math.min(Math.round(progress), 100)}%
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
