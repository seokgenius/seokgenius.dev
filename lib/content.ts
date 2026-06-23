import { allPosts, allProjects } from 'contentlayer/generated'
import type { Post, Project } from 'contentlayer/generated'

export type Content = Post | Project

export function allContents(): Content[] {
  return [...allPosts, ...allProjects]
}

export function isPost(content: Content): content is Post {
  return content.path.startsWith('posts/')
}

export function isProject(content: Content): content is Project {
  return content.path.startsWith('projects/')
}
