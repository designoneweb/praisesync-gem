#!/bin/bash

echo "🔧 Completing PraiseSync Repository Merge"
echo "========================================"

cd /Users/jdavi/Sites/praisesync-gem

# Check current status
echo "📊 Current Git status:"
git status
echo ""

# Since we already have commits on both sides, we need to merge
echo "⚙️ Setting merge strategy..."
git config pull.rebase false

# Get the current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "🌿 Current branch: $CURRENT_BRANCH"
echo ""

# Try to merge origin/main
echo "🔀 Merging remote main branch..."
git merge origin/main --allow-unrelated-histories

# Check if merge was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Merge completed successfully!"
    echo ""
    echo "📋 Files now in repository:"
    ls -la *.md
    echo ""
    echo "🎯 Next steps:"
    echo "1. Review merged files"
    echo "2. Commit if there were conflicts: git commit"
    echo "3. Push to GitHub: git push origin main"
else
    echo ""
    echo "⚠️ Merge may have conflicts. Check with:"
    echo "git status"
    echo ""
    echo "To resolve conflicts:"
    echo "1. Edit conflicted files"
    echo "2. git add <files>"
    echo "3. git commit"
fi
