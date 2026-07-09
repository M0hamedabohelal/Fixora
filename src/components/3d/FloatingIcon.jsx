import { useSpring, animated } from '@react-spring/web';

export default function FloatingIcon({ icon, label, className = "", iconBgColor = "bg-blue-100", delay = 0 }) {
  const styles = useSpring({
    loop: true,
    to: [
      { transform: 'translate3d(0, -10px, 0)' },
      { transform: 'translate3d(0, 10px, 0)' },
    ],
    from: { transform: 'translate3d(0, 10px, 0)' },
    config: { mass: 2, tension: 15, friction: 5 },
    delay: delay,
  });

  return (
    <animated.div className={`absolute flex flex-col items-center gap-2 ${className}`} style={styles}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${iconBgColor}`}>
        {icon}
      </div>
      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white backdrop-blur-sm shadow-sm text-primary">
        {label}
      </span>
    </animated.div>
  );
}
