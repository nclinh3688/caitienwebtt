#!/bin/bash

# Script đồng bộ hóa với Cursor
echo "🔄 Đang đồng bộ hóa với Cursor..."

# Add all changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "📝 Không có thay đổi nào để commit"
else
    # Commit with timestamp
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    git commit -m "Auto sync: $TIMESTAMP"
    echo "✅ Đã commit thay đổi: $TIMESTAMP"
fi

# Push to current branch
CURRENT_BRANCH=$(git branch --show-current)
git push origin $CURRENT_BRANCH

echo "🚀 Hoàn thành đồng bộ hóa với branch: $CURRENT_BRANCH"
echo "🔗 Repository: https://github.com/nclinh3688/caitienwebtt"