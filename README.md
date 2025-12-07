# Gitstagram

Gitstagram은 GitHub Pages, Cloudflare Workers, GitHub Actions를 조합해 **인스타그램 스타일의 개발 블로그**를 제공하는 프로젝트입니다. 정적 페이지로 동작하면서도 GitHub OAuth 기반 인증, JWT, 자동 커밋 파이프라인을 갖추어 비용 없이 운영할 수 있습니다.

현재 기능 구현을 완료했으며, 앞으로는 **새로운 기능/구조 변경 없이 필요한 경우에 한해 버그 수정과 안정화 작업**만 수행합니다. 최신 아키텍처와 운영 메모는 `manual/`의 문서를 참고하세요.

## 현재 기능
- 해시 라우터 기반 네비게이션: `#/`, `#/search`, `#/profile`, `#/write`, `#/post/:slug`
- GitHub Actions가 생성한 JSON 피드(`/data`)를 불러와 홈/검색/상세 화면에서 렌더링
- Saved 탭으로 컬렉션(Frontmatter `collection`)별 게시물 묶음 확인
- 검색 페이지에서 제목·요약·태그·컬렉션 텍스트 필터링 및 결과 그리드 표시
- 게시물 상세 페이지에서 이전/다음 이동(컬렉션·검색 결과 컨텍스트 유지)
- 글쓰기 폼: 제목→슬러그 자동 생성, 필수 입력 검증, GitHub Worker로 게시 요청
- GitHub OAuth(PKCE) 로그인 토큰을 해시(`auth=`)에서 회수 후 `localStorage` 저장

## 아키텍처 요약
- **Frontend (Vite + TypeScript + Tailwind 4)**: `src/main.ts`에서 해시 라우팅, 피드 그리드, 검색/상세/글쓰기 UI를 구성합니다.
- **Data(정적)**: GitHub Actions가 private 저장소의 Markdown을 JSON으로 변환해 `/data/current.json`, `/data/feed/page-*.json`, `/data/tags@sha.json`, `/data/collections@sha.json` 형태로 배포합니다.
- **Cloudflare Worker**: GitHub OAuth(PKCE) → JWT 발급 → `/content/commit`으로 Markdown 커밋 요청을 처리합니다. JWT는 `localStorage.devlog_jwt`에 저장합니다.
- **GitHub Actions**: private 콘텐츠 저장소 변경을 감지해 JSON 피드를 빌드하고 `kcm5221.github.io` Pages에 배포합니다.

## 유지보수 원칙
- 신규 기능/구조 변경은 중단하고, 배포된 기능을 기준으로 한 **버그 수정·문서 보완·환경 변수 정리**만 수행합니다.
- Worker와 프론트엔드 변경 시 테스트/배포 범위는 기존 아키텍처를 유지하는 선에서 최소화합니다.
- 시크릿·설정값은 `manual/environment.md`에 정의된 키 목록을 기준으로 관리합니다.

## 실행 방법
1. 의존성 설치: `npm install`
2. 개발 서버: `npm run dev`
3. 프로덕션 빌드: `npm run build`
4. 빌드 미리보기: `npm run preview`

## 데이터 구조
- `data/current.json`: 최신 콘텐츠 SHA 및 생성 시각
- `data/feed/page-<n>@<sha>.json`: 피드 페이지 단위 데이터(게시물 배열)
- `data/tags@<sha>.json`: 태그 인덱스
- `data/collections@<sha>.json`: 컬렉션 인덱스

## 작성/인증 플로우 요약
1. `#/write` 진입 시 로그인 상태를 확인합니다. 해시의 `auth=` 값이 있다면 JWT를 저장합니다.
2. 글쓰기 폼 제출 시 필수 필드를 검증하고 Worker `/content/commit`으로 Bearer JWT와 함께 전송합니다.
3. 인증 만료(401) 시 저장된 JWT를 삭제하고 다시 로그인하도록 안내합니다.

## 주요 디렉터리
- `src/`: 프론트엔드 소스(라우팅, UI, 스타일)
- `data/`: Actions가 생성한 정적 JSON 피드
- `manual/`: 아키텍처/환경/진행 상황 문서
- `public/`, `assets/`: 정적 리소스

## 문서 링크
- `manual/overview.md`: 완료된 기능과 유지보수 방침 요약
- `manual/architecture.md`: 프론트엔드/Worker/Actions 구조
- `manual/environment.md`: 환경 변수·시크릿 목록
- `manual/decisions.md`: 주요 의사결정 기록
- `manual/todos.md`: 유지보수 체크리스트

## 블로그 링크
- [https://kcm5221.github.io](https://kcm5221.github.io)
