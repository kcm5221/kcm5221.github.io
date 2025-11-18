# “인스타 느낌 GitHub 개발자 블로그” 기획 & 현재 작업 정리

## 1. 프로젝트 개요

- **프로젝트 목표**
  - GitHub Pages + Cloudflare Workers + GitHub Actions로 동작하는 **인스타그램 느낌의 개발 로그 블로그** 만들기
  - 글은 **웹 UI에서 작성**, Workers가 **content-private 리포에 Markdown으로 커밋**
  - GitHub Actions가 Markdown을 **JSON 피드로 변환**해 `kcm5221.github.io`(site-public)에 반영
  - 전체 비용 0원 (**무료 플랜만 사용**), **모바일 중심 UI/UX** 지향

- **핵심 키워드**
  - “인스타 타임라인 같은 개발 로그 피드”
  - “GitHub를 CMS처럼 쓰는 개인 개발 일지”
  - “클라이언트는 GitHub Pages, 서버는 Cloudflare Worker, 빌드는 GitHub Actions”

---

## 2. 기술 스택 & 구조

### 2.1 리포지토리 구성

- **content-private (비공개)**
  - 실제 글/미디어가 Markdown + 파일 형태로 저장
  - 구조 예시
    - 글: `posts/YYYY/MM/slug.md`
    - 이미지(향후): `media/YYYY/MM/slug/...`
  - frontmatter에 `title, tags, collection, cover, created, updated, slug, hidden, draft` 등 포함

- **kcm5221.github.io (site-public, GitHub Pages)**
  - 정적 웹 프론트
  - `/data` 아래에 JSON 피드/인덱스를 저장
    - `/data/current.json` → 최신 SHA 정보
    - `/data/feed/page-1@<sha>.json` → 1페이지 피드
    - `/data/tags@<sha>.json` → 태그 인덱스
    - `/data/collections@<sha>.json` → 컬렉션 인덱스

### 2.2 백엔드 구조 (Cloudflare Worker)

- GitHub OAuth (PKCE) + GitHub App 설치 토큰 사용
- Worker 엔드포인트 (현재 기준)
  - `GET /health` → 상태 체크
  - `GET /auth/login` → GitHub OAuth 로그인 시작 (PKCE + state)
  - `GET /auth/callback` → OAuth 콜백 처리, `ALLOWED_GITHUB_LOGIN` 확인 후 **JWT 발급**
  - `POST /content/commit` → JWT 인증 필요, Markdown 생성 + content-private 커밋
- 인증
  - 초기에는 쿠키 기반이었으나 **Bearer JWT 방식**으로 변경
  - **JWT 만료: 1시간**
  - CORS 화이트리스트 기반 설정 (프론트 도메인만 허용)

### 2.3 GitHub Actions (content-private → site-public 빌드 파이프라인)

- 트리거: `content-private`에 push 발생 시
- 주요 작업
  - Markdown 파싱 → JSON 피드 생성
    - `feed/page-1@<sha>.json`
    - `tags@<sha>.json`
    - `collections@<sha>.json`
  - `current.json`에 최신 SHA 기록
  - (선택) 커버 없는 경우 텍스트 썸네일 생성
- 결과물: `site-public (kcm5221.github.io)` 리포에 커밋

### 2.4 프론트엔드

- **Vite + TypeScript + (Tailwind 설정 있음)**  
  (현재 Tailwind 클래스는 일부만 사용 중, 기본 스타일은 인라인 스타일 위주)
- 주요 파일
  - `src/main.ts`
    - 초기 피드 로딩 (`loadInitialFeed`)
    - 전역 상태 관리 (`currentItems`, `currentTag`, `currentCollection`)
    - 해시 기반 라우팅 (`#/`, `#/search`, `#/write`)
    - 레이아웃 + 네비게이션 + 홈/검색/작성 화면 렌더링
  - `src/api/feed.ts`
    - `fetchCurrentSha`, `fetchFeedPage`, `fetchTagsIndex`, `fetchCollectionsIndex`
    - `loadInitialFeed(page = 1)` → `current.json` + `feed/page-1@sha.json` 한 번에 로딩
  - `src/types/Feed.ts`
    - `FeedItem`, `FeedPage`, `CurrentSha`, `TagsIndex`, `CollectionsIndex` 타입 정의

---

## 3. 데이터 구조 (FeedItem)

```ts
// 글 하나(피드 아이템)의 구조
export interface FeedItem {
  id: string;
  title: string;
  created: string;      // ISO 문자열 (정렬 기준)
  updated: string;      // ISO 문자열
  date: string;         // created와 동일하게 사용
  tags: string[];
  collection: string | null;
  cover: string | null; // 나중에 썸네일/이미지 URL 들어갈 자리 (없으면 null)
  summary: string;
  slug: string;         // URL 등에 쓰일 짧은 이름
  path: string;         // 원본 markdown 경로 (ex: posts/2025/11/hello.md)
  hidden: boolean;
  draft: boolean;
}
