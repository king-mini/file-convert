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
      copied: '✓ Copied',
      save: '💾 Download',
      retry: '🔄 Apply again',
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
  hub: {
    hero: {
      title: 'What can we help you with?',
    },
    categories: {
      pdf: {
        title: 'PDF tools',
        desc: 'Convert, merge, split, rotate PDF',
        count: '8 tools',
      },
      image: {
        title: 'Image tools',
        desc: 'Background remove, resize, blur',
        count: '6 tools',
        badge: 'BETA',
      },
    },
    features: {
      client: {
        title: '100% client-side',
        desc: 'Process files in your browser without uploads',
      },
      privacy: {
        title: 'Privacy first',
        desc: 'Files never leave your device',
      },
      free: {
        title: 'Free to use',
        desc: 'No account required',
      },
    },
  },
  imageHome: {
    heroTitle: '🖼️ Image Tools',
    heroSubtitle: 'Edit quickly in your browser',
    features: {
      portraitBlur: {
        title: 'Portrait Blur',
        description: 'Blur backgrounds for people',
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
    notice: '© 2025 Lokit · All conversions stay in your browser',
  },
  pages: {
    pdf: {
      home: {
        hero: {
          title: '📄 PDF Tools',
          subtitle: 'Convert safely in your browser',
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
      },
      toJpg: {
        hero: {
          title: '📄 PDF to JPG Converter',
          description: 'Convert safely in your browser · no uploads',
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
          title: '🎨 PDF to PNG Converter',
          description: 'Convert safely in your browser · supports transparency',
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
          title: '📝 PDF to Text Converter',
          description: 'Extract text from PDFs',
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
          title: '🖼️ Image to PDF Converter',
          description: 'Combine multiple images into one PDF',
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
          title: '🔗 Merge PDF',
          description: 'Combine multiple PDFs into one',
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
          title: '✂️ Split PDF',
          description: 'Split a PDF into multiple files',
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
          title: '🔄 Rotate PDF',
          description: 'Rotate pages inside a PDF',
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
          title: '📦 Compress PDF',
          description: 'Reduce the size of a PDF file',
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
          title: '🎭 Portrait Blur',
          description: 'Keep faces sharp, blur the background',
        },
        upload: {
          hint: 'Drag or click to add an image',
          support: 'JPG, PNG, WebP (max 10MB)',
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
      },
      backgroundRemove: {
        hero: {
          title: '✨ Background Remove',
          description: 'Cleanly remove the background from any image',
        },
        upload: {
          hint: 'Drag or click to add an image',
          support: 'JPG, PNG, WebP (max 10MB)',
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
};

export default en;
