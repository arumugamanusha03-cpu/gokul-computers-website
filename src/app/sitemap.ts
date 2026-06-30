import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gokulcomputers.in';

  const staticRoutes = [
    { url: baseUrl, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/products`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/services`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/brands`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'daily' as const, priority: 0.7 },
    { url: `${baseUrl}/gallery`, changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${baseUrl}/testimonials`, changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${baseUrl}/assistant`, changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  return staticRoutes.map((route) => ({
    ...route,
    lastModified: new Date(),
  }));
}
