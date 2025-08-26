@echo off
echo ========================================
echo    RE-ENVIAR PDFS COM GIT LFS
echo ========================================
echo.

echo [1/5] Verificando se Git LFS esta configurado...
git lfs ls-files >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Git LFS nao esta configurado!
    echo Execute primeiro: setup-git-lfs.bat
    pause
    exit /b 1
)
echo OK: Git LFS configurado!

echo.
echo [2/5] Removendo PDFs do cache do Git...
git rm --cached pdfs/*.pdf
if %errorlevel% neq 0 (
    echo AVISO: Alguns PDFs podem nao existir no cache
)
echo OK: PDFs removidos do cache!

echo.
echo [3/5] Adicionando PDFs com Git LFS...
git add pdfs/*.pdf
if %errorlevel% neq 0 (
    echo ERRO: Falha ao adicionar PDFs
    pause
    exit /b 1
)
echo OK: PDFs adicionados com LFS!

echo.
echo [4/5] Fazendo commit dos PDFs...
git commit -m "Re-enviar PDFs com Git LFS"
if %errorlevel% neq 0 (
    echo ERRO: Falha ao fazer commit
    pause
    exit /b 1
)
echo OK: Commit realizado!

echo.
echo [5/5] Enviando para GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ERRO: Falha ao enviar para GitHub
    pause
    exit /b 1
)
echo OK: PDFs enviados para GitHub!

echo.
echo ========================================
echo    PDFS RE-ENVIADOS COM SUCESSO!
echo ========================================
echo.
echo Agora os PDFs devem funcionar no GitHub Pages.
echo.
echo Para testar:
echo 1. Aguarde alguns minutos para o deploy
echo 2. Acesse: https://kellymagalhaesilustra-max.github.io/kellySite/flipbook.html
echo 3. Teste o carregamento dos PDFs
echo.
pause
