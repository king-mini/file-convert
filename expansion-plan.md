# 🚀 Lokit 확장 계획

> 이미지 처리 기능 추가를 위한 전략 문서

**프로젝트**: Lokit (file-convert)  
**개발자**: king-mini  
**작성일**: 2025-11-26  
**현재 상태**: PDF 변환 기능 8개 완성 (Phase 1-4 완료)  
**문서 버전**: 2.0 (GPT-5.1 의견 통합)

---

## 🎯 핵심 결론 (TL;DR)

### 전략
✅ **한 사이트 통합 + 카테고리 분리**  
✅ **브랜딩**: `Lokit - File Tools`  
✅ **도메인**: `lokit.tools`  
✅ **루트 허브 전환**: `/` → 카테고리 선택 페이지  
✅ **점진적 확장**: 1~2개씩, 데이터 기반 의사결정

### 우선순위
1. 🥇 **Portrait Blur** (인물 배경 흐리기) - 먼저 출시
2. 🥈 **Background Remove** - 데이터 보고 판단
3. 🥉 **Image Resize** - 나중에

### 일정
- **Phase 6** (1주): 브랜딩 & 인프라 개편
- **Phase 7** (2주): Portrait Blur 구현
- **Phase 8** (3일): 배포 & 모니터링
- **Phase 9** (2주 후): 데이터 리뷰 & 의사결정
- **Phase 10** (선택): PWA & 고급 기능

### 핵심 포인트
- 🎨 루트 페이지를 허브로 전환 (GPT-5.1 핵심 제안)
- 📊 2주 단위 지표 리뷰 (방문/사용/완료율)
- ♿ 접근성 강화 (a11y)
- 📜 정책 문서 필수 (개인정보/이용약관)
- 🔍 분석 이벤트 설계

---

## 📋 목차

1. [ChatGPT 조언 요약](#chatgpt-조언-요약)
2. [내 의견 및 분석](#내-의견-및-분석)
3. [우선순위 & 실행 전략 (GPT-5.1)](#우선순위--실행-전략-gpt-51-보완)
4. [정보 구조(IA) 개편](#정보-구조ia-개편)
5. [기술적 구현 방향](#기술적-구현-방향)
6. [접근성(a11y) 체크리스트](#접근성a11y-체크리스트)
7. [PWA 고려](#pwa-progressive-web-app-고려)
8. [분석 & 이벤트 트래킹](#분석--이벤트-트래킹)
9. [법적/정책 문서](#법적정책-문서-필수)
10. [브랜딩 전략](#브랜딩-전략)
11. [구현 로드맵](#구현-로드맵)
12. [위험 요소 및 대응](#위험-요소-및-대응)
13. [성공 지표 (KPI)](#성공-지표-kpi)
14. [최종 체크리스트](#최종-체크리스트)
15. [참고 자료](#참고-자료)
16. [의사결정 기록](#의사결정-기록)

---

## 💬 ChatGPT 조언 요약

### 핵심 결론
**"한 사이트 안에서 통합하되, 페이지/섹션은 확실히 분리"**

### 주요 조언 포인트

#### ✅ 한 화면에 다 욱여넣지 말 것
- PDF 변환과 이미지 편집을 같은 그리드에 섞으면 컨셉이 흐려짐
- 사용자: "여긴 PDF 사이트야? 포토샵 대체야?"
- SEO/검색 유입도 애매해짐 (키워드가 완전히 다른 영역)

#### ✅ 추천 구조
```
한 도메인 + 카테고리 분리

/              → 메인 허브
/pdf           → PDF 도구 모음
/image         → 이미지 도구 모음
/image/portrait-blur
/image/bg-remove
```

#### ✅ 상단 헤더에 간단히
```
PDF 도구 | 이미지 도구(베타)
```

#### ❌ 사이트 완전 분리는 아직 이르다
- 지금은 경험+소액 광고 목표
- 굳이 사이트 쫙 나눌 필요 없음
- "한 도메인 + 카테고리/라우팅 분리"가 딱 좋음

---

## 🤔 내 의견 및 분석

### ✅ 전적으로 동의하는 부분

1. **한 사이트 통합 + 섹션 분리**
   - 기술 스택 재사용
   - 유지보수 효율성
   - 초기 단계에서 최적의 선택

2. **SEO 관점에서 명확한 페이지 구분**
   - PDF 관련 키워드: `pdf to jpg`, `merge pdf`, `compress pdf`
   - 이미지 관련 키워드: `background blur`, `portrait mode`, `remove background`
   - 각 키워드마다 전용 랜딩 페이지 필요

3. **광고 매칭 효율성**
   - PDF: 문서/업무/툴 관련 광고
   - 이미지: 사진/앱/디자인 관련 광고
   - 페이지 주제가 선명할수록 AdSense 수익 향상

### 💡 추가로 고려해야 할 사항

#### 1. 브랜딩 문제 ⚠️

**현재 상태:**
- 사이트명: `Lokit`
- 헤더: `🔄 Lokit`
- 도메인: `lokit.tools` (예정)
- GitHub: `king-mini/file-convert`

**문제점:**
- 이미지 기능 추가 시 브랜드와 충돌
- "PDF Converter인데 왜 사진 편집이 있지?"

**해결 방안:**

**Option A: 브랜딩 확장** (추천 ⭐)
```
PDF Converter → File Tools / Universal Converter

메뉴:
├─ PDF Tools
└─ Image Tools
```

**Option B: 서브 브랜드**
```
PDF Converter (메인 브랜드 유지)

메뉴:
├─ PDF Tools (메인)
└─ Image Tools (BETA)
```

**Option C: 완전 중립 브랜드**
```
QuickTools / ToolBox / FileHub

메뉴:
├─ PDF
├─ Image
└─ (추후 확장 가능)
```

**내 추천: Option A**
- 지금부터 넓은 브랜딩으로 가는 게 장기적으로 유리
- 커스텀 도메인 구매 시 `filetools.app`, `quickconvert.io` 같은 범용 도메인 확보 가능

#### 2. 라우팅 구조 설계

**Option A: 카테고리 Prefix** (추천 ⭐)
```
/pdf/to-jpg
/pdf/to-png
/pdf/merge
/pdf/split
/image/portrait-blur
/image/bg-remove
/image/resize
```

**장점:**
- URL만 봐도 카테고리가 명확
- 확장성 좋음 (`/video`, `/audio` 추가 쉬움)
- 폴더 구조와 일치

**단점:**
- 기존 URL 변경 필요 (리다이렉트 설정)

**Option B: Flat 구조** (현재 상태 유지)
```
/pdf-to-jpg
/pdf-to-png
/portrait-blur
/background-remove
```

**장점:**
- 기존 URL 유지
- URL이 짧음

**단점:**
- 카테고리 구분이 이름에만 의존
- 나중에 많아지면 혼란

**내 추천: Option A**
- 지금은 유입이 적으니 URL 변경해도 타격 없음
- 나중을 위해 지금 구조 잡는 게 좋음

#### 3. 번들 크기 관리 🚨

**현재 PDF 기능 번들:**
```
pdfjs-dist: ~500KB
pdf-lib: ~300KB
jspdf: ~150KB
jszip: ~100KB
─────────────────
합계: ~1MB
```

**이미지 기능 추가 시:**
```
MediaPipe Selfie Segmentation: ~2MB
TensorFlow.js (선택): ~500KB
─────────────────
추가: ~2.5MB
```

**🚨 문제:**
- 총 번들 크기 ~3.5MB
- 초기 로딩 시간 증가
- 모바일 사용자 경험 악화

**✅ 해결책: Code Splitting**

```typescript
// App.tsx
import { lazy, Suspense } from 'react';

// PDF 페이지 (즉시 로드)
import PdfToJpg from './pages/PdfToJpg';

// 이미지 페이지 (지연 로드)
const PortraitBlur = lazy(() => import('./pages/image/PortraitBlur'));
const BackgroundRemove = lazy(() => import('./pages/image/BackgroundRemove'));

// 라우트
<Route path="/image/portrait-blur" element={
  <Suspense fallback={<Loading />}>
    <PortraitBlur />
  </Suspense>
} />
```

**효과:**
- 메인 페이지 로딩: ~1MB (PDF만)
- 이미지 페이지 접속 시에만 ~2.5MB 추가 로드
- 사용자 체감 속도 향상

---

## 🛠️ 기술적 구현 방향

### 1. 100% 클라이언트 사이드 유지 ✅

**핵심 원칙:**
```
"모든 처리는 브라우저에서만 실행됩니다"
- 파일이 서버로 전송되지 않음
- 사용자 개인정보 보호
- 빠른 처리 속도
```

**오해 해소:**
- ❌ Web Worker = 서버 업로드 (틀림!)
- ✅ Web Worker = 브라우저 내 별도 스레드 (맞음!)

```
Web Worker 없이:
파일 선택 → ⏳ 처리 중... (화면 멈춤 5초)

Web Worker 사용:
파일 선택 → ✨ 백그라운드 처리 (화면 부드러움)
```

**여전히 100% 클라이언트 사이드!**

### 2. 이미지 처리 기술 스택

#### 인물 배경 흐리기 (Portrait Blur)

**라이브러리 비교:**

| 라이브러리 | 크기 | 속도 | 정확도 | 추천도 |
|-----------|------|------|--------|--------|
| MediaPipe Selfie Segmentation | 2MB | ⚡⚡⚡ 빠름 | ⭐⭐⭐ 최고 | ✅ 추천 |
| TensorFlow.js BodyPix | 500KB | ⚡ 느림 | ⭐⭐ 보통 | ❌ 비추 |
| @mediapipe/selfie_segmentation | 2MB | ⚡⚡⚡ 빠름 | ⭐⭐⭐ 최고 | ✅ 추천 |

**선택: MediaPipe Selfie Segmentation**

**이유:**
- Google 공식 라이브러리
- 실시간 처리 가능할 정도로 빠름
- 정확도 최고 (머리카락, 경계선 깔끔)
- CDN 제공 (Cloudflare Pages와 호환)

**구현 개요:**

```typescript
// src/utils/imageProcessor.ts
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';

export const blurBackground = async (
  file: File,
  blurAmount: number,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  onProgress?.(10);
  
  // 1. 이미지 로드
  const img = await loadImage(file);
  onProgress?.(30);
  
  // 2. MediaPipe 초기화
  const segmenter = new SelfieSegmentation({
    locateFile: (file) => 
      `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
  });
  onProgress?.(50);
  
  // 3. 세그멘테이션 실행
  const mask = await segmenter.send({image: img});
  onProgress?.(70);
  
  // 4. Canvas에서 배경만 블러 처리
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d')!;
  
  // 배경 레이어 (블러)
  ctx.filter = `blur(${blurAmount}px)`;
  ctx.drawImage(img, 0, 0);
  
  // 인물 레이어 (선명)
  ctx.filter = 'none';
  ctx.globalCompositeOperation = 'destination-in';
  ctx.drawImage(mask, 0, 0);
  
  onProgress?.(90);
  
  // 5. 결과 반환
  const blob = await canvas.toBlob('image/jpeg', 0.9);
  onProgress?.(100);
  
  return blob;
};
```

#### 추가 이미지 기능 계획

1. **Background Remove** (배경 제거)
   - 라이브러리: MediaPipe (동일)
   - 구현: 마스크 적용 후 투명 배경으로
   - 포맷: PNG (투명도 지원)

2. **Image Resize** (이미지 크기 조정)
   - 라이브러리: Canvas API (네이티브)
   - 고품질 리샘플링: Lanczos 알고리즘
   - 파일 크기 최적화

3. **Format Converter** (포맷 변환)
   - PNG ↔ JPG ↔ WebP
   - 품질 조정 옵션
   - 배치 변환 지원

### 3. 성능 최적화 전략

#### Web Worker 활용

```typescript
// src/workers/imageWorker.ts
self.onmessage = async (e) => {
  const { type, file, options } = e.data;
  
  switch (type) {
    case 'blurBackground':
      const result = await blurBackground(file, options);
      self.postMessage({ type: 'success', result });
      break;
    case 'removeBackground':
      // ...
      break;
  }
};

// 메인 스레드에서 사용
const worker = new Worker('/workers/imageWorker.js');
worker.postMessage({ type: 'blurBackground', file, options });
worker.onmessage = (e) => {
  const result = e.data.result;
  // UI 업데이트
};
```

#### 프로그레시브 로딩

```typescript
// 이미지 미리보기 (저화질) → 처리 → 결과 (고화질)
1. 썸네일 생성 (즉시)
2. 처리 진행 (백그라운드)
3. 결과 표시 (완료 시)
```

---

## 🎨 브랜딩 전략

### Phase 1: 소프트 마이그레이션 (추천)

**현재 → 전환기 → 최종**

```
PDF Converter
    ↓
PDF Converter (+ Image Tools BETA)
    ↓
File Tools / Universal Converter
```

**구현:**
1. 헤더에 "Image Tools (BETA)" 메뉴 추가
2. 서브타이틀: "PDF & Image Tools"
3. 메인 로고는 유지, 서브 카테고리로 확장

**장점:**
- 기존 사용자 혼란 최소화
- 점진적 브랜드 확장
- SEO 손실 없음

### Phase 2: 도메인 전략

**현재 도메인:**
- `pdf-converter-73u.pages.dev`

**커스텀 도메인 추천:**

| 도메인 | 장점 | 단점 | 추천도 |
|--------|------|------|--------|
| `filetools.app` | 범용적, 확장 쉬움 | 경쟁 많음 | ⭐⭐⭐⭐ |
| `quickconvert.io` | 직관적 | 길다 | ⭐⭐⭐⭐ |
| `toolbox.cloud` | 모던한 느낌 | 추상적 | ⭐⭐⭐ |
| `pdfplus.tools` | PDF 강조 유지 | 확장성 낮음 | ⭐⭐ |

**내 추천: `filetools.app` 또는 `quickconvert.io`**

---

## 📅 구현 로드맵

### Phase 6: 브랜딩 & 인프라 개편 (1주) ⚡

**목표: 이미지 기능 추가를 위한 기반 마련 + GPT-5.1 제안 반영**

#### Week 1: 리팩토링 & 브랜딩

**Day 1: 라우팅 구조 변경**
```
Before:
/                  → PDF 도구 그리드
/pdf-to-jpg
/pdf-to-png

After:
/                  → 허브 페이지 (새로 만듦!)
/pdf               → PDF 도구 그리드
/pdf/to-jpg
/pdf/to-png
/image             → 이미지 도구 그리드 (준비)
/image/portrait-blur
```

- [x] `App.tsx` 라우트 재구성
- [x] 301 리다이렉트 설정 (기존 URL → 새 URL)
- [x] 내부 링크 업데이트

**Day 2: 루트 허브 페이지 생성** (GPT-5.1 핵심 제안 ⭐)
- [x] `src/pages/Hub.tsx` 생성
  ```tsx
  <div className="hub">
    <h1>무엇을 도와드릴까요?</h1>
    <div className="category-cards">
      <CategoryCard
        icon="📄"
        title="PDF 작업"
        count="8개 도구"
        to="/pdf"
      />
      <CategoryCard
        icon="🖼️"
        title="이미지 편집"
        badge="BETA"
        count="2개 도구"
        to="/image"
      />
    </div>
  </div>
  ```
- [x] 기존 Home → PdfHome으로 이동
- [x] `/pdf` 페이지 생성 (기존 Home 컨텐츠)
- [x] `/image` 페이지 생성 (빈 그리드)

**Day 3: 브랜딩 업데이트**
- [x] 사이트 타이틀: `File Tools - PDF & Image Converter`
- [x] 헤더 컴포넌트 확장
  ```tsx
  <Header>
    <Logo to="/">📁 File Tools</Logo>
    <Nav>
      <NavItem to="/pdf">PDF Tools</NavItem>
      <NavItem to="/image" badge="BETA">Image Tools</NavItem>
    </Nav>
  </Header>
  ```
- [x] `index.html` 메타 태그 업데이트
- [ ] Favicon 생성 (📁 아이콘)

**Day 4: Code Splitting 설정**
- [ ] React Router `lazy()` 적용
  ```typescript
  const PdfHome = lazy(() => import('./pages/PdfHome'));
  const ImageHome = lazy(() => import('./pages/ImageHome'));
  const PortraitBlur = lazy(() => import('./pages/image/PortraitBlur'));
  ```
- [ ] Suspense + Loading 컴포넌트
- [ ] 번들 분석 (Vite Bundle Analyzer)
- [ ] 최적화 확인

**Day 5: 접근성 & 정책 문서**
- [ ] 접근성 개선
  - `aria-label` 추가 (업로드 박스, 버튼)
  - 키보드 네비게이션 테스트
  - 포커스 아웃라인 스타일
- [ ] 정책 페이지 생성
  - `/privacy-policy` 개인정보 처리방침
  - `/terms` 이용약관
  - `/licenses` 오픈소스 라이선스
- [ ] Footer에 링크 추가

### Phase 7: 이미지 처리 기능 구현 (2주) 🖼️

**목표: Portrait Blur 1개만 완성도 높게 (GPT-5.1 제안: 많이보다 깊게)**

#### Week 1: Portrait Blur (인물 배경 흐리기)

**Day 1: 환경 설정**
- [ ] MediaPipe 패키지 설치
  ```bash
  npm install @mediapipe/selfie_segmentation
  npm install @mediapipe/camera_utils
  ```
- [x] 타입 정의 추가
- [x] CDN 설정 확인
- [ ] 분석 이벤트 설정
  ```typescript
  trackEvent('image_portrait_blur_started');
  trackEvent('image_portrait_blur_completed');
  trackEvent('image_portrait_blur_failed');
  ```

**Day 2-3: 핵심 로직 구현**
- [x] `src/utils/imageProcessor.ts` 생성
  - `blurBackground()` 함수
  - 마스크 생성
  - Canvas 블러 처리
  - 에러 핸들링 강화
- [x] 진행률 콜백 구현
- [x] 파일 크기 제한 (10MB)
- [ ] 단위 테스트

**Day 4-6: UI 구현**
- [x] `src/pages/image/PortraitBlur.tsx` 생성
- [x] 이미지 업로드 UI (접근성 고려)
  - `aria-label` 추가
  - 키보드 네비게이션
- [x] 블러 강도 슬라이더 (0~50px)
- [x] Before/After 비교 뷰
- [x] 진행률 표시 (`aria-live="polite"`)
- [x] 에러 메시지 (색+아이콘+해결책)
- [x] 결과 다운로드
- [x] CSS 스타일링

**Day 7: 테스트 & 최적화**
- [ ] 다양한 이미지 테스트 (인물 수, 해상도)
- [ ] 모바일 반응형 확인
- [ ] 성능 측정 (처리 시간)
- [ ] 접근성 테스트 (키보드, 스크린리더)
- [ ] 버그 수정

#### Week 2: 분석 & 준비

**Day 1-2: 데이터 수집 준비**
- [ ] GA4 이벤트 연동
  ```typescript
  // 사용 시작
  trackEvent('image_portrait_blur_started', {
    file_size: file.size,
    image_width: img.width,
    image_height: img.height
  });
  
  // 완료
  trackEvent('image_portrait_blur_completed', {
    file_size: file.size,
    processing_time: duration,
    blur_amount: blurAmount
  });
  
  // 에러
  trackEvent('image_portrait_blur_failed', {
    error_code: 'file_too_large',
    file_size: file.size
  });
  ```
- [ ] Lighthouse 성능 측정
- [ ] 번들 크기 확인

**Day 3-5: Background Remove 준비 (80% 완성)**
- [x] `removeBackground()` 유틸리티 작성
- [x] `src/pages/image/BackgroundRemove.tsx` 생성
- [x] PNG 투명 배경 지원
- [x] 기본 UI 구현
- [ ] **배포는 하지 않음** (데이터 보고 판단)

**Day 6-7: 문서화 & 피드백**
- [ ] 사용 가이드 작성
- [ ] 개발 문서 업데이트
- [ ] Phase 7 회고
  - 어려웠던 점
  - 배운 점
  - 다음 개선사항
- [ ] 2주 후 지표 리뷰 계획 수립

### Phase 8: 배포 & 모니터링 (3일) 🚀

**Day 1: 배포 준비**
- [ ] 프로덕션 빌드 테스트
- [ ] 환경 변수 설정
- [ ] SEO 메타 태그 추가 (각 페이지별)
  ```html
  <!-- / 허브 페이지 -->
  <title>File Tools - 무료 PDF 및 이미지 변환</title>
  <meta name="description" content="PDF 변환, 이미지 편집을 브라우저에서 안전하게. 무료, 회원가입 불필요">
  
  <!-- /pdf 페이지 -->
  <title>PDF Tools - 무료 PDF 변환기</title>
  
  <!-- /image/portrait-blur -->
  <title>인물 배경 흐리기 - 무료 온라인 도구</title>
  ```
- [ ] Sitemap 업데이트
  ```xml
  /
  /pdf
  /pdf/to-jpg
  /image
  /image/portrait-blur
  /privacy-policy
  /terms
  ```
- [ ] robots.txt 확인

**Day 2: 배포 & 검증**
- [ ] Cloudflare Pages 배포
- [ ] DNS 설정 (커스텀 도메인 - 선택)
- [ ] HTTPS 확인
- [ ] 전체 기능 동작 확인
  - [ ] PDF 변환 8개
  - [ ] Portrait Blur 1개
  - [ ] 라우팅/리다이렉트
  - [ ] 정책 페이지
- [ ] 모바일 테스트 (iOS, Android)
- [ ] 접근성 테스트 (키보드, VoiceOver)

**Day 3: 모니터링 & 최적화**
- [ ] Google Analytics 4 설정
  - [ ] 이벤트 연동 확인
  - [ ] 목표 전환 설정
- [ ] AdSense 코드 삽입
  - [ ] PDF 페이지 (기존)
  - [ ] Image 페이지 (신규)
- [ ] Lighthouse 측정
  - [ ] Performance > 90
  - [ ] Accessibility > 90
  - [ ] Best Practices > 90
  - [ ] SEO > 95
- [ ] 사용자 피드백 채널 준비
  - [ ] 간단한 만족도 설문 (선택)
  - [ ] 문의하기 이메일

---

### Phase 9: 2주 후 데이터 리뷰 & 의사결정 📊

**2주 후 (Phase 7-8 배포 후)**

**Day 1: 데이터 수집 & 분석**
- [ ] Portrait Blur 지표 확인
  ```
  목표:
  - 방문자: 100명 이상
  - 변환 완료: 50회 이상
  - 완료율: 80% 이상
  - 에러율: 5% 미만
  ```
- [ ] PDF 기능 지표 변화 확인
- [ ] 전체 사이트 지표
  - [ ] 방문자 증감
  - [ ] 평균 체류 시간
  - [ ] 이탈률
  - [ ] 재방문률

**Day 2: 의사결정**
- [ ] Portrait Blur 성공 판단
  - **성공** → Background Remove 배포 준비
  - **보통** → Portrait Blur 개선 후 재시도
  - **실패** → 원인 분석 & 방향 전환
- [ ] 다음 Phase 계획 수립

**Day 3: Phase 10 계획**
- [ ] 성공 시: Background Remove 출시
- [ ] 실패 시: 다른 전략 모색
  - PDF 기능 개선
  - 마케팅 강화
  - 다른 이미지 기능 시도

---

### Phase 10: PWA & 고급 기능 (선택) 📱

**조건: 반복 사용자가 20% 이상일 때**

**Week 1: PWA 구현**
- [ ] `manifest.json` 생성
- [ ] Service Worker 구현 (기본 캐싱)
- [ ] 아이콘 생성 (192x192, 512x512)
- [ ] 설치 프롬프트 UI
- [ ] 오프라인 폴백 페이지

**Week 2: 고급 최적화**
- [ ] Web Worker로 이미지 처리 이동
- [ ] Image 최적화 (WebP 지원)
- [ ] Lazy Loading 이미지
- [ ] CDN 최적화

---

## ⚠️ 위험 요소 및 대응

### 1. 성능 문제

**위험:**
- MediaPipe 모델 로딩 시간 (첫 실행 시 ~3초)
- 대용량 이미지 처리 시 브라우저 메모리 부족

**대응:**
- [ ] 모델 프리로딩 (백그라운드)
- [ ] 이미지 자동 리사이즈 (처리 전)
- [ ] 최대 파일 크기 제한 (10MB)
- [ ] 메모리 사용량 모니터링

### 2. 브라우저 호환성

**위험:**
- 구형 브라우저에서 MediaPipe 미지원
- Safari에서 Web Worker 제한

**대응:**
- [ ] 브라우저 지원 체크
  ```typescript
  if (!window.Worker || !navigator.gpu) {
    alert('이 기능은 최신 브라우저에서만 지원됩니다.');
  }
  ```
- [ ] Fallback UI 제공
- [ ] 지원 브라우저 안내 페이지

### 3. SEO 영향

**위험:**
- URL 구조 변경으로 기존 SEO 손실
- 브랜딩 변경으로 검색 순위 하락

**대응:**
- [ ] 301 리다이렉트 철저히 설정
- [ ] robots.txt 업데이트
- [ ] Sitemap 재제출 (Google Search Console)
- [ ] 점진적 브랜딩 변경 (급격한 변화 피하기)

### 4. 사용자 혼란

**위험:**
- "PDF 사이트인데 왜 사진 편집이?"
- 기능이 너무 많아서 선택 어려움

**대응:**
- [ ] 명확한 카테고리 분리
- [ ] 첫 화면에 "무엇을 도와드릴까요?" 선택 UI
- [ ] 각 기능 설명 강화
- [ ] 튜토리얼/가이드 추가

---

## 📊 성공 지표 (KPI)

### 기술적 목표

| 지표 | 현재 | 목표 | 측정 방법 |
|------|------|------|----------|
| 번들 크기 (PDF) | ~1MB | < 1.5MB | Vite Bundle Analyzer |
| 번들 크기 (Image) | - | < 3MB | Vite Bundle Analyzer |
| Lighthouse Performance | ? | > 90 | Chrome DevTools |
| Lighthouse Accessibility | ? | > 90 | Chrome DevTools |
| 첫 페이지 로딩 (3G) | ? | < 2초 | Lighthouse |
| 이미지 처리 시간 (2MB) | - | < 5초 | 수동 측정 |

### 비즈니스 목표 (3개월)

| 지표 | 현재 (Phase 1-4) | 1개월 후 | 3개월 후 |
|------|-----------------|---------|---------|
| 월 방문자 (UV) | ? | 1,000 | 5,000 |
| 페이지뷰 | ? | 3,000 | 15,000 |
| 평균 체류 시간 | ? | > 1분 | > 2분 |
| 이탈률 | ? | < 60% | < 50% |
| 재방문률 | ? | > 10% | > 20% |
| 변환 완료율 | ? | > 80% | > 85% |

### 기능별 목표 (2주 단위)

**Portrait Blur:**
- 방문: 100+ (전체의 10%)
- 사용: 50+ (방문의 50%)
- 완료: 40+ (사용의 80%)
- 에러: < 5%

**Background Remove (다음):**
- 방문: 150+ (수요 검증)
- 사용: 75+
- 완료: 60+
- 에러: < 5%

### 수익화 목표 (6개월)

- [ ] AdSense 승인 (1개월 후)
- [ ] 월 광고 수익: $10 (3개월 후)
- [ ] 월 광고 수익: $50 (6개월 후)
- [ ] 커스텀 도메인 비용 회수

---

## 🎯 최종 체크리스트

### 시작 전 확인사항 (지금!)

- [x] ChatGPT 조언 검토 완료
- [x] GPT-5.1 보완 의견 통합
- [x] 기술 스택 확정 (MediaPipe)
- [x] 브랜딩 방향 결정 (File Tools)
- [x] 라우팅 구조 설계 (/ → /pdf, /image)
- [x] 우선순위 전략 수립 (Portrait Blur 먼저)
- [ ] 리소스 확보 (시간: 3주, 비용: 도메인)

### Phase 6 시작 조건 ✅

- [x] 현재 PDF 기능 모두 안정화
- [x] 빌드 에러 0개
- [x] 배포 파이프라인 정상 작동 (Cloudflare Pages)
- [x] Git 백업 완료
- [x] develop.md 문서 검토

**시작 가능 여부**: ✅ **준비 완료, 바로 시작 가능!**

### Phase 7 시작 조건

- [x] 라우팅 구조 변경 완료 (/ → /pdf, /image)
- [x] 루트 허브 페이지 생성
- [x] 브랜딩 업데이트 완료 (File Tools)
- [ ] Code Splitting 설정 완료
- [ ] 정책 문서 작성 완료
- [ ] 접근성 개선 완료
- [ ] 분석 이벤트 설정 완료
- [ ] 성능 기준치 측정 완료

#### 다국어(i18n) 준비
- [ ] 다국어 전략 수립 (기본 ko/en)
- [ ] i18n 라이브러리 선택 및 도입 (예: react-i18next)
- [ ] 언어 토글 UI 추가 (헤더/푸터)
- [ ] 핵심 페이지 번역 키 추출 및 적용 (Hub, PDF/Image Home, 변환 페이지 공통 문구)
- [ ] SEO 대비 hreflang/meta locale 설정 검토

### Phase 8 배포 조건

- [x] Portrait Blur 기능 완성
- [ ] 전체 기능 통합 테스트 통과
- [ ] 접근성 테스트 통과
- [ ] Lighthouse 점수 목표 달성
  - Performance > 90
  - Accessibility > 90
- [ ] 모바일 반응형 확인
- [ ] 에러 처리 완벽

### Phase 9 진행 조건 (2주 후)

- [ ] 최소 100명 방문
- [ ] Portrait Blur 50회 이상 사용
- [ ] 완료율 80% 이상
- [ ] 에러율 5% 미만

**조건 충족 시**: Background Remove 배포  
**조건 미달 시**: 원인 분석 & 개선

### Phase 10 진행 조건 (선택)

- [ ] 반복 사용자 20% 이상
- [ ] 월 방문자 1,000명 이상
- [ ] 수익화 시작 (AdSense 승인)
- [ ] 사용자 피드백 긍정적

---

## 📝 참고 자료

### 기술 문서
- [MediaPipe Selfie Segmentation](https://google.github.io/mediapipe/solutions/selfie_segmentation.html)
- [React Router Code Splitting](https://reactrouter.com/en/main/route/lazy)
- [Vite Code Splitting](https://vitejs.dev/guide/features.html#code-splitting)

### 디자인 참고
- [Remove.bg](https://www.remove.bg/) - 배경 제거 UI
- [Pixlr](https://pixlr.com/) - 이미지 편집 UX
- [Canva](https://www.canva.com/) - 카테고리 네비게이션

### 경쟁사 분석
- [iLovePDF](https://www.ilovepdf.com/) - PDF 툴 + 이미지 툴 통합
- [Smallpdf](https://smallpdf.com/) - 깔끔한 UI/UX
- [PDF24](https://tools.pdf24.org/) - 다양한 도구 통합

---

## 🎯 우선순위 & 실행 전략 (GPT-5.1 보완)

### 핵심 원칙: "많이"보다 "깊게"

이미지 기능은 **한 번에 모두 출시하지 말고, 1~2개씩 데이터 기반 확장**

#### 이미지 기능 우선순위

| 순위 | 기능 | 이유 | 목표 지표 |
|-----|------|------|----------|
| 🥇 1순위 | Portrait Blur | 수요 많음, 차별화 포인트 | 월 500회 이상 사용 |
| 🥈 2순위 | Background Remove | 실용성 높음 | 월 300회 이상 사용 |
| 🥉 3순위 | Image Resize | 보너스, 빠른 구현 | 데이터 보고 판단 |
| - | Format Convert | 우선순위 낮음 | 나중에 |

#### 2주 단위 지표 확인

각 기능별로 다음 지표를 추적:
- [ ] 페이지 방문자 수 (UV)
- [ ] 실제 변환 완료 건수
- [ ] 평균 체류 시간
- [ ] 재방문 비율

**목표**: 기능당 월 500회 이상 사용 → 다음 기능 추가

---

## 🏗️ 정보 구조(IA) 개편

### 루트 페이지 전환 (중요! ⚠️)

**Before (현재):**
```
/ → PDF 도구 그리드 (8개 카드)
```

**After (개선):**
```
/ → 허브 페이지
  ├─ "무엇을 도와드릴까요?"
  ├─ [📄 PDF 작업] → /pdf
  └─ [🖼️ 이미지 편집 (BETA)] → /image

/pdf → PDF 도구 그리드 (8개)
/image → 이미지 도구 그리드 (1~2개만)
```

**효과:**
1. ✅ 첫 방문자의 혼란 제거
2. ✅ "PDF 사이트인데 왜 사진?"라는 인지 부조화 해소
3. ✅ 향후 `/video`, `/audio` 확장에도 재사용 가능

### UI 구성안

```
┌──────────────────────────────┐
│     📁 File Tools            │
│   PDF & Image Converter      │
├──────────────────────────────┤
│                              │
│  무엇을 도와드릴까요?         │
│                              │
│  ┌──────────┐  ┌──────────┐ │
│  │  📄 PDF  │  │ 🖼️ Image │ │
│  │  작업    │  │  편집    │ │
│  │          │  │ (BETA)   │ │
│  │ 8개 도구 │  │ 2개 도구 │ │
│  └──────────┘  └──────────┘ │
│                              │
├──────────────────────────────┤
│ ✅ 클라이언트 처리            │
│ 🔒 개인정보 보호             │
│ 💰 무료 무제한               │
└──────────────────────────────┘
```

---

## ♿ 접근성(a11y) 체크리스트

### 키보드 네비게이션
- [ ] `Tab` 키로 모든 인터랙션 요소 접근 가능
- [ ] `Enter`/`Space`로 버튼 동작
- [ ] 포커스 아웃라인 시각적으로 명확

### 스크린 리더 지원
- [ ] 업로드 박스: `aria-label="PDF 파일을 드래그하거나 클릭하여 선택"`
- [ ] 진행률: `aria-live="polite"` + 진행 상태 텍스트
- [ ] 아이콘 버튼: `aria-label` 추가 (예: "홈으로 이동")

### 에러 메시지 개선
```typescript
// Before
alert('파일이 너무 큽니다.');

// After
<div role="alert" className="error">
  <span className="error-icon">⚠️</span>
  <div>
    <strong>파일 크기 초과</strong>
    <p>10MB 이하의 파일만 지원합니다. 파일 크기를 줄인 후 다시 시도해주세요.</p>
  </div>
</div>
```

---

## 📱 PWA (Progressive Web App) 고려

### 왜 PWA가 좋은가?
- 모든 처리가 클라이언트에서 실행 → 오프라인 사용 가능
- "홈 화면에 추가" → 앱처럼 사용
- 반복 사용자 만족도 ↑

### 최소 구현 (Phase 9)
```json
// public/manifest.json
{
  "name": "File Tools - PDF & Image Converter",
  "short_name": "File Tools",
  "description": "무료 PDF 및 이미지 변환 도구",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#667eea",
  "theme_color": "#667eea",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

```typescript
// public/sw.js (기본 Service Worker)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/index.css',
        '/assets/index.js'
      ]);
    })
  );
});
```

**시점**: 반복 사용자가 20% 이상일 때 도입

---

## 📊 분석 & 이벤트 트래킹

### GA4 이벤트 설계

```typescript
// src/utils/analytics.ts
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// 사용 예시
trackEvent('pdf_to_jpg_started', {
  file_size: file.size,
  page_count: totalPages
});

trackEvent('pdf_to_jpg_completed', {
  file_size: file.size,
  page_count: totalPages,
  processing_time: duration
});

trackEvent('conversion_failed', {
  tool: 'pdf_to_jpg',
  error_code: 'file_too_large',
  file_size: file.size
});
```

### 추적할 주요 이벤트

| 카테고리 | 이벤트 | 파라미터 |
|---------|--------|---------|
| **페이지** | `page_view` | `page_path`, `page_category` |
| **네비게이션** | `category_selected` | `category: 'pdf' | 'image'` |
| **변환** | `conversion_started` | `tool`, `file_size` |
| **변환** | `conversion_completed` | `tool`, `file_size`, `duration` |
| **에러** | `conversion_failed` | `tool`, `error_code`, `error_message` |
| **다운로드** | `file_downloaded` | `tool`, `output_size` |

### 목표 설정

```
목표 1: 변환 완료율
= conversion_completed / conversion_started > 80%

목표 2: 평균 처리 시간
= avg(processing_time) < 5초

목표 3: 에러율
= conversion_failed / conversion_started < 5%
```

---

## 📜 법적/정책 문서 (필수!)

### 1. 개인정보 처리방침

```markdown
# 개인정보 처리방침

## 파일 처리 방식
- **모든 파일은 브라우저에서만 처리됩니다**
- 서버에 업로드되지 않습니다
- 변환 후 즉시 메모리에서 삭제됩니다

## 수집하는 정보
1. **Google Analytics**: 페이지 방문, 사용 패턴 (익명)
2. **Google AdSense**: 광고 노출 및 클릭 (쿠키)

## 쿠키 사용
- 분석 쿠키: Google Analytics
- 광고 쿠키: Google AdSense
- 설정 쿠키: 사용자 설정 저장 (선택)

언제든지 브라우저 설정에서 쿠키를 삭제할 수 있습니다.
```

### 2. 이용약관

```markdown
# 이용약관

## 서비스 제공
- 본 서비스는 "있는 그대로(AS-IS)" 제공됩니다
- 변환 품질을 보장하지 않습니다
- 중요한 문서는 원본을 백업하세요

## 사용 제한
- 불법 콘텐츠 처리 금지
- 저작권 침해 금지
- 과도한 사용 제한 가능

## 면책 조항
- 데이터 손실에 대한 책임 없음
- 서비스 중단에 대한 보상 없음
```

### 3. 오픈소스 라이선스

```markdown
# 오픈소스 라이선스

본 서비스는 다음 오픈소스 라이브러리를 사용합니다:

- [PDF.js](https://mozilla.github.io/pdf.js/) - Apache 2.0
- [pdf-lib](https://pdf-lib.js.org/) - MIT
- [jsPDF](https://github.com/parallax/jsPDF) - MIT
- [MediaPipe](https://google.github.io/mediapipe/) - Apache 2.0
- [React](https://react.dev/) - MIT
```

### 구현 위치

```
/privacy-policy → 개인정보 처리방침
/terms → 이용약관
/licenses → 오픈소스 라이선스

Footer에 링크 추가:
<footer>
  <a href="/privacy-policy">개인정보 처리방침</a>
  <a href="/terms">이용약관</a>
  <a href="/licenses">오픈소스 라이선스</a>
</footer>
```

---

## 💬 의사결정 기록

### 2025-11-26: 확장 방향 결정

**논의 주제:**
- 이미지 기능을 별도 사이트로 분리 vs 통합

**최종 결정:**
- ✅ 한 사이트 통합 + 카테고리 분리
- ✅ 브랜딩 확장: `PDF Converter` → `File Tools`
- ✅ 라우팅: `/pdf/*`, `/image/*` 구조
- ✅ 루트 페이지를 허브로 전환 (GPT-5.1 제안 반영)

**이유:**
- 초기 단계에서 분리는 비효율적
- 기술 스택 재사용 가능
- SEO/마케팅에서 시너지 효과
- 사용자 입장에서 "원스톱 도구 사이트" 인식
- 명확한 카테고리 분리로 혼란 최소화

**리스크 & 대응:**

| 리스크 | 대응 방안 |
|--------|----------|
| 브랜딩 혼란 | 루트 페이지에서 명확히 분리 |
| 번들 크기 증가 | Code Splitting + Lazy Loading |
| URL 구조 변경 | 301 리다이렉트 철저히 |
| 기능 산만함 | 1~2개씩 점진적 출시 |

**다음 액션:**
1. Phase 6 실행 (브랜딩 & 인프라 개편)
2. 루트 페이지 허브 전환
3. 분석 이벤트 설정
4. 정책 문서 작성
5. 2주 단위 지표 리뷰

---

**문서 상태**: GPT-5.1 의견 통합 완료  
**다음 업데이트**: Phase 6 완료 후  
**작성자**: AI Assistant + User + GPT-5.1 Collaboration
- [ ] 번들 사이즈 모니터링: `vite build --report` 결과로 큰 의존성을 파악하고 PDF/이미지 툴별 lazy-loaded 모듈을 더 세분화할 수 있는지 확인 (성능 개선)
