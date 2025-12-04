@echo off
echo Stopping Next.js development server...
echo.

REM Find and kill processes running on port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    echo Killing process %%a on port 3000...
    taskkill /F /PID %%a
)

REM Also kill any node processes running Next.js
for /f "tokens=2" %%a in ('tasklist ^| findstr node.exe') do (
    echo Checking node process %%a...
    taskkill /F /PID %%a 2>nul
)

echo.
echo Server stopped!
pause
