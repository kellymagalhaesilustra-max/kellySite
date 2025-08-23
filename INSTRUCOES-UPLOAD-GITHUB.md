# Instruções para Upload no GitHub - Kelly Magalhães

## Problema Identificado
O Git não está funcionando corretamente no terminal. Vamos resolver isso!

## Solução 1: Instalar/Reinstalar o Git

### Passo 1: Baixar o Git
1. Acesse: https://git-scm.com/download/win
2. Baixe a versão para Windows
3. Execute o instalador
4. **IMPORTANTE**: Durante a instalação, selecione "Git from the command line and also from 3rd-party software"

### Passo 2: Reiniciar o Computador
Após a instalação, reinicie o computador para garantir que o Git seja reconhecido.

### Passo 3: Testar o Git
Abra o PowerShell e digite:
```bash
git --version
```

## Solução 2: Usar o GitHub Desktop (Mais Fácil)

### Passo 1: Baixar GitHub Desktop
1. Acesse: https://desktop.github.com/
2. Baixe e instale o GitHub Desktop

### Passo 2: Configurar o Repositório
1. Abra o GitHub Desktop
2. Clique em "Clone a repository from the Internet"
3. Selecione: `kellymagalhaesilustra-max/kellySite`
4. Escolha onde salvar localmente
5. Clique em "Clone"

### Passo 3: Fazer Upload
1. Copie todos os arquivos do seu site para a pasta clonada
2. No GitHub Desktop, você verá as mudanças
3. Adicione uma mensagem de commit
4. Clique em "Commit to main"
5. Clique em "Push origin"

## Solução 3: Upload Manual pelo GitHub Web

### Passo 1: Acessar o Repositório
1. Vá para: https://github.com/kellymagalhaesilustra-max/kellySite
2. Clique em "Add file" > "Upload files"

### Passo 2: Fazer Upload
1. Arraste todos os arquivos do seu site
2. Adicione uma mensagem de commit
3. Clique em "Commit changes"

## Configurar GitHub Pages

### Passo 1: Ativar GitHub Pages
1. No repositório, vá em "Settings"
2. No menu lateral, clique em "Pages"
3. Em "Source", selecione "Deploy from a branch"
4. Escolha a branch "main"
5. Clique em "Save"

### Passo 2: Acessar o Site
Seu site ficará disponível em:
`https://kellymagalhaesilustra-max.github.io/kellySite`

## Arquivos Importantes para o Site

Certifique-se de que estes arquivos estão na raiz:
- ✅ `index.html` (página principal)
- ✅ `css/style.css`
- ✅ `css/animations.css`
- ✅ `css/fonts.css`
- ✅ `images/` (pasta com todas as imagens)
- ✅ `js/main.js`
- ✅ `404.html` (página de erro personalizada)

## Contato
Se precisar de ajuda: kellymagalhaesilustra@gmail.com

---
**Dica**: A Solução 2 (GitHub Desktop) é a mais fácil e recomendada!
