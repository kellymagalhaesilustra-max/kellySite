# 📖 DearFlip - Plugin jQuery de Flipbook 3D

Um plugin jQuery leve e responsivo para criar flipbooks 3D interativos com suporte a PDF e imagens.

## ✨ Características

- **Renderização 3D realista** com CSS transforms
- **Suporte a PDF** via PDF.js da Mozilla
- **Suporte a imagens** via array de URLs
- **Renderização lazy** para melhor performance
- **Controles de navegação** (botões, teclado)
- **Callbacks de eventos** para integração
- **Responsivo** e acessível
- **Animações suaves** com CSS transitions

## 📦 Dependências

- **jQuery** (>= 3.0)
- **PDF.js** (apenas se usar PDFs)

## 🚀 Instalação

1. **Inclua as dependências:**

```html
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- PDF.js (apenas se usar PDFs) -->
<script src="https://mozilla.github.io/pdf.js/build/pdf.js"></script>

<!-- DearFlip Plugin -->
<script src="dearflip-jquery-plugin.js"></script>

<!-- CSS do plugin -->
<link rel="stylesheet" href="dearflip.css">
```

2. **Configure o PDF.js (apenas se usar PDFs):**

```javascript
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
```

## 📖 Uso Básico

### Com Array de Imagens

```javascript
$('#my-flipbook').dearFlip({
    images: [
        'page1.jpg',
        'page2.jpg',
        'page3.jpg'
    ],
    width: 800,
    height: 600
});
```

### Com PDF (URL)

```javascript
$('#my-flipbook').dearFlip({
    pdfUrl: '/path/to/document.pdf',
    width: 800,
    height: 600
});
```

### Com PDF (Arquivo local)

```javascript
// Primeiro, leia o arquivo PDF
const fileInput = document.getElementById('pdf-file');
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        $('#my-flipbook').dearFlip({
            pdfData: e.target.result, // ArrayBuffer
            width: 800,
            height: 600
        });
    };
    reader.readAsArrayBuffer(file);
});
```

## ⚙️ Opções de Configuração

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `width` | Number | 800 | Largura do flipbook |
| `height` | Number | 520 | Altura do flipbook |
| `pageGap` | Number | 8 | Espaçamento entre páginas |
| `startPage` | Number | 1 | Página inicial |
| `totalPages` | Number | null | Total de páginas (auto-detectado) |
| `pdfUrl` | String | null | URL do PDF |
| `pdfData` | ArrayBuffer | null | PDF como ArrayBuffer (para arquivos locais) |
| `images` | Array | null | Array de URLs de imagens |
| `renderScale` | Number | 1.5 | Escala de renderização |
| `lazyRenderAhead` | Number | 2 | Páginas à frente para renderizar |
| `className` | String | 'dearflip' | Classe CSS do container |
| `onPageFlip` | Function | function(){} | Callback ao virar página |

## 🎮 Métodos Disponíveis

### Navegação

```javascript
var flipbook = $('#my-flipbook').dearFlip();

// Ir para página específica
flipbook.goTo(5);

// Próxima página
flipbook.next();

// Página anterior
flipbook.prev();
```

### Controle

```javascript
// Destruir o flipbook
flipbook.destroy();

// Atualizar configurações
flipbook.dearFlip({
    width: 1000,
    height: 700
});
```

## 🎨 Personalização CSS

O plugin usa classes CSS específicas que você pode personalizar:

```css
/* Container principal */
.dearflip { perspective: 2000px; }

/* Páginas */
.dearflip .df-page { 
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Botões de navegação */
.dearflip .df-btn {
    background: rgba(0,0,0,0.6);
    color: #fff;
}
```

## ⌨️ Controles de Teclado

- **Seta Esquerda**: Página anterior
- **Seta Direita**: Próxima página
- **Home**: Primeira página
- **End**: Última página

## 📱 Responsividade

O plugin é responsivo por padrão. Para melhor controle em dispositivos móveis:

```css
@media (max-width: 768px) {
    .dearflip .df-btn {
        width: 36px;
        height: 36px;
    }
}
```

## 🔧 Exemplo Completo

```html
<!DOCTYPE html>
<html>
<head>
    <title>DearFlip Demo</title>
    <link rel="stylesheet" href="dearflip.css">
</head>
<body>
    <div id="my-flipbook"></div>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="dearflip-jquery-plugin.js"></script>
    
    <script>
        $('#my-flipbook').dearFlip({
            images: [
                'https://via.placeholder.com/400x600/FF6B6B/FFFFFF?text=Página+1',
                'https://via.placeholder.com/400x600/4ECDC4/FFFFFF?text=Página+2',
                'https://via.placeholder.com/400x600/45B7D1/FFFFFF?text=Página+3'
            ],
            width: 900,
            height: 600,
            onPageFlip: function(pageIndex) {
                console.log('Página atual:', pageIndex);
            }
        });
    </script>
</body>
</html>
```

## 🐛 Solução de Problemas

### PDF não carrega
- Verifique se o PDF.js está carregado corretamente
- Confirme se a URL do PDF é acessível
- Verifique o console para erros CORS
- **Importante**: O PDF.js worker deve estar configurado corretamente
- Para PDFs locais, use `pdfData` (ArrayBuffer) em vez de `pdfUrl`

### Configuração correta do PDF.js
```javascript
// Configure o worker antes de usar o plugin
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
```

### Imagens não aparecem
- Verifique se as URLs das imagens são válidas
- Confirme se as imagens são acessíveis
- Verifique o console para erros de carregamento

### Performance lenta
- Reduza o `renderScale`
- Diminua o `lazyRenderAhead`
- Use imagens otimizadas

## 📄 Licença

Este plugin é de código aberto e pode ser usado livremente em projetos pessoais e comerciais.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

---

**Desenvolvido com ❤️ para criar experiências de leitura interativas**
