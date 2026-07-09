import { useTrail, animated } from '@react-spring/web';
import { ArrowRight, LogIn, CheckCircle2, Wrench, Zap, Paintbrush, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero3DCard from '../3d/Hero3DCard';
import FloatingIcon from '../3d/FloatingIcon';
import heroBg from '../../assets/hero-bg.jpg';

export default function Hero() {
  const leftContent = [
    <div key="trusted" className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary font-bold text-xs tracking-wider mb-8">
      <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-2" />
      TRUSTED BY 50,000+ HOMEOWNERS
    </div>,
    <h1 key="heading" className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-primary">
      Welcome to <span className="text-secondary">Fixora</span>
    </h1>,
    <p key="subtitle" className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
      Find trusted professionals for every home service — quickly and confidently.
    </p>,
    <div key="buttons" className="flex flex-wrap gap-4 mb-12">
      <Link to="/register" className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-1">
        Get Started <ArrowRight className="w-5 h-5" />
      </Link>
      <Link to="/login" className="flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-2xl font-bold shadow-xl shadow-slate-200/50 hover:bg-slate-50 transition-all hover:-translate-y-1">
        <LogIn className="w-5 h-5" /> Login
      </Link>
    </div>,
    <div key="badges" className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm font-medium text-slate-700">
        <CheckCircle2 className="w-4 h-4 text-accent" /> Verified Professionals
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm font-medium text-slate-700">
        <CheckCircle2 className="w-4 h-4 text-accent" /> Fast Booking
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm font-medium text-slate-700">
        <CheckCircle2 className="w-4 h-4 text-accent" /> Secure Service
      </div>
    </div>
  ];

  const trail = useTrail(leftContent.length, {
    config: { mass: 1, tension: 120, friction: 14 },
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 30 },
    delay: 200,
  });

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden" dir="ltr">
      {/* Floating Icons Background */}
      <FloatingIcon icon={<Paintbrush className="w-6 h-6 text-green-600" />} label="Painting" className="bottom-[20%] left-[2%] md:left-[5%]" iconBgColor="bg-green-100" delay={200} />
      
      <FloatingIcon icon={<Zap className="w-6 h-6 text-yellow-600" />} label="Electrical" className="top-[15%] right-[5%] md:right-[10%]" iconBgColor="bg-orange-50" delay={100} />
      <FloatingIcon icon={<Hammer className="w-6 h-6 text-blue-600" />} label="Carpentry" className="bottom-[35%] right-[2%] md:right-[5%]" iconBgColor="bg-blue-100" delay={300} />
      <FloatingIcon icon={<Wrench className="w-6 h-6 text-yellow-600" />} label="Repair" className="bottom-[10%] right-[15%] md:right-[20%]" iconBgColor="bg-orange-50" delay={400} />

      <div className="container mx-auto px-6 lg:px-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className="pt-10">
          {trail.map(({ y, opacity }, index) => (
            <animated.div
              key={index}
              style={{
                opacity,
                transform: y.to((y) => `translate3d(0,${y}px,0)`),
              }}
            >
              {leftContent[index]}
            </animated.div>
          ))}
        </div>

        {/* Right Content - 3D Card */}
        <div className="flex justify-center lg:justify-end perspective-1000">
          <Hero3DCard className="w-full max-w-[600px]">
            <div className="bg-white backdrop-blur-xl p-4 md:p-6 rounded-[2rem] shadow-2xl border border-white">
              
              {/* Image Section */}
              <div className="relative rounded-2xl overflow-hidden mb-6 h-[250px] md:h-[300px]" style={{ transform: 'translateZ(30px)' }}>
                <img 
                  src={heroBg} 
                  alt="Craftsmanship and Professional Work" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-sm font-semibold text-sm text-primary">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" /> Pro available now
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 text-center" style={{ transform: 'translateZ(20px)' }}>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <div className="text-xl md:text-2xl font-bold text-slate-800">12K+</div>
                  <div className="text-xs md:text-sm text-slate-500 font-medium mt-1">Professionals</div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <div className="text-xl md:text-2xl font-bold text-slate-800">98%</div>
                  <div className="text-xs md:text-sm text-slate-500 font-medium mt-1">Satisfaction</div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <div className="text-xl md:text-2xl font-bold text-slate-800 flex items-center justify-center gap-1">
                    4.9<span className="text-secondary text-lg">★</span>
                  </div>
                  <div className="text-xs md:text-sm text-slate-500 font-medium mt-1">Avg Rating</div>
                </div>
              </div>

            </div>
          </Hero3DCard>
        </div>
      </div>
    </section>
  );
}
