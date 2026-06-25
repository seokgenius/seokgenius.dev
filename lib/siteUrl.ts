import siteMetadata from '@/data/siteMetadata'

export function absoluteSiteUrl(path: string = ''): string {
  const base = siteMetadata.siteUrl.replace(/\/$/, '')
  if (!path) return `${base}/`
  const normalized = path.replace(/^\//, '')
  if (/\.[a-z0-9]+$/i.test(normalized)) {
    return `${base}/${normalized}`
  }
  return `${base}/${normalized}${normalized.endsWith('/') ? '' : '/'}`
}

export function ogLocale(): string {
  return siteMetadata.locale.replace('-', '_')
}
