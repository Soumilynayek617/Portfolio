import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiLayers, FiCode, FiCpu, FiTool, FiPackage, FiZap } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import { skillCategories, floatingTech, currentlyLearning } from '../data/portfolio';

// Map skill category names → icons
const categoryIcons = [FiLayers, FiCode, FiCpu, FiZap, FiTool, FiPackage];

const SkillBar = ({ name, level, delay = 0, accentColor }: { name: string; level: number; delay?: number; accentColor: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView && !animated) setTimeout(() => setAnimated(true), delay * 1000);
  }, [inView, delay, animated]);

  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{name}</span>
        <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.78rem', color: accentColor, fontWeight: 600 }}>{level}%</span>
      </div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{
          width: animated ? `${level}%` : '0%',
          background: `linear-gradient(90deg, ${accentColor}, var(--accent-violet))`,
          transition: `width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay * 0.05}s`,
        }} />
      </div>
    </div>
  );
};

const Skills = () => (
  <div className="page-wrapper grid-bg">
    <div className="blob blob-blue"   style={{ width: 500, height: 500, top: '10%',   right: '-10%' }} />
    <div className="blob blob-violet" style={{ width: 400, height: 400, bottom: '10%', left: '-10%' }} />

    <section className="section" style={{ paddingTop: 140, paddingBottom: 60 }}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Expertise</span>
            <h2 className="section-title">Skills &amp; <span className="gradient-text">Tech Stack</span></h2>
            <p className="section-subtitle">A diverse set of technical and design skills honed through projects, internships, and research.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="section" style={{ paddingTop: 0, paddingBottom: 120 }}>
      <div className="container">

        {/* Floating tech pills */}
        <AnimatedSection>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 64 }}>
            {floatingTech.map((tech, i) => (
              <motion.div key={tech} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.12, y: -5 }}
                className="glass"
                style={{
                  padding: '9px 20px', borderRadius: 50,
                  fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.85rem',
                  color: 'var(--text-primary)', cursor: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}>
                {tech}
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Skill category cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28, marginBottom: 64 }}>
          {skillCategories.map((cat, ci) => {
            const Icon = categoryIcons[ci];
            return (
              <AnimatedSection key={cat.name} delay={ci * 0.08}>
                <div className="glass" style={{ padding: '28px 24px', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, ${cat.accentColor}, var(--accent-violet))`,
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: `${cat.accentColor}18`, border: `1.5px solid ${cat.accentColor}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={18} color={cat.accentColor} />
                    </div>
                    <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', fontWeight: 700 }}>{cat.name}</h3>
                  </div>
                  {cat.skills.map((skill, si) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level}
                      delay={ci * 0.5 + si * 0.08} accentColor={cat.accentColor} />
                  ))}
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Currently Learning */}
        <AnimatedSection>
          <div className="glass" style={{
            padding: '40px', borderColor: 'rgba(59,130,246,0.2)',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(139,92,246,0.05))',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span className="section-tag">Currently Learning</span>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.5rem', fontWeight: 700, marginTop: 12 }}>
                What's Next on My <span className="gradient-text">Journey</span>
              </h3>
            </div>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
              {currentlyLearning.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.08, y: -4 }} className="glass"
                  style={{ padding: '14px 24px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'none', borderColor: 'rgba(59,130,246,0.2)' }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%', background: '#22c55e',
                    boxShadow: '0 0 8px #22c55e', flexShrink: 0,
                    animation: 'pulseDot 2s ease-in-out infinite',
                  }} />
                  <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <style>{`
      @keyframes pulseDot {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.5; transform: scale(0.75); }
      }
    `}</style>
  </div>
);

export default Skills;
