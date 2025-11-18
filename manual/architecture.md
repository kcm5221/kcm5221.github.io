# Gitstagram Architecture

전체 구조는 다음 3단계로 구성됩니다.

---

## 1) Frontend (GitHub Pages + Vite)

- Hash Router (`#/`, `#/search`, `#/profile`, `#/write`)
- UI 구성
  - Sidebar
  - Bottom Navigation
  - Mobile Header
- Feed 로딩 방식
  - GitHub Actions가 생성한 JSON을 `/data/feed/page-*.json` 형태로 로드
- JWT 저장소
  - `localStorage.devlog_jwt`

---

## 2) Cloudflare Worker (Auth + Commit API)

### 주요 역할
- GitHub OAuth 로그인 (PKCE)
- JWT 발급 (HMAC-SHA256)
- `/content/commit` 요청을 받아 GitHub Private Repo에 자동 커밋
- CORS 처리
- Token 만료 처리
- Rate Limit(메모리 기반)

### Worker → GitHub 흐름

Frontend → Worker (Bearer Token)
Worker → GitHub App JWT → Installation Access Token
Worker → GitHub /contents API → Markdown 커밋
GitHub Actions → Feed 재생성 → GitHub Pages 업데이트


---

## 3) GitHub Actions (CI / Feed)

### 역할

- Posts repo 변경 감지
- Markdown frontmatter → JSON feed 변환
- 페이지별(`page-1.json`, `page-2.json`)로 나누어 생성
- `current.json`에 최신 sha 기록
- GitHub Pages 자동 배포

---

## 전체 흐름도

[User]
↓ (PKCE Login)
[Frontend]
↓ Bearer JWT
[Worker]
↓ Installation Token
[GitHub Private Repo]
↓ push
[GitHub Actions]
↓ Build feed
[Public GitHub Pages]


---

## 데이터 흐름: Feed → UI

1. `current.json`에서 최신 sha 로드
2. `feed/page-1@{sha}.json` 불러오기
3. 각 FeedItem 렌더링
4. PostGrid → PostTile → PostDetail (추후)

---

## 라우터 설계

| Route | 설명 |
|-------|------|
| `#/` | Home |
| `#/search` | 검색 |
| `#/profile` | 프로필 |
| `#/write` | 글 작성 |
| `#/post/:slug` | 상세 페이지 (추가 예정) |

