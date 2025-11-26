# Gitstagram Overview

Gitstagram은 GitHub Pages + Cloudflare Workers + GitHub App을 이용한 **인스타그램 UI 기반 개발 블로그 플랫폼**입니다. 정적 페이지
를 유지하면서도 OAuth 인증과 자동 커밋 파이프라인을 갖추는 것이 목표입니다.

---

## 📌 현재까지 완료된 작업
- Hash Router 기반 페이지 전환: `#/`, `#/search`, `#/profile`, `#/write`, `#/post/:slug`
- Home/Saved 탭 UI와 컬렉션별 그룹 렌더링
- 게시물 상세 페이지에서 컨텍스트(검색 결과·컬렉션) 기반 이전/다음 이동
- 검색 페이지: 제목·요약·태그·컬렉션 텍스트 필터링 + 결과 개수 표기
- GitHub OAuth(PKCE) + Worker JWT 발급, 해시(`auth=`) 토큰 수집 로직
- 글쓰기 폼: 슬러그 자동 생성, 필수 입력 검증, Worker `/content/commit` 연동
- Feed(JSON) 로딩: `current.json` → `feed/page-1@<sha>.json` 순으로 초기 로드

---

## 📌 앞으로 만들 구조
1. Saved 탭은 현행 뷰를 유지하고, 컬렉션 관리 흐름을 글쓰기 플로우에 통합
2. 글쓰기에서 컬렉션을 직접 입력하는 대신 **기존 컬렉션 목록을 선택**하고, 동일 위치에서 새 컬렉션을 추가할 수 있는 UI 제공
3. 글쓰기 개선: Markdown 미리보기, 커버 이미지 업로드, 자동 요약 필드
4. Admin 기능: 게시물 수정/드래프트 관리, 인증 만료 UX 향상
5. 퍼포먼스 개선: JSON feed 캐싱/프리페치, 무한 스크롤

---

## 📌 주요 목표
- **0원 인프라**를 유지하면서도 실제 블로그 운영에 필요한 기능 제공
- GitHub에 자동 커밋되는 개발자 친화적 작성 플로우
- 해시 라우터 기반으로 GitHub Pages에서 문제 없이 동작하는 SPA
- Cloudflare Worker 인증 기반 최소 권한 보안 구조

---

## 📌 참고
- Worker Auth 구조: `manual/worker.js`, `manual/environment.md`
- 라우터 및 UI 흐름: `manual/architecture.md`
- Feed JSON 구조: `data/` 폴더 예시 참고
