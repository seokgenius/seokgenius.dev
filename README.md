# seokgenius.dev

프론트엔드 개발자 **김석진(seokgenius)** 의 개인 포트폴리오·기술 블로그 사이트입니다.  
실무 프로젝트 경험을 정리하고, 개발 과정에서 배운 내용을 기록하는 공간입니다.

> 기술을 채우는 것만큼이나, 비우고 새로 배우는 과정(Unlearn)을 중요하게 생각합니다.

## 사이트 구성

| 페이지   | 경로         | 설명                 |
| -------- | ------------ | -------------------- |
| Home     | `/`          | 소개 및 프로필       |
| Blog     | `/blog/`     | 기술·프로젝트 포스트 |
| Tags     | `/tags/`     | 태그별 포스트 분류   |
| Projects | `/projects/` | 프로젝트 카드 목록   |

## 주요 기능

- **MDX 기반 블로그** — `data/blog/`에 MDX 파일을 추가하면 자동으로 포스트 생성
- **프로젝트 포트폴리오** — 골프존, SLW, 키움히어로즈 등 12개 실무 프로젝트 사례 정리
- **다크 모드** — `next-themes` 기반 시스템/라이트/다크 테마
- **전역 검색** — Pliny kbar (`Cmd+K`) + 빌드 시 생성되는 `search.json`
- **댓글** — Giscus (GitHub Discussions 연동)
- **분석** — Umami Analytics
- **뉴스레터** — Buttondown API 연동
- **SEO** — Open Graph, Twitter Card, JSON-LD, RSS, Sitemap

## 기술 스택

| 영역          | 기술                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| 프레임워크    | Next.js 15 (App Router), React 19                                       |
| 언어          | TypeScript                                                              |
| 스타일        | Tailwind CSS v4, `@tailwindcss/typography`, `@tailwindcss/forms`        |
| 콘텐츠        | Contentlayer2, MDX                                                      |
| 유틸리티      | [Pliny](https://github.com/timlrx/pliny) (검색, 분석, 댓글, MDX 렌더링) |
| 패키지 매니저 | Yarn 3.6.1                                                              |
| 배포          | GitHub Pages (정적 export)                                              |

## 프로젝트 구조

```
app/              # Next.js App Router 페이지, layout, API route
components/       # 재사용 UI 컴포넌트
layouts/          # 블로그·목록 레이아웃 (PostLayout, ListLayout 등)
data/
  blog/           # 블로그 포스트 (*.mdx)
  authors/        # 작성자 프로필 (*.mdx)
  siteMetadata.js # 사이트 전역 설정
  projectsData.ts # 프로젝트 카드 데이터
css/              # Tailwind, Prism 스타일
scripts/          # postbuild, RSS 생성
public/           # 정적 자산, search.json
```

## 시작하기

### 요구 사항

- Node.js 20+
- Yarn 3.6.1

### 설치 및 실행

```bash
yarn          # 의존성 설치
yarn dev      # 개발 서버 (http://localhost:3000)
yarn build    # 프로덕션 빌드 (+ RSS, sitemap, search.json 생성)
yarn serve    # 빌드 결과 미리보기
yarn lint     # ESLint + Prettier
```

### 환경 변수

`.env` 파일에 아래 값을 설정합니다. (선택 사항 — 미설정 시 해당 기능 비활성)

| 변수                   | 용도                                                   |
| ---------------------- | ------------------------------------------------------ |
| `NEXT_UMAMI_ID`        | Umami Analytics 웹사이트 ID                            |
| `NEXT_PUBLIC_GISCUS_*` | Giscus 댓글 (repo, repositoryId, category, categoryId) |
| `BASE_PATH`            | GitHub Pages 등 서브 경로 배포 시 base path            |

## 콘텐츠 작성

### 블로그 포스트

`data/blog/` 디렉터리에 MDX 파일을 추가합니다.

```yaml
---
title: '포스트 제목'
date: '2026-06-11'
tags: ['nextjs', 'typescript']
draft: false
summary: '한 줄 요약'
repositoryUrl: 'https://github.com/...' # 선택
layout: PostLayout # PostLayout | PostSimple | PostBanner
---
```

- `draft: true`이면 production 빌드에서 제외됩니다.
- 빌드 시 `app/tag-data.json`, `public/search.json`이 자동 생성됩니다.

### 프로젝트 카드

`data/projectsData.ts`에 항목을 추가하면 `/projects/` 페이지에 반영됩니다.

## 배포

`main` 브랜치 push 시 GitHub Actions(`.github/workflows/pages.yml`)가 정적 export 빌드를 수행하고 GitHub Pages에 배포합니다.

```bash
EXPORT=1 UNOPTIMIZED=1 yarn build
```

## 라이선스

개인 프로젝트입니다. 원본 템플릿은 [timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)를 기반으로 합니다.

## 연락처

- GitHub: [seokgenius](https://github.com/seokgenius)
- Email: seokgeniusdev@gmail.com
