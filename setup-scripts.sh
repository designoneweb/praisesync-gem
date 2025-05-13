#!/bin/bash

# Make all git scripts executable

echo "🔧 Setting up Git scripts..."

chmod +x git-setup-complete.sh
chmod +x merge-remote-files.sh
chmod +x check-git.sh
chmod +x setup-git.sh
chmod +x check-git-status.sh
chmod +x merge-repos.sh

echo "✅ All scripts are now executable"
echo ""
echo "📚 Available scripts:"
echo ""
echo "1. ./check-git.sh"
echo "   Check current Git repository status"
echo ""
echo "2. ./git-setup-complete.sh"
echo "   Complete Git setup and merge process"
echo ""
echo "3. ./merge-remote-files.sh"
echo "   Specifically handle merging 3 remote files"
echo ""
echo "🚀 Recommended: Start with ./git-setup-complete.sh"
