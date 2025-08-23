@echo off
echo ========================================
echo Upload para GitHub - Kelly Magalhaes
echo ========================================
echo.

echo Verificando se o Git esta instalado...
git --version
if %errorlevel% neq 0 (
    echo ERRO: Git nao esta instalado ou nao esta no PATH
    echo Por favor, instale o Git de: https://git-scm.com/
    pause
    exit /b 1
)

echo.
echo Configurando o repositorio...
git init
git remote add origin https://github.com/kellymagalhaesilustra-max/kellySite.git

echo.
echo Adicionando arquivos...
git add .

echo.
echo Fazendo commit...
git commit -m "Atualizacao do site - Kelly Magalhaes"

echo.
echo Enviando para o GitHub...
git push origin main

echo.
echo ========================================
echo Upload concluido!
echo ========================================
pause
