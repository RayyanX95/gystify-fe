import { HeroSection, FeaturesSection, CTASection, HowItWorksSection } from './sections';

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}
