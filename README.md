# kcm5221.github.io

내 블로그 게시물과 프로젝트 노트를 모아둔 정적 사이트입니다.

## 폴더 구조
- **components/**: 재사용 가능한 헤더, 푸터, 사이드바 등 HTML 조각
- **css/**: 사이트 공통 스타일시트
- **html/**: 주제별 페이지 콘텐츠
- **image/**: 이미지 리소스
- **js/**: 클라이언트 사이드 스크립트
- **json/**: 설정 및 검색 데이터
- **OtherProject/**: 외부 프로젝트 결과물

공통 유틸리티 함수는 `js/utils.js`에 있으며, 모든 페이지는 `js/includehtml.js`를 통해 공통 컴포넌트를 동적으로 로드합니다. 스크립트는 자신의 위치를 기준으로 경로를 계산하므로 루트에서 호스팅하거나 로컬 파일로 열어도 정상 동작합니다.

## 로컬에서 미리보기
정적 파일 서버를 이용해 다음과 같이 확인할 수 있습니다.

```bash
npm install -g live-server
live-server
```
또는 Python 내장 서버를 사용할 수도 있습니다.
```bash
python3 -m http.server
```
브라우저에서 <http://localhost:8080>을 열면 됩니다.

## 구성 파일
사이트 동작은 `json/config.json`에서 제어합니다.
```json
{
  "password": "Open",
  "disableContextMenu": true
}
```
- `password`: 일부 페이지 접근을 위한 비밀번호
- `disableContextMenu`: `true`로 설정 시 우클릭 및 이미지 드래그가 비활성화됩니다.

스크립트는 항상 자신의 위치를 기준으로 경로를 계산하므로 하위 폴더나 로컬 파일 환경에서도 검색 페이지와 구성 파일을 올바르게 불러옵니다.

## 검색 데이터 업데이트
검색 기능에서 사용하는 인덱스는 `json/SearchData.json`에 정의되어 있습니다. 새 페이지를 추가할 때마다 해당 파일에 제목, URL, 간단한 요약을 등록하세요.
