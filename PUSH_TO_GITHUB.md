# Push to GitHub - Step by Step Guide

## Option 1: Using GitHub Desktop (EASIEST - Recommended) ⭐

### Step 1: Install GitHub Desktop
1. Go to https://desktop.github.com/
2. Click "Download for Windows"
3. Install the application
4. Sign in with your GitHub account (or create one at github.com)

### Step 2: Add Your Repository
1. Open GitHub Desktop
2. Click **File** → **Add Local Repository**
3. Click **Choose...** and navigate to: `C:\Users\thoma\OneDrive\Desktop\geoclock`
4. Click **Add Repository**

### Step 3: Review Changes
- You'll see all your files listed as changes
- Review the files (make sure `node_modules` is NOT included - it should be ignored)

### Step 4: Make Your First Commit
1. At the bottom, type a commit message: `Initial commit: GeoClock app`
2. Click **Commit to main** (or create a new branch first if you prefer)

### Step 5: Publish to GitHub
1. Click **Publish repository** button (top right)
2. Choose:
   - **Name**: `geoclock` (or any name you like)
   - **Description**: "Location-based alarm app built with React Native and Expo"
   - **Keep this code private**: Check if you want it private, uncheck for public
3. Click **Publish Repository**

✅ **Done!** Your code is now on GitHub!

---

## Option 2: Using Command Line (If you prefer terminal)

### Step 1: Install Git
1. Go to https://git-scm.com/download/win
2. Download and install Git for Windows
3. **Important**: During installation, choose "Git from the command line and also from 3rd-party software"
4. Restart your terminal after installation

### Step 2: Initialize Repository
Open PowerShell in your project folder and run:

```powershell
cd "C:\Users\thoma\OneDrive\Desktop\geoclock"
git init
git add .
git commit -m "Initial commit: GeoClock app"
```

### Step 3: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `geoclock`
3. Description: "Location-based alarm app built with React Native and Expo"
4. Choose Public or Private
5. **DO NOT** check "Initialize with README" (we already have one)
6. Click **Create repository**

### Step 4: Connect and Push
GitHub will show you commands. Run these in PowerShell:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/geoclock.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## After Pushing - Using Codespaces

Once your code is on GitHub:

1. Go to your repository on GitHub.com
2. Click the green **Code** button
3. Select the **Codespaces** tab
4. Click **Create codespace on main**
5. Wait for the environment to load (about 2-3 minutes)
6. Open a terminal in Codespaces
7. Run: `npm start`
8. The app will be ready to test!

---

## Need Help?

- **GitHub Desktop Issues**: Make sure you're signed in to GitHub
- **Command Line Issues**: Make sure Git is installed and you've restarted your terminal
- **Permission Errors**: Make sure you're logged into GitHub



