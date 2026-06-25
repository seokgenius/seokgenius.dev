import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { absoluteSiteUrl } from '@/lib/siteUrl'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: absoluteSiteUrl('sitemap.xml'),
    host: siteMetadata.siteUrl.replace(/\/$/, ''),
  }
}
