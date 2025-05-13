#!/bin/bash

echo "🔧 Simple Git Merge Solution"
echo "==========================="

cd /Users/jdavi/Sites/praisesync-gem

# Configure git to use merge strategy
git config pull.rebase false

# Since the setup script already did most of the work, we just need to complete the merge
echo "Attempting merge with origin/main..."
git merge origin/main --allow-unrelated-histories

echo ""
echo "✅ Done! Check the status with: git status"
