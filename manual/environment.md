# Environment Variables

---

## 운영 메모
- 신규 기능 개발을 중단했으므로 아래 목록 외에 새로운 환경 변수는 추가하지 않습니다.
- 값 변경 또는 교체가 필요할 경우, 레포지토리 시크릿/Worker 환경을 동시에 업데이트한 뒤 이 문서에 반영합니다.

## Cloudflare Worker

| Key | 설명 |
|------|------|
| CORS_ALLOW_ORIGIN | 예: `https://kcm5221.github.io` |
| FRONTEND_BASE_URL | 프론트엔드 배포 주소(우선순위) |
| ALLOWED_GITHUB_LOGIN | 허용 GitHub 로그인 (예: `kimcm5221`) |
| GITHUB_OAUTH_CLIENT_ID | GitHub OAuth App Client ID |
| GITHUB_OAUTH_CLIENT_SECRET | GitHub OAuth App Secret |
| GITHUB_APP_ID | GitHub App ID |
| GITHUB_APP_PRIVATE_KEY | GitHub App private key (PKCS8) |
| GITHUB_APP_INSTALLATION_ID | Installation ID |
| PRIVATE_REPO | 콘텐츠 저장소 `owner/repo-private` |
| JWT_SECRET | Worker JWT/쿠키 서명 키 |

---

## GitHub Actions (Secrets)
- GH_APP_PRIVATE_KEY
- GH_APP_CLIENT_ID
- GH_APP_CLIENT_SECRET
- GH_PAGES_TOKEN
