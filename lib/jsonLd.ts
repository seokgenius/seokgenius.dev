import type { Authors, Post, Project } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { absoluteSiteUrl } from '@/lib/siteUrl'

type ContentDoc = Post | Project

export function createWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.title,
    url: absoluteSiteUrl(),
    description: siteMetadata.description,
    inLanguage: siteMetadata.locale,
  }
}

export function createPersonJsonLd(author: Authors) {
  const sameAs = [author.github, author.linkedin, author.twitter, author.bluesky].filter(
    Boolean
  ) as string[]

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: absoluteSiteUrl(),
    email: author.email,
    jobTitle: author.occupation,
    ...(author.company && {
      worksFor: {
        '@type': 'Organization',
        name: author.company,
      },
    }),
    ...(sameAs.length > 0 && { sameAs }),
  }
}

export function createBreadcrumbJsonLd(content: ContentDoc) {
  const section = content.path.startsWith('posts/') ? 'posts' : 'projects'
  const sectionLabel = section === 'posts' ? 'Posts' : 'Projects'

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteSiteUrl(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: sectionLabel,
        item: absoluteSiteUrl(section),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: content.title,
        item: absoluteSiteUrl(content.path),
      },
    ],
  }
}
