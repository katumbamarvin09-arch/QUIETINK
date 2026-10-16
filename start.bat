@echo off
REM ====================================================================
REM QUIETINK — 1-CLICK WINDOWS LAUNCHER
REM ====================================================================
REM Simply double-click this file from Windows File Explorer or run it
REM inside VS Code's Command Prompt terminal.
REM ====================================================================

title QuietInk — Digital Journaling Sanctuary
cls

echo ====================================================================
echo               QUIETINK -- YOUR JOURNAL, YOUR SPACE
echo ====================================================================
echo.

REM 1. Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Node.js was not found on your computer.
    echo.
    echo Please install the recommended version of Node.js:
    echo https://nodejs.org/  (Click the "LTS" button)
    echo.
    echo After installing Node.js, double-click this file again!
    echo ====================================================================
    pause
    exit /b 1
)

echo [OK] Node.js is ready.

REM 2. Check and install dependencies if running for the first time
if not exist "node_modules" (
    echo.
    echo [*] First time setup: Downloading required packages...
    echo     (This only happens once and may take 30-60 seconds)
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Installation failed. Please check your internet connection.
        pause
        exit /b %errorlevel%
    )
    echo [OK] All packages installed successfully!
)

REM 3. Open browser automatically after launching
echo.
echo [*] Opening your browser to http://localhost:3000 ...
start "" http://localhost:3000

echo.
echo ====================================================================
echo   QuietInk is now running on: http://localhost:3000
echo   To stop the website, press [Ctrl + C] or close this window.
echo ====================================================================
echo.

call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo Server stopped.
    pause
)
