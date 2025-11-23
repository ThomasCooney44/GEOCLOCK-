# Setting Up GitHub Repository

## Option 1: Using GitHub Desktop (Easiest)

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop
3. Click "File" → "Add Local Repository"
4. Browse to your `geoclock` folder
5. Click "Publish repository" button
6. Choose a name for your repository
7. Make it private or public as you prefer
8. Click "Publish Repository"

## Option 2: Using Command Line (If Git is Installed)

1. Open PowerShell or Command Prompt in your project folder
2. Initialize git (if not already done):
```bash
git init
```

3. Add all files:
```bash
git add .
```

4. Make your first commit:
```bash
git commit -m "Initial commit: GeoClock app"
```

5. Create a new repository on GitHub.com
   - Go to https://github.com/new
   - Choose a repository name (e.g., "geoclock")
   - Don't initialize with README (we already have one)
   - Click "Create repository"

6. Connect and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/geoclock.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Option 3: Using GitHub Web Interface

1. Go to https://github.com/new
2. Create a new repository
3. After creating, GitHub will show you instructions
4. Use the "uploading an existing file" option
5. Drag and drop your project folder (excluding node_modules)

## After Pushing to GitHub

### To Use GitHub Codespaces:

1. Go to your repository on GitHub
2. Click the green "Code" button
3. Select the "Codespaces" tab
4. Click "Create codespace on main"
5. Wait for the environment to load
6. Open a terminal and run `npm start`

### To Clone and Run Locally:

```bash
git clone https://github.com/YOUR_USERNAME/geoclock.git
cd geoclock
npm install
npm start
```

## Important Notes

- Make sure `node_modules/` is in `.gitignore` (it already is)
- Never commit sensitive files like API keys or passwords
- The `.gitignore` file will prevent unnecessary files from being uploaded

