import { useSpring, animated } from '@react-spring/web';
import { useRef, useState } from 'react';

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 10,
  (x - rect.left - rect.width / 2) / 10,
  1.05
];
const trans = (x, y, s) =>
  `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function Hero3DCard({ children, className = '' }) {
  const ref = useRef(null);
  const [xys, set] = useState([0, 0, 1]);
  
  const props = useSpring({
    xys,
    config: { mass: 5, tension: 350, friction: 40 }
  });

  return (
    <animated.div
      ref={ref}
      className={`preserve-3d ${className}`}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        set(calc(e.clientX, e.clientY, rect));
      }}
      onMouseLeave={() => set([0, 0, 1])}
      style={{
        transform: props.xys.to(trans)
      }}
    >
      {children}
    </animated.div>
  );
}
