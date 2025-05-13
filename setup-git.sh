#!/bin/bash

# Script to connect local praisesync-gem to GitHub repo and merge

echo "🔧 Setting up Git connection for PraiseSync..."

# Navigate to project directory
cd /Users/jdavi/Sites/praisesync-gem

# Check if .git directory exists
if [ -d ".git" ]; then
    echo "✅ Git repository already initialized"
else
    echo "📁 Initializing Git repository..."
    git init
fi

# Check current remotes
echo "📡 Checking current remotes..."
git remote -v

# Add remote if not exists
if git remote | grep -q "origin"; then
    echo "✅ Remote 'origin' already exists"
else
    echo "➕ Adding remote origin..."
    # You'll need to replace YOUR_USERNAME with your actual GitHub username
    git remote add origin https://github.com/YOUR_USERNAME/praisesync-gem.git
fi

# Fetch from remote
echo "📥 Fetching from remote..."
git fetch origin

# Check status
echo "📊 Current status:"
git status

# Create initial commit if needed
if ! git rev-parse HEAD >/dev/null 2>&1; then
    echo "📝 Creating initial commit..."
    git add .
    git commit -m "Initial commit: PraiseSync Next.js application"
fi

# Pull and merge with remote
echo "🔄 Pulling from remote (allow unrelated histories)..."
git pull origin main --allow-unrelated-histories --no-rebase

echo "✨ Done! Your local and remote repositories should now be connected."
echo "📋 Next steps:"
echo "  1. Review any merge conflicts if they exist"
echo "  2. Commit the merged changes"
echo "  3. Push to remote: git push origin main"
