import { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import GalleryPage from '@/components/pages/GalleryPage';

export const metadata: Metadata = {
  title: 'Gallery - Showroom, Products & Events',
  description: 'Explore our showroom, product photos, customer moments, and service center at Gokul Computers, Trichy.',
};

export default function Gallery() {
  return (
    <PageLayout>
      <GalleryPage />
    </PageLayout>
  );
}
