#!/bin/bash

# Git setup and merge script for PraiseSync
# This script will help you connect your local repo to GitHub and merge changes

echo "🚀 PraiseSync Git Repository Setup"
echo "==================================="

cd /Users/jdavi/Sites/praisesync-gem

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    if [ $2 == "success" ]; then
        echo -e "${GREEN}✅ $1${NC}"
    elif [ $2 == "error" ]; then
        echo -e "${RED}❌ $1${NC}"
    else
        echo -e "${YELLOW}⚠️  $1${NC}"
    fi
}

# Step 1: Check if Git is initialized
echo -e "\n1️⃣  Checking Git repository..."
if [ -d ".git" ]; then
    print_status "Git repository exists" "success"
else
    echo "Initializing Git repository..."
    git init
    print_status "Git repository initialized" "success"
fi

# Step 2: Check current remotes
echo -e "\n2️⃣  Checking remotes..."
REMOTES=$(git remote -v)
if [ -z "$REMOTES" ]; then
    print_status "No remotes configured" "warning"
    echo "Enter your GitHub username:"
    read GITHUB_USERNAME
    git remote add origin "https://github.com/${GITHUB_USERNAME}/praisesync-gem.git"
    print_status "Remote 'origin' added" "success"
else
    print_status "Remotes already configured:" "success"
    git remote -v
fi

# Step 3: Create initial commit if needed
echo -e "\n3️⃣  Checking commits..."
if ! git rev-parse HEAD >/dev/null 2>&1; then
    print_status "No commits found, creating initial commit..." "warning"
    git add .
    git commit -m "Initial commit: PraiseSync Next.js application"
    print_status "Initial commit created" "success"
else
    print_status "Repository has existing commits" "success"
fi

# Step 4: Fetch from remote
echo -e "\n4️⃣  Fetching from remote..."
git fetch origin 2>/dev/null
if [ $? -eq 0 ]; then
    print_status "Remote fetched successfully" "success"
else
    print_status "Could not fetch remote (repository might be empty)" "warning"
fi

# Step 5: Check remote branches
echo -e "\n5️⃣  Checking remote branches..."
REMOTE_BRANCHES=$(git branch -r 2>/dev/null)
if [ -z "$REMOTE_BRANCHES" ]; then
    print_status "No remote branches found" "warning"
    echo "Remote repository might be empty. Would you like to push your local content? (y/n)"
    read PUSH_ANSWER
    if [ "$PUSH_ANSWER" = "y" ]; then
        git push -u origin main
        print_status "Pushed to remote repository" "success"
    fi
else
    print_status "Remote branches found:" "success"
    git branch -r
    
    # Determine the main branch name
    if git branch -r | grep -q "origin/main"; then
        MAIN_BRANCH="main"
    elif git branch -r | grep -q "origin/master"; then
        MAIN_BRANCH="master"
    else
        echo "Enter the name of the main branch:"
        read MAIN_BRANCH
    fi
    
    echo -e "\n6️⃣  Merging with remote..."
    echo "This will merge the 3 files from the remote repository with your local files."
    echo "Continue? (y/n)"
    read MERGE_ANSWER
    
    if [ "$MERGE_ANSWER" = "y" ]; then
        # Create a backup branch
        git checkout -b backup-before-merge
        git checkout -
        
        # Pull and merge
        git pull origin $MAIN_BRANCH --allow-unrelated-histories
        
        if [ $? -eq 0 ]; then
            print_status "Successfully merged with remote" "success"
        else
            print_status "Merge conflicts detected" "warning"
            echo "Please resolve conflicts manually, then run:"
            echo "  git add ."
            echo "  git commit -m 'Resolved merge conflicts'"
            echo "  git push origin $MAIN_BRANCH"
        fi
    fi
fi

echo -e "\n7️⃣  Current status:"
git status

echo -e "\n==================================="
print_status "Git setup complete!" "success"
echo ""
echo "Next steps:"
echo "1. If you haven't pushed yet: git push -u origin main"
echo "2. Continue development with regular commits"
echo "3. Push changes: git push"
