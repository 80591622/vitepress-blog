#!/usr/bin/env bash
# 在远端服务器执行：解压并原子替换 dist 目录（由 deploy.ts 透过 SSH 调用）
set -euo pipefail

: "${DEPLOY_SERVER_DIR:?DEPLOY_SERVER_DIR is required}"
: "${DEPLOY_TARGET_PATH:?DEPLOY_TARGET_PATH is required}"
: "${DEPLOY_ARCHIVE_NAME:?DEPLOY_ARCHIVE_NAME is required}"
: "${DEPLOY_TIMESTAMP:?DEPLOY_TIMESTAMP is required}"

release_dir=".deploy-release-${DEPLOY_TIMESTAMP}"
backup_dir=".deploy-backup-${DEPLOY_TIMESTAMP}"
archive_name="${DEPLOY_ARCHIVE_NAME}"
target_path="${DEPLOY_TARGET_PATH}"
target_parent="$(dirname "$target_path")"

cd "$DEPLOY_SERVER_DIR"

cleanup() {
  rm -rf "$release_dir" "$backup_dir"
  rm -f "$archive_name"
}

rollback() {
  status=$?
  if [ "$status" -ne 0 ] && [ -e "$backup_dir" ] && [ ! -e "$target_path" ]; then
    if [ "$target_parent" != "." ]; then
      mkdir -p "$target_parent"
    fi
    mv "$backup_dir" "$target_path"
  fi
  cleanup
  exit "$status"
}

trap rollback EXIT

rm -rf "$release_dir" "$backup_dir"
mkdir -p "$release_dir"
if command -v bsdtar >/dev/null 2>&1; then
  LC_ALL=C bsdtar -xzf "$archive_name" -C "$release_dir"
else
  LC_ALL=C tar --warning=no-unknown-keyword -zxf "$archive_name" -C "$release_dir"
fi

if [ ! -e "$release_dir/$target_path" ]; then
  echo "未找到解压后的目标目录：$release_dir/$target_path" >&2
  exit 1
fi

if [ "$target_parent" != "." ]; then
  mkdir -p "$target_parent"
fi

if [ -e "$target_path" ]; then
  mv "$target_path" "$backup_dir"
fi

mv "$release_dir/$target_path" "$target_path"
rm -rf "$backup_dir"
rm -rf "$release_dir"
rm -f "$archive_name"
trap - EXIT
