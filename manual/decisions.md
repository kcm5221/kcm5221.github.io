# Decision Log

---

## 1) 왜 OCI 포기?

- 무료 플랜에서 Functions 실행 불가
- 네트워크/Vault/모니터링 비용 구조가 불안정
- Cloudflare Workers는 **완전 무료 + 글로벌 배포 + 간단함**

---

## 2) 왜 Hash Router?

GitHub Pages는 SPA History API에서 404를 만들기 때문에  
`#/route` 형태가 최적임.

---

## 3) 왜 Cloudflare Worker Auth 선택?

- OAuth + GitHub App 조합이 무료로 가능
- GitHub Actions와 자연스럽게 연결됨
- 보안 위험(액세스 토큰 노출) 최소화

---

## 4) 왜 JSON Feed + GitHub Actions?

- 정적 페이지에서 API 서버 없이 콘텐츠 제공 가능
- 비용 0원
