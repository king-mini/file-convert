const en = {
  common: {
    comingSoon: 'Coming soon',
    loading: 'Loading...',
    dropzone: {
      pdf: 'Drag or click to add PDF files',
      pdfMultiple: 'Drag or click to add PDFs (multiple files supported)',
      image: 'Drag or click to add an image',
    },
    buttons: {
      selectFile: 'Choose file',
      selectPdf: 'Choose PDFs',
      selectImages: 'Choose images',
      otherImage: '🖼️ Pick another image',
      copy: '📋 Copy',
      copied: '✅ Copied',
      save: '💾 Save',
      retry: '🔁 Apply again',
      cancel: 'Cancel',
      submit: 'Submit',
    },
    links: {
      seeGuide: 'See guide',
    },
    validation: {
      pdfOnly: 'Only PDF files are supported.',
      pdfOnlySelect: 'You can select PDF files only.',
      imageOnly: 'Only image files are supported.',
      maxImageSize: 'Only files up to {{limit}}MB are supported.',
      minPdfFiles: 'At least two PDF files are required.',
      validRanges: 'Enter a valid range. (ex: {{example}})',
      validPages: 'Enter valid page numbers. (ex: {{example}})',
      validPagesSimple: 'Enter valid page numbers.',
    },
    errors: {
      convert: 'Something went wrong while converting.',
      extract: 'Something went wrong while extracting text.',
      merge: 'Something went wrong while merging.',
      split: 'Something went wrong while splitting.',
      rotate: 'Something went wrong while rotating.',
      compress: 'Something went wrong while compressing.',
      process: 'Something went wrong. Please try again.',
      clipboard: 'Failed to copy to clipboard.',
    },
    success: {
      merge: 'PDF merge completed!',
      split: 'PDF split completed!',
      rotate: 'PDF rotation completed!',
      compress: 'PDF compression completed!',
      pdfCreated: 'PDF file created!',
      copy: 'Copied text to clipboard!',
    },
    status: {
      starting: 'Starting...',
      processing: 'Processing...',
      converting: 'Converting...',
      pdfLoadingComplete: 'PDF loaded',
      zipPreparing: 'Preparing ZIP...',
      pdfGenerating: 'Generating PDF...',
      done: 'Done!',
      doneWithRatio: 'Done! ({{ratio}}% smaller)',
      pageConverting: 'Converting page {{current}}/{{total}}...',
      pageCompressing: 'Compressing page {{current}}/{{total}}...',
      pageSplitting: 'Splitting page {{current}}/{{total}}...',
      rangeCreating: 'Creating range {{current}}/{{total}}...',
      pageExtracting: 'Extracting text {{current}}/{{total}}...',
      pageExtractSingle: 'Extracting page {{page}}...',
      pageRotating: 'Rotating page {{page}}...',
      pdfMergeStart: 'Starting PDF merge...',
      pdfMergingFile: 'Merging {{fileName}}...',
      extractingFinished: 'Extraction finished!',
    },
    hints: {
      viewLarge: 'Click to view larger',
      chooseAnother: 'Pick another image',
    },
    messages: {
      noText: '(No text)',
    },
    units: {
      page: 'pages',
    },
  },
  components: {
    passwordModal: {
      title: 'Password Required',
      description: 'This file is encrypted. Please enter the password to proceed.',
      placeholder: 'Enter password',
      error: 'Incorrect password. Please try again.',
    },
  },
  nav: {
    pdf: '📄 PDF Tools',
    image: '🖼️ Image Tools',
  },
  header: {
    lang: {
      label: 'Language',
      ko: '한국어',
      en: 'English',
    },
  },
  breadcrumbs: {
    imageTools: 'Image Tools',
    backgroundBlur: 'Background Blur',
    backgroundRemove: 'Background Remove',
    imageResize: 'Image Resize',
    imageCompress: 'Image Compress',
    formatConvert: 'Format Convert',
    imageCrop: 'Image Crop',
  },
  meta: {
    description: 'Lokit - Free online PDF & Image tools. Convert PDF to Word, JPG, PNG. Merge, Split, Compress PDF files securely in your browser. No signup required.',
    privacy: {
      title: 'Privacy Policy - Lokit',
      description: 'Lokit Privacy Policy. All files are processed only in your browser and are not uploaded to any server.',
    },
    terms: {
      title: 'Terms of Service - Lokit',
      description: 'Lokit Terms of Service. Check service usage conditions and restrictions.',
    },
    licenses: {
      title: 'Open Source Licenses - Lokit',
      description: 'Open source libraries and license information used by Lokit.',
    },
  },
  locale: 'en-US',
  hub: {
    hero: {
      title: 'What can we help you with?',
    },
    categories: {
      pdf: {
        title: 'PDF Tools',
        desc: 'Convert, merge, split, rotate, and compress PDF files online for free.',
        count: '8 tools',
      },
      image: {
        title: 'Image Tools',
        desc: 'Remove background, resize, blur, and convert images online.',
        count: '6 tools',
        badge: 'BETA',
      },
    },
    features: {
      client: {
        title: '100% client-side',
        desc: 'Handle every task directly in the browser with no uploads',
      },
      privacy: {
        title: 'Privacy first',
        desc: 'Every file stays on your device with no external transfer',
      },
      free: {
        title: 'Free to use',
        desc: 'Unlimited access with no account required',
      },
    },
  },
  imageHome: {
    heroTitle: 'Free Online Image Tools - Background Blur, Remove & More',
    heroSubtitle: '6 free photo editing tools for fast, professional results',
    features: {
      portraitBlur: {
        title: 'Background Blur',
        description: 'Blur background for portraits',
      },
      backgroundRemove: {
        title: 'Background Remove',
        description: 'Remove image backgrounds',
      },
      imageResize: {
        title: 'Image Resize',
        description: 'Change dimensions safely',
      },
      imageCompress: {
        title: 'Image Compress',
        description: 'Reduce file size',
      },
      formatConvert: {
        title: 'Format Convert',
        description: 'PNG/JPG/WebP',
      },
      imageCrop: {
        title: 'Image Crop',
        description: 'Trim and straighten',
      },
    },
  },
  footer: {
    notice: '© 2025 Lokit · Everything is processed safely in your browser without uploads',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    licenses: 'Open Source Licenses',
  },
  policy: {
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: 2025-01-27',
      sections: {
        overview: {
          title: '1. Overview',
          content: 'Lokit ("Service") takes your privacy very seriously. This Privacy Policy explains what information we collect when you use our Service and how we use it.',
        },
        fileProcessing: {
          title: '2. File Processing',
          content: 'This Service operates 100% client-side:',
          item1: 'All files are processed only in your browser',
          item2: 'Files are not uploaded to any server',
          item3: 'Files are immediately deleted from memory after processing',
          item4: 'Files are not stored in cookies or local storage',
        },
        dataCollection: {
          title: '3. Information We Collect',
          content: 'This Service may collect the following information:',
          analytics: {
            title: 'Google Analytics',
            content: 'We collect anonymous analytics data such as page visits and usage patterns. No personally identifiable information is included.',
          },
          ads: {
            title: 'Google AdSense',
            content: 'We collect information about ad impressions and clicks. Cookies may be used to collect advertising-related data.',
          },
        },
        cookies: {
          title: '4. Cookie Usage',
          content: 'This Service may use cookies for the following purposes:',
          item1: 'Analytics cookies: Usage pattern analysis through Google Analytics',
          item2: 'Advertising cookies: Personalized ads through Google AdSense',
          item3: 'Settings cookies: Storing user preferences (optional)',
          note: 'You can delete or block cookies at any time through your browser settings.',
        },
        contact: {
          title: '5. Contact',
          content: 'If you have any questions about this Privacy Policy, please contact us through the GitHub repository issues.',
        },
      },
    },
    terms: {
      title: 'Terms of Service',
      updated: 'Last updated: 2025-01-27',
      sections: {
        acceptance: {
          title: '1. Acceptance of Terms',
          content: 'By using this Service, you agree to these Terms of Service. If you do not agree, you may not use the Service.',
        },
        service: {
          title: '2. Service Provision',
          content: 'This Service is provided as follows:',
          item1: 'This Service is provided "AS-IS"',
          item2: 'We do not guarantee the quality or results of conversions',
          item3: 'Please backup important documents before processing',
        },
        restrictions: {
          title: '3. Usage Restrictions',
          content: 'The following activities are prohibited:',
          item1: 'Processing illegal content',
          item2: 'Processing content that infringes copyright',
          item3: 'Excessive use that harms service stability',
          item4: 'Attempts to bypass technical security of the Service',
        },
        disclaimer: {
          title: '4. Disclaimer',
          content: 'This Service is not responsible for:',
          item1: 'Data loss or conversion failures',
          item2: 'Service interruptions or errors',
          item3: 'Direct or indirect damages resulting from use of the Service',
        },
        changes: {
          title: '5. Changes to Terms',
          content: 'These Terms may be changed without prior notice. Changes will be posted on this page, and continued use of the Service constitutes acceptance of the modified Terms.',
        },
      },
    },
    licenses: {
      title: 'Open Source Licenses',
      updated: 'Last updated: 2025-01-27',
      intro: 'This Service uses the following open source libraries. Each library follows its respective project license.',
    },
  },
  pages: {
    pdf: {
      home: {
        hero: {
          title: 'Free Online PDF Tools - Convert, Merge & Split PDFs',
          subtitle: '8 powerful tools to process PDFs quickly and securely in your browser',
        },
        features: {
          toJpg: {
            title: 'PDF → JPG',
            description: 'Convert PDFs to JPG images',
          },
          toPng: {
            title: 'PDF → PNG',
            description: 'Convert PDFs to PNG images',
          },
          toText: {
            title: 'PDF → Text',
            description: 'Extract text from a PDF',
          },
          imageToPdf: {
            title: 'Image → PDF',
            description: 'Convert images into PDFs',
          },
          merge: {
            title: 'Merge PDFs',
            description: 'Combine multiple PDF files',
          },
          split: {
            title: 'Split PDF',
            description: 'Split PDF pages into files',
          },
          rotate: {
            title: 'Rotate PDF',
            description: 'Rotate PDF pages',
          },
          compress: {
            title: 'Compress PDF',
            description: 'Reduce PDF file size',
          },
        },
        benefits: {
          client: {
            title: '100% client-side',
            description: 'Handle every task directly in the browser, no uploads',
          },
          privacy: {
            title: 'Privacy protection',
            description: 'Every file stays on your device with no external transfer',
          },
          free: {
            title: 'Unlimited free',
            description: 'Use every tool without limits or accounts',
          },
        },
      },
      toJpg: {
        hero: {
          title: 'Convert PDF to JPG Online',
          description: 'Free tool to convert PDF pages to high-quality JPG images securely.',
        },
        options: {
          title: 'Conversion options',
          quality: 'JPG quality: {{value}}%',
          resolution: 'Resolution',
          pageRange: 'Specify page range',
        },
        actions: {
          start: '🚀 Start conversion',
        },
      },
      toPng: {
        hero: {
          title: 'Convert PDF to PNG Online',
          description: 'Free tool to convert PDF pages to PNG images with transparency support.',
        },
        options: {
          title: 'Conversion options',
          resolution: 'Resolution',
          transparent: 'Transparent background (remove white)',
          pageRange: 'Specify page range',
        },
        actions: {
          start: '🚀 Start conversion',
        },
      },
      toText: {
        hero: {
          title: 'Extract Text from PDF',
          description: 'Free online tool to extract text content from PDF files.',
        },
        actions: {
          extract: '📝 Extract text',
          extracting: 'Extracting...',
        },
        result: {
          title: 'Extracted text ({{count}} pages)',
          copyAll: '📋 Copy all',
          saveTxt: '💾 Save as TXT',
          pageLabel: 'Page {{page}}',
        },
        textFile: {
          separator: '========== Page {{page}} ==========\n\n',
        },
      },
      imageToPdf: {
        hero: {
          title: 'Convert Images to PDF',
          description: 'Combine JPG, PNG, WebP images into a single PDF document.',
        },
        upload: {
          hint: 'Drag or click to add JPG, PNG, GIF, or WebP images',
        },
        list: {
          title: 'Selected images ({{count}})',
          moveUp: 'Move up',
          moveDown: 'Move down',
          delete: 'Remove',
        },
        options: {
          title: 'Conversion options',
          pageSize: 'Page size',
          pageSizeOptions: {
            a4: 'A4',
            letter: 'Letter',
            auto: 'Auto (match image size)',
          },
          orientation: 'Orientation',
          orientationOptions: {
            portrait: 'Portrait',
            landscape: 'Landscape',
          },
          margin: 'Margin: {{value}}mm',
        },
        actions: {
          create: '📄 Create PDF',
          processing: 'Converting... ({{current}}/{{total}})',
        },
      },
      merge: {
        hero: {
          title: 'Merge PDF Files Online',
          description: 'Combine multiple PDF files into one document for free.',
        },
        upload: {
          hint: 'Drag or click to add PDFs (multiple files supported)',
        },
        list: {
          title: 'Selected PDFs ({{count}})',
          pageCount: '{{count}} pages',
          summary: 'Merging {{count}} pages in total',
          moveUp: 'Move up',
          moveDown: 'Move down',
          delete: 'Remove',
        },
        actions: {
          merge: '🔗 Merge PDFs',
          merging: 'Merging... ({{current}}/{{total}})',
        },
        errors: {
          noFiles: 'No PDFs to merge.',
        },
      },
      split: {
        hero: {
          title: 'Split PDF Files Online',
          description: 'Separate PDF pages or extract specific pages into new files.',
        },
        options: {
          title: 'Split options',
          mode: 'Split mode',
          modes: {
            each: {
              title: 'Each page',
              description: 'Export every page as a file',
            },
            range: {
              title: 'By range',
              description: 'Split by custom ranges',
            },
            extract: {
              title: 'Extract pages',
              description: 'Pick specific pages only',
            },
          },
          rangeLabel: 'Page ranges',
          rangePlaceholder: 'e.g. 1-5, 6-10, 11-15',
          rangeHint: 'Separate multiple ranges with commas',
          extractLabel: 'Pages to extract',
          extractPlaceholder: 'e.g. 1,3,5-7,10',
          extractHint: 'Use commas for pages, hyphen for ranges',
        },
        actions: {
          split: '✂️ Split PDF',
          splitting: 'Splitting...',
        },
      },
      rotate: {
        hero: {
          title: 'Rotate PDF Pages',
          description: 'Permanently rotate PDF pages 90 or 180 degrees online.',
        },
        options: {
          title: 'Rotation options',
          angle: 'Rotation angle',
          angles: {
            right: '90° clockwise',
            half: '180°',
            left: '90° counterclockwise',
          },
          applyAll: 'Apply to every page',
          pageInputPlaceholder: 'e.g. 1,3,5-7',
          pageInputHint: 'Separate with commas. Use a hyphen for ranges (e.g. 1-5)',
        },
        actions: {
          rotate: '🔄 Rotate PDF',
          rotating: 'Rotating...',
        },
      },
      compress: {
        hero: {
          title: 'Compress PDF Online',
          description: 'Reduce PDF file size while maintaining quality for free.',
        },
        warning: {
          title: 'Notice',
          description: 'Compression turns pages into images, so text selection is removed.',
        },
        fileInfo: {
          original: 'Original size: {{size}}',
        },
        options: {
          title: 'Compression level',
          levels: {
            low: {
              title: 'Low',
              desc: 'Quality first (90%)',
              info: 'About 20-30% smaller',
            },
            medium: {
              title: 'Medium',
              desc: 'Balanced (70%)',
              info: 'About 40-60% smaller',
            },
            high: {
              title: 'High',
              desc: 'Size first (50%)',
              info: 'About 60-80% smaller',
            },
            extreme: {
              title: 'Max',
              desc: 'Minimum size (30%)',
              info: 'About 80-90% smaller',
            },
          },
        },
        actions: {
          compress: '📦 Compress PDF',
          compressing: 'Compressing...',
        },
      },
    },
    image: {
      portraitBlur: {
        hero: {
          title: 'Free Online Background Blur Tool - Blur Photo Background Instantly',
          description: 'Perfect for portraits, profile photos, and headshots. Free, no signup required, 100% private',
        },
        guideLink: 'See guide',
        upload: {
          hint: 'Drag or click to add an image',
          support: 'JPG, PNG, WebP (max 25MB)',
        },
        panels: {
          original: 'Original',
          result: 'Result',
        },
        placeholders: {
          result: 'The blurred result will appear here',
        },
        options: {
          blurStrength: 'Blur strength: {{value}}px',
          rangeSoft: 'Soft',
          rangeStrong: 'Strong',
        },
        progress: {
          label: 'Blurring the background...',
        },
        actions: {
          apply: '✨ Apply portrait blur',
        },
        modal: {
          original: 'Original',
          result: 'Result',
        },
        info: {
          viewLarge: 'Click to view larger',
        },
        highlights: {
          eyebrow: 'Why Lokit',
          title: 'One-click blur, pro-level privacy',
          subtitle: 'Process portraits securely in your browser—no uploads, no signup, always free.',
        },
      },
      backgroundRemove: {
        hero: {
          title: '✨ Background Remove',
          description: 'Cleanly remove the background from any image',
        },
        upload: {
          hint: 'Drag or click to add an image',
          support: 'JPG, PNG, WebP (max 25MB)',
        },
        panels: {
          original: 'Original',
          result: 'Result',
        },
        placeholders: {
          result: 'The cutout preview will appear here',
        },
        options: {
          model: 'Model quality',
          fast: '⚡ Fast',
          quality: '🎯 Precise',
          edgeBlur: 'Edge softness: {{value}}px',
          edgeLabels: {
            sharp: 'Sharper edge',
            smooth: 'Softer edge',
          },
        },
        info: {
          output: '💡 Output is saved as a transparent PNG',
        },
        progress: {
          label: 'Removing the background...',
        },
        actions: {
          apply: '✨ Remove background',
          savePng: '💾 Save PNG',
        },
      },
      imageResize: {
        hero: {
          title: '📐 Image Resize',
          description: 'Resize images exactly as you need',
        },
        upload: {
          hint: 'Drag or click to add an image',
          support: 'JPG, PNG, WebP (max 20MB)',
        },
        panels: {
          original: 'Original ({{width}} × {{height}})',
          result: 'Result ({{width}} × {{height}})',
        },
        placeholders: {
          result: 'The resized image will appear here',
        },
        options: {
          mode: 'Resize mode',
          percentage: '📊 Scale by percentage',
          dimensions: '📏 Enter exact size',
          sizeLabel: 'Size: {{value}}%',
          sizeRangeMin: '10%',
          sizeRangeMax: '200%',
          widthLabel: 'Width (px)',
          heightLabel: 'Height (px)',
          linkOn: 'Unlock aspect ratio',
          linkOff: 'Lock aspect ratio',
          qualityLabel: 'Quality: {{value}}%',
          qualityLow: 'Lower',
          qualityHigh: 'Higher',
        },
        placeholdersExtra: {
          processing: 'Processing...',
        },
        modal: {
          title: 'Zoomed preview',
        },
        actions: {
          resize: '📐 Resize image',
        },
      },
      imageCompress: {
        hero: {
          title: '🗜️ Image Compress',
          description: 'Shrink image file sizes efficiently',
        },
        upload: {
          hint: 'Drag or click to add an image',
          support: 'JPG, PNG, WebP (max 50MB)',
        },
        panels: {
          original: 'Original ({{size}})',
          result: 'Result',
        },
        placeholders: {
          result: 'The compressed preview will appear here',
        },
        options: {
          qualityLabel: 'Compression quality: {{value}}%',
          qualityHints: {
            high: 'High quality',
            medium: 'Balanced',
            low: 'Smaller size',
          },
          rangeLabels: {
            min: 'Smaller size',
            max: 'Higher quality',
          },
          maxWidth: 'Max width:',
          maxWidthUnlimited: 'Original',
          presets: {
            original: 'Original',
            w1920: '1920px',
            w1280: '1280px',
            w800: '800px',
          },
        },
        stats: {
          original: 'Original',
          result: 'Compressed',
          saved: 'Saved',
        },
        actions: {
          compress: '🗜️ Compress',
        },
      },
      formatConvert: {
        hero: {
          title: '🔄 Format Convert',
          description: 'Convert images between any formats',
        },
        upload: {
          hint: 'Drag or click to add an image',
          support: 'All image formats supported (max 50MB)',
        },
        flow: {
          original: 'Original',
          target: 'Target',
          unknown: 'Unknown',
        },
        formatInfo: {
          jpeg: {
            name: 'JPEG',
            desc: 'Great for photos, smaller size',
          },
          png: {
            name: 'PNG',
            desc: 'Lossless with transparency',
          },
          webp: {
            name: 'WebP',
            desc: 'Modern format with best compression',
          },
        },
        options: {
          title: 'Output format',
          qualityLabel: 'Quality: {{value}}%',
          rangeLabels: {
            min: 'Smaller size',
            max: 'Higher quality',
          },
        },
        actions: {
          convert: '🔄 Convert',
        },
      },
      imageCrop: {
        hero: {
          title: '✂️ Image Crop',
          description: 'Crop exactly the area you need',
        },
        upload: {
          hint: 'Drag or click to add an image',
          support: 'JPG, PNG, WebP (max 50MB)',
        },
        options: {
          ratio: 'Aspect ratio',
          buttons: {
            free: 'Free',
            '1:1': '1:1',
            '4:3': '4:3',
            '16:9': '16:9',
            '3:2': '3:2',
            '2:3': '2:3',
          },
        },
        panels: {
          result: 'Result ({{width}} × {{height}})',
        },
        actions: {
          crop: '✂️ Crop',
          recrop: '✂️ Crop again',
        },
      },
    },
  },
  guides: {
    backgroundBlur: {
      shortTitle: 'Background Blur Guide',
      toolName: 'Background Blur',
      toolPath: '/image/blur-background',
      title: 'How to Blur Background Online (Step-by-Step)',
      subtitle: 'Capture how-to searches and move users into the Background Blur tool with a short tutorial.',
      stepsTitle: 'Follow these steps',
      stepsSubtitle: 'Takes about 1-2 minutes from upload to download.',
      steps: [
        'Upload a portrait photo (JPG/PNG/WebP, up to 25MB).',
        'Adjust the blur strength so the person stays sharp.',
        'Click “Apply portrait blur” to process fully in the browser.',
        'Compare before/after, then copy or save as JPG.',
      ],
      useCasesTitle: 'Best for',
      useCasesSubtitle: 'Situations where a soft background works best.',
      useCases: [
        'Profile photos & LinkedIn headshots',
        'ID photos',
        'Event photos needing quick cleanup',
        'Product shots with distracting backgrounds',
      ],
      tipsTitle: 'Tips & common mistakes',
      tipsSubtitle: 'Quick tweaks to keep faces sharp.',
      tips: [
        'Keep the subject centered; crop before blurring if needed.',
        'Use lighter blur (5-12px) for ID-style photos to avoid halos.',
        'Increase blur for busy backgrounds, but keep edges smooth.',
        'Check the edges at 100% zoom before saving.',
      ],
      ctaUseTool: 'Open Background Blur Tool',
      ctaViewAll: 'Browse all image tools',
      finalCtaTitle: 'Ready to blur your photo?',
      finalCtaSubtitle: 'Apply the steps above and finish in one click.',
      cardDescription: 'Step-by-step tutorial with tips before using the tool.',
    },
    backgroundRemove: {
      shortTitle: 'Background Remove Guide',
      toolName: 'Background Remove',
      toolPath: '/image/bg-remove',
      title: 'Remove Image Backgrounds with AI',
      subtitle: 'Create transparent PNGs for e-commerce, resumes, and marketing decks without Photoshop.',
      stepsTitle: 'How to remove backgrounds',
      stepsSubtitle: 'AI handles the cutout while you fine-tune edges.',
      steps: [
        'Upload a JPG, PNG, or WebP up to 25MB and preview the subject.',
        'Pick Fast mode for speed or Quality mode for hair/fur accuracy.',
        'Use the Edge softness slider to smooth halos around the subject.',
        'Download the PNG with transparency or copy it to the clipboard.',
      ],
      useCasesTitle: 'Use it when',
      useCasesSubtitle: 'Precise cutouts are needed without manual masking.',
      useCases: [
        'Marketplace or catalog product shots',
        'Professional profile photos with clean backgrounds',
        'Slide decks and marketing visuals',
        'Social posts that need transparent stickers',
      ],
      tipsTitle: 'Optimization tips',
      tipsSubtitle: 'Keep cutouts crisp for any composition.',
      tips: [
        'Choose the Quality model for hair, fur, or complex edges.',
        'Trim the original image so the subject fills most of the frame.',
        'Export as PNG whenever you need transparency in other tools.',
        'Add light edge blur (1-3px) to avoid jagged outlines on busy scenes.',
      ],
      ctaUseTool: 'Open Background Remove Tool',
      ctaViewAll: 'Browse all image tools',
      finalCtaTitle: 'Publish-ready cutouts in one click',
      finalCtaSubtitle: 'Follow the steps once, reuse the PNG everywhere.',
      cardDescription: 'AI mask workflow for e-commerce and profile shots.',
    },
    imageResize: {
      shortTitle: 'Image Resize Guide',
      toolName: 'Image Resize',
      toolPath: '/image/resize',
      title: 'Resize Images for Web, Print, and Social',
      subtitle: 'Hit every platform requirement with pixel-perfect exports.',
      stepsTitle: 'Resize workflow',
      stepsSubtitle: 'Keep aspect ratios under control in minutes.',
      steps: [
        'Upload your image (JPG/PNG/WebP up to 20MB) to preview dimensions.',
        'Pick Percentage or Exact Dimensions and enter the target size.',
        'Decide whether to keep aspect ratio locked before editing width/height.',
        'Export as JPG or PNG with the desired quality level and download.',
      ],
      useCasesTitle: 'Great for',
      useCasesSubtitle: 'Every channel that needs strict dimensions.',
      useCases: [
        'LinkedIn, resume, and ID photos',
        'E-commerce thumbnails and hero banners',
        'Blog hero images and CMS uploads',
        'Email attachments that must stay under a size limit',
      ],
      tipsTitle: 'Resize best practices',
      tipsSubtitle: 'Avoid blurry or stretched exports.',
      tips: [
        'Downsize before compressing for the biggest weight savings.',
        'Lock aspect ratio to prevent distorted faces or products.',
        'Use PNG for UI/illustrations and JPG/WebP for photos.',
        'Check platform specs (e.g., 1200×628 for LinkedIn sharing) before exporting.',
      ],
      ctaUseTool: 'Open Image Resize Tool',
      ctaViewAll: 'Browse all image tools',
      finalCtaTitle: 'Ship the right size every time',
      finalCtaSubtitle: 'Pre-set options keep assets consistent.',
      cardDescription: 'Step-by-step resizing checklist for every channel.',
    },
    imageCompress: {
      shortTitle: 'Image Compress Guide',
      toolName: 'Image Compress',
      toolPath: '/image/compress',
      title: 'Compress Images Without Killing Detail',
      subtitle: 'Reduce page weight, email sizes, and upload times instantly.',
      stepsTitle: 'Compression steps',
      stepsSubtitle: 'Balance file size and clarity with live previews.',
      steps: [
        'Upload JPG, PNG, or WebP (up to 25MB) and inspect the original size.',
        'Adjust the quality slider or set maximum width/height if needed.',
        'Preview the compressed result before committing to a download.',
        'Copy to clipboard or export the optimized file.',
      ],
      useCasesTitle: 'Why compress?',
      useCasesSubtitle: 'Faster web pages and easier sharing.',
      useCases: [
        'Blog posts and landing pages that need <200KB images',
        'Pitch decks or PDFs with email size limits',
        'Portfolio submissions and LMS uploads',
        'Mobile messaging where bandwidth is limited',
      ],
      tipsTitle: 'Compression tips',
      tipsSubtitle: 'Keep clarity while shrinking bytes.',
      tips: [
        'Aim for 60-80 quality for photos, 90+ for illustrations and UI.',
        'Resize overly large photos before compressing to save more weight.',
        'Use WebP output when the target platform supports it.',
        'Preview text overlays at 100% zoom to ensure legibility remains.',
      ],
      ctaUseTool: 'Open Image Compress Tool',
      ctaViewAll: 'Browse all image tools',
      finalCtaTitle: 'Speed up delivery',
      finalCtaSubtitle: 'Run every campaign asset through one workflow.',
      cardDescription: 'Optimization checklist for publishing-ready assets.',
    },
    formatConvert: {
      shortTitle: 'Format Convert Guide',
      toolName: 'Format Convert',
      toolPath: '/image/format',
      title: 'Convert Images Between JPG, PNG, and WebP',
      subtitle: 'Match any platform requirement without quality loss.',
      stepsTitle: 'Conversion steps',
      stepsSubtitle: 'Swap formats in seconds while preserving resolution.',
      steps: [
        'Upload any JPG/PNG/WebP up to 25MB and preview the original.',
        'Choose the target format (PNG for transparency, JPG/WebP for photos).',
        'Adjust optional quality settings if converting to JPG/WebP.',
        'Download the converted file or copy it for immediate use.',
      ],
      useCasesTitle: 'Popular conversions',
      useCasesSubtitle: 'Handle every “we only accept X format” request.',
      useCases: [
        'Turn transparent PNG logos into JPG/WebP for lighter pages',
        'Create PNG assets from JPG screenshots to add transparency later',
        'Convert images to WebP for Core Web Vitals wins',
        'Provide multiple file types for designers, marketers, and devs',
      ],
      tipsTitle: 'Format tips',
      tipsSubtitle: 'Pick the right container for every channel.',
      tips: [
        'Use PNG when you need crisp graphics or alpha channels.',
        'Export JPG/WebP for photography-heavy pages to keep file sizes small.',
        'Keep originals archived; conversions are lossy except PNG.',
        'Note that some legacy CMS tools still require JPG/PNG only.',
      ],
      ctaUseTool: 'Open Format Convert Tool',
      ctaViewAll: 'Browse all image tools',
      finalCtaTitle: 'Deliver every format request',
      finalCtaSubtitle: 'One upload covers PNG, JPG, and WebP outputs.',
      cardDescription: 'Format cheat sheet for multi-channel publishing.',
    },
    imageCrop: {
      shortTitle: 'Image Crop Guide',
      toolName: 'Image Crop',
      toolPath: '/image/crop',
      title: 'Crop Images to Exact Ratios and Focus Points',
      subtitle: 'Highlight products, faces, and key details with precision grids.',
      stepsTitle: 'Cropping workflow',
      stepsSubtitle: 'Stay within safe areas for every platform.',
      steps: [
        'Upload your photo (up to 25MB) and pick a preset ratio or free crop.',
        'Drag the crop box to focus on the subject or crucial detail.',
        'Fine-tune composition using the live preview before applying.',
        'Download the cropped image or recrop instantly for another ratio.',
      ],
      useCasesTitle: 'Where cropping matters',
      useCasesSubtitle: 'Framing drives engagement and clarity.',
      useCases: [
        'Profile avatars and team bio images',
        'Product detail zooms for marketplaces',
        'Social stories, reels, and ad banners',
        'Blog hero images with safe-text areas',
      ],
      tipsTitle: 'Cropping tips',
      tipsSubtitle: 'Tell a cleaner visual story.',
      tips: [
        'Use grid overlays to apply rule-of-thirds composition.',
        'Leave padding around text so it doesn’t touch platform UI chrome.',
        'Duplicate the image and crop variants for A/B testing quickly.',
        'Combine with Background Blur to keep attention on the subject.',
      ],
      ctaUseTool: 'Open Image Crop Tool',
      ctaViewAll: 'Browse all image tools',
      finalCtaTitle: 'Frame your story',
      finalCtaSubtitle: 'Consistent crops keep brands recognizable everywhere.',
      cardDescription: 'Cropping handbook for social, ads, and commerce.',
    },
  },
};

export default en;
