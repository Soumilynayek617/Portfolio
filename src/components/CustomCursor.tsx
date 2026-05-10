import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const ballRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch / mobile
    if (window.innerWidth <= 768) return;

    const ball = ballRef.current;
    const follower = followerRef.current;
    const trail = trailRef.current;
    if (!ball || !follower || !trail) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let trailX = 0, trailY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Ball snaps instantly
      ball.style.left = `${mouseX}px`;
      ball.style.top  = `${mouseY}px`;
    };

    const animate = () => {
      // Follower ring — smooth lag
      followerX += (mouseX - followerX) * 0.10;
      followerY += (mouseY - followerY) * 0.10;
      follower.style.left = `${followerX}px`;
      follower.style.top  = `${followerY}px`;

      // Outer glow trail — even more lag
      trailX += (mouseX - trailX) * 0.06;
      trailY += (mouseY - trailY) * 0.06;
      trail.style.left = `${trailX}px`;
      trail.style.top  = `${trailY}px`;

      rafId = requestAnimationFrame(animate);
    };

    // Scale up on interactive elements
    const onEnter = () => {
      ball.style.transform     = 'translate(-50%, -50%) scale(1.6)';
      follower.style.transform = 'translate(-50%, -50%) scale(1.8)';
      follower.style.borderColor = 'rgba(139, 92, 246, 0.9)';
      follower.style.background  = 'rgba(139, 92, 246, 0.08)';
      trail.style.transform      = 'translate(-50%, -50%) scale(2)';
    };

    const onLeave = () => {
      ball.style.transform     = 'translate(-50%, -50%) scale(1)';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.borderColor = 'rgba(59, 130, 246, 0.6)';
      follower.style.background  = 'transparent';
      trail.style.transform      = 'translate(-50%, -50%) scale(1)';
    };

    document.addEventListener('mousemove', onMove);

    // Attach to all interactive elements now + watch for new ones
    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor], input, label').forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attachHover();

    // Re-attach after route changes (DOM mutations)
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── Outer glow blob (slowest) ── */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 99996,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.5s ease',
          filter: 'blur(2px)',
        }}
      />

      {/* ── Follower ring (medium lag) ── */}
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          width: 44,
          height: 44,
          border: '1.5px solid rgba(59, 130, 246, 0.6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99997,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s ease, background 0.25s ease',
          boxShadow: '0 0 16px rgba(59,130,246,0.25), inset 0 0 16px rgba(59,130,246,0.04)',
          backdropFilter: 'blur(1px)',
        }}
      />

      {/* ── Main cursor ball (instant) ── */}
      <div
        ref={ballRef}
        style={{
          position: 'fixed',
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #a5f3fc, #3B82F6)',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
          boxShadow: '0 0 12px rgba(59,130,246,0.7), 0 0 4px rgba(165,243,252,0.9)',
        }}
      />
    </>
  );
};

export default CustomCursor;
