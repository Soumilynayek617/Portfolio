import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

const AnimatedSection = ({
  children,
  className,
  style,
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  const variants: any = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
