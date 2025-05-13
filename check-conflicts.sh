#!/bin/bash

# Check for potential conflicts before merging

echo "🔍 Checking for potential conflicts with GitHub repository"
echo "========================================================"

cd /Users/jdavi/Sites/praisesync-gem

# Check if local files exist that match remote files
echo "📋 Checking local files that match remote files:"
echo ""

REMOTE_FILES=(
    "PraiseSync_PRD.md"
    "PraiseSync_Spec.md" 
    "PraiseSync_UI_UX_Design_Sheet.md"
)

CONFLICT_COUNT=0

for file in "${REMOTE_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "⚠️  $file exists locally AND remotely - potential conflict"
        CONFLICT_COUNT=$((CONFLICT_COUNT + 1))
    else
        echo "✅ $file only exists remotely - no conflict"
    fi
done

echo ""
echo "Summary:"
echo "- Remote files: 3"
echo "- Potential conflicts: $CONFLICT_COUNT"
echo ""

if [ $CONFLICT_COUNT -eq 0 ]; then
    echo "✅ No conflicts expected! Safe to merge."
else
    echo "⚠️  Conflicts possible. You may need to resolve them manually."
    echo "   The merge process will help you through it."
fi
