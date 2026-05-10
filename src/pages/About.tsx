import { motion } from 'framer-motion';
import {
  FiMail, FiPhone, FiMapPin,
  FiLayers, FiCode, FiCpu, FiTrendingUp, FiGlobe, FiSearch,
} from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import AnimatedSection from '../components/AnimatedSection';
import { personal, education, whatIDo, traits, coursework } from '../data/portfolio';

// Map whatIDo titles → icons
const cardIcons = [FiLayers, FiCode, FiCpu, FiTrendingUp, FiGlobe, FiSearch];

const About = () => (
  <div className="page-wrapper grid-bg">
    <div className="blob blob-violet" style={{ width: 500, height: 500, top: '5%',  right: '-10%' }} />
    <div className="blob blob-cyan"   style={{ width: 400, height: 400, bottom: '20%', left: '-10%' }} />

    {/* ── Header ── */}
    <section className="section" style={{ paddingTop: 140, paddingBottom: 40 }}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">
              The Person Behind the <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="section-subtitle">Engineer by degree, product manager by passion, business developer by choice.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* ── Bio Split ── */}
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>

          {/* Photo */}
          <AnimatedSection direction="left">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: -16, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))',
                  filter: 'blur(20px)', animation: 'blobFloat 4s ease-in-out infinite',
                }} />
                <div style={{
                  position: 'absolute', inset: -4, borderRadius: '50%',
                  background: 'linear-gradient(#0B0F19, #0B0F19) padding-box, linear-gradient(135deg, #3B82F6, #8B5CF6) border-box',
                  border: '2px solid transparent',
                }} />
                <img
                  src="/soumily.jpg"
                  alt="Soumily Nayek"
                  onError={e => {
                    const t = e.currentTarget; t.style.display = 'none';
                    const p = document.createElement('div');
                    p.style.cssText = 'width:240px;height:240px;border-radius:50%;background:linear-gradient(135deg,#3B82F6,#8B5CF6);display:flex;align-items:center;justify-content:center;font-size:3rem;color:white;font-family:Space Grotesk,sans-serif;font-weight:800;';
                    p.textContent = 'SN';
                    t.parentNode?.insertBefore(p, t.nextSibling);
                  }}
                  style={{ width: 240, height: 240, borderRadius: '50%', objectFit: 'cover', position: 'relative', zIndex: 1 }}
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Bio text */}
          <AnimatedSection direction="right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, marginBottom: 6 }}>
                  Hi, I'm <span className="gradient-text">Soumily</span>
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'Space Grotesk' }}>
                  {personal.rollNo} · IIT Kharagpur
                </p>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '1rem' }}>{personal.bio}</p>

              {/* Contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { Icon: FiMail,  val: personal.email,    href: `mailto:${personal.email}` },
                  { Icon: FiPhone, val: personal.phone,    href: `tel:${personal.phone}` },
                  { Icon: FiMapPin,val: personal.location, href: undefined },
                ].map(c => (
                  <div key={c.val} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <c.Icon size={15} color="var(--accent-cyan)" />
                    {c.href
                      ? <a href={c.href} style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', textDecoration: 'none' }}>{c.val}</a>
                      : <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{c.val}</span>
                    }
                  </div>
                ))}
              </div>

              {/* Trait pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {traits.map((t, i) => (
                  <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.08 }} className="tag">
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* ── Education Timeline ── */}
    <section className="section">
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Education</span>
            <h2 className="section-title">Academic <span className="gradient-text">Journey</span></h2>
          </div>
        </AnimatedSection>

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 2,
            background: 'linear-gradient(to bottom, var(--accent-blue), var(--accent-violet), transparent)' }} />

          {education.map((edu, i) => (
            <AnimatedSection key={edu.degree} delay={i * 0.15} direction="left">
              <div style={{ display: 'flex', gap: 32, marginBottom: 32, paddingLeft: 60, position: 'relative' }}>
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute', left: 10, top: 16, width: 28, height: 28, borderRadius: '50%', zIndex: 1,
                  background: edu.highlight ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)' : 'var(--bg-secondary)',
                  border: '2px solid var(--accent-blue)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: edu.highlight ? '0 0 20px rgba(59,130,246,0.4)' : 'none',
                }}>
                  <HiOutlineAcademicCap size={14} color={edu.highlight ? '#fff' : 'var(--accent-blue)'} />
                </div>

                <div className="glass glass-hover" style={{ flex: 1, padding: '24px 28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.05rem', fontWeight: 700 }}>{edu.degree}</h3>
                    <span style={{
                      fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: 'white', fontWeight: 600,
                      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', padding: '4px 14px', borderRadius: 50,
                    }}>{edu.score}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 4 }}>{edu.institute}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{edu.year}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* ── What I Do ── */}
    <section className="section">
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Expertise</span>
            <h2 className="section-title">What I <span className="gradient-text">Do</span></h2>
          </div>
        </AnimatedSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {whatIDo.map((item, i) => {
            const Icon = cardIcons[i];
            return (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <motion.div className="glass glass-hover" whileHover={{ scale: 1.02 }}
                  style={{ padding: '32px 28px', height: '100%' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, marginBottom: 18,
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
                    border: '1px solid rgba(59,130,246,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={20} color="var(--accent-blue)" />
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.description}</p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── Coursework ── */}
    <section className="section" style={{ paddingBottom: 120 }}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Academics</span>
            <h2 className="section-title">Relevant <span className="gradient-text">Coursework</span></h2>
          </div>
        </AnimatedSection>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {coursework.map((c, i) => (
            <AnimatedSection key={c} delay={i * 0.04}>
              <motion.span whileHover={{ scale: 1.05, borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}
                className="tag" style={{ cursor: 'default', fontSize: '0.85rem', padding: '8px 18px' }}>
                {c}
              </motion.span>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
