import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { EstimationForm } from './components/EstimationForm';
import { MarketInsights } from './components/MarketInsights';
import { WhyNotChange } from './components/WhyNotChange';
import { FounderSection } from './components/FounderSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Header />
      <main>
        <HeroSection />
        <EstimationForm />
        <MarketInsights />
        <WhyNotChange />
        <FounderSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
