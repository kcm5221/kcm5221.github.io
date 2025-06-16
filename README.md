# kcm5221.github.io

내 블로그 게시물과 프로젝트 노트를 모아놓은 정적 사이트입니다.

## 폴더 구조
- **components/**: 재사용 가능한 HTML 스니펫(헤더, 푸터, 내비게이션, 사이드바)  
- **css/**: 공유 스타일시트  
- **html/**: 주제별로 정리된 페이지 콘텐츠  
- **image/**: 사이트 이미지  
- **js/**: 클라이언트 사이드 스크립트  
- **json/**: JavaScript에서 사용하는 데이터  
- **OtherProject/**: 외부 프로젝트 파일  

공통 유틸리티 헬퍼는 `js/utils.js`에 모아두었습니다.

모든 페이지는 `js/includehtml.js`를 통해 공통 컴포넌트를 로드하며, 이 로더는 스크립트 위치를 기준으로 경로를 계산해 저장소 루트에서 배포되거나 로컬 파일로 열어도 올바르게 작동합니다. 사이드바의 목차는 현재 뷰포트 안에 있는 섹션을 강조하고, 링크 색상 및 기타 테마 스타일은 CSS 변수를 사용해 다크 모드에서도 일관되게 적용됩니다.

## 로컬에서 미리보기

다음과 같은 정적 파일 서버를 사용해 로컬에서 사이트를 실행할 수 있습니다.  

[`live-server`](https://www.npmjs.com/package/live-server) 예시:
```bash
npm install -g live-server
live-server
또는 Python 내장 서버:

bash
복사
편집
python3 -m http.server
그리고 브라우저에서 http://localhost:8080을 열어 확인하세요.

구성(Configuration)
사이트 동작은 json/config.json 파일에서 제어됩니다.

json
복사
편집
{
  "password": "Open",
  "disableContextMenu": false
}
password: 일부 페이지 접근을 위한 비밀번호

disableContextMenu: true로 설정하면 우클릭 및 이미지 드래그가 비활성화됩니다

스크립트는 항상 자신의 위치를 기준으로 경로를 계산하므로, 하위 폴더나 로컬 파일 환경에서도 검색 페이지와 구성 파일을 올바르게 불러옵니다. 공통 로직은 js/utils.js에 모아두었습니다.

검색 데이터 업데이트
검색 기능에서 사용하는 인덱스는 json/SearchData.json에 정의되어 있습니다. 새로운 페이지를 추가할 때마다 해당 파일을 업데이트하세요.

기여하기
html/ 폴더에 새 페이지를 추가하고, 이미지나 스크립트는 각 폴더 경로에서 참조하세요.

SearchData.json에 페이지 제목, URL, 간단한 요약을 추가하세요.

로컬 서버로 변경 사항을 확인한 뒤 Pull Request를 열어주세요.
