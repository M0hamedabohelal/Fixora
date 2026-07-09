import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
