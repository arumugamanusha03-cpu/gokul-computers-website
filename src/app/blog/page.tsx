import { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import BlogListPage from '@/components/pages/BlogListPage';

export const metadata: Metadata = {
  title: 'Tech Blog - Laptop Buying Guides & Tips',
  description: 'Read our tech blog for laptop buying guides, reviews, comparison articles, and tips from Gokul Computers, Trichy.',
};

export default function Blog() {
  return (
    <PageLayout>
      <BlogListPage />
    </PageLayout>
  );
}
