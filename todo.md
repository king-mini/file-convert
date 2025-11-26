# 🔄 Lokit 브랜드 마이그레이션 TODO

## 📦 1. 새 레포지토리 생성

- [ ] GitHub 새 레포 생성: `lokit`
- [ ] 기존 `pdf-converter` 코드 복사
- [ ] Git 초기화 및 첫 커밋

---

## 🎨 2. 브랜드명 변경 (코드)

### package.json
```json
- "name": "pdf-converter",
+ "name": "lokit",
```

### index.html
```html
- <title>Vite + React + TS</title>
+ <title>Lokit - File Tools</title>

- <link rel="icon" type="image/svg+xml" href="/vite.svg" />
+ <link rel="icon" type="image/svg+xml" href="/lokit-icon.svg" />
```

### src/components/Header.tsx (라인 12)
```tsx
- 🔄 PDF Converter
+ 🔄 Lokit
```

### src/components/Layout.tsx (라인 13)
```tsx
- © 2025 PDF Converter · 모든 변환은 브라우저에서 처리됩니다
+ © 2025 Lokit · 모든 변환은 브라우저에서 처리됩니다
```

---

## 📄 3. 문서 업데이트

### README.md
- [ ] 제목: `Lokit - File Tools`
- [ ] 설명: "빠르고 안전한 파일 도구"
- [ ] URL: `https://lokit.tools`
- [ ] 로고/이미지 교체

### develop.md
- [ ] 프로젝트명 변경
- [ ] 브랜드 컨셉 업데이트

### expansion-plan.md
- [ ] 브랜드명 변경
- [ ] 도메인 정보 업데이트: `lokit.tools`

---

## 🛠️ 4. 빌드/배포 스크립트

### build.bat
```batch
- echo Building PDF Converter...
+ echo Building Lokit...
```

### deploy.bat
```batch
- echo Deploying PDF Converter...
+ echo Deploying Lokit...
```

---

## ☁️ 5. Cloudflare Pages 설정

- [ ] Cloudflare Pages 새 프로젝트 생성
  - 프로젝트명: `lokit`
  - GitHub 연결: 새 `lokit` 레포
  
- [ ] 빌드 설정
  ```
  Build command: npm run build
  Build output directory: dist
  ```

- [ ] 커스텀 도메인 연결
  - [ ] `lokit.tools` DNS 설정
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

- [ ] 로컬 빌드 확인: `npm run build`
- [ ] 로컬 프리뷰: `npm run preview`
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

- [ ] GitHub에 푸시
- [ ] Cloudflare Pages 자동 배포 확인
- [ ] `lokit.tools` 도메인 접속 테스트
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

- 기존 배포 URL (`pdf-converter-73u.pages.dev`)은 유지해도 되지만, 새 브랜드로 시작하는 게 깔끔함
- `lokit.tools` 도메인 구매 완료 후 DNS 설정 필요
- Cloudflare Pages는 무료이므로 새 프로젝트 만들어도 비용 없음

