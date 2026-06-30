import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import AccessoriesClient from '@/components/pages/AccessoriesClient';

export const metadata: Metadata = {
  title: 'Laptop Accessories & Spare Parts',
  description: 'Shop laptop RAM, SSD, HDD, keyboards, mice, chargers, bags, monitors and more at Gokul Computers, Trichy.',
};

export default function AccessoriesPage() {
  return (
    <PageLayout>
      <AccessoriesClient />
    </PageLayout>
  );
}
