#!/bin/bash

echo "🔍 Comprehensive Repository Analysis"
echo "==================================="

cd /Users/jdavi/Sites/praisesync-gem

# Check git status
echo "📊 Git Status:"
git status
echo ""

# Check logs to see merge
echo "📜 Recent Git History:"
git log --oneline --graph --all -10
echo ""

# List all markdown files
echo "📁 All Markdown Files:"
ls -la *.md
echo ""

# Check size of key directories
echo "📦 Directory Sizes:"
du -sh src/
du -sh node_modules/ 2>/dev/null || echo "node_modules: Not yet installed"
echo ""

# Check for both remote and local files
echo "✅ Key Files Status:"
echo "Remote files (from GitHub):"
[ -f "PraiseSync_PRD.md" ] && echo "✓ PraiseSync_PRD.md - Present"
[ -f "PraiseSync_Spec.md" ] && echo "✓ PraiseSync_Spec.md - Present"
[ -f "PraiseSync_UI_UX_Design_Sheet.md" ] && echo "✓ PraiseSync_UI_UX_Design_Sheet.md - Present"
echo ""

echo "Local files (from your machine):"
[ -f "package.json" ] && echo "✓ package.json - Present"
[ -f "next.config.js" ] && echo "✓ next.config.js - Present"
[ -d "src" ] && echo "✓ src/ directory - Present"
echo ""

# Check remote
echo "🌐 Remote Repository:"
git remote -v
echo ""

# Check for uncommitted changes
echo "📝 Working Tree Status:"
if [ -z "$(git status --porcelain)" ]; then 
    echo "✅ Working tree is clean"
else
    echo "⚠️ Uncommitted changes:"
    git status --porcelain
fi
