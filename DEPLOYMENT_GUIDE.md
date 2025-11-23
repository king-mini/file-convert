# Cloudflare Pages 배포 가이드

## 🚀 빠른 시작

### 1. GitHub에 코드 푸시

```bash
git init
git add .
git commit -m "Initial commit: PDF to JPG converter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Cloudflare Pages 프로젝트 생성

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 로그인
2. 좌측 메뉴에서 **Workers & Pages** 선택
3. **Create application** → **Pages** → **Connect to Git** 클릭
4. GitHub 저장소 연결 및 승인
5. 저장소 선택

### 3. 빌드 설정

다음과 같이 설정:

```
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 18 (또는 최신)
```

### 4. 환경 변수 (선택사항)

특별한 환경 변수는 필요하지 않습니다.

### 5. 배포

**Save and Deploy** 클릭! 🎉

- 첫 배포는 2-3분 소요
- 이후 Git push 시 자동 배포

## 🌐 커스텀 도메인 연결

### Cloudflare에서 도메인 관리 시

1. Pages 프로젝트 → **Custom domains** 탭
2. **Set up a custom domain** 클릭
3. 도메인 입력 (예: `pdf-converter.yourdomain.com`)
4. 자동으로 DNS 레코드 생성됨

### 외부 도메인 사용 시

1. Pages에서 CNAME 레코드 정보 확인
2. 도메인 제공업체에서 CNAME 레코드 추가:
   ```
   Type: CNAME
   Name: pdf-converter (또는 원하는 서브도메인)
   Value: your-project.pages.dev
   ```

## 💰 AdSense 설정

### 1. Google AdSense 신청

1. [Google AdSense](https://www.google.com/adsense/) 접속
2. **시작하기** 클릭
3. 사이트 URL 입력 (커스텀 도메인 권장)
4. 사이트에 AdSense 코드 추가 (임시)
5. 심사 신청 (1-2주 소요)

### 2. ads.txt 업데이트

승인 후 `public/ads.txt` 파일에 Publisher ID 추가:

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

### 3. 광고 코드 삽입

`src/App.tsx`에서 광고 placeholder 교체:

```tsx
{/* 기존 */}
<div className="ad-placeholder">
  <p>[ AdSense 광고 영역 - 상단 ]</p>
</div>

{/* 광고 코드로 교체 */}
<ins className="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### 4. 재배포

```bash
git add .
git commit -m "Add AdSense ads"
git push
```

## 📊 분석 도구 추가 (선택)

### Google Analytics

`index.html`의 `<head>` 섹션에 추가:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Cloudflare Web Analytics (무료)

1. Cloudflare Dashboard → **Web Analytics**
2. 사이트 추가
3. 제공된 스크립트를 `index.html`에 추가

## 🔒 보안 설정 (권장)

### 1. HTTPS 강제

Cloudflare Pages는 기본적으로 HTTPS 제공.
추가 설정 불필요.

### 2. 보안 헤더

`public/_headers` 파일 생성:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

## 📈 성능 최적화

### 1. 이미지 최적화

로고 이미지를 WebP로 변환 (선택사항):

```bash
npm install -g @squoosh/cli
squoosh-cli --webp auto src/assets/*.svg
```

### 2. Lighthouse 점수 확인

```bash
npm run build
npm run preview
# 브라우저 DevTools → Lighthouse 실행
```

## 🐛 문제 해결

### 빌드 실패

```bash
# 로컬에서 빌드 테스트
npm run build

# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

### 404 에러

- `dist` 폴더가 제대로 생성되었는지 확인
- `vite.config.ts`의 `outDir` 설정 확인

### PDF.js Worker 에러

브라우저 콘솔에 worker 에러가 보이면 `pdfConverter.ts`의 CDN URL 확인:

```typescript
pdfjsLib.GlobalWorkerOptions.workerSrc = 
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
```

## 💡 팁

1. **프리뷰 배포**: PR마다 자동으로 프리뷰 URL 생성됨
2. **롤백**: Cloudflare Pages에서 이전 배포로 쉽게 롤백 가능
3. **무료 플랜**: 월 500회 빌드, 무제한 대역폭
4. **커밋 메시지**: 명확한 커밋 메시지로 배포 이력 관리

## 📞 지원

- [Cloudflare Pages 문서](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [프로젝트 이슈](https://github.com/YOUR_USERNAME/YOUR_REPO/issues)

