# Decision Log

---

## 1) 왜 OCI 대신 Cloudflare Workers?
- 무료 플랜에서 Functions 실행이 제한되고 네트워크/Vault/모니터링 비용이 불확실함
- Cloudflare Workers는 **완전 무료 + 글로벌 배포 + 단순 설정**으로 요구사항 충족

---

## 2) 왜 Hash Router?
- GitHub Pages는 SPA History API 경로에서 404를 반환하기 때문에 `#/route` 형태가 최적
- 정적 호스팅을 유지하면서도 여러 화면 전환을 안정적으로 처리

---

## 3) 왜 Cloudflare Worker 기반 Auth/Commit?
- OAuth + GitHub App 조합을 무료로 운영 가능
- Access Token을 서버 사이드에서만 사용해 노출 위험 최소화
- GitHub Actions와 자연스럽게 연계되어 Feed 재생성이 자동화됨

---

## 4) 왜 JSON Feed + GitHub Actions?
- 별도 API 서버 없이 정적 JSON만으로 콘텐츠 제공 가능 → 비용 0원
- 배포 후에도 `/data/current.json` + `feed/page-*.json` 구조로 간단히 확장 가능

---

## 5) 왜 기능 동결 후 유지보수 모드로 전환?
- 기본 블로그/작성/인증 플로우가 완성되어 추가 기능 대비 유지 비용이 커짐
- Cloudflare Worker·Pages 조합이 무료 한도 내에서 안정적으로 운영됨
- 향후 변경은 보안/버그 대응과 문서 보완 등 최소 범위로 한정해 운영 리스크를 낮추기 위함
