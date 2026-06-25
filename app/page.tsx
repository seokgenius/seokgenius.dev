import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allPosts, allAuthors, Authors } from 'contentlayer/generated'
import Main from './Main'
import JsonLd from '@/components/JsonLd'
import { createPersonJsonLd } from '@/lib/jsonLd'

export default async function Page() {
  const sortedPosts = sortPosts(allPosts)
  const posts = allCoreContent(sortedPosts)
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const personJsonLd = createPersonJsonLd(author)

  return (
    <>
      <JsonLd data={personJsonLd} />
      <Main posts={posts} author={author} />
    </>
  )
}
