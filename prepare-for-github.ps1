# PowerShell script to prepare repository for GitHub
# Run this after installing Git

Write-Host "Preparing GeoClock repository for GitHub..." -ForegroundColor Green

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Or use GitHub Desktop from: https://desktop.github.com/" -ForegroundColor Yellow
    exit 1
}

# Check if already a git repository
if (Test-Path .git) {
    Write-Host "Repository already initialized." -ForegroundColor Yellow
    $response = Read-Host "Do you want to continue anyway? (y/n)"
    if ($response -ne "y") {
        exit 0
    }
} else {
    Write-Host "Initializing git repository..." -ForegroundColor Cyan
    git init
}

# Check what files will be added
Write-Host "`nChecking files to be committed..." -ForegroundColor Cyan
git status --short

# Add all files
Write-Host "`nAdding all files..." -ForegroundColor Cyan
git add .

# Show what will be committed
Write-Host "`nFiles staged for commit:" -ForegroundColor Cyan
git status

# Create initial commit
Write-Host "`nCreating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit: GeoClock app"

Write-Host "`n✅ Repository is ready!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Create a repository on GitHub.com (https://github.com/new)" -ForegroundColor White
Write-Host "2. Then run these commands:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/geoclock.git" -ForegroundColor Gray
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host "`nOr use GitHub Desktop for easier setup!" -ForegroundColor Cyan



