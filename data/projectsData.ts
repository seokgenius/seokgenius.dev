interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Golfzon - Campaign tool',
    description: `골프존의 메시지 및 푸시 통합 발송 내부 백오피스. Vite 8 업그레이드 이후 오퍼·대조군·소재 테스트와 대상자 조건 세분화를 반영한 v0.19 발송 체계로 고도화했습니다.`,
    imgSrc: '/static/images/projects/golfzon-campaign-tool.png',
    href: '/projects/golfzon-campaign-tool',
  },
  {
    title: 'Golfzon - GSTAT',
    description: `골프존 통계 시스템 리팩토링 프로젝트. 레거시 vue-cli 및 admin-lte 스택을 Vue 3 + Vite 8 + Pinia + PrimeVue로 이관하고, 매트릭스 차트의 일·주·월 집계와 스프레드시트 입력을 구현했습니다.`,
    imgSrc: '/static/images/projects/golfzon-gstat.png',
    href: '/projects/golfzon-gstat',
  },
  {
    title: 'Golfzon - Plusshop',
    description: `골프존 앱 플러스샵. 아이템 현장결제·미납금 납부·AI 코스매니저 이벤트를 추가하고 웹뷰를 Vite 7로 이관했습니다. 어드민에는 PG 정산과 멤버십 1회 이용권 미수 관리를 넣었습니다.`,
    href: '/projects/golfzon-plusshop',
  },
  {
    title: 'Golfzon - Benefit Zone',
    description: `골프존 앱 내 혜택존 리뉴얼. Vite 6 이관 이후 복권 랭킹 챌린지·혜택관 브릿지와 운영 어드민의 이벤트·당첨 관리를 추가했습니다.`,
    href: '/projects/golfzon-benefit-zone',
  },
  {
    title: 'Golfzon - Mobile Coupon',
    description: `골프존 앱 쿠폰함(이용권) 운영 백오피스. 발행·발송·사용현황·정산과 외부제휴·가맹 매장 제한을 다루고, 쿠폰함 웹뷰에서는 iOS 확인코드 입력이 키보드에 가리지 않도록 맞췄습니다.`,
    href: '/projects/golfzon-mobile-coupon',
  },
  {
    title: 'SLW - Graphit',
    description: `Next.js 15, React 19, Zustand, Tailwind CSS, Shadcn/ui 스택의 신규 대시보드 프로젝트. Vercel CI/CD 배포 자동화 파이프라인 및 Husky 린팅 규칙을 선도적으로 설계했습니다.`,
    href: '/projects/slw-graphit',
  },
  {
    title: 'SLW - OPSM',
    description: `Next.js 15, React 19, Zustand 기반 비즈니스 웹 솔루션 구축 프로젝트. 전역 렌더 상태 최적화와 Vercel 인프라 및 Git GitHooks(Husky) 포맷 체크 자동 제어를 패키징했습니다.`,
    href: '/projects/slw-opsm',
  },
  {
    title: 'Java-metacommerce',
    description: `Vite, Vue 3, TypeScript 기반의 글로벌 E-commerce 솔루션 및 주문/셀러 관리 백오피스 구축. SSR/CSR 하이브리드 설계 및 Eximbay 해외 결제, vue-i18n 다국어 연동을 주도했습니다.`,
    imgSrc: '/static/images/projects/java-metacommerce.png',
    href: '/projects/java-metacommerce',
  },
  {
    title: 'Kiwoom heroes Admin',
    description: `키움히어로즈 공식 앱 어드민. 동적 컴포넌트(<component :is="...">) 레이아웃 구조화 및 Route Meta 네비게이션 가드를 이용한 메뉴 권한 관리, 데이터 다차원 필터 및 슬라이드 UI 모션을 설계했습니다.`,
    imgSrc: '/static/images/projects/kiwoom-heroes-admin.png',
    href: '/projects/kiwoom-heroes-admin',
  },
  {
    title: 'Papaya Web',
    description: `TypeScript, Vuetify, Vee-Validate 조합의 Vue2 어드민 프로젝트. 객체지향적 Class Component 아키텍처 및 강력한 타입 바인딩, 비즈니스 입력 폼의 세밀한 유효성 피드백 로직을 전개했습니다.`,
    imgSrc: '/static/images/projects/papaya-web.png',
    href: '/projects/papaya-web',
  },
  {
    title: 'GS Xi mobile web',
    description: `GS 자이 모바일 통합시스템 퍼블리싱. 모바일 표준 마크업 레이아웃 및 SCSS 구조 설계를 직접 주도하고, jQuery 기반 터치 전용 아코디언, 토글, 모달 컴포넌트를 터치 딜레이 없이 이식했습니다.`,
    href: '/projects/gs-xi-mobile-web',
  },
  {
    title: 'Mintit',
    description: `민팃 대고객 PC/Mobile 적응형 웹 퍼블리싱 및 전국 대형마트 내 중고폰 매입 ATM 기기(Kiosk) 스크린 전용 웹 레이아웃 퍼블리싱, 내부 카메라/투입구 기기 이벤트 대응 터치 모션 스크립트를 구현했습니다.`,
    href: '/projects/mintit',
  },
  {
    title: 'Baumcompany',
    description: `기업 소개 사이트 반응형 퍼블리싱. GSAP ScrollTrigger를 결합한 시네마틱 스크롤 모션 및 Swiper.js를 이용한 터치 대응 반응형 레이아웃 마크업과 고급 모션 연출을 직접 담당했습니다.`,
    href: '/projects/baumcompany',
  },
]

export default projectsData
