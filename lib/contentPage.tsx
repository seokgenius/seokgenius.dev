import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allAuthors } from 'contentlayer/generated'
import type { Authors, Post, Project } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

type ContentDoc = Post | Project

export async function generateContentMetadata(
  slug: string,
  documents: ContentDoc[]
): Promise<Metadata | undefined> {
  const content = documents.find((doc) => doc.slug === slug)
  const authorList = content?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!content) {
    return
  }

  const publishedAt = new Date(content.date).toISOString()
  const modifiedAt = new Date(content.lastmod || content.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (content.images) {
    imageList = typeof content.images === 'string' ? [content.images] : content.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img && img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: content.title,
    description: content.summary,
    openGraph: {
      title: content.title,
      description: content.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.summary,
      images: imageList,
    },
  }
}

export async function ContentPage({ slug, documents }: { slug: string; documents: ContentDoc[] }) {
  const content = documents.find((doc) => doc.slug === slug)
  if (!content) {
    return notFound()
  }

  const relatedContents = allCoreContent(sortPosts(documents))
  const contentIndex = relatedContents.findIndex((doc) => doc.slug === slug)
  if (contentIndex === -1) {
    return notFound()
  }

  const prev = relatedContents[contentIndex + 1]
  const next = relatedContents[contentIndex - 1]
  const authorList = content.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(content)
  const jsonLd = content.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = layouts[content.layout || defaultLayout]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={content.body.code} components={components} toc={content.toc} />
      </Layout>
    </>
  )
}
