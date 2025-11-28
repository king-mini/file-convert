const ko = {
  common: {
    comingSoon: '곧 출시',
    loading: '로딩 중...',
    dropzone: {
      pdf: 'PDF 파일을 드래그하거나 클릭하여 선택',
      pdfMultiple: 'PDF 파일을 드래그하거나 클릭하여 선택 (여러 파일 가능)',
      image: '이미지를 드래그하거나 클릭하여 선택하세요',
    },
    buttons: {
      selectFile: '파일 선택',
      selectPdf: 'PDF 선택',
      selectImages: '이미지 선택',
      otherImage: '🖼️ 다른 이미지',
      copy: '📋 복사',
      copied: '✓ 복사됨',
      save: '💾 저장',
      retry: '🔄 다시 적용',
    },
    validation: {
      pdfOnly: 'PDF 파일만 업로드 가능합니다.',
      pdfOnlySelect: 'PDF 파일만 선택할 수 있습니다.',
      imageOnly: '이미지 파일만 업로드 가능합니다.',
      maxImageSize: '{{limit}}MB 이하의 파일만 지원합니다.',
      minPdfFiles: '최소 2개의 PDF 파일이 필요합니다.',
      validRanges: '유효한 범위를 입력하세요. (예: {{example}})',
      validPages: '유효한 페이지 번호를 입력하세요. (예: {{example}})',
      validPagesSimple: '유효한 페이지 번호를 입력하세요.',
    },
    errors: {
      convert: '변환 중 오류가 발생했습니다.',
      extract: '텍스트 추출 중 오류가 발생했습니다.',
      merge: '병합 중 오류가 발생했습니다.',
      split: '분할 중 오류가 발생했습니다.',
      rotate: '회전 중 오류가 발생했습니다.',
      compress: '압축 중 오류가 발생했습니다.',
      process: '처리 중 오류가 발생했습니다. 다시 시도해주세요.',
      clipboard: '클립보드 복사에 실패했습니다.',
    },
    success: {
      merge: 'PDF 병합이 완료되었습니다!',
      split: 'PDF 분할이 완료되었습니다!',
      rotate: 'PDF 회전이 완료되었습니다!',
      compress: 'PDF 압축이 완료되었습니다!',
      pdfCreated: 'PDF 생성이 완료되었습니다!',
      copy: '텍스트가 클립보드에 복사되었습니다!',
    },
    status: {
      starting: '시작 중...',
      processing: '처리 중...',
      converting: '변환 중...',
      pdfLoadingComplete: 'PDF 로딩 완료',
      zipPreparing: 'ZIP 파일 생성 중...',
      pdfGenerating: 'PDF 생성 중...',
      done: '완료!',
      doneWithRatio: '완료! ({{ratio}}% 압축)',
      pageConverting: '페이지 {{current}}/{{total}} 변환 중...',
      pageCompressing: '페이지 {{current}}/{{total}} 압축 중...',
      pageSplitting: '페이지 {{current}}/{{total}} 분할 중...',
      rangeCreating: '범위 {{current}}/{{total}} 생성 중...',
      pageExtracting: '페이지 {{current}}/{{total}} 텍스트 추출 중...',
      pageExtractSingle: '페이지 {{page}} 추출 중...',
      pageRotating: '페이지 {{page}} 회전 중...',
      pdfMergeStart: 'PDF 병합 시작...',
      pdfMergingFile: '{{fileName}} 병합 중...',
      extractingFinished: '추출 완료!',
    },
    hints: {
      viewLarge: '클릭하여 크게 보기',
      chooseAnother: '다른 이미지 선택',
    },
    messages: {
      noText: '(텍스트 없음)',
    },
    units: {
      page: '페이지',
    },
  },
  nav: {
    pdf: '📄 PDF 작업',
    image: '🖼️ 이미지 편집',
  },
  header: {
    lang: {
      label: '언어',
      ko: '한국어',
      en: 'English',
    },
  },
  hub: {
    hero: {
      title: '무엇을 도와드릴까요?',
    },
    categories: {
      pdf: {
        title: 'PDF 작업',
        desc: 'PDF 변환, 병합, 분할, 회전 등',
        count: '8개 도구',
      },
      image: {
        title: '이미지 편집',
        desc: '배경 제거, 리사이즈 등',
        count: '6개 도구',
        badge: 'BETA',
      },
    },
    features: {
      client: {
        title: '100% 클라이언트 사이드',
        desc: '파일 업로드 없이 브라우저에서 처리',
      },
      privacy: {
        title: '개인정보 보호',
        desc: '모든 파일이 기기에서 처리됩니다',
      },
      free: {
        title: '무료 제공',
        desc: '회원가입 없이 바로 사용',
      },
    },
  },
  imageHome: {
    heroTitle: '🖼️ 이미지 편집',
    heroSubtitle: '브라우저에서 빠르게 편집하세요',
    features: {
      portraitBlur: {
        title: 'Portrait Blur',
        description: '인물 배경 흐리기',
      },
      backgroundRemove: {
        title: 'Background Remove',
        description: '이미지 배경 제거',
      },
      imageResize: {
        title: 'Image Resize',
        description: '이미지 크기 조절',
      },
      imageCompress: {
        title: 'Image Compress',
        description: '이미지 용량 줄이기',
      },
      formatConvert: {
        title: 'Format Convert',
        description: 'PNG/JPG/WebP 변환',
      },
      imageCrop: {
        title: 'Image Crop',
        description: '이미지 자르기',
      },
    },
  },
  footer: {
    notice: '© 2025 Lokit · 모든 작업은 서버에 업로드되지 않고 안전하게 처리됩니다',
  },
  pages: {
    pdf: {
      home: {
        hero: {
          title: '📄 PDF 도구',
          subtitle: '브라우저에서 안전하게 변환하세요',
        },
        features: {
          toJpg: {
            title: 'PDF → JPG',
            description: 'PDF를 JPG 이미지로 변환',
          },
          toPng: {
            title: 'PDF → PNG',
            description: 'PDF를 PNG 이미지로 변환',
          },
          toText: {
            title: 'PDF → Text',
            description: 'PDF에서 텍스트 추출',
          },
          imageToPdf: {
            title: 'Image → PDF',
            description: '이미지를 PDF로 변환',
          },
          merge: {
            title: 'PDF 병합',
            description: '여러 PDF 파일 병합',
          },
          split: {
            title: 'PDF 분할',
            description: 'PDF 페이지 분할',
          },
          rotate: {
            title: 'PDF 회전',
            description: 'PDF 페이지 회전',
          },
          compress: {
            title: 'PDF 압축',
            description: 'PDF 파일 크기 압축',
          },
        },
        benefits: {
          client: {
            title: '100% 클라이언트 사이드',
            description: '서버 업로드 없이 브라우저에서 직접 처리',
          },
          privacy: {
            title: '개인정보 보호',
            description: '모든 파일은 사용자의 브라우저에서만 처리',
          },
          free: {
            title: '무료 무제한',
            description: '제한 없이 무료로 사용 가능',
          },
        },
      },
      toJpg: {
        hero: {
          title: '📄 PDF to JPG Converter',
          description: '브라우저에서 안전하게 변환 · 서버 업로드 없음',
        },
        options: {
          title: '변환 옵션',
          quality: 'JPG 품질: {{value}}%',
          resolution: '해상도',
          pageRange: '페이지 범위 지정',
        },
        actions: {
          start: '🚀 변환 시작',
        },
      },
      toPng: {
        hero: {
          title: '🎨 PDF to PNG Converter',
          description: '브라우저에서 안전하게 변환 · 투명 배경 지원',
        },
        options: {
          title: '변환 옵션',
          resolution: '해상도',
          transparent: '투명 배경 (흰색 배경 제거)',
          pageRange: '페이지 범위 지정',
        },
        actions: {
          start: '🚀 변환 시작',
        },
      },
      toText: {
        hero: {
          title: '📝 PDF to Text Converter',
          description: 'PDF에서 텍스트를 추출하세요',
        },
        actions: {
          extract: '📝 텍스트 추출',
          extracting: '추출 중...',
        },
        result: {
          title: '추출된 텍스트 ({{count}} 페이지)',
          copyAll: '📋 전체 복사',
          saveTxt: '💾 TXT 저장',
          pageLabel: '페이지 {{page}}',
        },
        textFile: {
          separator: '========== 페이지 {{page}} ==========\n\n',
        },
      },
      imageToPdf: {
        hero: {
          title: '🖼️ Image to PDF Converter',
          description: '여러 이미지를 하나의 PDF로 변환하세요',
        },
        upload: {
          hint: '이미지 파일을 드래그하거나 클릭하여 선택 (JPG, PNG, GIF, WebP)',
        },
        list: {
          title: '선택된 이미지 ({{count}}개)',
          moveUp: '위로',
          moveDown: '아래로',
          delete: '삭제',
        },
        options: {
          title: '변환 옵션',
          pageSize: '페이지 크기',
          pageSizeOptions: {
            a4: 'A4',
            letter: 'Letter',
            auto: '자동 (이미지 크기에 맞춤)',
          },
          orientation: '페이지 방향',
          orientationOptions: {
            portrait: '세로 (Portrait)',
            landscape: '가로 (Landscape)',
          },
          margin: '여백: {{value}}mm',
        },
        actions: {
          create: '📄 PDF 생성',
          processing: '변환 중... ({{current}}/{{total}})',
        },
      },
      merge: {
        hero: {
          title: '🔗 Merge PDF',
          description: '여러 PDF를 하나로 병합하세요',
        },
        upload: {
          hint: 'PDF 파일을 드래그하거나 클릭하여 선택 (여러 파일 가능)',
        },
        list: {
          title: '선택된 PDF ({{count}}개)',
          pageCount: '{{count}} 페이지',
          summary: '총 {{count}} 페이지가 병합됩니다',
          moveUp: '위로',
          moveDown: '아래로',
          delete: '삭제',
        },
        actions: {
          merge: '🔗 PDF 병합',
          merging: '병합 중... ({{current}}/{{total}})',
        },
        errors: {
          noFiles: '병합할 PDF가 없습니다.',
        },
      },
      split: {
        hero: {
          title: '✂️ Split PDF',
          description: 'PDF를 여러 파일로 분할하세요',
        },
        options: {
          title: '분할 옵션',
          mode: '분할 방식',
          modes: {
            each: {
              title: '각 페이지',
              description: '모든 페이지를 개별 파일로',
            },
            range: {
              title: '범위별',
              description: '지정한 범위로 분할',
            },
            extract: {
              title: '페이지 추출',
              description: '특정 페이지만 추출',
            },
          },
          rangeLabel: '페이지 범위',
          rangePlaceholder: '예: 1-5, 6-10, 11-15',
          rangeHint: '쉼표로 구분하여 여러 범위를 입력하세요',
          extractLabel: '추출할 페이지',
          extractPlaceholder: '예: 1,3,5-7,10',
          extractHint: '페이지 번호를 쉼표로 구분하세요. 범위 지원',
        },
        actions: {
          split: '✂️ PDF 분할',
          splitting: '분할 중...',
        },
      },
      rotate: {
        hero: {
          title: '🔄 Rotate PDF',
          description: 'PDF 페이지를 회전하세요',
        },
        options: {
          title: '회전 옵션',
          angle: '회전 각도',
          angles: {
            right: '90° 오른쪽',
            half: '180°',
            left: '90° 왼쪽',
          },
          applyAll: '모든 페이지에 적용',
          pageInputPlaceholder: '예: 1,3,5-7',
          pageInputHint: '페이지 번호를 쉼표로 구분하세요. 범위는 하이픈으로 표시 (예: 1-5)',
        },
        actions: {
          rotate: '🔄 PDF 회전',
          rotating: '회전 중...',
        },
      },
      compress: {
        hero: {
          title: '📦 Compress PDF',
          description: 'PDF 파일 크기를 압축하세요',
        },
        warning: {
          title: '주의사항',
          description: '압축 시 텍스트 선택 및 복사 기능이 제거됩니다. (이미지 기반 PDF로 변환)',
        },
        fileInfo: {
          original: '원본 크기: {{size}}',
        },
        options: {
          title: '압축 수준',
          levels: {
            low: {
              title: '낮음',
              desc: '품질 우선 (90%)',
              info: '약 20-30% 압축',
            },
            medium: {
              title: '중간',
              desc: '균형 (70%)',
              info: '약 40-60% 압축',
            },
            high: {
              title: '높음',
              desc: '크기 우선 (50%)',
              info: '약 60-80% 압축',
            },
            extreme: {
              title: '최대',
              desc: '최소 크기 (30%)',
              info: '약 80-90% 압축',
            },
          },
        },
        actions: {
          compress: '📦 PDF 압축',
          compressing: '압축 중...',
        },
      },
    },
    image: {
      portraitBlur: {
        hero: {
          title: '🎭 Portrait Blur',
          description: '인물은 선명하게, 배경은 흐리게',
        },
        upload: {
          hint: '이미지를 드래그하거나 클릭하여 선택하세요',
          support: 'JPG, PNG, WebP (최대 10MB)',
        },
        panels: {
          original: '원본',
          result: '결과',
        },
        placeholders: {
          result: '블러 적용 후 결과가 표시됩니다',
        },
        options: {
          blurStrength: '블러 강도: {{value}}px',
          rangeSoft: '약하게',
          rangeStrong: '강하게',
        },
        progress: {
          label: '배경 블러 처리 중...',
        },
        actions: {
          apply: '✨ 배경 블러 적용',
        },
        modal: {
          original: '원본',
          result: '결과',
        },
        info: {
          viewLarge: '클릭하여 크게 보기',
        },
      },
      backgroundRemove: {
        hero: {
          title: '✨ Background Remove',
          description: '이미지 배경을 깔끔하게 제거하세요',
        },
        upload: {
          hint: '이미지를 드래그하거나 클릭하여 선택하세요',
          support: 'JPG, PNG, WebP (최대 10MB)',
        },
        panels: {
          original: '원본',
          result: '결과',
        },
        placeholders: {
          result: '배경 제거 후 결과가 표시됩니다',
        },
        options: {
          model: '모델 정밀도',
          fast: '⚡ 빠름',
          quality: '🎯 정밀',
          edgeBlur: '엣지 부드럽기: {{value}}px',
          edgeLabels: {
            sharp: '날카롭게',
            smooth: '부드럽게',
          },
        },
        info: {
          output: '💡 결과는 투명 배경 PNG 파일로 저장됩니다',
        },
        progress: {
          label: '배경 제거 중...',
        },
        actions: {
          apply: '✨ 배경 제거',
          savePng: '💾 PNG 저장',
        },
      },
      imageResize: {
        hero: {
          title: '📐 Image Resize',
          description: '이미지 크기를 자유롭게 조정하세요',
        },
        upload: {
          hint: '이미지를 드래그하거나 클릭하여 선택하세요',
          support: 'JPG, PNG, WebP (최대 20MB)',
        },
        panels: {
          original: '원본 ({{width}} × {{height}})',
          result: '결과 ({{width}} × {{height}})',
        },
        placeholders: {
          result: '크기 조정 후 결과가 표시됩니다',
        },
        options: {
          mode: '크기 조정 방식',
          percentage: '📊 비율',
          dimensions: '📏 직접 입력',
          sizeLabel: '크기: {{value}}%',
          sizeRangeMin: '10%',
          sizeRangeMax: '200%',
          widthLabel: '너비 (px)',
          heightLabel: '높이 (px)',
          linkOn: '비율 고정 해제',
          linkOff: '비율 고정',
          qualityLabel: '품질: {{value}}%',
          qualityLow: '낮음',
          qualityHigh: '높음',
        },
        placeholdersExtra: {
          processing: '처리 중...',
        },
        modal: {
          title: '확대 이미지',
        },
        actions: {
          resize: '📐 크기 조정',
        },
      },
      imageCompress: {
        hero: {
          title: '🗜️ Image Compress',
          description: '이미지 용량을 효과적으로 줄이세요',
        },
        upload: {
          hint: '이미지를 드래그하거나 클릭하여 선택하세요',
          support: 'JPG, PNG, WebP (최대 50MB)',
        },
        panels: {
          original: '원본 ({{size}})',
          result: '결과',
        },
        placeholders: {
          result: '압축 후 결과가 표시됩니다',
        },
        options: {
          qualityLabel: '압축 품질: {{value}}%',
          qualityHints: {
            high: '고품질',
            medium: '중간',
            low: '저용량',
          },
          rangeLabels: {
            min: '저용량',
            max: '고품질',
          },
          maxWidth: '최대 너비:',
          maxWidthUnlimited: '제한 없음',
          presets: {
            original: '원본',
            w1920: '1920px',
            w1280: '1280px',
            w800: '800px',
          },
        },
        stats: {
          original: '원본',
          result: '압축 후',
          saved: '절감',
        },
        actions: {
          compress: '🗜️ 압축하기',
        },
      },
      formatConvert: {
        hero: {
          title: '🔄 Format Convert',
          description: '이미지 포맷을 자유롭게 변환하세요',
        },
        upload: {
          hint: '이미지를 드래그하거나 클릭하여 선택하세요',
          support: '모든 이미지 포맷 지원 (최대 50MB)',
        },
        flow: {
          original: '원본',
          target: '변환',
          unknown: '알 수 없음',
        },
        formatInfo: {
          jpeg: {
            name: 'JPEG',
            desc: '사진에 최적, 작은 용량',
          },
          png: {
            name: 'PNG',
            desc: '투명 배경 지원, 무손실',
          },
          webp: {
            name: 'WebP',
            desc: '최신 포맷, 최고의 압축률',
          },
        },
        options: {
          title: '출력 포맷',
          qualityLabel: '품질: {{value}}%',
          rangeLabels: {
            min: '저용량',
            max: '고품질',
          },
        },
        actions: {
          convert: '🔄 변환하기',
        },
      },
      imageCrop: {
        hero: {
          title: '✂️ Image Crop',
          description: '이미지를 원하는 영역만 잘라내세요',
        },
        upload: {
          hint: '이미지를 드래그하거나 클릭하여 선택하세요',
          support: 'JPG, PNG, WebP (최대 50MB)',
        },
        options: {
          ratio: '비율',
          buttons: {
            free: '자유',
            '1:1': '1:1',
            '4:3': '4:3',
            '16:9': '16:9',
            '3:2': '3:2',
            '2:3': '2:3',
          },
        },
        panels: {
          result: '결과 ({{width}} × {{height}})',
        },
        actions: {
          crop: '✂️ 자르기',
          recrop: '✂️ 다시 자르기',
        },
      },
    },
  },
};

export default ko;
