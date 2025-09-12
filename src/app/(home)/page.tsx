import { HeroSection, FeaturesSection, CTASection } from './sections';

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
