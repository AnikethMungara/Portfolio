@echo off
REM Kill all Node.js and Next.js related background processes
REM This script will terminate all node processes running on your system

echo ================================================
echo Killing Node.js Background Processes
echo ================================================
echo.

REM Kill all node.exe processes
taskkill /F /IM node.exe /T 2>nul
if %errorlevel% equ 0 (
    echo [SUCCESS] Node.js processes terminated
) else (
    echo [INFO] No Node.js processes found running
)

echo.

REM Kill processes on common development ports (3000, 3001, 5000, 8080)
echo Checking for processes on common development ports...

for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do (
    echo Killing process on port 3000 (PID: %%a)
    taskkill /F /PID %%a 2>nul
)

for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do (
    echo Killing process on port 3001 (PID: %%a)
    taskkill /F /PID %%a 2>nul
)

for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do (
    echo Killing process on port 5000 (PID: %%a)
    taskkill /F /PID %%a 2>nul
)

for /f "tokens=5" %%a in ('netstat -aon ^| find ":8080" ^| find "LISTENING"') do (
    echo Killing process on port 8080 (PID: %%a)
    taskkill /F /PID %%a 2>nul
)

echo.
echo ================================================
echo Process cleanup complete!
echo ================================================
pause
