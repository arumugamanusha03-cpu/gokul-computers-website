import { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import ServicesPage from '@/components/pages/ServicesPage';

export const metadata: Metadata = {
  title: 'Laptop Services - Repair, Upgrade & More',
  description: 'Expert laptop repair, motherboard repair, RAM & SSD upgrades, data recovery, and AMC services at Gokul Computers, Trichy.',
};

export default function Services() {
  return (
    <PageLayout>
      <ServicesPage />
    </PageLayout>
  );
}
