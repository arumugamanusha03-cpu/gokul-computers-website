import { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import TestimonialsPage from '@/components/pages/TestimonialsPage';

export const metadata: Metadata = {
  title: 'Customer Reviews & Testimonials',
  description: 'Read what our 5000+ happy customers say about Gokul Computers, Trichy. Real reviews from real people.',
};

export default function Testimonials() {
  return (
    <PageLayout>
      <TestimonialsPage />
    </PageLayout>
  );
}
