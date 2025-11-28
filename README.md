# 🔄 Lokit - File Tools

빠르고 안전한 파일 도구 - 브라우저에서 바로 변환하세요

**도메인:** [lokit.tools](https://lokit.tools)  
**개발자:** king-mini

## ✨ 특징

- **100% 클라이언트 사이드 변환**: 서버에 파일 업로드 없이 브라우저에서 직접 변환
- **개인정보 보호**: 모든 파일은 사용자의 브라우저에서만 처리됩니다
- **다양한 변환 도구**: PDF ↔ 이미지, PDF 편집 등
- **진행률 표시**: 실시간 변환 진행 상황 확인
- **무료 & 제한 없음**: 파일 크기나 개수 제한 없이 사용

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
4. GitHub 저장소 연결 (king-mini/file-convert)

### 2. 빌드 설정

- **Project name**: file-convert
- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 18 이상

### 3. 커스텀 도메인 설정

- Cloudflare에서 **lokit.tools** 도메인 추가
- DNS 설정 및 SSL 인증서 자동 생성 확인

### 4. 배포

Git에 푸시하면 자동으로 배포됩니다.

```bash
git add .
git commit -m "Deploy Lokit"
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

1. 원하는 변환 도구 선택 (PDF to JPG, Image to PDF 등)
2. 파일을 드래그하거나 선택
3. 변환 옵션 설정
4. "변환 시작" 버튼 클릭
5. 완료 후 파일 자동 다운로드

## 🔒 개인정보 보호

- 모든 변환은 **브라우저**에서만 이루어집니다
- 파일이 **서버로 전송되지 않습니다**
- 사용자 데이터가 **저장되지 않습니다**

## ⚠️ 제한사항

- **대용량 PDF** (200MB 이상): 브라우저 메모리 제한으로 느려질 수 있음
- **많은 페이지** (500+ 페이지): 페이지 범위를 나누어 변환 권장
- **복잡한 PDF**: 일부 특수 폰트나 효과는 제대로 렌더링되지 않을 수 있음

## 📚 문서

- [doc/PROJECT.md](./doc/PROJECT.md) - 프로젝트 구조 및 설계
- [doc/CHANGELOG.md](./doc/CHANGELOG.md) - 완료된 작업 내역
- [doc/ROADMAP.md](./doc/ROADMAP.md) - 앞으로의 개발 계획

## 📄 라이선스

MIT

## 🤝 기여

이슈나 PR은 언제든지 환영합니다!
