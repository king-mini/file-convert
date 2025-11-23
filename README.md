# 📄 PDF to JPG Converter

브라우저에서 안전하게 PDF를 JPG 이미지로 변환하는 웹 애플리케이션

## ✨ 특징

- **100% 클라이언트 사이드 변환**: 서버에 파일 업로드 없이 브라우저에서 직접 변환
- **개인정보 보호**: 모든 파일은 사용자의 브라우저에서만 처리됩니다
- **커스터마이징 가능**: JPG 품질, 해상도, 페이지 범위 설정
- **진행률 표시**: 실시간 변환 진행 상황 확인
- **ZIP 다운로드**: 여러 페이지를 하나의 ZIP 파일로 다운로드

## 🛠️ 기술 스택

- **React 19** + **TypeScript**
- **Vite** - 빌드 도구
- **PDF.js** - PDF 렌더링
- **JSZip** - ZIP 파일 생성
- **FileSaver.js** - 파일 다운로드

## 🚀 로컬 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 📦 Cloudflare Pages 배포

### 1. Cloudflare Pages 프로젝트 생성

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)에 로그인
2. **Pages** 메뉴 선택
3. **Create a project** 클릭
4. GitHub/GitLab 저장소 연결

### 2. 빌드 설정

- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 18 이상

### 3. 배포

Git에 푸시하면 자동으로 배포됩니다.

```bash
git add .
git commit -m "Deploy PDF converter"
git push
```

## 💰 AdSense 설정

### 1. AdSense 신청

1. [Google AdSense](https://www.google.com/adsense/)에서 신청
2. 사이트 소유권 확인
3. 심사 대기 (보통 1-2주)

### 2. ads.txt 설정

승인 후 `public/ads.txt`에 Publisher ID 추가:

```
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

### 3. 광고 코드 삽입

`src/App.tsx`의 광고 영역 placeholder를 AdSense 코드로 교체:

```tsx
<div className="ad-placeholder">
  {/* AdSense 코드 */}
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"></script>
  <ins className="adsbygoogle" ...></ins>
</div>
```

## 📝 사용 방법

1. PDF 파일을 드래그하거나 선택
2. 변환 옵션 설정 (품질, 해상도, 페이지 범위)
3. "변환 시작" 버튼 클릭
4. 완료 후 ZIP 파일 자동 다운로드

## 🔒 개인정보 보호

- 모든 변환은 **브라우저**에서만 이루어집니다
- 파일이 **서버로 전송되지 않습니다**
- 사용자 데이터가 **저장되지 않습니다**

## ⚠️ 제한사항

- **대용량 PDF** (200MB 이상): 브라우저 메모리 제한으로 느려질 수 있음
- **많은 페이지** (500+ 페이지): 페이지 범위를 나누어 변환 권장
- **복잡한 PDF**: 일부 특수 폰트나 효과는 제대로 렌더링되지 않을 수 있음

## 📄 라이선스

MIT

## 🤝 기여

이슈나 PR은 언제든지 환영합니다!
