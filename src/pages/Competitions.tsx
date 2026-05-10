import { motion } from 'framer-motion';
import { FiAward, FiStar, FiTarget, FiTerminal } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import { competitions } from '../data/portfolio';

// Map rankType → icon
const RankIcon = ({ type, color }: { type: string; color: string }) => {
  const props = { size: 22, color };
  if (type === 'national') return <FiAward {...props} />;
  if (type === 'finalist') return <FiStar {...props} />;
  if (type === 'participant') return <FiTarget {...props} />;
  return <FiTerminal {...props} />;
};

const Competitions = () => (
  <div className="page-wrapper grid-bg">
    <div className="blob blob-violet" style={{ width: 500, height: 500, top: '5%',  right: '-10%' }} />
    <div className="blob blob-cyan"   style={{ width: 350, height: 350, bottom: '10%', left: '-5%' }} />

    <section className="section" style={{ paddingTop: 140, paddingBottom: 60 }}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Achievements</span>
            <h2 className="section-title">Competitions &amp; <span className="gradient-text">Awards</span></h2>
            <p className="section-subtitle">Standing out in national-level challenges with innovative ideas and analytical thinking.</p>
          </div>
        </AnimatedSection>

        {/* Summary stats */}
        <AnimatedSection delay={0.2}>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
            {[
              { Icon: FiAward,  val: competitions.length, label: 'Competitions' },
              { Icon: FiStar,   val: '2',                 label: 'National Rankings' },
              { Icon: FiTarget, val: '2300+',             label: 'Teams Outranked' },
            ].map(s => (
              <div key={s.label} className="glass" style={{ padding: '24px 32px', textAlign: 'center', minWidth: 150 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  <s.Icon size={22} color="var(--accent-cyan)" />
                </div>
                <span style={{
                  display: 'block', fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 800,
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{s.val}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontFamily: 'Space Grotesk' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="section" style={{ paddingTop: 0, paddingBottom: 120 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
          {competitions.map((comp, i) => (
            <AnimatedSection key={comp.id} delay={i * 0.1}>
              <motion.div className="glass"
                whileHover={{ translateY: -8, boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}
                style={{
                  padding: '32px 28px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16,
                  position: 'relative', overflow: 'hidden', transition: 'all 0.35s ease',
                }}>

                {/* Top accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${comp.accentColor}, var(--accent-violet))`,
                }} />

                {/* Icon + Category */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: `${comp.accentColor}18`, border: `1.5px solid ${comp.accentColor}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <RankIcon type={comp.rankType} color={comp.accentColor} />
                  </div>
                  <span style={{
                    fontFamily: 'Space Grotesk', fontSize: '0.72rem', fontWeight: 600, padding: '4px 12px',
                    borderRadius: 50, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
                    color: 'var(--accent-cyan)',
                  }}>{comp.category}</span>
                </div>

                {/* Rank badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `${comp.accentColor}18`, border: `1px solid ${comp.accentColor}44`,
                  borderRadius: 50, padding: '6px 16px', width: 'fit-content',
                }}>
                  <FiStar size={12} color={comp.accentColor} />
                  <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.82rem', color: comp.accentColor }}>
                    {comp.rank}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3 }}>{comp.title}</h3>

                <div>
                  <p style={{ color: 'var(--accent-cyan)', fontFamily: 'Space Grotesk', fontSize: '0.85rem', fontWeight: 600 }}>{comp.event}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'Space Grotesk', marginTop: 2 }}>{comp.date}</p>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.7, flex: 1 }}>{comp.description}</p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {comp.highlights.map((h, hi) => (
                    <li key={hi} style={{ display: 'flex', gap: 8, color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                      <span style={{ color: comp.accentColor, flexShrink: 0, marginTop: 2 }}>▹</span>{h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Competitions;
