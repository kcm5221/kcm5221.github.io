# Gitstagram Overview

Gitstagram은 GitHub Pages + Cloudflare Workers + GitHub App을 이용한 **인스타그램 UI 기반 개발 블로그 플랫폼**입니다. 정적 페이지를 유지하면서도 OAuth 인증과 자동 커밋 파이프라인을 갖추는 것이 목표입니다.

---

## 📌 현재 상태
- 기능 구현 및 아키텍처 구성을 완료하여 **신규 기능/구조 변경 없이 유지보수 모드**로 전환했습니다.
- 변경이 필요한 경우는 버그 수정, 문서 보완, 보안·환경 변수 업데이트에 한정합니다.

## 📌 완료된 작업
- Hash Router 기반 페이지 전환: `#/`, `#/search`, `#/profile`, `#/write`, `#/post/:slug`
- Home/Saved 탭 UI와 컬렉션별 그룹 렌더링
- 게시물 상세 페이지에서 컨텍스트(검색 결과·컬렉션) 기반 이전/다음 이동
- 검색 페이지: 제목·요약·태그·컬렉션 텍스트 필터링 + 결과 개수 표기
- GitHub OAuth(PKCE) + Worker JWT 발급, 해시(`auth=`) 토큰 수집 로직
- 글쓰기 폼: 슬러그 자동 생성, 필수 입력 검증, Worker `/content/commit` 연동
- Feed(JSON) 로딩: `current.json` → `feed/page-1@<sha>.json` 순으로 초기 로드

---

## 📌 유지보수 방침
- 신규 기능 개발은 중단하고, 운영 중 발견되는 **버그 수정**과 **보안·성능 리스크 완화**에 집중합니다.
- Worker/Actions 설정 변경 시 기존 토큰·시크릿 체계를 그대로 사용하고, 변경 사항은 `manual/environment.md`에 즉시 반영합니다.
- 데이터 피드 구조(`data/*`)를 변경하지 않고, 필요한 경우에도 후방 호환성을 우선합니다.
- UI 변경은 접근성·오류 개선 등 최소 범위에서만 수행합니다.

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
