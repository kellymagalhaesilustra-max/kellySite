# 📖 Flipbook Unificado - Instruções

## ✅ Funcionalidades

O **Flipbook Unificado** permite acessar todas as revistas em um só lugar:

### 🎯 Revistas Disponíveis:
- **Revista 1930** (17 páginas)
- **Revista Forbes** (15 páginas)
- **Revista Mulheres** (37 páginas)
- **Revista Valor** (26 páginas)
- **Revista Casa Rara** (31 páginas)

---

## 🚀 Como Usar

### 1. **Abrir o Flipbook**
- Duplo clique em `flipbook-revistas-unificado.html`
- Ou acesse pelo site principal: `site-local.html` → Seção Flipbook 3D

### 2. **Selecionar Revista**
- Use o menu dropdown "Escolha a revista"
- Selecione a revista desejada
- Aguarde o carregamento

### 3. **Navegar pelas Páginas**
- **Botões**: Use "Página Anterior" e "Próxima Página"
- **Teclado**: 
  - `→` ou `Espaço` = Próxima página
  - `←` = Página anterior
- **Mouse**: Clique na página atual para virar

---

## 🎨 Características

### ✨ Design
- **Layout responsivo** - funciona em desktop e mobile
- **Animações suaves** - transições elegantes
- **Cores da marca** - rosa #FA6DCD e fundo #EAEBE5
- **Fonte personalizada** - KG Red Hands

### 🔧 Funcionalidades
- **Menu de seleção** - escolha entre 5 revistas
- **Contador de páginas** - mostra página atual/total
- **Botões inteligentes** - desabilitam quando necessário
- **Navegação por teclado** - atalhos para facilitar
- **Loading indicator** - feedback visual durante carregamento

### 📱 Responsivo
- **Desktop**: Flipbook 800x600px
- **Tablet**: Flipbook 90% da largura da tela
- **Mobile**: Flipbook 95% da largura da tela

---

## 📁 Estrutura de Arquivos

```
KELLY-SITE/
├── flipbook-revistas-unificado.html    ← NOVO ARQUIVO
├── site-local.html                     ← Link atualizado
├── REVISTA/
│   ├── 1930 -revista/
│   │   ├── Pag (1).jpg
│   │   ├── Pag (2).jpg
│   │   └── ...
│   ├── Forbes-revista/
│   ├── Mulheres -Revista/
│   ├── Valor -Revista/
│   └── Casa rara - Revista/
└── images/
    └── logotipoKMilustra.png
```

---

## 🔧 Configuração

### Número de Páginas por Revista:
```javascript
const revistasConfig = {
  '1930 -revista': 17,
  'Forbes-revista': 15,
  'Mulheres -Revista': 37,
  'Valor -Revista': 26,
  'Casa rara - Revista': 31
};
```

### Padrão de Nomenclatura:
- **Formato**: `Pag (1).jpg`, `Pag (2).jpg`, etc.
- **Extensão**: `.jpg`
- **Pasta**: `REVISTA/[nome-da-revista]/`

---

## 🛠️ Solução de Problemas

### ❌ Imagens não carregam
- Verifique se as pastas existem em `REVISTA/`
- Confirme se os nomes dos arquivos seguem o padrão
- Verifique se as extensões são `.jpg`

### ❌ Flipbook não abre
- Abra diretamente: `flipbook-revistas-unificado.html`
- Verifique se não há bloqueios de antivírus
- Tente em outro navegador

### ❌ Páginas não viram
- Verifique se JavaScript está habilitado
- Tente usar os botões em vez do clique
- Use as teclas de seta para navegar

---

## 🎯 Vantagens

### ✅ **Sem Servidor**
- Funciona diretamente no navegador
- Não precisa de Python ou servidor web

### ✅ **Unificado**
- Todas as revistas em um só lugar
- Interface consistente

### ✅ **Responsivo**
- Funciona em qualquer dispositivo
- Layout adaptativo

### ✅ **Intuitivo**
- Navegação fácil
- Feedback visual claro

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todos os arquivos estão na pasta correta
2. Confirme se as imagens seguem o padrão de nomenclatura
3. Teste em diferentes navegadores
4. Verifique se JavaScript está habilitado
