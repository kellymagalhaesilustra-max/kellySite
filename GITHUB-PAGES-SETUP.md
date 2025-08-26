# 🚀 Configuração GitHub Pages + Git LFS

## 🚨 PROBLEMA IDENTIFICADO

O GitHub Pages tem limitações para arquivos grandes, especialmente PDFs. Os PDFs estão sendo corrompidos ou não carregam corretamente.

## 🔧 SOLUÇÃO: Git LFS (Large File Storage)

### Passo 1: Instalar Git LFS

#### Windows:
```bash
# Baixe e instale do site oficial
# https://git-lfs.github.com/
```

#### macOS:
```bash
brew install git-lfs
```

#### Linux:
```bash
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
```

### Passo 2: Configurar Git LFS no Repositório

```bash
# 1. Navegue até o diretório do projeto
cd KELLY-SITE

# 2. Inicialize Git LFS
git lfs install

# 3. Configure o tracking para PDFs
git lfs track "*.pdf"

# 4. Adicione o arquivo .gitattributes
git add .gitattributes

# 5. Commit das configurações
git commit -m "Configurar Git LFS para PDFs"

# 6. Push para o GitHub
git push origin main
```

### Passo 3: Re-enviar PDFs com Git LFS

```bash
# 1. Remova os PDFs do cache do Git
git rm --cached pdfs/*.pdf

# 2. Adicione novamente (agora com LFS)
git add pdfs/*.pdf

# 3. Commit
git commit -m "Re-enviar PDFs com Git LFS"

# 4. Push
git push origin main
```

## 🔍 VERIFICAÇÃO

### Verificar se Git LFS está funcionando:

```bash
# Verificar arquivos trackados
git lfs ls-files

# Verificar status
git lfs status
```

### Verificar no GitHub:

1. Vá para o repositório no GitHub
2. Clique em um arquivo PDF
3. Deve aparecer "Stored with Git LFS" na parte superior

## 🛠️ SOLUÇÕES ALTERNATIVAS

### Solução 1: Hosting Externo

Se Git LFS não funcionar, use serviços externos:

#### Google Drive:
1. Faça upload dos PDFs para Google Drive
2. Clique com botão direito → "Compartilhar"
3. Copie o link de compartilhamento
4. Substitua no código:

```javascript
// Em vez de: 'pdfs/mulheres.pdf'
// Use: 'https://drive.google.com/uc?export=download&id=SEU_ID_AQUI'
```

#### Dropbox:
1. Upload para Dropbox
2. Clique com botão direito → "Compartilhar"
3. Copie o link
4. Substitua `www.dropbox.com` por `dl.dropboxusercontent.com`

### Solução 2: Comprimir PDFs

Reduza o tamanho dos PDFs:

1. Use ferramentas online como:
   - SmallPDF
   - ILovePDF
   - PDF24

2. Configure para:
   - Qualidade: Média
   - Tamanho máximo: 5MB
   - Resolução: 150 DPI

### Solução 3: Usar Google Docs Viewer

```html
<iframe 
  src="https://docs.google.com/viewer?url=URL_DO_PDF&embedded=true"
  width="100%" 
  height="600px">
</iframe>
```

## 📋 ARQUIVOS CRIADOS

### 1. `.gitattributes`
- Configuração do Git LFS
- Tracking de PDFs e outros arquivos grandes

### 2. `solucao-github-pages.html`
- Solução específica para GitHub Pages
- Debug completo
- Múltiplas tentativas de carregamento

## 🎯 PASSOS PARA IMPLEMENTAR

### Opção A: Git LFS (Recomendado)
1. ✅ Instalar Git LFS
2. ✅ Configurar tracking
3. ✅ Re-enviar PDFs
4. ✅ Testar no GitHub Pages

### Opção B: Hosting Externo
1. ✅ Fazer upload para Google Drive/Dropbox
2. ✅ Obter links de compartilhamento
3. ✅ Atualizar código com novos links
4. ✅ Testar

### Opção C: Comprimir PDFs
1. ✅ Comprimir todos os PDFs
2. ✅ Substituir arquivos originais
3. ✅ Commit e push
4. ✅ Testar

## 🔍 DIAGNÓSTICO

### Verificar se está funcionando:

1. **Acesse**: `https://kellymagalhaesilustra-max.github.io/kellySite/solucao-github-pages.html`
2. **Clique em**: "Debug Completo"
3. **Verifique**: Logs de carregamento
4. **Teste**: Carregamento de PDFs

### Possíveis erros:

- **"PDF inválido"**: Git LFS não configurado
- **"Timeout"**: Arquivo muito grande
- **"CORS"**: Problema de origem cruzada
- **"404"**: Arquivo não encontrado

## 📞 SUPORTE

Se o problema persistir:

1. **Verifique logs** no arquivo de debug
2. **Teste Git LFS**: `git lfs ls-files`
3. **Verifique GitHub**: Se PDFs aparecem como "LFS"
4. **Use hosting externo** como alternativa
5. **Comprima PDFs** se necessário

## 🎯 RESULTADO ESPERADO

Após implementar Git LFS:

- ✅ PDFs carregam normalmente
- ✅ Sem erros de "corrompido"
- ✅ Performance melhorada
- ✅ Funciona no GitHub Pages

---

**Status**: ✅ Soluções implementadas
**Última atualização**: Dezembro 2024
**Versão**: 1.0
