@echo off
REM Smart Tourist Safety Monitoring System - GitHub Push Script
REM This script will help you push your project to GitHub after creating the repository

echo ================================================
echo Smart Tourist Safety Monitoring System
echo GitHub Push Script
echo ================================================

echo.
echo Current directory: %cd%

REM Check if Git is installed
echo Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/downloads
    pause
    exit /b 1
)

echo Git is installed: 
git --version

REM Display Git status
echo.
echo Git status:
git status

REM Check if repository exists
echo.
echo Checking remote repository...
git ls-remote --heads origin >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ================================================
    echo MANUAL STEP REQUIRED: Create GitHub Repository
    echo ================================================
    echo.
    echo Please follow these steps:
    echo 1. Go to https://github.com/new
    echo 2. Sign in to your GitHub account
    echo 3. Fill in repository details:
    echo    - Repository name: smart-tourist-safety-monitoring
    echo    - Description: Smart Tourist Safety Monitoring ^& Incident Response System
    echo    - Public: Select "Public"
    echo    - Initialize this repository with a README: Leave UNCHECKED
    echo 4. Click "Create repository"
    echo.
    echo After creating the repository, press any key to continue...
    pause
)

echo.
echo ================================================
echo Pushing to GitHub
echo ================================================

REM Try to push to GitHub
echo Pushing code to GitHub...
git push -u origin master

if %errorlevel% equ 0 (
    echo.
    echo ================================================
    echo SUCCESS! Repository pushed to GitHub
    echo ================================================
    echo.
    echo Your repository is now available at:
    echo https://github.com/rdr-cyber/smart-tourist-safety-monitoring
    echo.
    echo To update your repository in the future:
    echo 1. Make your changes
    echo 2. Run: git add .
    echo 3. Run: git commit -m "Your commit message"
    echo 4. Run: git push
) else (
    echo.
    echo ================================================
    echo PUSH FAILED
    echo ================================================
    echo.
    echo There was an error pushing to GitHub.
    echo Please check:
    echo 1. You created the repository with the correct name
    echo 2. You have internet connectivity
    echo 3. Your GitHub credentials are correct
    echo 4. You have the necessary permissions
)

echo.
echo Press any key to exit...
pause