#!/bin/bash

# Check git repository status

cd /Users/jdavi/Sites/praisesync-gem

echo "🔍 Checking Git repository status..."
echo "==================================="

# Check if .git exists
if [ -d ".git" ]; then
    echo "✅ Git repository exists"
    
    # Check remotes
    echo -e "\n📡 Remotes:"
    git remote -v
    
    # Check branches
    echo -e "\n🌳 Branches:"
    git branch -a
    
    # Check commits
    echo -e "\n📝 Commits:"
    git log --oneline -5 2>/dev/null || echo "No commits yet"
    
    # Check status
    echo -e "\n📊 Status:"
    git status
    
    # Check if there are any uncommitted changes
    echo -e "\n🔍 Uncommitted files:"
    git status --porcelain
    
else
    echo "❌ Not a Git repository"
    echo "Run: git init"
fi

echo -e "\n==================================="
echo "✅ Check complete"
