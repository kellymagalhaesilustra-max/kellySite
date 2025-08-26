@echo off
echo ========================================
echo    CONFIGURACAO GIT LFS - KELLY SITE
echo ========================================
echo.

echo [1/6] Verificando se Git LFS esta instalado...
git lfs version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Git LFS nao esta instalado!
    echo.
    echo Por favor, instale o Git LFS:
    echo 1. Vá para: https://git-lfs.github.com/
    echo 2. Baixe e instale para Windows
    echo 3. Execute este script novamente
    echo.
    pause
    exit /b 1
)
echo OK: Git LFS encontrado!

echo.
echo [2/6] Inicializando Git LFS...
git lfs install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao inicializar Git LFS
    pause
    exit /b 1
)
echo OK: Git LFS inicializado!

echo.
echo [3/6] Configurando tracking para PDFs...
git lfs track "*.pdf"
if %errorlevel% neq 0 (
    echo ERRO: Falha ao configurar tracking
    pause
    exit /b 1
)
echo OK: Tracking configurado!

echo.
echo [4/6] Adicionando arquivo .gitattributes...
git add .gitattributes
if %errorlevel% neq 0 (
    echo ERRO: Falha ao adicionar .gitattributes
    pause
    exit /b 1
)
echo OK: .gitattributes adicionado!

echo.
echo [5/6] Fazendo commit das configuracoes...
git commit -m "Configurar Git LFS para PDFs"
if %errorlevel% neq 0 (
    echo ERRO: Falha ao fazer commit
    pause
    exit /b 1
)
echo OK: Commit realizado!

echo.
echo [6/6] Enviando para GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ERRO: Falha ao enviar para GitHub
    pause
    exit /b 1
)
echo OK: Enviado para GitHub!

echo.
echo ========================================
echo    CONFIGURACAO CONCLUIDA!
echo ========================================
echo.
echo Agora execute o script: setup-pdfs.bat
echo para re-enviar os PDFs com Git LFS
echo.
pause
