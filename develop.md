# 📋 PDF Converter 개발 계획

> 클라이언트 사이드 기반 무료 PDF 변환 플랫폼 개발 로드맵

## 🎯 프로젝트 목표

Polaris Office Tools와 유사한 다양한 PDF 변환 기능을 **100% 클라이언트 사이드**에서 처리하는 정적 웹 애플리케이션 구축

- **서버리스**: Cloudflare Pages로 정적 배포
- **보안**: 파일이 서버로 전송되지 않음
- **무료**: 오픈소스 라이브러리만 사용

---

## 🏗️ 아키텍처 설계

### 1. 메인 페이지 구조 (Landing Page)

```
/
├── Hero Section
│   ├── 타이틀: "무료 PDF 변환 도구"
│   ├── 부제: "브라우저에서 안전하게 변환"
│   └── 빠른 변환 드롭존 (드래그앤드롭)
│
├── Feature Grid (변환 기능 카드들)
│   ├── PDF → Image (JPG/PNG)
│   ├── PDF → Word
│   ├── PDF → Excel
│   ├── PDF → PowerPoint
│   ├── PDF → Text
│   ├── Image → PDF
│   ├── Word → PDF
│   ├── Excel → PDF
│   ├── Merge PDF
│   ├── Split PDF
│   ├── Compress PDF
│   └── Rotate PDF
│
├── Features Section
│   ├── 100% 클라이언트 사이드
│   ├── 개인정보 보호
│   └── 무료 무제한 사용
│
└── Footer
    ├── 이용약관
    └── 개인정보처리방침
```

### 2. 라우팅 구조

```
/                           → 메인 페이지 (Feature Grid)
/pdf-to-jpg                 → PDF to JPG 변환
/pdf-to-png                 → PDF to PNG 변환
/pdf-to-word                → PDF to Word 변환
/pdf-to-excel               → PDF to Excel 변환
/pdf-to-ppt                 → PDF to PowerPoint 변환
/pdf-to-text                → PDF to Text 변환
/image-to-pdf               → Image to PDF 변환
/word-to-pdf                → Word to PDF 변환
/excel-to-pdf               → Excel to PDF 변환
/merge-pdf                  → PDF 병합
/split-pdf                  → PDF 분할
/compress-pdf               → PDF 압축
/rotate-pdf                 → PDF 회전
```

**네비게이션 방식:**
- React Router DOM을 사용한 클라이언트 사이드 라우팅
- 각 카드 클릭 시 해당 변환 페이지로 이동
- 공통 헤더에 "홈으로" 버튼 배치

---

## 🔧 기능별 구현 계획

### ✅ 현재 구현된 기능

#### 1. PDF to JPG ⭐
- **라이브러리**: `pdfjs-dist`
- **구현 상태**: 완료
- **기능**:
  - PDF 각 페이지를 JPG 이미지로 변환
  - 품질 조정 (50~100%)
  - 해상도 조정 (72~216 DPI)
  - 페이지 범위 선택
  - ZIP 파일로 다운로드

---

### 📦 구현 예정 기능

#### 2. PDF to PNG
- **라이브러리**: `pdfjs-dist` (기존 활용)
- **구현 난이도**: ⭐ (쉬움)
- **구현 방법**:
  - 기존 `pdfConverter.ts`를 확장
  - `canvas.toBlob()` 포맷을 `image/png`로 변경
  - 투명 배경 옵션 추가
- **예상 소요**: 2시간

#### 3. PDF to Text
- **라이브러리**: `pdfjs-dist`
- **구현 난이도**: ⭐⭐ (보통)
- **구현 방법**:
  ```typescript
  const page = await pdf.getPage(pageNum);
  const textContent = await page.getTextContent();
  const text = textContent.items
    .map(item => item.str)
    .join(' ');
  ```
- **기능**:
  - 페이지별 텍스트 추출
  - TXT 파일로 다운로드
  - 복사 가능한 텍스트 프리뷰
- **예상 소요**: 4시간

#### 4. Image to PDF
- **라이브러리**: `jspdf`
- **구현 난이도**: ⭐⭐ (보통)
- **구현 방법**:
  ```typescript
  import { jsPDF } from 'jspdf';
  
  const doc = new jsPDF();
  images.forEach((img, index) => {
    if (index > 0) doc.addPage();
    doc.addImage(img, 'JPEG', 0, 0, width, height);
  });
  doc.save('output.pdf');
  ```
- **지원 포맷**: JPG, PNG, GIF, WebP
- **기능**:
  - 다중 이미지를 하나의 PDF로 병합
  - 페이지 크기 자동 조정 (A4, Letter 등)
  - 이미지 순서 조정
- **예상 소요**: 6시간

#### 5. Merge PDF
- **라이브러리**: `pdf-lib`
- **구현 난이도**: ⭐⭐⭐ (어려움)
- **구현 방법**:
  ```typescript
  import { PDFDocument } from 'pdf-lib';
  
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    const pdf = await PDFDocument.load(await file.arrayBuffer());
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(page => mergedPdf.addPage(page));
  }
  const bytes = await mergedPdf.save();
  ```
- **기능**:
  - 여러 PDF 파일 병합
  - 드래그앤드롭으로 순서 조정
  - 미리보기 썸네일
- **예상 소요**: 8시간

#### 6. Split PDF
- **라이브러리**: `pdf-lib`
- **구현 난이도**: ⭐⭐⭐ (어려움)
- **구현 방법**:
  ```typescript
  const pdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();
  const [page] = await newPdf.copyPages(pdf, [pageIndex]);
  newPdf.addPage(page);
  ```
- **기능**:
  - 특정 페이지 추출
  - 페이지 범위별 분할
  - 각 페이지를 개별 PDF로 분할
  - ZIP으로 다운로드
- **예상 소요**: 8시간

#### 7. Compress PDF
- **라이브러리**: `pdf-lib` + Canvas 압축
- **구현 난이도**: ⭐⭐⭐⭐ (매우 어려움)
- **구현 방법**:
  1. PDF 페이지를 이미지로 렌더링 (`pdfjs-dist`)
  2. 이미지 품질 낮춰서 압축
  3. 압축된 이미지로 새 PDF 생성 (`pdf-lib`)
- **제약사항**: 텍스트 레이어 손실 가능
- **예상 소요**: 12시간

#### 8. Rotate PDF
- **라이브러리**: `pdf-lib`
- **구현 난이도**: ⭐⭐ (보통)
- **구현 방법**:
  ```typescript
  const page = pdfDoc.getPage(0);
  page.setRotation(degrees(90));
  ```
- **기능**:
  - 90도 단위 회전
  - 모든 페이지 또는 선택된 페이지만 회전
- **예상 소요**: 4시간

#### 9. Word/Excel/PPT to PDF
- **구현 난이도**: ⭐⭐⭐⭐⭐ (매우 어려움)
- **제약사항**:
  - **클라이언트 사이드 구현 불가능**
  - Office 포맷 파싱이 매우 복잡
  - 서버 API 또는 외부 서비스 필요
- **대안**:
  1. **LibreOffice Online API** (유료/서버 필요)
  2. **CloudConvert API** (유료)
  3. **Microsoft Graph API** (유료/인증 필요)
  4. **포기하고 다른 기능에 집중**

#### 10. PDF to Word/Excel/PPT
- **구현 난이도**: ⭐⭐⭐⭐⭐ (매우 어려움)
- **제약사항**:
  - 레이아웃 재현이 거의 불가능
  - PDF는 "고정된 레이아웃"이므로 편집 가능한 문서로 역변환 어려움
- **부분적 대안**:
  - **PDF to Text**: 텍스트만 추출 가능
  - **PDF to HTML**: `pdfjs-dist`로 부분 가능하지만 품질 낮음

---

## 📚 필요한 라이브러리

```json
{
  "dependencies": {
    // 기존
    "pdfjs-dist": "^5.4.394",      // PDF 렌더링, 텍스트 추출
    "jszip": "^3.10.1",             // ZIP 생성
    "file-saver": "^2.0.5",         // 파일 다운로드
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    
    // 추가 필요
    "react-router-dom": "^7.1.0",   // 라우팅
    "pdf-lib": "^1.17.1",           // PDF 생성/수정/병합
    "jspdf": "^2.5.2",              // Image to PDF
    "react-dropzone": "^14.3.5",    // 드래그앤드롭 개선
    "react-icons": "^5.4.0"         // 아이콘
  }
}
```

---

## 🎨 UI/UX 개선 계획

### 메인 페이지 (Landing)
```
┌─────────────────────────────────────────┐
│  🔄 PDF Converter                [홈]   │
├─────────────────────────────────────────┤
│                                         │
│         📄 무료 PDF 변환 도구            │
│    브라우저에서 안전하게 변환하세요       │
│                                         │
│  [파일을 여기에 드래그하거나 클릭]       │
│                                         │
├─────────────────────────────────────────┤
│  [PDF→JPG] [PDF→PNG] [PDF→Text]        │
│  [Image→PDF] [Merge] [Split]           │
│  [Compress] [Rotate]                    │
├─────────────────────────────────────────┤
│  ✅ 100% 클라이언트 사이드              │
│  🔒 개인정보 보호                       │
│  💰 무료 무제한                         │
└─────────────────────────────────────────┘
```

### 변환 페이지 공통 레이아웃
```
┌─────────────────────────────────────────┐
│  🔄 PDF to JPG            [← 홈으로]    │
├─────────────────────────────────────────┤
│  [ 광고 영역 - 상단 ]                   │
├─────────────────────────────────────────┤
│  [파일 업로드 영역]                      │
│  [변환 옵션]                            │
│  [변환 버튼]                            │
│  [진행률]                               │
├─────────────────────────────────────────┤
│  [ 광고 영역 - 하단 ]                   │
└─────────────────────────────────────────┘
```

---

## 📈 우선순위 로드맵

### Phase 1: 기본 인프라 (1주)
- [x] PDF to JPG (완료)
- [ ] React Router 설정
- [ ] 메인 페이지 디자인
- [ ] 공통 컴포넌트 분리

### Phase 2: 이미지 변환 (1주)
- [ ] PDF to PNG
- [ ] Image to PDF (JPG, PNG)
- [ ] PDF to Text

### Phase 3: PDF 조작 (2주)
- [ ] Merge PDF
- [ ] Split PDF
- [ ] Rotate PDF

### Phase 4: 고급 기능 (2주)
- [ ] Compress PDF
- [ ] 다중 이미지 포맷 지원 (WebP, GIF)
- [ ] 썸네일 미리보기

### Phase 5: 최적화 & 배포 (1주)
- [ ] 성능 최적화 (Web Worker 활용)
- [ ] PWA 지원 (오프라인 사용)
- [ ] SEO 최적화
- [ ] 다국어 지원 (한/영)

---

## 🚀 기술 스택 요약

| 영역 | 기술 |
|------|------|
| 프레임워크 | React 19 + TypeScript |
| 빌드 도구 | Vite |
| 라우팅 | React Router DOM |
| PDF 렌더링 | pdfjs-dist |
| PDF 생성/수정 | pdf-lib, jspdf |
| 파일 처리 | jszip, file-saver |
| 배포 | Cloudflare Pages |
| 스타일링 | CSS Modules |
| 상태 관리 | React Hooks (useState, useCallback) |

---

## ⚠️ 제약사항 및 대안

### 클라이언트 사이드에서 불가능한 기능

| 기능 | 이유 | 대안 |
|------|------|------|
| PDF → Word/Excel/PPT | Office 포맷 생성 복잡도 높음 | 서버 API 필요 or 제외 |
| Word/Excel/PPT → PDF | 포맷 파싱 + 레이아웃 엔진 필요 | 서버 API 필요 or 제외 |
| OCR | 이미지 기반 PDF 텍스트 인식 | Tesseract.js (무겁고 느림) |
| 전자서명 | 암호화 인증서 필요 | 제외 |

### 대용량 파일 처리
- **제약**: 브라우저 메모리 제한 (~2GB)
- **대안**: 
  - 청크 단위 처리
  - Web Worker 활용
  - 파일 크기 경고 표시

---

## 💡 수익화 전략

1. **Google AdSense**
   - 상단/하단 광고 배치
   - 각 변환 페이지마다 광고 노출

2. **후원/기부**
   - Buy Me a Coffee
   - GitHub Sponsors

3. **프리미엄 기능 (선택)**
   - 대용량 파일 처리 (서버 API)
   - 배치 변환
   - 클라우드 저장 연동

---

## 📝 다음 단계

1. **React Router 설치 및 설정**
   ```bash
   npm install react-router-dom
   ```

2. **메인 페이지 컴포넌트 생성**
   - `src/pages/Home.tsx`
   - Feature Grid 카드 컴포넌트

3. **공통 레이아웃 컴포넌트**
   - `src/components/Layout.tsx`
   - `src/components/Header.tsx`
   - `src/components/Footer.tsx`

4. **각 변환 페이지 생성**
   - `src/pages/PdfToJpg.tsx` (기존 App.tsx 리팩토링)
   - `src/pages/PdfToPng.tsx`
   - `src/pages/PdfToText.tsx`
   - ...

5. **유틸리티 분리**
   - `src/utils/pdfConverter.ts` → 확장
   - `src/utils/imageConverter.ts`
   - `src/utils/pdfMerger.ts`
   - `src/utils/pdfSplitter.ts`

---

## 🔗 참고 자료

- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)
- [pdf-lib Documentation](https://pdf-lib.js.org/)
- [jsPDF Documentation](https://artskydj.github.io/jsPDF/docs/)
- [Polaris Office Tools](https://www.polarisofficetools.com/) - 벤치마크
- [iLovePDF](https://www.ilovepdf.com/) - 벤치마크
- [Smallpdf](https://smallpdf.com/) - 벤치마크

---

**최종 업데이트**: 2025-11-25

