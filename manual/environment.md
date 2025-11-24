# Environment Variables

---

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
