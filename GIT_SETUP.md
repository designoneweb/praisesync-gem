# Git Setup Instructions for PraiseSync

This guide will help you connect your local `/Users/jdavi/Sites/praisesync-gem` folder to your GitHub repository.

## Prerequisites
- Git installed on your system
- GitHub repository URL (https://github.com/YOUR_USERNAME/praisesync-gem.git)

## Steps

### 1. Initialize Git (if needed)
```bash
cd /Users/jdavi/Sites/praisesync-gem
git init
```

### 2. Add GitHub remote
Replace `YOUR_USERNAME` with your actual GitHub username:
```bash
git remote add origin https://github.com/YOUR_USERNAME/praisesync-gem.git
```

### 3. Fetch remote content
```bash
git fetch origin
```

### 4. Check what's in the remote
```bash
git ls-remote --heads origin
```

### 5. Create initial commit (if your local repo has no commits)
```bash
git add .
git commit -m "Initial commit: PraiseSync Next.js application"
```

### 6. Merge remote with local
Since the remote has 3 files that don't exist locally, we'll merge them:
```bash
git pull origin main --allow-unrelated-histories
```

If the remote uses `master` instead of `main`:
```bash
git pull origin master --allow-unrelated-histories
```

### 7. Resolve any conflicts
If there are merge conflicts:
1. Open the conflicted files
2. Choose which version to keep or merge manually
3. Remove conflict markers
4. Stage the resolved files: `git add .`
5. Complete the merge: `git commit -m "Merge remote repository"`

### 8. Push the merged result
```bash
git push origin main
```

## Troubleshooting

### If you get authentication errors:
1. Use a personal access token instead of password
2. Or use SSH: `git remote set-url origin git@github.com:YOUR_USERNAME/praisesync-gem.git`

### If you're unsure about the remote branch name:
```bash
git branch -r
```

### To see what files are in the remote:
```bash
git fetch origin
git checkout origin/main -- .
git status
```

## Next Steps
After successful merge:
1. Verify all files are present
2. Test the application still works
3. Continue development with regular commits
