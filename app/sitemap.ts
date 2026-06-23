import { MetadataRoute } from 'next'
import { allPosts, allProjects } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const contentRoutes = [...allPosts, ...allProjects]
    .filter((content) => !content.draft)
    .map((content) => ({
      url: `${siteUrl}/${content.path}`,
      lastModified: content.lastmod || content.date,
    }))

  const routes = ['', 'posts', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...contentRoutes]
}
