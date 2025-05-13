#!/bin/bash

# Script to handle merging remote files with local repository

echo "🔄 PraiseSync Repository Merge Helper"
echo "===================================="

cd /Users/jdavi/Sites/praisesync-gem

# Function to check command status
check_status() {
    if [ $? -eq 0 ]; then
        echo "✅ $1"
        return 0
    else
        echo "❌ $1 failed"
        return 1
    fi
}

# Initialize git if needed
if [ ! -d ".git" ]; then
    git init
    check_status "Git initialized"
fi

# Create a backup of current state
echo -e "\n💾 Creating backup of current state..."
git add .
git stash save "Backup before merge - $(date +%Y%m%d_%H%M%S)"
check_status "Backup created"

# Add remote if not exists
if ! git remote | grep -q "origin"; then
    echo -e "\n🔗 Adding remote repository..."
    echo "Enter your GitHub username:"
    read username
    git remote add origin "https://github.com/$username/praisesync-gem.git"
    check_status "Remote added"
fi

# Fetch remote
echo -e "\n📥 Fetching remote repository..."
git fetch origin
check_status "Remote fetched"

# Check what files are in the remote
echo -e "\n📋 Files in remote repository:"
git ls-tree -r origin/main --name-only 2>/dev/null || git ls-tree -r origin/master --name-only 2>/dev/null

# Determine main branch
if git branch -r | grep -q "origin/main"; then
    BRANCH="main"
elif git branch -r | grep -q "origin/master"; then
    BRANCH="master"
else
    echo "Enter the main branch name:"
    read BRANCH
fi

# Create a new branch for the merge
echo -e "\n🌿 Creating merge branch..."
git checkout -b merge-remote-files

# Apply stashed changes
echo -e "\n📦 Restoring local files..."
git stash pop

# Add all files
git add .
git commit -m "Local changes before merge"

# Merge with remote
echo -e "\n🔀 Merging with remote (branch: $BRANCH)..."
git fetch origin $BRANCH
git merge origin/$BRANCH --allow-unrelated-histories --strategy=recursive -X ours

if [ $? -eq 0 ]; then
    echo -e "\n✅ Merge completed successfully!"
    echo "Files from remote have been merged with your local files."
    echo ""
    echo "Next steps:"
    echo "1. Review the changes: git status"
    echo "2. Check for any conflicts"
    echo "3. Commit if needed: git add . && git commit -m 'Merged remote files'"
    echo "4. Push to remote: git push origin merge-remote-files"
    echo "5. Create a pull request or merge to main branch"
else
    echo -e "\n⚠️  Merge requires manual intervention"
    echo "1. Check git status"
    echo "2. Resolve any conflicts"
    echo "3. Add resolved files: git add <filename>"
    echo "4. Complete merge: git commit"
fi
