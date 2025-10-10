#!/bin/bash

# -----------------------------
# Script tự động rebase & đổi tác giả cho 10 commit gần nhất (fix detached HEAD)
# -----------------------------

set -e

# Thông tin người dùng
GIT_NAME="lbl2008"
GIT_EMAIL="long.lebao2008@gmail.com"

# Lưu lại branch hiện tại
CURRENT_BRANCH=$(git branch --show-current)
if [ -z "$CURRENT_BRANCH" ]; then
  echo "⚠️  Bạn đang ở detached HEAD! Hãy checkout về branch thật trước (vd: git checkout main hoặc git checkout feature/xyz)."
  exit 1
fi

echo "🔹 Đang thực hiện rebase trên branch: $CURRENT_BRANCH"

# Cấu hình user
git config user.name "$GIT_NAME"
git config user.email "$GIT_EMAIL"

# Script tạm để sửa pick -> edit
EDITOR_SCRIPT=$(mktemp)
cat <<'EOF' > "$EDITOR_SCRIPT"
#!/bin/bash
TODO_FILE="$1"
if [ -f "$TODO_FILE" ]; then
  awk 'NR<=10{sub(/^pick /,"edit ")} {print}' "$TODO_FILE" > "$TODO_FILE.tmp" && mv "$TODO_FILE.tmp" "$TODO_FILE"
fi
EOF
chmod +x "$EDITOR_SCRIPT"

# Bắt đầu rebase
GIT_SEQUENCE_EDITOR="$EDITOR_SCRIPT" git rebase -i HEAD~10

# Lặp amend & continue
while true; do
  if git status | grep -q "You can amend the commit now"; then
    git commit --amend --author="$GIT_NAME <$GIT_EMAIL>" --no-edit
    git rebase --continue || break
  else
    break
  fi
done

# Nếu còn dang dở
if git status | grep -q "rebase in progress"; then
  git commit --amend --author="$GIT_NAME <$GIT_EMAIL>" --no-edit
  git rebase --continue
fi

# Quay lại branch cũ (đảm bảo HEAD đúng)
git checkout "$CURRENT_BRANCH"

# Force push an toàn
git push --force-with-lease origin "$CURRENT_BRANCH"

# Xóa file tạm
rm -f "$EDITOR_SCRIPT"

echo "✅ Đã hoàn tất rebase và cập nhật tác giả cho 10 commit gần nhất trên branch $CURRENT_BRANCH!"
