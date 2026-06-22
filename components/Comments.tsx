'use client'

import siteMetadata from '@/data/siteMetadata'
import { Comments as CommentsComponent } from 'pliny/comments'

export default function Comments({ slug }: { slug: string }) {
  if (!siteMetadata.comments?.provider) {
    return null
  }
  return <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
}
