# Gitstagram Overview

Gitstagram은 GitHub Pages + Cloudflare Workers + GitHub App을 이용한  
**인스타그램 UI 기반 개발 블로그 플랫폼**입니다.

---

## 📌 현재까지 완료된 작업

- UI 기본 구조: Home / Search / Profile / Write
- Sidebar + Bottom Navigation (모바일/데스크탑)
- Hash Router 기반 페이지 전환 (`#/`, `#/search`, `#/profile`, `#/write`)
- GitHub OAuth (PKCE 방식)
- Cloudflare Worker 인증 서버 구축
- JWT 발급 및 검증
- Markdown 포스트 GitHub Private Repo에 자동 작성(커밋)
- GitHub Actions로 Feed(JSON) 생성
- Home 화면에서 Posts 렌더링
- 프로필 페이지 작성 완료
- 글 작성 폼 완성 + Worker 연동
- 토큰 저장 및 자동 Logout UX 설계 완료

---

## 📌 앞으로 만들 구조

1. Saved 탭 → **컬렉션 기반 정리 뷰**
2. 게시물 상세 페이지 (`#/post/:slug`)
3. 상세 페이지에서
   - 컬렉션 편집 기능
   - 태그 목록 + 이전/다음 포스트 이동
4. Search 검색 → 통합 검색 UI + API
5. 글 작성 페이지 확장
   - Markdown Preview 탭
   - 커버 이미지 업로드
6. Admin 기능 (draft 관리, 글 수정)
7. 퍼포먼스 개선 (JSON feed 캐싱)

---

## 📌 주요 목표

- **0원 인프라 유지**
- GitHub에 자동 커밋하는 진짜 “개발자 친화적” 블로그
- 인스타 UI처럼 직관적이고 시각적인 경험
- 해시 라우터 기반으로 GitHub Pages에서 문제 없이 동작
- Cloudflare Worker 인증 기반 보안 구조

---

## 📌 GPT가 참고해야 할 사항

- Worker Auth 구조는 꼭 api-spec.md와 security.md를 참고해서 개발해야 함
- Hash router 구조는 architecture.md 참고
- Feed JSON 구조는 frontend ↔ actions 연동 핵심
