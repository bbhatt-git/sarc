import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://sarc.edu.np';

  const staticPages = [
    '/',
    '/gallery',
    '/contact',
    '/admissions',
    '/about/us',
    '/about/staffs',
    '/about/founder',
    '/about/why-us',
    '/about/vision',
    '/about/history',
    '/academics/programs',
    '/academics/services',
    '/academics/faculties',
    '/academics/achievements',
    '/notice/general',
    '/notice/holidays',
    '/notice/exams'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));

  return [
    ...staticPages,
  ]
}
