import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import { internships } from '../data/portfolio';

const Internships = () => {
  const [active, setActive] = useState<number | null>(null);

  const sortedInternships = internships.slice().sort((a, b) => {
    const aIsPM = a.type === 'Product Management';
    const bIsPM = b.type === 'Product Management';
    if (aIsPM === bIsPM) return 0;
    return aIsPM ? -1 : 1;
  });

  return (
    <div className="page-wrapper grid-bg">
      <div className="blob blob-blue"   style={{ width: 500, height: 500, top: '5%',  left: '-10%' }} />
      <div className="blob blob-violet" style={{ width: 400, height: 400, bottom: '10%', right: '-10%' }} />

      <section className="section" style={{ paddingTop: 140, paddingBottom: 60 }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-tag">Experience</span>
              <h2 className="section-title">Professional <span className="gradient-text">Internships</span></h2>
              <p className="section-subtitle">Real-world impact through research, product thinking, and AI-powered solutions.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 120 }}>
        <div className="container">
          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: 36, top: 0, bottom: 0, width: 2,
              background: 'linear-gradient(to bottom, var(--accent-blue), var(--accent-violet), transparent)',
            }} />

            {sortedInternships.map((item, i) => (
              <AnimatedSection key={item.id} delay={i * 0.12} direction="left">
                <div style={{ display: 'flex', gap: 32, marginBottom: 40, paddingLeft: 80, position: 'relative' }}>

                  {/* Logo initials badge */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{
                      position: 'absolute', left: 14, top: 20,
                      width: 44, height: 44, borderRadius: 14,
                      background: `linear-gradient(135deg, ${item.accentColor}33, ${item.accentColor}66)`,
                      border: `1.5px solid ${item.accentColor}55`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '0.7rem',
                      color: item.accentColor, zIndex: 1, cursor: 'none',
                      boxShadow: `0 0 20px ${item.accentColor}22`,
                    }}
                  >
                    {item.initials}
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className="glass"
                    onClick={() => setActive(active === item.id ? null : item.id)}
                    whileHover={{ translateY: -4, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
                    style={{
                      flex: 1, padding: '28px 32px', cursor: 'none',
                      transition: 'all 0.3s ease',
                      borderColor: active === item.id ? `${item.accentColor}55` : 'var(--glass-border)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                      <div>
                        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>{item.role}</h3>
                        <p style={{ color: item.accentColor, fontSize: '0.9rem', fontFamily: 'Space Grotesk', fontWeight: 500 }}>{item.company}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                        <span style={{
                          fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: 'var(--text-muted)',
                          background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '4px 12px', borderRadius: 50,
                        }}>{item.duration}</span>
                        <span style={{
                          fontFamily: 'Space Grotesk', fontSize: '0.7rem',
                          color: item.accentColor, background: `${item.accentColor}18`,
                          border: `1px solid ${item.accentColor}33`, padding: '3px 10px', borderRadius: 50,
                        }}>{item.type}</span>
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 16 }}>{item.description}</p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                      {item.skills.map(sk => <span key={sk} className="tag" style={{ fontSize: '0.78rem' }}>{sk}</span>)}
                    </div>

                    <button style={{
                      background: 'none', border: 'none', color: item.accentColor,
                      fontFamily: 'Space Grotesk', fontSize: '0.82rem', cursor: 'none',
                      display: 'flex', alignItems: 'center', gap: 6, padding: 0, fontWeight: 600,
                    }}>
                      {active === item.id ? <><FiChevronUp /> Hide details</> : <><FiChevronDown /> View details</>}
                    </button>

                    <AnimatePresence>
                      {active === item.id && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }}
                          style={{ overflow: 'hidden', marginTop: 16, paddingLeft: 0, listStyle: 'none' }}
                        >
                          {item.highlights.map((h, hi) => (
                            <motion.li key={hi} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: hi * 0.06 }}
                              style={{ display: 'flex', gap: 10, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 10 }}>
                              <span style={{ color: item.accentColor, flexShrink: 0, marginTop: 3 }}>▹</span>
                              {h}
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Internships;
