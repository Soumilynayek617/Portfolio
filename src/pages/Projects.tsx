import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { projects } from '../data/portfolio';

const categories = ['All', 'Web App', 'Game', 'Clone', 'IoT', 'Research'];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);
  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <div className="page-wrapper grid-bg">
      <div className="blob blob-cyan" style={{ width: 500, height: 500, top: '5%', right: '-10%' }} />
      <div className="blob blob-violet" style={{ width: 400, height: 400, bottom: '20%', left: '-10%' }} />

      {/* Header */}
      <section className="section" style={{ paddingTop: 140, paddingBottom: 60 }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-tag">Portfolio</span>
              <h2 className="section-title">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="section-subtitle">
                A curated collection of projects spanning web development, AI, IoT, and geospatial research.
              </p>
            </div>
          </AnimatedSection>

          {/* Filter Tabs */}
          <AnimatedSection delay={0.2}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFilter(cat)}
                  style={{
                    background: filter === cat
                      ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
                      : 'var(--glass-bg)',
                    border: filter === cat
                      ? '1px solid transparent'
                      : '1px solid var(--glass-border)',
                    color: filter === cat ? 'white' : 'var(--text-secondary)',
                    padding: '8px 20px',
                    borderRadius: 50,
                    fontFamily: 'Space Grotesk',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'none',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease',
                    boxShadow: filter === cat ? '0 4px 20px rgba(59,130,246,0.3)' : 'none',
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured */}
      {(filter === 'All' || filter === featured?.category) && featured && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <AnimatedSection>
              <div style={{ marginBottom: 12 }}>
                <span className="section-tag" style={{ fontSize: '0.7rem' }}>✦ Featured Project</span>
              </div>
              <motion.div
                className="glass"
                whileHover={{ scale: 1.005, boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
                style={{
                  padding: '48px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 40,
                  alignItems: 'center',
                  borderColor: 'rgba(59,130,246,0.25)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background gradient */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.04), rgba(139,92,246,0.04))',
                  pointerEvents: 'none',
                }} />

                <div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontFamily: 'Space Grotesk',
                      fontWeight: 700,
                      padding: '4px 14px',
                      borderRadius: 50,
                      background: 'rgba(34,197,94,0.15)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      color: '#4ade80',
                    }}>
                      {featured.category}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontFamily: 'Space Grotesk',
                      padding: '4px 14px',
                      borderRadius: 50,
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-muted)',
                    }}>
                      {featured.duration}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>
                    {featured.title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24, fontSize: '0.95rem' }}>
                    {featured.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                    {featured.techStack.map(t => (
                      <span key={t} className="tag" style={{ fontSize: '0.78rem' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {featured.github && (
                      <a href={featured.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '0.85rem' }}>
                        GitHub ↗
                      </a>
                    )}
                    {featured.demo && (
                      <a href={featured.demo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '12px 24px', fontSize: '0.85rem' }}>
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Key Features
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {featured.keyFeatures.map((f, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        style={{ display: 'flex', gap: 10, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}
                      >
                        <span style={{ color: 'var(--accent-blue)', flexShrink: 0, marginTop: 3 }}>▹</span>
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Project Grid */}
      <section className="section" style={{ paddingBottom: 120 }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {(filter === 'All' ? rest : filtered.filter(p => !p.featured)).map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.08}>
                <motion.div
                  className="glass glass-hover"
                  style={{
                    padding: '28px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Gradient top accent */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${project.color.replace('from-', '').replace(/\b(\w+-\d+)\b/g, (m) => {
                      const colorMap: Record<string, string> = {
                        'orange-400': '#fb923c', 'red-500': '#ef4444',
                        'blue-400': '#60a5fa', 'cyan-500': '#06b6d4',
                        'teal-400': '#2dd4bf', 'green-500': '#22c55e',
                        'purple-400': '#c084fc', 'indigo-600': '#4f46e5',
                        'yellow-400': '#facc15', 'orange-500': '#f97316',
                      };
                      return colorMap[m] || m;
                    })})`,
                  }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontFamily: 'Space Grotesk',
                      fontWeight: 600,
                      padding: '3px 12px',
                      borderRadius: 50,
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--accent-cyan)',
                    }}>
                      {project.category}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'Space Grotesk' }}>
                      {project.duration}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    {project.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.7, flex: 1 }}>
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {project.techStack.map(t => (
                      <span key={t} className="tag" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', padding: '9px 14px', fontSize: '0.8rem' }}>
                        GitHub ↗
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '9px 14px', fontSize: '0.8rem' }}>
                        Demo →
                      </a>
                    )}
                    {!project.github && !project.demo && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'Space Grotesk', padding: '9px 0' }}>
                        Research Project
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
