# 🔧 Guia de Solução de Problemas - DearFlip

## 🚨 Problemas Comuns e Soluções

### 1. **"Carregando PDF..." não desaparece**

**Causa:** O PDF não está carregando corretamente ou há erro no PDF.js

**Soluções:**
- Abra o console do navegador (F12) e verifique se há erros
- Teste primeiro com imagens para verificar se o plugin funciona
- Verifique se o PDF.js está carregado corretamente

### 2. **Plugin não funciona com imagens**

**Causa:** jQuery ou plugin não carregou

**Soluções:**
```html
<!-- Verifique se estas linhas estão na ordem correta -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="dearflip-jquery-plugin.js"></script>
<link rel="stylesheet" href="dearflip.css">
```

### 3. **Erro de CORS com PDFs**

**Causa:** O servidor não permite acesso ao PDF

**Soluções:**
- Use `pdfData` (ArrayBuffer) em vez de `pdfUrl`
- Coloque o PDF no mesmo servidor da página
- Use um servidor local para testes

### 4. **PDF.js não carrega**

**Causa:** CDN do PDF.js está fora do ar ou bloqueado

**Soluções:**
```html
<!-- Tente CDNs alternativos -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<!-- ou -->
<script src="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js"></script>
```

## 🧪 Teste Passo a Passo

### Passo 1: Teste Básico
1. Abra `exemplo-minimo.html`
2. Clique em "Iniciar Flipbook"
3. Deve funcionar com imagens

### Passo 2: Verificar Componentes
1. Abra `exemplo-funcional.html`
2. Clique em "Verificar se tudo está carregado"
3. Todos devem mostrar ✅

### Passo 3: Teste PDF
1. Use o upload de arquivo local
2. Escolha um PDF do seu computador
3. Deve carregar sem problemas de CORS

## 🔍 Debug no Console

Abra o console (F12) e verifique:

```javascript
// Verificar se jQuery carregou
console.log('jQuery:', typeof $ !== 'undefined');

// Verificar se PDF.js carregou
console.log('PDF.js:', typeof pdfjsLib !== 'undefined');

// Verificar se DearFlip carregou
console.log('DearFlip:', typeof $.fn.dearFlip !== 'undefined');
```

## 📋 Checklist de Verificação

- [ ] jQuery está carregado
- [ ] PDF.js está carregado (se usar PDFs)
- [ ] DearFlip plugin está carregado
- [ ] CSS do plugin está carregado
- [ ] Não há erros no console
- [ ] PDF.js worker está configurado
- [ ] URLs das imagens são acessíveis
- [ ] PDF não tem problemas de CORS

## 🛠️ Exemplos de Uso Correto

### Com Imagens (Sempre funciona)
```javascript
$('#flipbook').dearFlip({
    images: [
        'imagem1.jpg',
        'imagem2.jpg',
        'imagem3.jpg'
    ],
    width: 800,
    height: 500
});
```

### Com PDF Local (Recomendado)
```javascript
// Primeiro leia o arquivo
const reader = new FileReader();
reader.onload = function(e) {
    $('#flipbook').dearFlip({
        pdfData: e.target.result,
        width: 800,
        height: 500
    });
};
reader.readAsArrayBuffer(file);
```

### Com PDF Online (Pode ter CORS)
```javascript
$('#flipbook').dearFlip({
    pdfUrl: 'https://exemplo.com/documento.pdf',
    width: 800,
    height: 500
});
```

## 🚀 Servidor Local para Testes

Para evitar problemas de CORS, use um servidor local:

### Python 3
```bash
python -m http.server 8000
```

### Node.js
```bash
npx http-server
```

### PHP
```bash
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

## 📞 Se Nada Funcionar

1. **Teste com imagens primeiro** - Se não funcionar, o problema é no plugin
2. **Verifique o console** - Sempre há mensagens de erro úteis
3. **Teste em navegador diferente** - Pode ser problema específico do navegador
4. **Verifique versões** - Use as versões recomendadas das dependências

## 🎯 Ordem de Teste Recomendada

1. `exemplo-minimo.html` - Teste básico
2. `exemplo-funcional.html` - Teste completo
3. `exemplo-pdf.html` - Teste específico de PDF
4. `teste-simples.html` - Teste de debug

---

**💡 Dica:** Sempre comece testando com imagens antes de tentar PDFs!
