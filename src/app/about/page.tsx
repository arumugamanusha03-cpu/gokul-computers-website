import { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import AboutPage from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: 'About Us - 31+ Years of Trust',
  description: 'Gokul Computers - Trichy\'s most trusted laptop store since 1993. Lenovo Authorized Dealer with 31+ years of experience.',
};

export default function About() {
  return (
    <PageLayout>
      <AboutPage />
    </PageLayout>
  );
}
