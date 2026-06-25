import { MetadataRoute } from 'next'
import { allPosts, allProjects } from 'contentlayer/generated'
import { absoluteSiteUrl } from '@/lib/siteUrl'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const contentRoutes = [...allPosts, ...allProjects]
    .filter((content) => !content.draft)
    .map((content) => ({
      url: absoluteSiteUrl(content.path),
      lastModified: content.lastmod || content.date,
    }))

  const routes = ['', 'posts', 'projects', 'tags'].map((route) => ({
    url: absoluteSiteUrl(route),
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...contentRoutes]
}
