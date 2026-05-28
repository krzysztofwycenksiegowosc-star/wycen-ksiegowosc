import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { EstimationForm } from './components/EstimationForm';
import { Benefits } from './components/Benefits';
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
        <Benefits />
        <WhyNotChange />
        <FounderSection />
        </main>
      <Footer />
    </div>
  );
}

export default App;
