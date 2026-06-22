# seokgenius.dev — Agent Coding Conventions

이 문서는 프로젝트 코드베이스를 분석해 정리한 코딩 컨벤션입니다. AI 에이전트와 기여자가 기존 패턴을 따르도록 안내합니다.

## 프로젝트 개요

| 항목          | 내용                                                             |
| ------------- | ---------------------------------------------------------------- |
| 프레임워크    | Next.js 15 (App Router), React 19                                |
| 언어          | TypeScript (`strictNullChecks: true`, `strict: false`)           |
| 스타일        | Tailwind CSS v4, `@tailwindcss/typography`, `@tailwindcss/forms` |
| 콘텐츠        | Contentlayer2 + MDX (`data/` 디렉터리)                           |
| 유틸리티      | [Pliny](https://github.com/timlrx/pliny) (검색, 분석, 댓글, MDX) |
| 패키지 매니저 | Yarn 3.6.1                                                       |

## 디렉터리 구조

```
app/           # Next.js App Router 페이지, layout, API route
components/    # 재사용 UI 컴포넌트
layouts/       # 블로그/목록 레이아웃 (PostLayout, ListLayout 등)
data/          # siteMetadata, nav links, projects + MDX 콘텐츠
  blog/        # 블로그 포스트 (*.mdx)
  authors/     # 작성자 프로필 (*.mdx)
css/           # tailwind.css, prism.css
faq/           # FAQ 마크다운 (참고용)
scripts/       # postbuild, RSS 생성 스크립트
public/        # 정적 자산, search.json
```

- **페이지 로직** → `app/`
- **공통 UI** → `components/`
- **블로그/목록 레이아웃** → `layouts/`
- **설정·정적 데이터** → `data/` (JS/TS)
- **MDX 콘텐츠** → `data/blog/`, `data/authors/`

## 코드 포맷팅 (Prettier / ESLint)

Prettier 설정(`prettier.config.js`)을 반드시 따릅니다.

```javascript
// prettier.config.js 기준
semi: false // 세미콜론 사용 안 함
singleQuote: true // 작은따옴표
printWidth: 100
tabWidth: 2
trailingComma: 'es5'
plugins: ['prettier-plugin-tailwindcss'] // Tailwind 클래스 자동 정렬
```

- **줄바꿈**: LF (`.gitattributes`에서 `* text=auto eol=lf`)
- **커밋 전**: Husky + lint-staged가 ESLint fix 및 Prettier write 실행
- **린트 대상**: `app`, `components`, `layouts`, `lib`, `scripts`

ESLint에서 비활성화된 규칙(프로젝트 관례):

- `@typescript-eslint/no-unused-vars`: off
- `@typescript-eslint/explicit-module-boundary-types`: off
- `react/react-in-jsx-scope`: off

## Import 경로

`tsconfig.json` path alias를 사용합니다.

| Alias                    | 경로                      |
| ------------------------ | ------------------------- |
| `@/components/*`         | `components/*`            |
| `@/data/*`               | `data/*`                  |
| `@/layouts/*`            | `layouts/*`               |
| `@/css/*`                | `css/*`                   |
| `contentlayer/generated` | `.contentlayer/generated` |
| `pliny/*`                | `node_modules/pliny/*`    |

```typescript
// ✅ GOOD — alias 사용
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import PostLayout from '@/layouts/PostLayout'
import { allBlogs } from 'contentlayer/generated'
import { sortPosts } from 'pliny/utils/contentlayer'

// ✅ GOOD — 같은 디렉터리 내 상대 경로
import Link from './Link'

// ✅ GOOD — app 내부 유틸 (일부 파일에서 사용)
import { genPageMetadata } from 'app/seo'

// ❌ BAD — 불필요한 상대 경로 깊이
import Footer from '../../../components/Footer'
```

Import 순서(관례, 강제 아님):

1. CSS / 외부 스타일
2. React / Next.js
3. 서드파티 (pliny, contentlayer, headlessui 등)
4. `@/` alias 내부 모듈
5. 상대 경로

## TypeScript

- **타입 import**: `import type { Blog, Authors } from 'contentlayer/generated'`
- **Props**: `interface`로 정의 (`Props`, `LayoutProps`, `ListLayoutProps` 등)
- **제네릭 유틸**: Pliny의 `CoreContent<T>` 활용
- **any 사용**: 최소화. 불가피할 때만 `@ts-ignore` + eslint-disable 주석 (예: `app/api/newsletter/route.ts`)
- **타입 미지정**: 레거시 컴포넌트(`Card.tsx` 등)는 점진적으로 타입 추가. 신규 코드는 Props 타입 필수

```typescript
// ✅ GOOD
interface Props {
  text: string
}

const Tag = ({ text }: Props) => { ... }

// ✅ GOOD — Next.js 15 async params
export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
}
```

## React / Next.js 패턴

### Server vs Client Components

- **기본**: Server Component ( `'use client'` 없음)
- **Client Component**: hooks, 이벤트 핸들러, 브라우저 API 필요 시만

```typescript
'use client' // useState, useEffect, usePathname 등 사용 시에만
```

Client Component 예: `ListLayout.tsx`, `ThemeSwitch.tsx`, `Comments.tsx`, `MobileNav.tsx`

### 컴포넌트 정의 스타일

프로젝트 내 두 가지 패턴이 공존합니다. **신규 코드는 `function` 선언 + default export**를 권장합니다.

```typescript
// 패턴 A — function 선언 (layout, page, Footer 등)
export default function Footer() { ... }

// 패턴 B — 화살표 함수 (Header, Tag, Card 등, 레거시)
const Header = () => { ... }
export default Header
```

### Next.js App Router

- 페이지: `export default async function Page()` 또는 named `BlogPage`
- 메타데이터: `export const metadata = genPageMetadata({ title: '...' })` 또는 `generateMetadata()`
- 정적 경로: `generateStaticParams()`
- trailing slash 활성 (`next.config.js`: `trailingSlash: true`) → 내부 링크는 `/blog/` 형태 유지
- `BASE_PATH` 환경변수 지원 → `Image`, favicon, static 경로에 반영

### 링크

내부/외부/앵커 링크는 `@/components/Link` 래퍼를 사용합니다.

```typescript
import Link from '@/components/Link'

// 내부: next/link, 외부: target="_blank" rel="noopener noreferrer" 자동 처리
<Link href="/blog">Blog</Link>
```

태그 URL은 `github-slugger`의 `slug()`로 생성합니다.

## 스타일링 (Tailwind CSS)

### 색상·테마

- **Primary**: `text-primary-500`, `hover:text-primary-600`, `dark:hover:text-primary-400`
- **텍스트 계층**: `text-gray-900 dark:text-gray-100` (본문), `text-gray-500 dark:text-gray-400` (보조)
- **배경**: `bg-white dark:bg-gray-950`, `dark:bg-gray-800` (입력 등)
- **구분선**: `divide-y divide-gray-200 dark:divide-gray-700`
- **콘텐츠**: `prose dark:prose-invert max-w-none`

### 레이아웃 패턴

```tsx
// 섹션 컨테이너
<SectionContainer>...</SectionContainer>
// mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0

// 페이지 제목
<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">

// 섹션 간격
<div className="space-y-2 pt-6 pb-8 md:space-y-5">
```

### 다크 모드

- `next-themes` + `attribute="class"`
- 모든 색상 유틸에 `dark:` 변형 병행
- CSS: `@custom-variant dark (&:where(.dark, .dark *));`

### 이미지

`@/components/Image` 래퍼 사용 (`BASE_PATH` 자동 접두):

```tsx
import Image from '@/components/Image'
;<Image src="/static/images/foo.png" alt="..." width={128} height={128} />
```

## 컴포넌트 작성 규칙

1. **파일명**: PascalCase (`Footer.tsx`, `ThemeSwitch.tsx`)
2. **export**: default export 1개
3. **Props interface**: 컴포넌트 상단 또는 같은 파일 내 정의
4. **siteMetadata**: 전역 설정은 `@/data/siteMetadata`에서 import
5. **접근성**: `aria-label`, `sr-only`, `dateTime` 속성 사용 (jsx-a11y 규칙 준수)
6. **주석**: 비활성화된 기능은 JSX 주석 `{/* ... */}`로 남김 (Footer, Header 참고)

### MDX 컴포넌트

`components/MDXComponents.tsx`에 등록된 컴포넌트만 MDX에서 사용:

```typescript
export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
}
```

## 콘텐츠 (MDX / Contentlayer)

### 블로그 포스트 (`data/blog/*.mdx`)

```yaml
---
title: 'Post Title'
date: '2026-06-11'
tags: ['nextjs', 'typescript']
draft: false
summary: '한 줄 요약'
repositoryUrl: 'https://github.com/...' # 선택
layout: PostLayout # PostLayout | PostSimple | PostBanner (기본: PostLayout)
---
```

- **언어**: 한국어 본문 사용 (프로젝트 locale: `ko-KR`)
- **draft**: `true`면 production 빌드에서 제외
- **태그 slug**: `github-slugger`로 URL 생성 → `/tags/{slug}/`
- 빌드 시 `app/tag-data.json`, `public/search.json` 자동 생성

### 작성자 (`data/authors/*.mdx`)

```yaml
---
name: seokgenius
occupation: Web front-end developer
company: Golfzon
email: seokgeniusdev@gmail.com
github: https://github.com/seokgenius
---
```

### 정적 데이터

| 파일                     | 형식                      | 용도             |
| ------------------------ | ------------------------- | ---------------- |
| `data/siteMetadata.js`   | CommonJS `module.exports` | 사이트 전역 설정 |
| `data/headerNavLinks.ts` | TS default export         | 헤더 네비게이션  |
| `data/projectsData.ts`   | TS interface + array      | 프로젝트 카드    |

## SEO / 메타데이터

- 공통 페이지: `genPageMetadata()` (`app/seo.tsx`)
- 블로그 포스트: `generateMetadata()` + Open Graph / Twitter card
- JSON-LD: `post.structuredData` (contentlayer computed field)

```typescript
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Blog' })
```

## API Route

```typescript
// app/api/newsletter/route.ts 패턴
export const dynamic = 'force-static'
const handler = NewsletterAPI({ provider: siteMetadata.newsletter.provider })
export { handler as GET, handler as POST }
```

## 네이밍

| 대상          | 규칙                       | 예                                     |
| ------------- | -------------------------- | -------------------------------------- |
| 컴포넌트 파일 | PascalCase                 | `PageTitle.tsx`                        |
| 유틸/설정     | camelCase                  | `siteMetadata.js`, `headerNavLinks.ts` |
| MDX slug      | kebab-case                 | `golfzon-campaign-tool.mdx`            |
| CSS           | kebab-case                 | `tailwind.css`                         |
| 상수          | UPPER_SNAKE 또는 camelCase | `POSTS_PER_PAGE = 5`                   |

## 변경 시 주의사항

1. **CSP 변경**: 외부 스크립트/도메인 추가 시 `next.config.js`의 `ContentSecurityPolicy` 업데이트
2. **검색 인덱스**: 블로그 추가/수정 후 빌드 시 `public/search.json` 재생성됨
3. **환경변수**: Giscus, Umami, Newsletter 등은 `.env` + `siteMetadata` 양쪽 확인
4. **범위 최소화**: 요청과 무관한 리팩터링·주석 정리 금지
5. **기존 패턴 우선**: 새 추상화보다 주변 파일과 동일한 스타일 유지

## 개발 명령

```bash
yarn dev      # 개발 서버
yarn build    # 프로덕션 빌드 (+ postbuild: RSS, sitemap 등)
yarn lint     # ESLint fix
```

## 참고 파일

| 목적              | 참고                                               |
| ----------------- | -------------------------------------------------- |
| 루트 레이아웃     | `app/layout.tsx`                                   |
| 블로그 상세       | `app/blog/[...slug]/page.tsx`                      |
| 목록 레이아웃     | `layouts/ListLayout.tsx`, `layouts/PostLayout.tsx` |
| 링크 래퍼         | `components/Link.tsx`                              |
| Contentlayer 설정 | `contentlayer.config.ts`                           |
| Tailwind 테마     | `css/tailwind.css`                                 |
| 포맷 설정         | `prettier.config.js`, `eslint.config.mjs`          |
