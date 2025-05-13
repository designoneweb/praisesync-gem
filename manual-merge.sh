#!/bin/bash

echo "🔧 Manual Git Merge for PraiseSync"
echo "================================="

cd /Users/jdavi/Sites/praisesync-gem

# Check current status
echo "📊 Current status:"
git status
echo ""

# Configure merge strategy
echo "⚙️ Configuring merge strategy..."
git config pull.rebase false  # Use merge (not rebase)

# Try to pull with merge strategy
echo "🔀 Attempting merge..."
git pull origin main --allow-unrelated-histories --no-rebase

# If merge failed, show the status
if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️ Merge failed. Let's try a different approach..."
    echo ""
    
    # Show what files exist in both
    echo "📋 Checking for conflicts..."
    git status
    
    echo ""
    echo "🔍 Remote files not yet merged:"
    git diff --name-only origin/main
    
    echo ""
    echo "Try one of these approaches:"
    echo "1. Force merge: git merge origin/main --allow-unrelated-histories"
    echo "2. Reset and pull: git reset --hard HEAD && git pull origin main --allow-unrelated-histories"
    echo "3. Cherry-pick commits: git log origin/main"
else
    echo ""
    echo "✅ Merge successful!"
    echo ""
    echo "📋 Current status:"
    git status
    echo ""
    echo "🎯 Next step: Push to GitHub"
    echo "Run: git push origin main"
fi
