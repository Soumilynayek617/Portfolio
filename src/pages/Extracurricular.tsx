import { motion } from 'framer-motion';
import { FiUsers, FiMusic, FiBarChart2, FiGlobe, FiMail, FiLinkedin } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import { positions, activities, personal } from '../data/portfolio';

// Map position index → icon
const positionIcons = [FiBarChart2, FiMusic];
// Map activity index → icon
const activityIcons = [FiGlobe, FiMusic, FiUsers, FiBarChart2];

const Extracurricular = () => (
  <div className="page-wrapper grid-bg">
    <div className="blob blob-cyan"   style={{ width: 500, height: 500, top: '5%',  left: '-10%' }} />
    <div className="blob blob-violet" style={{ width: 400, height: 400, bottom: '10%', right: '-10%' }} />

    {/* Header */}
    <section className="section" style={{ paddingTop: 140, paddingBottom: 60 }}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Beyond Academics</span>
            <h2 className="section-title">Leadership &amp; <span className="gradient-text">Activities</span></h2>
            <p className="section-subtitle">From cultural secretary to NSS leader — shaping communities and leading with purpose.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Positions of Responsibility */}
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <AnimatedSection>
          <p style={{
            fontFamily: 'Space Grotesk', fontSize: '0.75rem', fontWeight: 700,
            color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 32,
          }}>
            Positions of Responsibility
          </p>
        </AnimatedSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {positions.map((pos, i) => {
            const Icon = positionIcons[i] ?? FiUsers;
            return (
              <AnimatedSection key={pos.id} delay={i * 0.12}>
                <motion.div className="glass"
                  whileHover={{ translateY: -4, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
                  style={{
                    padding: '36px', display: 'grid',
                    gridTemplateColumns: 'auto 1fr', gap: 28, alignItems: 'flex-start', transition: 'all 0.35s ease',
                  }}>

                  {/* Icon badge */}
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                    background: `${pos.accentColor}18`, border: `1.5px solid ${pos.accentColor}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 24px ${pos.accentColor}22`,
                  }}>
                    <Icon size={22} color={pos.accentColor} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
                      <div>
                        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.15rem', fontWeight: 700, marginBottom: 4 }}>{pos.role}</h3>
                        <p style={{ color: pos.accentColor, fontSize: '0.9rem', fontFamily: 'Space Grotesk', fontWeight: 500 }}>{pos.org}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                        <span style={{
                          fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: 'var(--text-muted)',
                          background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '4px 12px', borderRadius: 50,
                        }}>{pos.duration}</span>
                        <span style={{
                          fontFamily: 'Space Grotesk', fontSize: '0.72rem',
                          color: pos.accentColor, background: `${pos.accentColor}18`,
                          border: `1px solid ${pos.accentColor}33`, padding: '3px 10px', borderRadius: 50,
                        }}>{pos.stats}</span>
                      </div>
                    </div>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                      {pos.highlights.map((h, hi) => (
                        <motion.li key={hi} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }} transition={{ delay: i * 0.1 + hi * 0.06 }}
                          style={{ display: 'flex', gap: 10, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                          <span style={{ color: pos.accentColor, flexShrink: 0, marginTop: 3 }}>▹</span>{h}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>

    {/* Activities Grid */}
    <section className="section">
      <div className="container">
        <AnimatedSection>
          <p style={{
            fontFamily: 'Space Grotesk', fontSize: '0.75rem', fontWeight: 700,
            color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 32,
          }}>
            Extracurricular Activities
          </p>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {activities.map((act, i) => {
            const Icon = activityIcons[i] ?? FiGlobe;
            return (
              <AnimatedSection key={act.id} delay={i * 0.08}>
                <motion.div className="glass"
                  whileHover={{ translateY: -6, scale: 1.02, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
                  style={{
                    padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', gap: 14,
                    position: 'relative', overflow: 'hidden', transition: 'all 0.35s ease',
                  }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, ${act.accentColor}, var(--accent-blue))`,
                  }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `${act.accentColor}18`, border: `1.5px solid ${act.accentColor}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={18} color={act.accentColor} />
                    </div>
                    <span style={{
                      fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '0.95rem',
                      background: `linear-gradient(135deg, ${act.accentColor}, var(--accent-violet))`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>{act.stat}</span>
                  </div>

                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', fontWeight: 700 }}>{act.title}</h3>
                  <p style={{ color: act.accentColor, fontSize: '0.82rem', fontFamily: 'Space Grotesk', fontWeight: 500 }}>{act.org}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.7, flex: 1 }}>{act.description}</p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="section" style={{ paddingBottom: 120 }}>
      <div className="container">
        <AnimatedSection>
          <motion.div className="glass" whileHover={{ scale: 1.01 }}
            style={{
              padding: '60px 48px', textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.06))',
              borderColor: 'rgba(59,130,246,0.2)',
            }}>
            <span className="section-tag">Let's Connect</span>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, marginTop: 16, marginBottom: 16 }}>
              Ready to Build Something <span className="gradient-text">Amazing?</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 500, margin: '0 auto 32px' }}>
              I'm always open to new opportunities, collaborations, and creative challenges. Let's talk!
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`mailto:${personal.email}`} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiMail /> Get In Touch
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiLinkedin /> LinkedIn
              </a>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default Extracurricular;
