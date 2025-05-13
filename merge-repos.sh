#!/bin/bash

# Script to safely merge remote praisesync-gem repo with local

echo "🔧 Merging PraiseSync repositories..."
echo "===================================="

cd /Users/jdavi/Sites/praisesync-gem

# Step 1: Initialize git if needed
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
fi

# Step 2: Create a backup branch of current state
echo -e "\n💾 Creating backup of current state..."
git add .
git commit -m "Backup: Current local state before merge" --allow-empty

# Step 3: Add remote
echo -e "\n📡 Setting up remote..."
if ! git remote | grep -q "origin"; then
    # Replace YOUR_USERNAME with actual username
    read -p "Enter your GitHub username: " username
    git remote add origin "https://github.com/$username/praisesync-gem.git"
    echo "✅ Remote added"
else
    echo "✅ Remote already exists"
fi

# Step 4: Fetch remote
echo -e "\n📥 Fetching from remote..."
git fetch origin

# Step 5: Check remote branches
echo -e "\n🌳 Remote branches:"
git branch -r

# Step 6: Identify the main branch
echo -e "\n🔍 Identifying main branch..."
if git branch -r | grep -q "origin/main"; then
    MAIN_BRANCH="main"
elif git branch -r | grep -q "origin/master"; then
    MAIN_BRANCH="master"
else
    echo "❓ Could not identify main branch"
    read -p "Enter the main branch name: " MAIN_BRANCH
fi

echo "Using branch: $MAIN_BRANCH"

# Step 7: Create a merge branch
echo -e "\n🌿 Creating merge branch..."
git checkout -b merge-remote

# Step 8: Fetch and examine remote files
echo -e "\n📂 Examining remote files..."
git fetch origin $MAIN_BRANCH
echo "Remote files:"
git ls-tree -r origin/$MAIN_BRANCH --name-only

# Step 9: Merge with remote
echo -e "\n🔄 Merging with remote..."
git merge origin/$MAIN_BRANCH --allow-unrelated-histories --no-commit

# Step 10: Show status
echo -e "\n📊 Merge status:"
git status

echo -e "\n===================================="
echo "✅ Merge prepared!"
echo ""
echo "Next steps:"
echo "1. Review the changes with: git status"
echo "2. Check for conflicts and resolve them"
echo "3. Complete the merge: git commit -m 'Merge remote repository'"
echo "4. Switch to main branch: git checkout -b $MAIN_BRANCH"
echo "5. Merge the changes: git merge merge-remote"
echo "6. Push to remote: git push origin $MAIN_BRANCH"
echo ""
echo "To abort the merge: git merge --abort"
