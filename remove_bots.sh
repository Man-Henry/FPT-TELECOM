#!/bin/bash

echo "Đang ghi đè lịch sử Git để xóa các bot..."

git filter-branch -f --env-filter '
if [ "$GIT_AUTHOR_NAME" = "dependabot[bot]" ] || [ "$GIT_AUTHOR_NAME" = "netlify-bot" ] || [ "$GIT_AUTHOR_NAME" = "Copilot" ]; then
    export GIT_AUTHOR_NAME="Mẫn Henry"
    export GIT_AUTHOR_EMAIL="tvm1924@gmail.com"
fi
if [ "$GIT_COMMITTER_NAME" = "dependabot[bot]" ] || [ "$GIT_COMMITTER_NAME" = "netlify-bot" ] || [ "$GIT_COMMITTER_NAME" = "Copilot" ]; then
    export GIT_COMMITTER_NAME="Mẫn Henry"
    export GIT_COMMITTER_EMAIL="tvm1924@gmail.com"
fi
' HEAD

echo "Đã ghi đè xong! Đang đẩy code lên GitHub..."
git push origin main --force
echo "Hoàn thành! Hãy kiểm tra lại trang GitHub của bạn (có thể mất vài phút để GitHub cập nhật lại danh sách Contributors)."
