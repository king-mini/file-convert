const ptBR = {
    common: {
        comingSoon: 'Em breve',
        loading: 'Carregando...',
        dropzone: {
            pdf: 'Arraste ou clique para adicionar arquivos PDF',
            pdfMultiple: 'Arraste ou clique para adicionar PDFs (múltiplos arquivos)',
            image: 'Arraste ou clique para adicionar uma imagem',
        },
        buttons: {
            selectFile: 'Escolher arquivo',
            selectPdf: 'Escolher PDFs',
            selectImages: 'Escolher imagens',
            otherImage: '🖼️ Escolher outra imagem',
            copy: '📋 Copiar',
            copied: '✅ Copiado',
            save: '💾 Salvar',
            retry: '🔁 Aplicar novamente',
            cancel: 'Cancelar',
            submit: 'Enviar',
        },
        links: {
            seeGuide: 'Ver guia',
        },
        validation: {
            pdfOnly: 'Apenas arquivos PDF são suportados.',
            pdfOnlySelect: 'Você só pode selecionar arquivos PDF.',
            imageOnly: 'Apenas arquivos de imagem são suportados.',
            maxImageSize: 'Apenas arquivos de até {{limit}}MB são suportados.',
            minPdfFiles: 'São necessários pelo menos dois arquivos PDF.',
            validRanges: 'Digite um intervalo válido. (ex: {{example}})',
            validPages: 'Digite números de página válidos. (ex: {{example}})',
            validPagesSimple: 'Digite números de página válidos.',
        },
        errors: {
            convert: 'Algo deu errado durante a conversão.',
            extract: 'Algo deu errado ao extrair o texto.',
            merge: 'Algo deu errado ao mesclar.',
            split: 'Algo deu errado ao dividir.',
            rotate: 'Algo deu errado ao girar.',
            compress: 'Algo deu errado ao comprimir.',
            process: 'Algo deu errado. Por favor, tente novamente.',
            clipboard: 'Falha ao copiar para a área de transferência.',
        },
        success: {
            merge: 'Mesclagem do PDF concluída!',
            split: 'Divisão do PDF concluída!',
            rotate: 'Rotação do PDF concluída!',
            compress: 'Compressão do PDF concluída!',
            pdfCreated: 'Arquivo PDF criado!',
            copy: 'Texto copiado para a área de transferência!',
        },
        status: {
            starting: 'Iniciando...',
            processing: 'Processando...',
            converting: 'Convertendo...',
            pdfLoadingComplete: 'PDF carregado',
            zipPreparing: 'Preparando ZIP...',
            pdfGenerating: 'Gerando PDF...',
            done: 'Concluído!',
            doneWithRatio: 'Concluído! ({{ratio}}% menor)',
            pageConverting: 'Convertendo página {{current}}/{{total}}...',
            pageCompressing: 'Comprimindo página {{current}}/{{total}}...',
            pageSplitting: 'Dividindo página {{current}}/{{total}}...',
            rangeCreating: 'Criando intervalo {{current}}/{{total}}...',
            pageExtracting: 'Extraindo texto {{current}}/{{total}}...',
            pageExtractSingle: 'Extraindo página {{page}}...',
            pageRotating: 'Girando página {{page}}...',
            pdfMergeStart: 'Iniciando mesclagem do PDF...',
            pdfMergingFile: 'Mesclando {{fileName}}...',
            extractingFinished: 'Extração concluída!',
        },
        hints: {
            viewLarge: 'Clique para ampliar',
            chooseAnother: 'Escolher outra imagem',
        },
        messages: {
            noText: '(Sem texto)',
        },
        units: {
            page: 'páginas',
        },
    },
    components: {
        passwordModal: {
            title: 'Senha Necessária',
            description: 'Este arquivo está criptografado. Por favor, digite a senha para continuar.',
            placeholder: 'Digite a senha',
            error: 'Senha incorreta. Por favor, tente novamente.',
        },
    },
    nav: {
        pdf: '📄 Ferramentas PDF',
        image: '🖼️ Ferramentas de Imagem',
    },
    header: {
        lang: {
            label: 'Idioma',
            ko: '한국어',
            en: 'English',
        },
    },
    breadcrumbs: {
        imageTools: 'Ferramentas de Imagem',
        backgroundBlur: 'Desfocar Fundo',
        backgroundRemove: 'Remover Fundo',
        imageResize: 'Redimensionar Imagem',
        imageCompress: 'Comprimir Imagem',
        formatConvert: 'Converter Formato',
        imageCrop: 'Cortar Imagem',
        pdfTools: 'Ferramentas PDF',
        pdfToJpg: 'PDF para JPG',
        pdfToPng: 'PDF para PNG',
        pdfToText: 'PDF para Texto',
        imageToPdf: 'Imagem para PDF',
        pdfMerge: 'Mesclar PDFs',
        pdfSplit: 'Dividir PDF',
        pdfRotate: 'Girar PDF',
        pdfCompress: 'Comprimir PDF',
    },
    meta: {
        description: 'Lokit - Ferramentas online gratuitas de PDF e Imagem. Converta PDF para Word, JPG, PNG. Mescle, divida, comprima arquivos PDF com segurança no seu navegador. Sem cadastro.',
        privacy: {
            title: 'Política de Privacidade - Lokit',
            description: 'Política de Privacidade do Lokit. Todos os arquivos são processados apenas no seu navegador e não são enviados para nenhum servidor.',
        },
        terms: {
            title: 'Termos de Serviço - Lokit',
            description: 'Termos de Serviço do Lokit. Confira as condições e restrições de uso do serviço.',
        },
        licenses: {
            title: 'Licenças Open Source - Lokit',
            description: 'Bibliotecas open source e informações de licença usadas pelo Lokit.',
        },
    },
    locale: 'pt-BR',
    hub: {
        hero: {
            title: 'Como podemos ajudar você?',
        },
        categories: {
            pdf: {
                title: 'Ferramentas PDF',
                desc: 'Converta, mescle, divida, gire e comprima arquivos PDF online gratuitamente.',
                count: '8 ferramentas',
            },
            image: {
                title: 'Ferramentas de Imagem',
                desc: 'Remova fundo, redimensione, desfoque e converta imagens online.',
                count: '6 ferramentas',
                badge: 'BETA',
            },
        },
        features: {
            client: {
                title: '100% no navegador',
                desc: 'Processe tudo diretamente no navegador sem uploads',
            },
            privacy: {
                title: 'Privacidade em primeiro lugar',
                desc: 'Todos os arquivos ficam no seu dispositivo sem transferência externa',
            },
            free: {
                title: 'Grátis para usar',
                desc: 'Acesso ilimitado sem necessidade de conta',
            },
        },
    },
    imageHome: {
        heroTitle: 'Ferramentas de Imagem Online Grátis - Desfocar Fundo, Remover e Mais',
        heroSubtitle: '6 ferramentas gratuitas de edição de fotos para resultados rápidos e profissionais',
        features: {
            portraitBlur: {
                title: 'Desfocar Fundo',
                description: 'Desfoque o fundo de retratos',
            },
            blurFace: {
                title: 'Desfocar Rosto',
                description: 'Oculte rostos automaticamente',
            },
            redactImage: {
                title: 'Censurar Texto',
                description: 'Pixelize informações sensíveis',
            },
            backgroundRemove: {
                title: 'Remover Fundo',
                description: 'Remova fundos de imagens',
            },
            imageResize: {
                title: 'Redimensionar Imagem',
                description: 'Altere dimensões com segurança',
            },
            imageCompress: {
                title: 'Comprimir Imagem',
                description: 'Reduza o tamanho do arquivo',
            },
            formatConvert: {
                title: 'Converter Formato',
                description: 'PNG/JPG/WebP',
            },
            imageCrop: {
                title: 'Cortar Imagem',
                description: 'Recorte e alinhe',
            },
        },
    },
    footer: {
        notice: '© 2025 Lokit · Tudo é processado com segurança no seu navegador sem uploads',
        privacy: 'Política de Privacidade',
        terms: 'Termos de Serviço',
        licenses: 'Licenças Open Source',
    },
};

export default ptBR;
