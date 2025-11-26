# 🔄 Lokit 브랜드 마이그레이션 TODO

## 📦 1. 새 레포지토리 생성

- [ ] GitHub 새 레포 생성: `lokit`
- [ ] 기존 `pdf-converter` 코드 복사
- [ ] Git 초기화 및 첫 커밋

---

## 🎨 2. 브랜드명 변경 (코드)

### package.json ✅
```json
- "name": "pdf-converter",
+ "name": "lokit",
+ "author": "king-mini",
```

### index.html ✅
```html
- <title>Vite + React + TS</title>
+ <title>Lokit - File Tools</title>

- <link rel="icon" type="image/svg+xml" href="/vite.svg" />
+ <link rel="icon" type="image/svg+xml" href="/lokit-icon.svg" />

+ 메타 태그 추가 (OG, description 등)
```

### src/components/Header.tsx (라인 12) ✅
```tsx
- 🔄 PDF Converter
+ 🔄 Lokit
```

### src/components/Layout.tsx (라인 13) ✅
```tsx
- © 2025 PDF Converter · 모든 변환은 브라우저에서 처리됩니다
+ © 2025 Lokit · 모든 변환은 브라우저에서 처리됩니다
```

---

## 📄 3. 문서 업데이트

### README.md ✅
- [x] 제목: `Lokit - File Tools`
- [x] 설명: "빠르고 안전한 파일 도구"
- [x] URL: `https://lokit.tools`
- [x] 개발자: `king-mini`
- [x] GitHub 저장소: `king-mini/file-convert`
- [ ] 로고/이미지 교체 (나중에)

### develop.md ✅
- [x] 프로젝트명 변경
- [x] 개발자 정보 추가
- [x] 브랜드 컨셉 업데이트

### expansion-plan.md ✅
- [x] 브랜드명 변경
- [x] 도메인 정보 업데이트: `lokit.tools`
- [x] GitHub 저장소 정보 추가

### DEPLOYMENT_GUIDE.md ✅
- [x] 프로젝트명 변경
- [x] GitHub URL 업데이트
- [x] 개발자 정보 추가

---

## 🛠️ 4. 빌드/배포 스크립트

### build.bat ✅
```batch
- echo Building PDF Converter...
+ echo Building Lokit...
```

### deploy.bat ✅
```batch
- echo Deploying PDF Converter...
+ echo Deploying Lokit...

- --project-name=pdf-converter
+ --project-name=file-convert
```

---

## ☁️ 5. Cloudflare Pages 설정

- [x] Cloudflare Pages 새 프로젝트 생성 ✅
  - 프로젝트명: `file-convert`
  - wrangler CLI로 배포 완료
  - 배포 URL: https://file-convert-445.pages.dev
  
- [x] 빌드 설정 ✅
  ```
  Project name: file-convert
  Build command: npm run build (로컬)
  Build output directory: dist
  ```

- [ ] 커스텀 도메인 연결 (선택사항)
  - [ ] `lokit.tools` 도메인 구매
  - [ ] Cloudflare에서 도메인 추가
  - [ ] SSL 인증서 자동 생성 확인

---

## 🎯 6. 브랜딩 추가 작업

### 아이콘/로고 (선택사항)
- [ ] Favicon 생성 (16x16, 32x32, 192x192)
- [ ] Apple Touch Icon (180x180)
- [ ] OG Image (소셜 미디어 공유용)

### 메타 태그 추가 (index.html)
```html
<meta name="description" content="Lokit - 빠르고 안전한 PDF & 이미지 도구. 브라우저에서 바로 변환하세요." />
<meta property="og:title" content="Lokit - File Tools" />
<meta property="og:description" content="빠르고 안전한 파일 변환 도구" />
<meta property="og:url" content="https://lokit.tools" />
<meta property="og:type" content="website" />
```

---

## 🧪 7. 테스트

- [x] 로컬 빌드 확인: `npm run build` ✅
- [ ] 로컬 프리뷰: `npm run preview`
- [ ] 배포된 사이트 접속: https://file-convert-445.pages.dev
- [ ] 모든 기능 작동 확인
  - [ ] PDF to JPG
  - [ ] PDF to PNG
  - [ ] PDF to Text
  - [ ] Image to PDF
  - [ ] Merge PDF
  - [ ] Split PDF
  - [ ] Rotate PDF
  - [ ] Compress PDF

---

## 🚀 8. 배포

- [x] Cloudflare Pages 첫 배포 완료 ✅
  - URL: https://file-convert-445.pages.dev
  - 방법: wrangler CLI (`npm run deploy`)
- [ ] GitHub 저장소 생성 (선택사항 - 백업용)
- [ ] `lokit.tools` 도메인 연결 (나중에)
- [ ] 브라우저별 테스트 (Chrome, Firefox, Safari)
- [ ] 모바일 테스트

---

## 📊 9. 기타

- [ ] Google Analytics/Search Console 설정 (선택)
- [ ] AdSense 재연결 (기존 사이트에서 이전)
- [ ] 기존 `pdf-converter` 레포는 보관 또는 아카이브

---

## 🎨 브랜드 참고

**브랜드명:** Lokit  
**도메인:** lokit.tools  
**태그라인:** "빠르고 안전한 파일 도구"  
**컨셉:** 로컬 처리(브라우저)를 기본으로, 필요시 클라우드 기능 확장  
**타겟:** PDF/이미지 변환 및 편집 툴 모음  

---

## 📝 참고사항

- **프로젝트명**: `file-convert` (pdf-convert 아님!)
- **GitHub**: `king-mini/file-convert`
- **개발자**: `king-mini`
- **도메인**: `lokit.tools`
- 이전 연결 모두 제거하고 새로 시작
- Cloudflare Pages는 무료이므로 새 프로젝트 만들어도 비용 없음

---

## ✅ 완료된 작업 (2025-11-26)

### 코드 변경
- [x] package.json 브랜드명 및 author 변경
- [x] index.html 메타태그 및 title 업데이트
- [x] Header.tsx 브랜드명 변경
- [x] Layout.tsx 브랜드명 변경
- [x] build.bat 메시지 업데이트
- [x] deploy.bat 프로젝트명 변경

### 문서 업데이트
- [x] README.md 전체 업데이트
- [x] develop.md 프로젝트 정보 업데이트
- [x] expansion-plan.md 브랜드 정보 업데이트
- [x] DEPLOYMENT_GUIDE.md GitHub 정보 업데이트

### 배포 설정
- [x] wrangler.toml 생성
- [x] package.json에 deploy 스크립트 추가
- [x] Cloudflare 로그인 및 인증
- [x] 프로젝트 빌드 (npm run build)
- [x] Cloudflare Pages 첫 배포 완료

### 배포 정보
- **프로젝트명**: file-convert
- **배포 URL**: https://file-connect-445.pages.dev
- **배포 방식**: wrangler CLI (수동)

---

## 🎯 다음 단계

1. **사이트 테스트** (가장 중요!)
   - 배포된 URL 접속
   - 모든 기능 작동 확인

2. **GitHub 백업** (선택사항)
   - 저장소 생성
   - 코드 백업용

3. **커스텀 도메인** (나중에)
   - lokit.tools 구매
   - Cloudflare 연결

4. **최적화** (나중에)
   - Analytics 설정
   - AdSense 추가

