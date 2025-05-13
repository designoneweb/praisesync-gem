#!/bin/bash

# Script to check current Git status

echo "🔍 Checking Git status for PraiseSync..."
echo "=================================="

cd /Users/jdavi/Sites/praisesync-gem

# Check if git is initialized
if [ -d ".git" ]; then
    echo "✅ Git is initialized"
    
    # Show remotes
    echo -e "\n📡 Current remotes:"
    git remote -v
    
    # Show branches
    echo -e "\n🌳 Current branches:"
    git branch -a
    
    # Show status
    echo -e "\n📊 Git status:"
    git status
    
    # Show recent commits
    echo -e "\n📝 Recent commits (if any):"
    git log --oneline -5 2>/dev/null || echo "No commits yet"
    
else
    echo "❌ Git is not initialized in this directory"
    echo "Run: git init"
fi

echo -e "\n=================================="
