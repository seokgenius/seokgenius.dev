import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allPosts, allAuthors, Authors } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allPosts)
  const posts = allCoreContent(sortedPosts)
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  return <Main posts={posts} author={author} />
}
