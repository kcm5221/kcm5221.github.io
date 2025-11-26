# Gitstagram Architecture

Gitstagram은 정적 사이트 위에서 인증·작성 플로우를 붙이기 위해 **Frontend / Cloudflare Worker / GitHub Actions** 3단 구조로 동작합니다.

---

## 1) Frontend (GitHub Pages + Vite)
- Hash Router 경로: `#/`, `#/search`, `#/profile`, `#/write`, `#/post/:slug`
- UI 구성: Sidebar + Bottom Navigation + Mobile Header
- Saved 탭: Frontmatter `collection` 값으로 묶인 컬렉션 카드 및 상세
- 피드 로딩: `/data/current.json` → `/data/feed/page-1@<sha>.json`으로 초기 렌더링
- 검색: 제목/요약/태그/컬렉션 텍스트 기반 필터링 및 결과 수 표기
- JWT 저장소: `localStorage.devlog_jwt`
- 상세 페이지: 컨텍스트(검색/컬렉션)별 이전·다음 이동, 커버/폴백 카드 렌더링

---

## 2) Cloudflare Worker (Auth + Commit API)
- GitHub OAuth(PKCE) → JWT 발급
- `/auth/login`: state/pkce 쿠키 발급 후 GitHub OAuth로 리다이렉트
- `/auth/callback`: code 교환, 허용된 GitHub 로그인만 JWT 발급 후 프론트(`#auth=<token>`)
- `/content/commit`: Bearer JWT 검증 후 Private Repo에 Markdown 커밋 (GitHub App 사용)
- CORS, JWT 만료 처리, 간단한 메모리 레이트 리밋 적용

### Worker → GitHub 흐름
Frontend(Bearer JWT) → Worker → GitHub App JWT → Installation Access Token → `/contents` API 커밋 → Actions feed 빌드 → Pages 배포

---

## 3) GitHub Actions (CI / Feed)
- Private 콘텐츠 저장소 변경 감지 → JSON Feed 생성
- 산출물: `feed/page-*.json`, `tags@<sha>.json`, `collections@<sha>.json`, `current.json`
- GitHub Pages(`kcm5221.github.io`)로 정적 배포

---

## 데이터 흐름: Feed → UI
1. `current.json`에서 최신 sha 로드
2. `feed/page-1@{sha}.json`을 불러와 홈/검색/상세 렌더링
3. PostGrid → PostTile → PostDetail로 탐색하며 Saved/검색 컨텍스트를 유지

---

## 라우터 설계
| Route | 설명 |
|-------|------|
| `#/` | Home + Saved 탭 |
| `#/search` | 검색 페이지 |
| `#/profile` | 프로필(정적 데이터) |
| `#/write` | 글 작성 폼 + 로그인 안내 |
| `#/post/:slug` | 게시물 상세 |
| `#/auth=...` | OAuth 토큰 회수용 해시 |

---

## 유지보수 체크포인트
- 해시 라우터 경로와 JSON 피드 스키마는 배포본과 동일하게 유지합니다. UI 수정 시에도 경로/키 이름을 바꾸지 않습니다.
- Worker 엔드포인트(`/auth/login`, `/auth/callback`, `/content/commit`)는 인증 흐름에 영향이 없도록 시그니처와 응답 형식을 유지합니다.
- `localStorage.devlog_jwt` 키와 JWT 파싱 로직은 후방 호환성을 위해 동일하게 유지하고, 만료 처리 로직만 필요한 경우에 한해 보강합니다.
- Actions 산출물(`data/*`) 구조를 바꾸지 않는 대신, 캐시/서명 등 성능 개선이 필요하면 정적 파일 설정 수준에서 조정합니다.
