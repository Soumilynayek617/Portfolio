import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiDownload } from 'react-icons/fi';
import { personal, stats } from '../data/portfolio';

const useCounter = (target: number, decimals = 0) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const start = performance.now();
        const animate = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          setCount(parseFloat((ease * target).toFixed(decimals)));
          if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimals]);
  return { count, ref };
};

const StatCard = ({ stat }: { stat: typeof stats[0] }) => {
  const decimals = Number.isInteger(stat.value) ? 0 : 2;
  const { count, ref } = useCounter(stat.value, decimals);
  return (
    <div className="glass glass-hover" style={{ padding: '28px 24px', textAlign: 'center', minWidth: 140 }}>
      <span ref={ref} style={{
        display: 'block', fontFamily: 'Space Grotesk', fontSize: '2.2rem', fontWeight: 800,
        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1,
      }}>
        {decimals > 0 ? count.toFixed(2) : count}{stat.suffix}
      </span>
      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 6, display: 'block', fontFamily: 'Space Grotesk' }}>
        {stat.label}
      </span>
    </div>
  );
};

const socials = [
  { href: personal.linkedin,            label: 'LinkedIn', Icon: FiLinkedin },
  { href: personal.github,              label: 'GitHub',   Icon: FiGithub   },
  { href: `mailto:${personal.email}`,   label: 'Email',    Icon: FiMail     },
];

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    for (let i = 0; i < 70; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5, a: Math.random() * 0.5 + 0.1 });
    }
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.a})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - dist / 100)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <div className="page-wrapper grid-bg" style={{ position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <div className="blob blob-blue"   style={{ width: 600, height: 600, top: '-20%', left: '-15%' }} />
      <div className="blob blob-violet" style={{ width: 500, height: 500, top: '30%',  right: '-15%' }} />
      <div className="blob blob-cyan"   style={{ width: 400, height: 400, bottom: '-10%', left: '30%' }} />

      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, padding: '100px 24px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 32 }}>

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="section-tag">
              ✦ IIT Kharagpur · 23MI10048
            </motion.div>

            {/* Name */}
            <div>
              {["Soumily", "Nayek"].map((word, wi) => (
                <div key={wi} style={{ overflow: 'hidden' }}>
                  <motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + wi * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-sora"
                    style={{
                      fontSize: 'clamp(3rem, 9vw, 7rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em',
                      background: wi === 0 ? 'linear-gradient(135deg, #E5E7EB, #9CA3AF)' : 'linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                    {word}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
              style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: 'var(--text-secondary)', letterSpacing: '0.05em', maxWidth: 660 }}>
              {personal.title}
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.8 }}
              style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: 480, lineHeight: 1.8 }}>
              B.Tech Mining Engineering student at IIT Kharagpur — applying data-driven strategy and user-centric thinking to build impactful products.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/projects" className="btn btn-primary">
                View Projects <FiArrowRight />
              </Link>
              <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <FiDownload /> Resume
              </a>
              <a href={`mailto:${personal.email}`} className="btn btn-ghost">
                <FiMail /> Contact
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1.2 }}
              style={{ display: 'flex', gap: 14, marginTop: 8 }}>
              {socials.map(({ href, label, Icon }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -4 }} whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  style={{
                    width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(20px)',
                    color: 'var(--text-secondary)', fontSize: '1.15rem', textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s, box-shadow 0.2s', cursor: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--accent-blue)';
                    el.style.color = 'var(--accent-blue)';
                    el.style.boxShadow = '0 0 20px rgba(59,130,246,0.3)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--glass-border)';
                    el.style.color = 'var(--text-secondary)';
                    el.style.boxShadow = 'none';
                  }}>
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.4 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 80 }}>
            {stats.map(s => <StatCard key={s.label} stat={s} />)}
          </motion.div>
        </div>
      </section>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: 'var(--text-muted)', fontSize: '0.7rem', fontFamily: 'Space Grotesk',
          letterSpacing: '0.15em', textTransform: 'uppercase', zIndex: 1,
        }}>
        <span>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1.5, height: 40, background: 'linear-gradient(to bottom, var(--accent-blue), transparent)', borderRadius: 1 }} />
      </motion.div>
    </div>
  );
};

export default Home;
