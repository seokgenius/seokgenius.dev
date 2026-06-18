import Image from '@/components/Image'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import type { Authors, Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'

export default function Home({ author, posts }: { author: Authors; posts?: CoreContent<Blog>[] }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {author && (
          <div className="space-y-2 pt-6 pb-10 md:space-y-5">
            <div className="flex flex-col items-center gap-8 py-4 md:flex-row md:items-start">
              {author.avatar && (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={128}
                  height={128}
                  className="border-primary-500 h-32 w-32 rounded-full border-2 object-cover shadow-lg"
                />
              )}
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
                    {author.name}
                  </h1>
                  <p className="text-primary-500 dark:text-primary-400 mt-1 text-lg font-medium">
                    {author.occupation} {author.company ? `@ ${author.company}` : ''}
                  </p>
                </div>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  <MDXLayoutRenderer code={author.body.code} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
