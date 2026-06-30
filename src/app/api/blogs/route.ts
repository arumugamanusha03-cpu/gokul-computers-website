import { NextResponse } from 'next/server';

const demoBlogs = [
  {
    _id: '1',
    title: 'Best Lenovo Laptops in 2026',
    slug: 'best-lenovo-laptops-2026',
    excerpt: 'Explore the best Lenovo laptops available at Gokul Computers.',
    category: 'Laptops',
    published: true,
    createdAt: new Date(),
  },
  {
    _id: '2',
    title: 'How to Upgrade Your Laptop SSD',
    slug: 'upgrade-laptop-ssd',
    excerpt: 'A simple guide to upgrading your laptop SSD for better performance.',
    category: 'Accessories',
    published: true,
    createdAt: new Date(),
  },
];

export async function GET() {
  return NextResponse.json({
    blogs: demoBlogs,
    total: demoBlogs.length,
    page: 1,
    pages: 1,
  });
}

export async function POST() {
  return NextResponse.json(
    {
      success: true,
      message: 'Demo mode - Blog saved successfully',
    },
    { status: 201 }
  );
}