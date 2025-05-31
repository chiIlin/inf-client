
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import InfluencerCatalog from '@/components/InfluencerCatalog';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <div className="bg-gradient-to-b from-white to-ua-pink-light">
        <InfluencerCatalog />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
