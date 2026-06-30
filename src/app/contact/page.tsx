import { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import ContactPage from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us - Visit Gokul Computers, Trichy',
  description: 'Contact Gokul Computers at Thillai Nagar, Trichy. Phone: 07947130911. Open 9:30 AM - 8:00 PM, all days.',
};

export default function Contact() {
  return (
    <PageLayout>
      <ContactPage />
    </PageLayout>
  );
}
