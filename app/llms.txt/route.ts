import { allPosts, allProjects } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { sortPosts } from 'pliny/utils/contentlayer'
import { absoluteSiteUrl } from '@/lib/siteUrl'

export const dynamic = 'force-static'

function formatLink(title: string, path: string, summary?: string | null) {
  const url = absoluteSiteUrl(path)
  const description = summary ? `: ${summary}` : ''
  return `- [${title}](${url})${description}`
}

export async function GET() {
  const posts = sortPosts(allPosts).filter((post) => !post.draft)
  const projects = allProjects.filter((project) => !project.draft)

  const lines = [
    `# ${siteMetadata.title}`,
    '',
    `> ${siteMetadata.description}`,
    '',
    '## Posts',
    ...(posts.length > 0
      ? posts.map((post) => formatLink(post.title, post.path, post.summary))
      : ['- (no posts yet)']),
    '',
    '## Projects',
    ...(projects.length > 0
      ? projects.map((project) => formatLink(project.title, project.path, project.summary))
      : ['- (no projects yet)']),
    '',
    '## Pages',
    `- [Home](${absoluteSiteUrl()})`,
    `- [Posts](${absoluteSiteUrl('posts')})`,
    `- [Projects](${absoluteSiteUrl('projects')})`,
    `- [Tags](${absoluteSiteUrl('tags')})`,
    '',
    '## Feeds',
    `- [RSS](${absoluteSiteUrl('feed.xml')})`,
    `- [Sitemap](${absoluteSiteUrl('sitemap.xml')})`,
  ]

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
