#!/bin/bash

# Git setup and merge script for PraiseSync
# This script connects your local folder to the GitHub repository

echo "🚀 Setting up PraiseSync Git Repository"
echo "======================================="

cd /Users/jdavi/Sites/praisesync-gem

# Step 1: Initialize Git
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Step 2: Configure Git
echo "⚙️  Configuring Git..."
git config user.name "David Wyatt"
git config user.email "david@designoneweb.com"

# Step 3: Add GitHub remote
echo "🔗 Adding GitHub remote..."
if ! git remote | grep -q "origin"; then
    git remote add origin https://github.com/designoneweb/praisesync-gem.git
    echo "✅ Remote added"
else
    echo "✅ Remote already exists"
fi

# Step 4: Create initial commit
echo "📝 Creating initial commit..."
git add .
git commit -m "Initial commit: PraiseSync Next.js application"

# Step 5: Fetch from remote
echo "📥 Fetching from remote..."
git fetch origin main

# Step 6: Check what's in remote
echo "📋 Files in remote repository:"
git ls-tree -r origin/main --name-only

# Step 7: Create a merge branch
echo "🌿 Creating merge branch..."
git checkout -b initial-merge

# Step 8: Merge with remote
echo "🔀 Merging with remote..."
git merge origin/main --allow-unrelated-histories --no-commit

# Step 9: Check for conflicts
echo "🔍 Checking merge status..."
CONFLICTS=$(git diff --name-only --diff-filter=U)

if [ -z "$CONFLICTS" ]; then
    echo "✅ No conflicts detected!"
    git commit -m "Merge remote repository with local Next.js app"
    echo ""
    echo "🎉 Merge completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Review the merged files"
    echo "2. Switch to main branch: git checkout -b main"
    echo "3. Merge the changes: git merge initial-merge"
    echo "4. Push to GitHub: git push -u origin main"
else
    echo "⚠️  Merge conflicts detected in:"
    echo "$CONFLICTS"
    echo ""
    echo "Please resolve conflicts manually:"
    echo "1. Open conflicted files and resolve"
    echo "2. Mark as resolved: git add <filename>"
    echo "3. Complete merge: git commit -m 'Resolved merge conflicts'"
fi

echo ""
echo "📊 Current status:"
git status
