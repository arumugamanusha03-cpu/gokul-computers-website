import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedProducts />
      <ServicesSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <NewsletterSection />
    </PageLayout>
  );
}
