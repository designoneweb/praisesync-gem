#!/bin/bash

# Complete Git setup for PraiseSync

echo "🚀 PraiseSync Git Repository Setup & Merge"
echo "========================================="

cd /Users/jdavi/Sites/praisesync-gem

# Make scripts executable
chmod +x github-merge.sh
chmod +x check-conflicts.sh

# Step 1: Check for conflicts
echo "📋 Checking for potential conflicts..."
./check-conflicts.sh
echo ""

# Step 2: Initialize Git
echo "📁 Initializing Git..."
git init

# Step 3: Set up user
git config user.name "David Wyatt"
git config user.email "david@designoneweb.com"

# Step 4: Add remote
echo "🔗 Adding remote repository..."
git remote add origin https://github.com/designoneweb/praisesync-gem.git

# Step 5: Create .gitignore
echo "📝 Creating .gitignore..."
if [ ! -f ".gitignore" ]; then
cat > .gitignore << 'EOF'
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Editor
.vscode/
.idea/
EOF
fi

# Step 6: Commit local files
echo "💾 Committing local files..."
git add .
git commit -m "Initial commit: PraiseSync Next.js application"

# Step 7: Fetch remote
echo "📥 Fetching from GitHub..."
git fetch origin main

# Step 8: Merge
echo "🔀 Merging GitHub files..."
git pull origin main --allow-unrelated-histories

# Step 9: Show result
echo ""
echo "✅ Setup complete!"
echo ""
echo "📊 Final status:"
git status
echo ""
echo "📋 Files from GitHub have been merged:"
ls -la *.md
echo ""
echo "🎯 Next steps:"
echo "1. Verify all files are present"
echo "2. Test the application: npm run dev"
echo "3. Make any additional commits"
echo "4. Push to GitHub: git push origin main"
