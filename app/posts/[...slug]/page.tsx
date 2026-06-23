import { allPosts } from 'contentlayer/generated'
import { ContentPage, generateContentMetadata } from '@/lib/contentPage'
import type { Metadata } from 'next'

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  return generateContentMetadata(slug, allPosts)
}

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post.slug.split('/').map((name) => decodeURI(name)),
  }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  return <ContentPage slug={slug} documents={allPosts} />
}
