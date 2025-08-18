# 📖 Instruções de Integração - DearFlip

## 3️⃣ Integrar no seu site

Se quiser usar o flipbook numa página já existente do seu site, copie do `exemplo.html`:

### a) O `<link>` para o CSS
```html
<link rel="stylesheet" href="pluggin%20flipbook/dearflip.css">
```

### b) Os `<script>`
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://mozilla.github.io/pdf.js/build/pdf.js"></script>
<script src="pluggin%20flipbook/dearflip-jquery-plugin.js"></script>
```

### c) A área do flipbook
```html
<div id="meu-flipbook"></div>
```

### d) O script para inicializar
```html
<script>
  $('#meu-flipbook').dearFlip({
    pdfUrl: 'pluggin%20flipbook/revista.pdf', // coloque o caminho do seu PDF
    width: 900,
    height: 600
  });
</script>
```

## ⚠️ Dica importante:
Se o nome da pasta continuar como `pluggin flipbook` com espaço, o caminho no HTML deve usar `%20` no lugar do espaço:

```
pluggin%20flipbook/dearflip.css
```

Mas o ideal é renomear a pasta para `pluggin-flipbook`

## 📋 Exemplo Completo de Integração

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Página com Flipbook</title>
    
    <!-- CSS do DearFlip -->
    <link rel="stylesheet" href="pluggin%20flipbook/dearflip.css">
    
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        #meu-flipbook {
            width: 100%;
            height: 600px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Meu Flipbook</h1>
        
        <!-- Área do flipbook -->
        <div id="meu-flipbook"></div>
    </div>

    <!-- Scripts necessários -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://mozilla.github.io/pdf.js/build/pdf.js"></script>
    <script src="pluggin%20flipbook/dearflip-jquery-plugin.js"></script>

    <script>
        // Configuração do PDF.js
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
        
        $(document).ready(function() {
            // Inicializar o flipbook
            $('#meu-flipbook').dearFlip({
                pdfUrl: 'caminho/para/seu/arquivo.pdf',
                width: 900,
                height: 600,
                startPage: 1,
                renderScale: 1.2,
                pageGap: 10,
                lazyRenderAhead: 3,
                onPageFlip: function(pageIndex) {
                    console.log('Página virada para:', pageIndex);
                },
                onReady: function() {
                    console.log('Flipbook carregado com sucesso!');
                },
                onError: function(error) {
                    console.error('Erro ao carregar flipbook:', error);
                }
            });
        });
    </script>
</body>
</html>
```

## 🔧 Opções de Configuração

### Opções Básicas:
- `pdfUrl`: Caminho para o arquivo PDF
- `width`: Largura do flipbook (px)
- `height`: Altura do flipbook (px)
- `startPage`: Página inicial (padrão: 1)

### Opções Avançadas:
- `renderScale`: Escala de renderização (padrão: 1.2)
- `pageGap`: Espaçamento entre páginas (px)
- `lazyRenderAhead`: Número de páginas para pré-renderizar
- `onPageFlip`: Função chamada quando uma página é virada
- `onReady`: Função chamada quando o flipbook está pronto
- `onError`: Função chamada em caso de erro

## 🎮 Controles Programáticos

```javascript
// Obter instância do flipbook
let flipbook = $('#meu-flipbook').dearFlip({...});

// Navegar para uma página específica
flipbook.goTo(5);

// Próxima página
flipbook.next();

// Página anterior
flipbook.prev();

// Obter página atual
let currentPage = flipbook.getCurrentPage();

// Obter total de páginas
let totalPages = flipbook.getTotalPages();

// Destruir o flipbook
flipbook.destroy();
```

## ⌨️ Controles de Teclado

O plugin suporta os seguintes controles de teclado:
- **Seta Esquerda**: Página anterior
- **Seta Direita**: Próxima página
- **Home**: Primeira página
- **End**: Última página

## 📱 Responsividade

Para tornar o flipbook responsivo, use CSS:

```css
#meu-flipbook {
    width: 100%;
    max-width: 900px;
    height: 60vh;
    min-height: 400px;
}
```

## 🐛 Solução de Problemas

### Erro: "PDF.js não está carregado"
- Verifique se o script do PDF.js está sendo carregado corretamente
- Certifique-se de que a URL do worker está configurada

### Erro: "jQuery não está carregado"
- Verifique se o jQuery está sendo carregado antes do plugin DearFlip

### PDF não carrega
- Verifique se o caminho do PDF está correto
- Certifique-se de que o arquivo PDF existe e é acessível
- Verifique se o servidor permite acesso ao arquivo PDF

### Performance lenta
- Reduza o `renderScale` para melhorar a performance
- Ajuste o `lazyRenderAhead` conforme necessário
- Considere otimizar o PDF (reduzir tamanho, compressão)

## 📁 Estrutura de Arquivos

```
seu-site/
├── pluggin flipbook/
│   ├── dearflip.css
│   ├── dearflip-jquery-plugin.js
│   ├── exemplo.html
│   └── README.md
├── seus-pdfs/
│   ├── revista.pdf
│   └── outros-pdfs.pdf
├── exemplo-integracao.html
└── INSTRUCOES-INTEGRACAO-DEARFLIP.md
```

## 🎯 Próximos Passos

1. Teste o arquivo `exemplo-integracao.html` para ver o plugin funcionando
2. Integre o código em uma página existente do seu site
3. Personalize as opções conforme suas necessidades
4. Adicione controles customizados se necessário
5. Teste em diferentes dispositivos e navegadores
