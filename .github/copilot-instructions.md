# Lokit (file-convert) Copilot 지시사항

## 🎯 프로젝트 개요

**Lokit**은 React + TypeScript로 구축된 클라이언트 사이드 파일 변환 플랫폼입니다. 모든 파일 처리는 브라우저에서 이루어집니다—**서버 업로드 없음**.

- **아키텍처**: React 19 + Vite (Cloudflare Pages 배포)
- **핵심 기능**: PDF 조작 (변환, 병합, 분할, 회전, 압축) + 이미지 처리 (리사이즈, 압축, 자르기, 배경 제거, 초상화 블러)
- **핵심 원칙**: 100% 클라이언트 사이드 처리로 개인정보 보호 및 서버 비용 제로

---

## 🏗️ 아키텍처 & 컴포넌트 구조

### 페이지 조직 (중첩 라우트)
- **Hub** (`/`) - 도구로 연결되는 카테고리 카드가 있는 메인 랜딩 페이지
- **PDF 도구** (`/pdf/*`) - PdfHome 허브 → 개별 도구 (PdfToJpg, MergePdf, SplitPdf 등)
- **이미지 도구** (`/image/*`) - ImageHome 허브 → 개별 도구 (ImageResize, ImageCompress 등)

**패턴**: 각 카테고리는 하위 도구로 이동하는 "Home" 페이지를 가집니다. 페이지는 `<Action><FileType>.tsx` 형식으로 명명됩니다.

### 컴포넌트 계층
```
Layout (Header + <Outlet/> + Footer)
├── Hub (랜딩, 카테고리 그리드)
├── PdfHome / ImageHome (도구 링크가 있는 서브 허브)
└── 개별 도구 페이지 (MergePdf, ImageResize 등)
```

### 데이터 흐름
1. 사용자가 업로드/드래그앤드롭을 통해 파일 선택
2. 파일을 유틸리티 함수로 전달 (예: `mergePdfs()`, `resizeImage()`)
3. 처리는 워커/캔버스 스레드 (이미지 처리) 또는 pdf-lib (PDF 조작)에서 발생
4. file-saver 라이브러리의 `saveAs()`를 통해 결과 저장
5. 상태 콜백 패턴으로 진행률 추적

---

## 🛠️ 빌드 & 개발 워크플로우

### 핵심 명령어
```bash
npm run dev          # Vite 개발 서버 (localhost:5173)
npm run build        # TypeScript + Vite → dist/
npm run lint         # ESLint 검사
npm run deploy       # 빌드 + Cloudflare Pages에 배포 (main 브랜치)
npm run deploy:preview # preview 브랜치에 배포
```

### 주요 빌드 설정
- **Vite** (`vite.config.ts`): 빠른 트랜스파일을 위한 React + SWC 플러그인
- **TypeScript** (`tsconfig.json`): Strict 모드 활성화, app + node 설정 참조
- **출력**: Cloudflare Pages 정적 호스팅용 `dist/` 디렉토리

### 배포 대상
- **프로덕션**: `https://lokit.tools` (Cloudflare Pages)
- **프리뷰**: Wrangler를 통한 브랜치 기반 프리뷰 (`wrangler.toml`)
- **환경**: Serverless (백엔드 불필요)

---

## 📦 핵심 의존성 & 통합 포인트

### PDF 처리
- **pdf-lib** - PDF 조작 (병합, 분할, 회전, 추출)
- **pdfjs-dist** - PDF 렌더링/미리보기
- **jspdf** - 대체 PDF 생성 (이미지→PDF 변환)
- **jszip** - 여러 파일 내보내기용 ZIP 아카이브 생성

**패턴**: 각 PDF 작업은 `MergeProgress`, `SplitOptions` 등의 타입 인터페이스를 가진 전용 유틸리티 (`pdfMerger.ts`, `pdfSplitter.ts`, `pdfRotator.ts` 등)를 갖습니다.

### 이미지 처리
- **Canvas API** - 리사이징, 압축, 자르기
- **MediaPipe SelfieSegmentation** - 초상화 블러 & 배경 제거 (전역 `window.SelfieSegmentation`을 통해 로드)
- **piexif** - JPEG의 EXIF 메타데이터 보존
- **HTML5 Blob API** - 형식 변환 (Canvas→Blob→File)

**iOS 최적화**: `imageProcessor.ts`는 iOS를 감지하고 메모리 제약으로 인해 처리 해상도를 1024px (데스크톱은 1536px)로 축소합니다.

### 파일 처리
- **file-saver** - `saveAs()`를 통한 크로스 브라우저 파일 다운로드
- **Blob** - 메모리 내 파일 작업 (임시 파일 없음)

---

## 🎨 개발 패턴 & 컨벤션

### 진행률 추적 패턴
대부분의 유틸리티 함수는 작업 상태를 추적하기 위해 `onProgress` 콜백을 받습니다:
```typescript
export interface MergeProgress {
  current: number;
  total: number;
  status: string;
}

export const mergePdfs = async (
  files: PdfFile[],
  onProgress?: (progress: MergeProgress) => void
): Promise<void>
```
**페이지에서 이 패턴을 호출**: 상태 설정, `setProgress`로 유틸리티 호출, 작업 중 UI 업데이트.

### 파일 입력 패턴
컴포넌트는 파일 타입 검증과 함께 `handleFileSelect()`를 사용합니다:
1. MIME 타입으로 필터링 (`file.type.startsWith('image/')` 또는 `=== 'application/pdf'`)
2. 파일 크기 확인
3. 미리보기를 위한 데이터 URL 생성 (`URL.createObjectURL()`)
4. 메타데이터 비동기 로드 (이미지 크기, PDF 페이지 수)

### 에러 처리
검증은 사전에 발생:
- 파일 타입 검사
- 파일 크기 제한 (일반적으로 이미지는 20MB)
- `alert()` 또는 에러 상태를 통한 사용자 대면 알림

---

## 📁 주요 디렉토리 & 파일

| 경로 | 목적 |
|------|------|
| `src/pages/pdf/` | PDF 도구 페이지 + 개별 도구 라우트 |
| `src/pages/image/` | 이미지 도구 페이지 + 개별 도구 라우트 |
| `src/utils/` | 변환 유틸리티 함수 (도구당 하나의 파일) |
| `src/components/` | 재사용 가능한 Layout, Header 컴포넌트 |
| `src/App.tsx` | 라우트 정의 + 기존 URL 리다이렉트 |
| `package.json` | 스크립트: dev, build, lint, deploy 명령어 |
| `vite.config.ts` | Vite + React SWC 설정 |
| `.github/` | CI/CD 및 에이전트 지시사항 (이 파일) |

---

## 🔌 AI 에이전트를 위한 일반적인 워크플로우

### 새 도구 추가하기
1. 페이지 파일 생성: `src/pages/{category}/{ActionName}.tsx`
2. 유틸리티 생성: `src/utils/{lowercase}Utility.ts` (타입 인터페이스 포함)
3. `src/App.tsx`에 라우트 추가
4. 진행률 추적 + 파일 입력 패턴 구현 (`MergePdf.tsx`를 템플릿으로 사용)

### 파일 처리 수정하기
- 해당 유틸리티 파일 편집 (예: `src/utils/pdfMerger.ts`)
- UI 피드백을 위한 진행률 콜백 유지
- 여러 파일 크기 및 형식으로 테스트

### 레이아웃/스타일 문제 해결
- 컴포넌트 스타일 공위치: 동일 디렉토리의 `Component.tsx` + `Component.css`
- `.merge-pdf`, `.page-header`, `.upload-zone` 같은 CSS 클래스 사용

---

## 🚀 중요 참고사항

- **백엔드 없음**: 모든 처리는 클라이언트 사이드. API 호출이나 데이터베이스 없음.
- **개인정보 보호 우선**: 파일이 사용자의 브라우저를 벗어나지 않음.
- **대용량 파일 처리**: iOS Safari는 더 엄격한 메모리 제한 보유—`imageProcessor.ts`에서 기기 감지 처리.
- **배포**: Cloudflare Pages는 `git push`시 자동으로 빌드 (wrangler.toml을 통해).

---

## 📝 참고자료

- **README.md**: 기능 개요, 설정, AdSense 통합
- **develop.md**: 로드맵 및 상세 아키텍처 노트
- **DEPLOYMENT_GUIDE.md**: 프로덕션 배포 단계
