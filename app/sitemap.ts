import { MetadataRoute } from 'next'
import { blogPosts } from '@/src/data/blogsData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.flashfirejobs.com'

  // Filter and map blog posts to sitemap entries
  const blogUrls: MetadataRoute.Sitemap = blogPosts
    .filter((post) => {
      return post?.slug &&
             typeof post.slug === 'string' &&
             post.slug.trim() !== '' &&
             post.slug !== 'undefined'
    })
    .map((post) => {
      const lastUpdated = post.lastUpdated || post.date || new Date().toISOString().split('T')[0]
      let lastModified: Date
      try {
        lastModified = new Date(lastUpdated)
        if (isNaN(lastModified.getTime())) {
          lastModified = new Date()
        }
      } catch {
        lastModified = new Date()
      }

      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/employers`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/how-flashfire-ai-job-automation-platform-works`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date('2025-09-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date('2025-09-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date('2025-09-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  const canadaRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/en-ca`, lastModified: new Date('2025-11-01'), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/en-ca/pricing`, lastModified: new Date('2025-11-01'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/en-ca/features`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/en-ca/features/resume-optimizer`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/en-ca/features/job-automation`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/en-ca/features/linkedin-profile-optimization`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/en-ca/features/cover-letter`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/en-ca/features/dashboard-analytics`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/en-ca/features/job-tracker`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/en-ca/features/interview-tips`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/en-ca/features/precision-targeting`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/en-ca/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/en-ca/faq`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/en-ca/employers`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/en-ca/testimonials`, lastModified: new Date('2025-11-01'), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/en-ca/contact-us`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/en-ca/about-us`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/en-ca/how-flashfire-ai-job-automation-platform-works`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/en-ca/recent-job-openings`, lastModified: new Date('2025-11-01'), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${baseUrl}/en-ca/job-search`, lastModified: new Date('2025-11-01'), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/en-ca/offer-and-salary`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/en-ca/image-testimonials`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/en-ca/see-flashfire-in-action`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/en-ca/talk-to-an-expert`, lastModified: new Date('2025-11-01'), changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  return [...staticRoutes, ...canadaRoutes, ...blogUrls]
}
