import { useSpring, animated } from '@react-spring/web';
import { useRef, useState } from 'react';
import { Wrench, Zap, Droplets, Paintbrush } from 'lucide-react';

const services = [
  { id: 1, title: 'صيانة السباكة', icon: <Droplets className="w-10 h-10 text-blue-500" />, desc: 'إصلاح وتسليك وتجديد شبكات المياه' },
  { id: 2, title: 'صيانة الكهرباء', icon: <Zap className="w-10 h-10 text-yellow-500" />, desc: 'إصلاح الأعطال الكهربائية بأمان واحترافية' },
  { id: 3, title: 'نجارة وأثاث', icon: <Wrench className="w-10 h-10 text-orange-500" />, desc: 'صيانة وتفصيل وتركيب الأثاث المنزلي' },
  { id: 4, title: 'دهانات وديكور', icon: <Paintbrush className="w-10 h-10 text-purple-500" />, desc: 'تجديد دهانات المنزل بأحدث الألوان' },
];

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 20,
  (x - rect.left - rect.width / 2) / 20,
  1.05
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function ServiceCard({ service }) {
  const ref = useRef(null);
  const [xys, set] = useState([0, 0, 1]);
  const props = useSpring({ xys, config: { mass: 1, tension: 170, friction: 26 } });

  return (
    <animated.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        set(calc(e.clientX, e.clientY, rect));
      }}
      onMouseLeave={() => set([0, 0, 1])}
      style={{ transform: props.xys.to(trans) }}
      className="preserve-3d"
    >
      <div className="h-full bg-white backdrop-blur-md border border-slate-100 hover:border-primary/50 transition-colors rounded-2xl flex flex-col overflow-hidden shadow-sm">
        <div className="flex gap-4 p-6 pb-2 items-center" style={{ transform: 'translateZ(30px)' }}>
          <div className="p-3 rounded-xl bg-slate-50">
            {service.icon}
          </div>
          <h3 className="text-xl font-bold">{service.title}</h3>
        </div>
        <div className="p-6 pt-2" style={{ transform: 'translateZ(20px)' }}>
          <p className="text-slate-500 leading-relaxed">
            {service.desc}
          </p>
        </div>
      </div>
    </animated.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            خدماتنا <span className="text-primary">المتميزة</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            نقدم مجموعة متكاملة من خدمات الصيانة لتلبية كافة احتياجات منزلك بدقة وكفاءة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
