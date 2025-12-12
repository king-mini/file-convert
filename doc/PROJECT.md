# 📐 Lokit 프로젝트 구조 및 설계

**프로젝트**: Lokit (file-convert)  
**개발자**: king-mini  
**도메인**: lokit.tools  
**최종 업데이트**: 2025-01-27

---

## 🎯 프로젝트 개요

Lokit은 **100% 클라이언트 사이드**에서 동작하는 파일 변환 도구 모음입니다. 모든 파일 처리는 브라우저에서만 이루어지며, 서버로 전송되지 않아 개인정보 보호가 보장됩니다.

### 핵심 원칙

- ✅ **서버리스**: Cloudflare Pages로 정적 배포
- ✅ **보안**: 파일이 서버로 전송되지 않음
- ✅ **무료**: 오픈소스 라이브러리만 사용
- ✅ **개인정보 보호**: 모든 처리는 브라우저에서만 실행

### 브랜딩

- **브랜드명**: Lokit
- **태그라인**: "빠르고 안전한 파일 도구"
- **컨셉**: 로컬 처리(브라우저)를 기본으로, 필요시 클라우드 기능 확장
- **타겟**: PDF/이미지 변환 및 편집 툴 모음

---

## 🏗️ 아키텍처

### 정보 구조 (IA)

```
/                           → 허브 페이지 (카테고리 선택)
├── /pdf                    → PDF 도구 모음
│   ├── /pdf/to-jpg         → PDF → JPG
│   ├── /pdf/to-png         → PDF → PNG
│   ├── /pdf/to-text        → PDF → Text
│   ├── /pdf/image-to-pdf   → Image → PDF
│   ├── /pdf/merge          → Merge PDF
│   ├── /pdf/split          → Split PDF
│   ├── /pdf/rotate         → Rotate PDF
│   └── /pdf/compress       → Compress PDF
│
└── /image                   → 이미지 도구 모음
    ├── /image/portrait-blur    → Portrait Blur
    ├── /image/bg-remove        → Background Remove
    ├── /image/resize           → Image Resize
    ├── /image/compress         → Image Compress
    ├── /image/format            → Format Convert
    ├── /image/crop              → Image Crop
    ├── /image/blur-face         → Blur Face
    └── /image/redact            → Redact Image
```

### 라우팅 구조

- **React Router DOM** 사용
- **Code Splitting**: 모든 페이지 lazy loading
- **리다이렉트**: 기존 URL (`/pdf-to-jpg`) → 새 URL (`/pdf/to-jpg`)

### 컴포넌트 구조

```
src/
├── components/          # 공통 컴포넌트
│   ├── Header.tsx      # 헤더 (네비게이션)
│   ├── Layout.tsx      # 레이아웃 래퍼
│   ├── Loading.tsx     # 로딩 스피너
│   └── MetaUpdater.tsx # 동적 메타 태그 업데이트
│
├── pages/              # 페이지 컴포넌트
│   ├── Hub.tsx         # 루트 허브 페이지
│   ├── pdf/            # PDF 도구 페이지들
│   └── image/          # 이미지 도구 페이지들
│
├── utils/               # 유틸리티 함수
│   ├── pdfConverter.ts      # PDF → 이미지 변환
│   ├── pngConverter.ts      # PDF → PNG 변환
│   ├── textExtractor.ts      # PDF → Text 추출
│   ├── imageToPdfConverter.ts # 이미지 → PDF
│   ├── pdfMerger.ts          # PDF 병합
│   ├── pdfSplitter.ts        # PDF 분할
│   ├── pdfRotator.ts         # PDF 회전
│   ├── pdfCompressor.ts      # PDF 압축
│   └── imageProcessor.ts     # 이미지 처리 (블러, 배경 제거 등)
│
└── locales/            # 다국어 번역
    ├── ko.ts           # 한국어
    └── en.ts           # 영어
```

---

## 🛠️ 기술 스택

### 프론트엔드

| 영역 | 기술 | 버전 |
|------|------|------|
| **프레임워크** | React | 19.1.1 |
| **언어** | TypeScript | 5.8.3 |
| **빌드 도구** | Vite | 7.1.2 |
| **라우팅** | React Router DOM | 7.9.6 |
| **다국어** | react-i18next | 15.4.0 |
| **스타일링** | CSS Modules | - |

### 핵심 라이브러리

| 라이브러리 | 용도 | 크기 |
|-----------|------|------|
| **pdfjs-dist** | PDF 렌더링, 텍스트 추출 | ~500KB |
| **pdf-lib** | PDF 생성/수정/병합 | ~300KB |
| **jspdf** | 이미지 → PDF 변환 | ~150KB |
| **jszip** | ZIP 파일 생성 | ~100KB |
| **file-saver** | 파일 다운로드 | ~50KB |
| **@mediapipe/selfie_segmentation** | 인물 세그멘테이션 | ~2MB |
| **@mediapipe/face_detection** | 얼굴 감지 | ~1MB |

### 배포

- **호스팅**: Cloudflare Pages
- **프로젝트명**: `file-convert`
- **빌드 명령**: `npm run build`
- **출력 디렉토리**: `dist`
- **배포 방식**: Git push 시 자동 배포 또는 wrangler CLI

---

## 📦 기능별 기술 구현

### PDF 도구

#### PDF → 이미지 (JPG/PNG)
- **라이브러리**: `pdfjs-dist`
- **방법**: PDF 페이지를 Canvas로 렌더링 → 이미지로 변환
- **옵션**: 품질 조정, 해상도 조정, 페이지 범위 선택

#### PDF → Text
- **라이브러리**: `pdfjs-dist`
- **방법**: `page.getTextContent()`로 텍스트 추출
- **출력**: TXT 파일

#### Image → PDF
- **라이브러리**: `jspdf`
- **방법**: 이미지를 Canvas로 로드 → PDF에 추가
- **지원 포맷**: JPG, PNG, WebP

#### PDF 병합/분할/회전
- **라이브러리**: `pdf-lib`
- **방법**: PDF 문서 조작 API 사용

#### PDF 압축
- **라이브러리**: `pdfjs-dist` + `pdf-lib`
- **방법**: PDF → 이미지 → 압축 → PDF 재생성
- **제약**: 텍스트 레이어 손실 가능

### 이미지 도구

#### Portrait Blur / Background Remove / Face Blur
- **라이브러리**: `@mediapipe/selfie_segmentation`, `@mediapipe/face_detection`
- **방법**: MediaPipe로 인물/얼굴 마스크 생성 → Canvas에서 블러/제거 처리
- **특징**: 100% 클라이언트 사이드, 실시간 처리 가능

#### Redact Image (Pixelate)
- **라이브러리**: Canvas API
- **방법**: 선택 영역 또는 감지된 얼굴 영역을 픽셀화 처리

#### Image Resize / Compress / Format Convert / Crop
- **라이브러리**: Canvas API (네이티브)
- **방법**: Canvas로 이미지 로드 → 변환 → Blob 생성

---

## 🚀 배포 환경

### Cloudflare Pages 설정

```
Project name: file-convert
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 18 이상
```

### 빌드 스크립트

- **로컬 빌드**: `npm run build`
- **배포**: `npm run deploy` (wrangler CLI 사용)
- **프리뷰**: `npm run preview`

### 환경 변수

특별한 환경 변수는 필요하지 않습니다. 모든 설정은 코드에 포함되어 있습니다.

---

## 🔒 보안 및 개인정보 보호

### 파일 처리 방식

- ✅ **모든 파일은 브라우저에서만 처리**
- ✅ **서버에 업로드되지 않음**
- ✅ **변환 후 즉시 메모리에서 삭제**
- ✅ **쿠키/로컬 스토리지에 파일 저장하지 않음**

### 수집하는 정보

1. **Google Analytics** (선택): 페이지 방문, 사용 패턴 (익명)
2. **Google AdSense** (선택): 광고 노출 및 클릭 (쿠키)

---

## 📊 성능 최적화

### Code Splitting

- 모든 페이지 컴포넌트 lazy loading
- PDF 도구와 이미지 도구 분리 로드
- MediaPipe 등 대용량 라이브러리 지연 로드

### 번들 크기 관리

- **PDF 도구**: ~1MB (기본)
- **이미지 도구**: ~2.5MB (MediaPipe 포함)
- **총합**: ~3.5MB (하지만 lazy loading으로 초기 로딩은 ~1MB)

### 최적화 전략

- Web Worker 활용 (향후 계획)
- 이미지 자동 리사이즈 (처리 전)
- 파일 크기 제한 (10MB)

---

## 🌐 다국어 지원

### 지원 언어

- 한국어 (ko)
- 영어 (en)
- 스페인어 (es)

### 구현 방식

- `react-i18next` 사용
- 언어별 번역 파일: `src/locales/ko.ts`, `src/locales/en.ts`
- URL 파라미터로 언어 전환: `?lang=ko`, `?lang=en`

---

## 📝 참고 자료

### 기술 문서

- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)
- [pdf-lib Documentation](https://pdf-lib.js.org/)
- [jsPDF Documentation](https://artskydj.github.io/jsPDF/docs/)
- [MediaPipe Selfie Segmentation](https://google.github.io/mediapipe/solutions/selfie_segmentation.html)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)

### 벤치마크 사이트

- [iLovePDF](https://www.ilovepdf.com/)
- [Smallpdf](https://smallpdf.com/)
- [PDF24](https://tools.pdf24.org/)

---

**다음 문서**: [CHANGELOG.md](./CHANGELOG.md) - 완료된 작업 내역

