# Instruções para Testar o Site

## Como testar o site:

1. **Abra o terminal/prompt de comando**
2. **Navegue até a pasta do projeto:**
   ```
   cd C:\Users\User\Documents\KELLY-SITE
   ```

3. **Inicie o servidor local:**
   ```
   python -m http.server 8000
   ```

4. **Abra o navegador e acesse:**
   ```
   http://localhost:8000
   ```

5. **Para testar especificamente o vídeo, acesse:**
   ```
   http://localhost:8000/teste-video.html
   ```

## Problemas comuns e soluções:

### Se o vídeo não aparecer:
- Verifique se o arquivo `MOJITO_KELLY.mp4` está na pasta raiz
- Abra o console do navegador (F12) para ver mensagens de erro
- Tente acessar o arquivo de teste primeiro

### Se o servidor não iniciar:
- Verifique se o Python está instalado
- Tente usar: `python3 -m http.server 8000`
- Ou use: `npx http-server`

### Se o vídeo não reproduzir automaticamente:
- Alguns navegadores bloqueiam autoplay
- Clique no vídeo para iniciar manualmente
- Verifique se o som está mudo (necessário para autoplay)

## Arquivos importantes:
- `index.html` - Site principal
- `teste-video.html` - Teste específico do vídeo
- `MOJITO_KELLY.mp4` - Arquivo de vídeo (convertido)
- `css/style.css` - Estilos do site
- `js/main.js` - JavaScript do site

## Status atual:
✅ Vídeo configurado com autoplay, muted e loop
✅ CSS ajustado para funcionar corretamente
✅ JavaScript adicionado para garantir reprodução
✅ Arquivo de teste criado para debug 