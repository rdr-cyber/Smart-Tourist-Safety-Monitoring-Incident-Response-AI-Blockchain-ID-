#!/bin/bash

# Smart Tourist Safety Monitoring System - GitHub Deployment Script
# This script will help you deploy your project to GitHub

echo "================================================"
echo "Smart Tourist Safety Monitoring System"
echo "GitHub Deployment Script"
echo "================================================"

# Check if Git is installed
echo "Checking Git installation..."
if ! command -v git &> /dev/null
then
    echo "ERROR: Git is not installed or not in PATH"
    echo "Please install Git from https://git-scm.com/downloads"
    exit 1
fi

echo "Git is installed: $(git --version)"

# Check current directory
echo ""
echo "Current directory: $(pwd)"

# Check if we're in the right directory
if [ ! -f "web-app/server.js" ]; then
    echo "ERROR: This script must be run from the project root directory"
    echo "Please navigate to the Smart Tourist Safety Monitoring project directory"
    exit 1
fi

echo ""
echo "Project files found. Preparing for deployment..."

# Display Git status
echo ""
echo "Git status:"
git status

# Configure Git user (if not already configured)
echo ""
echo "Configuring Git user..."
git config --global user.name "rdr-cyber"
git config --global user.email "therdrking@gmail.com"

echo "Git user configured."

# Create a final commit if there are any uncommitted changes
echo ""
echo "Checking for uncommitted changes..."
if ! git diff-index --quiet HEAD -- || [ -n "$(git status --porcelain)" ]; then
    echo "Creating final commit..."
    git add .
    git commit -m "Final deployment preparation"
    echo "Final commit created."
else
    echo "No uncommitted changes found."
fi

echo ""
echo "================================================"
echo "MANUAL STEP REQUIRED: Create GitHub Repository"
echo "================================================"
echo ""
echo "Please follow these steps:"
echo "1. Go to https://github.com/new"
echo "2. Sign in to your GitHub account"
echo "3. Fill in repository details:"
echo "   - Repository name: smart-tourist-safety-monitoring"
echo "   - Description: Smart Tourist Safety Monitoring & Incident Response System"
echo "   - Public: Select \"Public\""
echo "   - Initialize this repository with a README: Leave UNCHECKED"
echo "4. Click \"Create repository\""
echo ""
read -p "After creating the repository, press Enter to continue..."

echo ""
echo "================================================"
echo "Deploying to GitHub"
echo "================================================"

# Add remote origin
echo "Adding remote origin..."
git remote add origin https://github.com/rdr-cyber/smart-tourist-safety-monitoring.git 2>/dev/null

# Rename master branch to main (if needed)
echo "Renaming branch to main..."
git branch -M main 2>/dev/null

# Push to GitHub
echo "Pushing to GitHub..."
echo "You may be prompted for your GitHub username and a personal access token."
echo "If you don't have a personal access token, create one at:"
echo "https://github.com/settings/tokens"
echo "Select \"repo\" scope when creating the token."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "================================================"
    echo "DEPLOYMENT SUCCESSFUL!"
    echo "================================================"
    echo ""
    echo "Your repository is now available at:"
    echo "https://github.com/rdr-cyber/smart-tourist-safety-monitoring"
    echo ""
    echo "To update your repository in the future:"
    echo "1. Make your changes"
    echo "2. Run: git add ."
    echo "3. Run: git commit -m \"Your commit message\""
    echo "4. Run: git push"
else
    echo ""
    echo "================================================"
    echo "DEPLOYMENT FAILED"
    echo "================================================"
    echo ""
    echo "There was an error deploying to GitHub."
    echo "Please check:"
    echo "1. You created the repository with the correct name"
    echo "2. You have internet connectivity"
    echo "3. Your GitHub credentials are correct"
    echo "4. You have the necessary permissions"
fi

echo ""
read -p "Press Enter to exit..."