#!/bin/bash

echo "📊 Repository Status Check"
echo "========================="

cd /Users/jdavi/Sites/praisesync-gem

# Current branch and status
echo "🌿 Current branch:"
git branch --show-current
echo ""

echo "📋 Git status:"
git status
echo ""

# Remote information  
echo "🔗 Remote repositories:"
git remote -v
echo ""

# Check what commits we have locally
echo "📜 Local commits (last 5):"
git log --oneline -5
echo ""

# Check remote commits
echo "🌐 Remote commits (last 5):"
git log origin/main --oneline -5
echo ""

# Check differences
echo "🔍 Differences between local and remote:"
echo "Files only in local:"
git diff --name-only main origin/main | grep -v ">"
echo ""
echo "Files only in remote:"
git diff --name-only origin/main main | grep -v "<"
echo ""

# List all files
echo "📁 All files in local repository:"
ls -la
echo ""

echo "📁 Markdown files:"
ls -la *.md
