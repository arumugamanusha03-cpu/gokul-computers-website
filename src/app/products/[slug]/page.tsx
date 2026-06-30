import { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import ProductDetail from '@/components/products/ProductDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${name} - Buy at Best Price`,
    description: `Buy ${name} at Gokul Computers, Trichy. Get the best price with genuine warranty and expert after-sales support.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <PageLayout>
      <div className="pt-20 min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
        <ProductDetail slug={slug} />
      </div>
    </PageLayout>
  );
}
