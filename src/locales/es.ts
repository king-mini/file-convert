const es = {
    common: {
        comingSoon: 'Próximamente',
        loading: 'Cargando...',
        dropzone: {
            pdf: 'Arrastra o haz clic para añadir archivos PDF',
            pdfMultiple: 'Arrastra o haz clic para añadir archivos PDF (múltiples archivos soportados)',
            image: 'Arrastra o haz clic para añadir una imagen',
        },
        buttons: {
            selectFile: 'Elegir archivo',
            selectPdf: 'Elegir PDF',
            selectImages: 'Elegir imágenes',
            otherImage: '🖼️ Elegir otra imagen',
            copy: '📋 Copiar',
            copied: '✅ Copiado',
            save: '💾 Guardar',
            retry: '🔁 Aplicar de nuevo',
            cancel: 'Cancelar',
            submit: 'Enviar',
        },
        links: {
            seeGuide: 'Ver guía',
        },
        validation: {
            pdfOnly: 'Solo se admiten archivos PDF.',
            pdfOnlySelect: 'Solo puedes seleccionar archivos PDF.',
            imageOnly: 'Solo se admiten archivos de imagen.',
            maxImageSize: 'Solo se admiten archivos de hasta {{limit}}MB.',
            minPdfFiles: 'Se requieren al menos dos archivos PDF.',
            validRanges: 'Introduce un rango válido. (ej: {{example}})',
            validPages: 'Introduce números de página válidos. (ej: {{example}})',
            validPagesSimple: 'Introduce números de página válidos.',
        },
        errors: {
            convert: 'Algo salió mal durante la conversión.',
            extract: 'Algo salió mal al extraer el texto.',
            merge: 'Algo salió mal durante la fusión.',
            split: 'Algo salió mal durante la división.',
            rotate: 'Algo salió mal durante la rotación.',
            compress: 'Algo salió mal durante la compresión.',
            process: 'Algo salió mal. Por favor, inténtalo de nuevo.',
            clipboard: 'No se pudo copiar al portapapeles.',
        },
        success: {
            merge: '¡Fusión de PDF completada!',
            split: '¡División de PDF completada!',
            rotate: '¡Rotación de PDF completada!',
            compress: '¡Compresión de PDF completada!',
            pdfCreated: '¡Archivo PDF creado!',
            copy: '¡Texto copiado al portapapeles!',
        },
        status: {
            starting: 'Iniciando...',
            processing: 'Procesando...',
            converting: 'Convirtiendo...',
            pdfLoadingComplete: 'PDF cargado',
            zipPreparing: 'Preparando ZIP...',
            pdfGenerating: 'Generando PDF...',
            done: '¡Hecho!',
            doneWithRatio: '¡Hecho! ({{ratio}}% más pequeño)',
            pageConverting: 'Convirtiendo página {{current}}/{{total}}...',
            pageCompressing: 'Comprimiendo página {{current}}/{{total}}...',
            pageSplitting: 'Dividiendo página {{current}}/{{total}}...',
            rangeCreating: 'Creando rango {{current}}/{{total}}...',
            pageExtracting: 'Extrayendo texto {{current}}/{{total}}...',
            pageExtractSingle: 'Extrayendo página {{page}}...',
            pageRotating: 'Rotando página {{page}}...',
            pdfMergeStart: 'Iniciando fusión de PDF...',
            pdfMergingFile: 'Fusionando {{fileName}}...',
            extractingFinished: '¡Extracción finalizada!',
        },
        hints: {
            viewLarge: 'Haz clic para ver en grande',
            chooseAnother: 'Elegir otra imagen',
        },
        messages: {
            noText: '(Sin texto)',
        },
        units: {
            page: 'páginas',
        },
    },
    components: {
        passwordModal: {
            title: 'Contraseña requerida',
            description: 'Este archivo está encriptado. Por favor, introduce la contraseña para continuar.',
            placeholder: 'Introduce la contraseña',
            error: 'Contraseña incorrecta. Por favor, inténtalo de nuevo.',
        },
    },
    nav: {
        pdf: '📄 Herramientas PDF',
        image: '🖼️ Herramientas de Imagen',
    },
    header: {
        lang: {
            label: 'Idioma',
            ko: '한국어',
            en: 'English',
            es: 'Español'
        },
    },
    breadcrumbs: {
        imageTools: 'Herramientas de Imagen',
        backgroundBlur: 'Desenfocar Fondo',
        backgroundRemove: 'Eliminar Fondo',
        imageResize: 'Redimensionar Imagen',
        imageCompress: 'Comprimir Imagen',
        formatConvert: 'Convertir Formato',
        imageCrop: 'Recortar Imagen',
        pdfTools: 'Herramientas PDF',
        pdfToJpg: 'PDF a JPG',
        pdfToPng: 'PDF a PNG',
        pdfToText: 'PDF a Texto',
        imageToPdf: 'Imagen a PDF',
        pdfMerge: 'Unir PDF',
        pdfSplit: 'Dividir PDF',
        pdfRotate: 'Rotar PDF',
        pdfCompress: 'Comprimir PDF',
    },
    meta: {
        description: 'Lokit - Herramientas gratuitas de PDF e imagen en línea. Convierte, une, divide y comprime archivos de forma segura en tu navegador. Sin registro.',
        privacy: {
            title: 'Política de Privacidad - Lokit',
            description: 'Política de Privacidad de Lokit. Todos los archivos se procesan solo en tu navegador y no se suben a ningún servidor.',
        },
        terms: {
            title: 'Términos de Servicio - Lokit',
            description: 'Términos de Servicio de Lokit. Revisa las condiciones de uso y restricciones del servicio.',
        },
        licenses: {
            title: 'Licencias de Código Abierto - Lokit',
            description: 'Bibliotecas de código abierto e información de licencias utilizadas por Lokit.',
        },
    },
    locale: 'es-ES',
    hub: {
        hero: {
            title: '¿En qué podemos ayudarte?',
        },
        categories: {
            pdf: {
                title: 'Herramientas PDF',
                desc: 'Convierte, une, divide, rota y comprime archivos PDF en línea gratis.',
                count: '8 herramientas',
            },
            image: {
                title: 'Herramientas de Imagen',
                desc: 'Elimina fondo, redimensiona, desenfoca y convierte imágenes en línea.',
                count: '6 herramientas',
                badge: 'BETA',
            },
        },
        features: {
            client: {
                title: '100% lado del cliente',
                desc: 'Maneja cada tarea directamente en el navegador sin subidas',
            },
            privacy: {
                title: 'Privacidad primero',
                desc: 'Cada archivo permanece en tu dispositivo sin transferencia externa',
            },
            free: {
                title: 'Gratis de usar',
                desc: 'Acceso ilimitado sin necesidad de cuenta',
            },
        },
    },
    imageHome: {
        heroTitle: 'Herramientas de Imagen Online Gratuitas',
        heroSubtitle: '6 herramientas de edición de fotos gratuitas para resultados rápidos y profesionales',
        features: {
            portraitBlur: {
                title: 'Desenfocar Fondo',
                description: 'Desenfoca el fondo para retratos',
            },
            blurFace: {
                title: 'Desenfocar Caras',
                description: 'Ocultar caras automáticamente',
            },
            redactImage: {
                title: 'Censurar Imagen',
                description: 'Pixelar información sensible',
            },
            backgroundRemove: {
                title: 'Eliminar Fondo',
                description: 'Elimina fondos de imágenes',
            },
            imageResize: {
                title: 'Redimensionar Imagen',
                description: 'Cambia las dimensiones de forma segura',
            },
            imageCompress: {
                title: 'Comprimir Imagen',
                description: 'Reduce el tamaño del archivo',
            },
            formatConvert: {
                title: 'Convertir Formato',
                description: 'PNG/JPG/WebP',
            },
            imageCrop: {
                title: 'Recortar Imagen',
                description: 'Recorta y endereza',
            },
        },
    },
    footer: {
        notice: '© 2025 Lokit · Todo se procesa de forma segura en tu navegador sin subidas',
        privacy: 'Política de Privacidad',
        terms: 'Términos de Servicio',
        licenses: 'Licencias Open Source',
    },
    policy: {
        privacy: {
            title: 'Política de Privacidad',
            updated: 'Última actualización: 2025-01-27',
            sections: {
                overview: {
                    title: '1. Resumen',
                    content: 'Lokit ("Servicio") toma su privacidad muy en serio. Esta Política de Privacidad explica qué información recopilamos cuando utiliza nuestro Servicio y cómo la usamos.',
                },
                fileProcessing: {
                    title: '2. Procesamiento de Archivos',
                    content: 'Este Servicio opera 100% en el lado del cliente:',
                    item1: 'Todos los archivos se procesan solo en su navegador',
                    item2: 'Los archivos no se suben a ningún servidor',
                    item3: 'Los archivos se eliminan inmediatamente de la memoria después del procesamiento',
                    item4: 'Los archivos no se almacenan en cookies ni en almacenamiento local',
                },
                dataCollection: {
                    title: '3. Información que Recopilamos',
                    content: 'Este Servicio puede recopilar la siguiente información:',
                    analytics: {
                        title: 'Google Analytics',
                        content: 'Recopilamos datos analíticos anónimos como visitas a páginas y patrones de uso. No se incluye información de identificación personal.',
                    },
                    ads: {
                        title: 'Google AdSense',
                        content: 'Recopilamos información sobre impresiones de anuncios y clics. Se pueden usar cookies para recopilar datos relacionados con la publicidad.',
                    },
                },
                cookies: {
                    title: '4. Uso de Cookies',
                    content: 'Este Servicio puede usar cookies para los siguientes propósitos:',
                    item1: 'Cookies analíticas: Análisis de patrones de uso a través de Google Analytics',
                    item2: 'Cookies publicitarias: Anuncios personalizados a través de Google AdSense',
                    item3: 'Cookies de configuración: Almacenamiento de preferencias del usuario (opcional)',
                    note: 'Puede eliminar o bloquear las cookies en cualquier momento a través de la configuración de su navegador.',
                },
                contact: {
                    title: '5. Contacto',
                    content: 'Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos a través de los problemas del repositorio de GitHub.',
                },
            },
        },
        terms: {
            title: 'Términos de Servicio',
            updated: 'Última actualización: 2025-01-27',
            sections: {
                acceptance: {
                    title: '1. Aceptación de los Términos',
                    content: 'Al utilizar este Servicio, usted acepta estos Términos de Servicio. Si no está de acuerdo, no puede utilizar el Servicio.',
                },
                service: {
                    title: '2. Prestación del Servicio',
                    content: 'Este Servicio se proporciona de la siguiente manera:',
                    item1: 'Este Servicio se proporciona "TAL CUAL"',
                    item2: 'No garantizamos la calidad o los resultados de las conversiones',
                    item3: 'Por favor, haga una copia de seguridad de los documentos importantes antes de procesarlos',
                },
                restrictions: {
                    title: '3. Restricciones de Uso',
                    content: 'Están prohibidas las siguientes actividades:',
                    item1: 'Procesamiento de contenido ilegal',
                    item2: 'Procesamiento de contenido que infrinja derechos de autor',
                    item3: 'Uso excesivo que dañe la estabilidad del servicio',
                    item4: 'Intentos de eludir la seguridad técnica del Servicio',
                },
                disclaimer: {
                    title: '4. Descargo de Responsabilidad',
                    content: 'Este Servicio no es responsable de:',
                    item1: 'Pérdida de datos o fallos de conversión',
                    item2: 'Interrupciones o errores del servicio',
                    item3: 'Daños directos o indirectos resultantes del uso del Servicio',
                },
                changes: {
                    title: '5. Cambios en los Términos',
                    content: 'Estos Términos pueden cambiar sin previo aviso. Los cambios se publicarán en esta página, y el uso continuado del Servicio constituye la aceptación de los Términos modificados.',
                },
            },
        },
        licenses: {
            title: 'Licencias de Código Abierto',
            updated: 'Última actualización: 2025-01-27',
            intro: 'Este Servicio utiliza las siguientes bibliotecas de código abierto. Cada biblioteca sigue su respectiva licencia de proyecto.',
        },
    },
    pages: {
        pdf: {
            home: {
                hero: {
                    title: 'Herramientas PDF Online Gratuitas',
                    subtitle: '8 herramientas potentes para procesar PDFs de forma rápida y segura en tu navegador',
                },
                features: {
                    toJpg: {
                        title: 'PDF → JPG',
                        description: 'Convertir PDFs a imágenes JPG',
                    },
                    toPng: {
                        title: 'PDF → PNG',
                        description: 'Convertir PDFs a imágenes PNG',
                    },
                    toText: {
                        title: 'PDF → Texto',
                        description: 'Extraer texto de un PDF',
                    },
                    imageToPdf: {
                        title: 'Imagen a PDF',
                        description: 'Convertir imágenes en PDFs',
                    },
                    merge: {
                        title: 'Unir PDFs',
                        description: 'Combinar múltiples archivos PDF',
                    },
                    split: {
                        title: 'Dividir PDF',
                        description: 'Dividir páginas PDF en archivos',
                    },
                    rotate: {
                        title: 'Rotar PDF',
                        description: 'Rotar páginas PDF',
                    },
                    compress: {
                        title: 'Comprimir PDF',
                        description: 'Reducir tamaño de archivo PDF',
                    },
                },
                benefits: {
                    client: {
                        title: '100% lado del cliente',
                        description: 'Maneja cada tarea directamente en el navegador, sin subidas',
                    },
                    privacy: {
                        title: 'Protección de privacidad',
                        description: 'Cada archivo permanece en tu dispositivo sin transferencia externa',
                    },
                    free: {
                        title: 'Gratis ilimitado',
                        description: 'Usa cada herramienta sin límites ni cuentas',
                    },
                },
            },
            toJpg: {
                hero: {
                    title: 'Convertir PDF a JPG Online',
                    description: 'Herramienta gratuita para convertir páginas PDF a imágenes JPG de alta calidad de forma segura.',
                },
                options: {
                    title: 'Opciones de conversión',
                    quality: 'Calidad JPG: {{value}}%',
                    resolution: 'Resolución',
                    pageRange: 'Especificar rango de páginas',
                },
                actions: {
                    start: '🚀 Iniciar conversión',
                },
            },
            toPng: {
                hero: {
                    title: 'Convertir PDF a PNG Online',
                    description: 'Herramienta gratuita para convertir páginas PDF a imágenes PNG con soporte de transparencia.',
                },
                options: {
                    title: 'Opciones de conversión',
                    resolution: 'Resolución',
                    transparent: 'Fondo transparente (eliminar blanco)',
                    pageRange: 'Especificar rango de páginas',
                },
                actions: {
                    start: '🚀 Iniciar conversión',
                },
            },
            toText: {
                hero: {
                    title: 'Extraer Texto de PDF',
                    description: 'Herramienta online gratuita para extraer contenido de texto de archivos PDF.',
                },
                actions: {
                    extract: '📝 Extraer texto',
                    extracting: 'Extrayendo...',
                },
                result: {
                    title: 'Texto extraído ({{count}} páginas)',
                    copyAll: '📋 Copiar todo',
                    saveTxt: '💾 Guardar como TXT',
                    pageLabel: 'Página {{page}}',
                },
                textFile: {
                    separator: '========== Página {{page}} ==========\n\n',
                },
            },
            imageToPdf: {
                hero: {
                    title: 'Convertir Imágenes a PDF',
                    description: 'Combina imágenes JPG, PNG, WebP en un solo documento PDF.',
                },
                upload: {
                    hint: 'Arrastra o haz clic para añadir imágenes JPG, PNG, GIF o WebP',
                },
                list: {
                    title: 'Imágenes seleccionadas ({{count}})',
                    moveUp: 'Mover arriba',
                    moveDown: 'Mover abajo',
                    delete: 'Eliminar',
                },
                options: {
                    title: 'Opciones de conversión',
                    pageSize: 'Tamaño de página',
                    pageSizeOptions: {
                        a4: 'A4',
                        letter: 'Carta',
                        auto: 'Auto (ajustar a imagen)',
                    },
                    orientation: 'Orientación',
                    orientationOptions: {
                        portrait: 'Retrato',
                        landscape: 'Paisaje',
                    },
                    margin: 'Margen: {{value}}mm',
                },
                actions: {
                    create: '📄 Crear PDF',
                    processing: 'Convirtiendo... ({{current}}/{{total}})',
                },
            },
            merge: {
                hero: {
                    title: 'Unir Archivos PDF Online',
                    description: 'Combina múltiples archivos PDF en un solo documento gratis.',
                },
                upload: {
                    hint: 'Arrastra o haz clic para añadir PDFs (múltiples archivos soportados)',
                },
                list: {
                    title: 'PDFs seleccionados ({{count}})',
                    pageCount: '{{count}} páginas',
                    summary: 'Uniendo {{count}} páginas en total',
                    moveUp: 'Mover arriba',
                    moveDown: 'Mover abajo',
                    delete: 'Eliminar',
                },
                actions: {
                    merge: '🔗 Unir PDFs',
                    merging: 'Uniendo... ({{current}}/{{total}})',
                },
                errors: {
                    noFiles: 'No hay PDFs para unir.',
                },
            },
            split: {
                hero: {
                    title: 'Dividir Archivos PDF Online',
                    description: 'Separa páginas PDF o extrae páginas específicas en nuevos archivos.',
                },
                options: {
                    title: 'Opciones de división',
                    mode: 'Modo de división',
                    modes: {
                        each: {
                            title: 'Cada página',
                            description: 'Exportar cada página como archivo',
                        },
                        range: {
                            title: 'Por rango',
                            description: 'Dividir por rangos personalizados',
                        },
                        extract: {
                            title: 'Extraer páginas',
                            description: 'Elegir solo páginas específicas',
                        },
                    },
                    rangeLabel: 'Rangos de páginas',
                    rangePlaceholder: 'ej. 1-5, 6-10, 11-15',
                    rangeHint: 'Separa múltiples rangos con comas',
                    extractLabel: 'Páginas para extraer',
                    extractPlaceholder: 'ej. 1,3,5-7,10',
                    extractHint: 'Usa comas para páginas, guion para rangos',
                },
                actions: {
                    split: '✂️ Dividir PDF',
                    splitting: 'Dividiendo...',
                },
            },
            rotate: {
                hero: {
                    title: 'Rotar Páginas PDF',
                    description: 'Rota permanentemente páginas PDF 90 o 180 grados online.',
                },
                options: {
                    title: 'Opciones de rotación',
                    angle: 'Ángulo de rotación',
                    angles: {
                        right: '90° horario',
                        half: '180°',
                        left: '90° antihorario',
                    },
                    applyAll: 'Aplicar a todas las páginas',
                    pageInputPlaceholder: 'ej. 1,3,5-7',
                    pageInputHint: 'Separar con comas. Usar guion para rangos (ej. 1-5)',
                },
                actions: {
                    rotate: '🔄 Rotar PDF',
                    rotating: 'Rotando...',
                },
            },
            compress: {
                hero: {
                    title: 'Comprimir PDF Online',
                    description: 'Reduce el tamaño del archivo PDF manteniendo la calidad gratis.',
                },
                warning: {
                    title: 'Aviso',
                    description: 'La compresión convierte las páginas en imágenes, por lo que se elimina la selección de texto.',
                },
                fileInfo: {
                    original: 'Tamaño original: {{size}}',
                },
                options: {
                    title: 'Nivel de compresión',
                    levels: {
                        low: {
                            title: 'Bajo',
                            desc: 'Calidad primero (90%)',
                            info: 'Aprox 20-30% más pequeño',
                        },
                        medium: {
                            title: 'Medio',
                            desc: 'Equilibrado (70%)',
                            info: 'Aprox 40-60% más pequeño',
                        },
                        high: {
                            title: 'Alto',
                            desc: 'Tamaño primero (50%)',
                            info: 'Aprox 60-80% más pequeño',
                        },
                        extreme: {
                            title: 'Max',
                            desc: 'Tamaño mínimo (30%)',
                            info: 'Aprox 80-90% más pequeño',
                        },
                    },
                },
                actions: {
                    compress: '📦 Comprimir PDF',
                    compressing: 'Comprimiendo...',
                },
            },
        },
        image: {
            redactImage: {
                hero: {
                    title: 'Censurar Texto y Pixelar Imagen Online',
                    description: 'Oculta información sensible, tarjetas de crédito y matrículas de forma segura. 100% privado.',
                },
                upload: {
                    hint: 'Arrastra o haz clic para añadir una imagen',
                    support: 'JPG, PNG, WebP (máx. 25MB)',
                },
                panels: {
                    original: 'Original',
                    result: 'Censurado',
                },
                placeholders: {
                    result: 'La imagen censurada aparecerá aquí',
                },
                options: {
                    blurStrength: 'Fuerza de pixelado',
                    rangeSoft: 'Baja',
                    rangeStrong: 'Alta',
                },
                progress: {
                    label: 'Censurando imagen...',
                },
                actions: {
                    apply: '✨ Censurar Imagen',
                },
            },
            blurFace: {
                hero: {
                    title: 'Desenfocar Caras en Fotos Online',
                    description: 'Oculta automáticamente las caras en las fotos para mayor privacidad. Procesamiento seguro en el cliente.',
                },
                upload: {
                    hint: 'Arrastra o haz clic para añadir una foto',
                    support: 'JPG, PNG, WebP (máx. 25MB)',
                },
                panels: {
                    original: 'Original',
                    result: 'Resultado',
                },
                placeholders: {
                    result: 'Las caras desenfocadas aparecerán aquí',
                },
                options: {
                    blurStrength: 'Cantidad de desenfoque',
                    rangeSoft: 'Suave',
                    rangeStrong: 'Fuerte',
                },
                progress: {
                    label: 'Desenfocando caras...',
                },
                actions: {
                    apply: '✨ Desenfocar Caras',
                },
            },
            portraitBlur: {
                hero: {
                    title: 'Herramienta Gratuta de Desenfoque de Fondo',
                    description: 'Perfecto para retratos, fotos de perfil y primeros planos. Gratis, sin registro, 100% privado.',
                },
                guideLink: 'Ver guía',
                upload: {
                    hint: 'Arrastra o haz clic para añadir una imagen',
                    support: 'JPG, PNG, WebP (máx. 25MB)',
                },
                panels: {
                    original: 'Original',
                    result: 'Resultado',
                },
                placeholders: {
                    result: 'El resultado desenfocado aparecerá aquí',
                },
                options: {
                    blurStrength: 'Fuerza de desenfoque: {{value}}px',
                    rangeSoft: 'Suave',
                    rangeStrong: 'Fuerte',
                },
                progress: {
                    label: 'Desenfocando el fondo...',
                },
                actions: {
                    apply: '✨ Aplicar desenfoque',
                },
                modal: {
                    original: 'Original',
                    result: 'Resultado',
                },
                info: {
                    viewLarge: 'Haz clic para ver en grande',
                },
                highlights: {
                    eyebrow: 'Por qué Lokit',
                    title: 'Desenfoque en un clic, privacidad pro',
                    subtitle: 'Procesa retratos de forma segura en tu navegador—sin subidas, sin registro, siempre gratis.',
                },
            },
            backgroundRemove: {
                hero: {
                    title: '✨ Eliminar Fondo',
                    description: 'Elimina limpiamente el fondo de cualquier imagen',
                },
                upload: {
                    hint: 'Arrastra o haz clic para añadir una imagen',
                    support: 'JPG, PNG, WebP (máx. 25MB)',
                },
                panels: {
                    original: 'Original',
                    result: 'Resultado',
                },
                placeholders: {
                    result: 'La vista previa del recorte aparecerá aquí',
                },
                options: {
                    model: 'Calidad del modelo',
                    fast: '⚡ Rápido',
                    quality: '🎯 Preciso',
                    edgeBlur: 'Suavizado de bordes: {{value}}px',
                    edgeLabels: {
                        sharp: 'Borde nítido',
                        smooth: 'Borde suave',
                    },
                },
                info: {
                    output: '💡 El resultado se guarda como PNG transparente',
                },
                progress: {
                    label: 'Eliminando el fondo...',
                },
                actions: {
                    apply: '✨ Eliminar fondo',
                    savePng: '💾 Guardar PNG',
                },
            },
            imageResize: {
                hero: {
                    title: '📐 Redimensionar Imagen',
                    description: 'Cambia el tamaño de las imágenes exactamente como necesites',
                },
                upload: {
                    hint: 'Arrastra o haz clic para añadir una imagen',
                    support: 'JPG, PNG, WebP (máx. 20MB)',
                },
                panels: {
                    original: 'Original ({{width}} × {{height}})',
                    result: 'Resultado ({{width}} × {{height}})',
                },
                placeholders: {
                    result: 'La imagen redimensionada aparecerá aquí',
                },
                options: {
                    mode: 'Modo de redimensión',
                    percentage: '📊 Escalar por porcentaje',
                    dimensions: '📏 Introducir tamaño exacto',
                    sizeLabel: 'Tamaño: {{value}}%',
                    sizeRangeMin: '10%',
                    sizeRangeMax: '200%',
                    widthLabel: 'Ancho (px)',
                    heightLabel: 'Alto (px)',
                    linkOn: 'Desbloquear relación de aspecto',
                    linkOff: 'Bloquear relación de aspecto',
                    qualityLabel: 'Calidad: {{value}}%',
                    qualityLow: 'Más baja',
                    qualityHigh: 'Más alta',
                },
                placeholdersExtra: {
                    processing: 'Procesando...',
                },
                modal: {
                    title: 'Vista previa ampliada',
                },
                actions: {
                    resize: '📐 Redimensionar',
                },
            },
            imageCompress: {
                hero: {
                    title: '🗜️ Comprimir Imagen',
                    description: 'Reduce el tamaño de los archivos de imagen de manera eficiente',
                },
                upload: {
                    hint: 'Arrastra o haz clic para añadir una imagen',
                    support: 'JPG, PNG, WebP (máx. 50MB)',
                },
                panels: {
                    original: 'Original ({{size}})',
                    result: 'Resultado',
                },
                placeholders: {
                    result: 'La vista previa comprimida aparecerá aquí',
                },
                options: {
                    qualityLabel: 'Calidad de compresión: {{value}}%',
                    qualityHints: {
                        high: 'Alta calidad',
                        medium: 'Equilibrado',
                        low: 'Menor tamaño',
                    },
                    rangeLabels: {
                        min: 'Menor tamaño',
                        max: 'Mayor calidad',
                    },
                    maxWidth: 'Ancho máx:',
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
                    result: 'Comprimido',
                    saved: 'Ahorrado',
                },
                actions: {
                    compress: '🗜️ Comprimir',
                },
            },
            formatConvert: {
                hero: {
                    title: '🔄 Convertir Formato',
                    description: 'Convierte imágenes entre cualquier formato',
                },
                upload: {
                    hint: 'Arrastra o haz clic para añadir una imagen',
                    support: 'Todos los formatos de imagen soportados (máx. 50MB)',
                },
                flow: {
                    original: 'Original',
                    target: 'Destino',
                    unknown: 'Desconocido',
                },
                formatInfo: {
                    jpeg: {
                        name: 'JPEG',
                        desc: 'Ideal para fotos, tamaño menor',
                    },
                    png: {
                        name: 'PNG',
                        desc: 'Sin pérdidas con transparencia',
                    },
                    webp: {
                        name: 'WebP',
                        desc: 'Formato moderno con mejor compresión',
                    },
                },
                options: {
                    title: 'Formato de salida',
                    qualityLabel: 'Calidad: {{value}}%',
                    rangeLabels: {
                        min: 'Menor tamaño',
                        max: 'Mayor calidad',
                    },
                },
                actions: {
                    convert: '🔄 Convertir',
                },
            },
            imageCrop: {
                hero: {
                    title: '✂️ Recortar Imagen',
                    description: 'Recorta exactamente el área que necesitas',
                },
                upload: {
                    hint: 'Arrastra o haz clic para añadir una imagen',
                    support: 'JPG, PNG, WebP (máx. 50MB)',
                },
                options: {
                    ratio: 'Relación de aspecto',
                    buttons: {
                        free: 'Libre',
                        '1:1': '1:1',
                        '4:3': '4:3',
                        '16:9': '16:9',
                        '3:2': '3:2',
                        '2:3': '2:3',
                    },
                },
                panels: {
                    result: 'Resultado ({{width}} × {{height}})',
                },
                actions: {
                    crop: '✂️ Recortar',
                    recrop: '✂️ Recortar de nuevo',
                },
            },
        },
    },
    guides: {
        backgroundBlur: {
            shortTitle: 'Guía de Desenfoque',
            toolName: 'Desenfocar Fondo',
            toolPath: '/image/blur-background',
            title: 'Cómo Desenfocar el Fondo Online (Paso a Paso)',
            subtitle: 'Tutorial rápido para desenfocar fondos.',
            stepsTitle: 'Sigue estos pasos',
            stepsSubtitle: 'Toma alrededor de 1-2 minutos desde la carga hasta la descarga.',
            steps: [
                'Sube una foto de retrato (JPG/PNG/WebP, hasta 25MB).',
                'Ajusta la fuerza del desenfoque para que la persona se mantenga nítida.',
                'Haz clic en "Aplicar desenfoque" para procesar completamente en el navegador.',
                'Compara antes/después, luego copia o guarda como JPG.',
            ],
        },
        blurFace: {
            shortTitle: 'Guía de Desenfocar Caras',
            toolName: 'Desenfocar Caras',
            toolPath: '/image/blur-face',
            title: 'Privacidad con un clic',
            subtitle: 'Detecta y desenfoca automáticamente caras en tus fotos.',
            stepsTitle: 'Pasos simples',
            stepsSubtitle: 'Anónimo en segundos.',
            steps: [
                'Sube tu foto con caras.',
                'La herramienta detecta y desenfoca automáticamente.',
                'Previsualiza el resultado.',
                'Descarga la imagen protegida.',
            ],
            useCasesTitle: 'Cuándo desenfocar',
            useCasesSubtitle: 'Protección en fotos públicas y privadas.',
            useCases: [
                'Compartir fotos de calle',
                'Anonimizar niños',
                'Cumplimiento de regulaciones',
                'Seguridad en periodismo',
            ],
            tipsTitle: 'Consejos',
            tipsSubtitle: 'Asegura el anonimato.',
            tips: [
                'Verifica que todas las caras estén detectadas.',
                'Aumenta la fuerza si es necesario.',
                'La ropa también puede identificar.',
                'Los metadatos se conservan si no los borras.',
            ],
            ctaUseTool: 'Desenfocar ahora',
            ctaViewAll: 'Ver herramientas',
            finalCtaTitle: 'Protege tu privacidad',
            finalCtaSubtitle: 'Mantén identidades a salvo.',
            cardDescription: 'Protege la identidad desenfocando caras.',
        },
        redactImage: {
            shortTitle: 'Guía de Censurar Imagen',
            toolName: 'Censurar Imagen',
            toolPath: '/image/redact',
            title: 'Censurar Información',
            subtitle: 'Pixela o desenfoca detalles privados.',
            stepsTitle: 'Cómo censurar',
            stepsSubtitle: 'Oculta secretos antes de compartir.',
            steps: [
                'Sube la imagen.',
                'Aplica pixelado o desenfoque.',
                'Verifica que sea ilegible.',
                'Descarga la versión segura.',
            ],
            useCasesTitle: 'Casos de uso',
            useCasesSubtitle: 'Limpia documentos y fotos.',
            useCases: [
                'Ocultar tarjetas o direcciones',
                'Desenfocar matrículas',
                'Censurar nombres',
                'Eliminar marcas de agua',
            ],
            tipsTitle: 'Consejos',
            tipsSubtitle: 'Asegúrate de que desaparezca.',
            tips: [
                'El pixelado es seguro para texto.',
                'Revisa reflejos que revelen info.',
                'Revisa antes de publicar.',
                'La imagen se aplana al guardar.',
            ],
            ctaUseTool: 'Censurar ahora',
            ctaViewAll: 'Ver herramientas',
            finalCtaTitle: 'Comparte seguro',
            finalCtaSubtitle: 'Elimina datos sensibles.',
            cardDescription: 'Pixela texto y oculta detalles.',
        },
    },
};

export default es;
