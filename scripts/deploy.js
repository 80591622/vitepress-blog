#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// 配置
const config = {
  distDir: 'dist',
  archiveName: 'dist.tar.gz',
  serverUser: 'root',
  serverIP: '121.40.92.55',
  serverDir: '/home/www/www.wkdev.cn',
};

// 日志函数
const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  process: (msg) => console.log(`🚀 ${msg}`),
  package: (msg) => console.log(`📦 ${msg}`),
  upload: (msg) => console.log(`📤 ${msg}`),
  remote: (msg) => console.log(`🖥  ${msg}`),
  done: (msg) => console.log(`🎉 ${msg}`),
};

// 执行命令
function runCommand(command, description) {
  try {
    log.process(description);
    execSync(command, { stdio: 'inherit', shell: true });
    log.success(`${description}完成`);
  } catch (error) {
    log.error(`${description}失败`);
    process.exit(1);
  }
}

// 检查必要工具
function checkTools() {
  const isWindows = os.platform() === 'win32';
  
  try {
    execSync('tar --version', { stdio: 'ignore' });
  } catch {
    if (isWindows) {
      log.error('Windows 系统需要安装 tar 工具');
      log.info('1. 使用 Git Bash: https://git-scm.com/');
      log.info('2. 或使用 WSL2: https://docs.microsoft.com/zh-cn/windows/wsl/install');
      log.info('3. 或安装 GNU tar: https://gnuwin32.sourceforge.net/packages/tar.htm');
    }
    process.exit(1);
  }

  try {
    execSync('scp -h', { stdio: 'ignore' });
  } catch {
    log.error('需要安装 SSH 工具 (ssh/scp)');
    log.info('Windows 用户请使用 Git Bash 或 WSL2');
    process.exit(1);
  }
}

// 检查 SSH 连接
function checkSSHConnection() {
  try {
    log.info('检查 SSH 连接...');
    execSync(`ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 ${config.serverUser}@${config.serverIP} 'echo SSH connection successful'`, { stdio: 'ignore' });
    log.success('SSH 连接正常');
  } catch {
    log.error(`无法连接到服务器 ${config.serverUser}@${config.serverIP}`);
    log.info('请确保已配置 SSH 密钥或可以输入密码');
    process.exit(1);
  }
}

// 主函数
async function deploy() {
  const isWindows = os.platform() === 'win32';
  
  console.log(`\n系统: ${isWindows ? 'Windows' : 'Unix-like'}\n`);

  // 检查工具
  checkTools();

  // 清理和构建
  runCommand('pnpm clean', '清理旧构建文件');
  runCommand('pnpm build', '构建项目');

  // 压缩
  log.package('压缩 dist 目录...');
  try {
    execSync(`tar -zcf ${config.archiveName} ${config.distDir}`, { stdio: 'inherit', shell: true });
    log.success('压缩完成');
  } catch (error) {
    log.error('压缩失败');
    process.exit(1);
  }

  // 检查 SSH 连接
  checkSSHConnection();

  // 上传
  log.upload(`上传到服务器 ${config.serverUser}@${config.serverIP}...`);
  try {
    execSync(`scp -C -o StrictHostKeyChecking=no ${config.archiveName} ${config.serverUser}@${config.serverIP}:${config.serverDir}`, { stdio: 'inherit', shell: true });
    log.success('上传完成');
  } catch (error) {
    log.error('上传失败');
    process.exit(1);
  }

  // 远程部署
  log.remote('执行远程部署...');
  const remoteCommands = `
set -e
cd ${config.serverDir}
rm -rf dist
tar -zxf ${config.archiveName}
rm -f ${config.archiveName}
echo "✅ 远程解压完成"
  `.trim();

  try {
    execSync(`ssh -C -o StrictHostKeyChecking=no ${config.serverUser}@${config.serverIP} "${remoteCommands.replace(/"/g, '\\"')}"`, { stdio: 'inherit', shell: true });
    log.success('远程部署完成');
  } catch (error) {
    log.error('远程部署失败');
    process.exit(1);
  }

  // 清理本地压缩包
  try {
    fs.unlinkSync(config.archiveName);
    log.success(`删除本地 ${config.archiveName}`);
  } catch (error) {
    log.info(`保留本地 ${config.archiveName}`);
  }

  log.done('部署完全成功！');
}

// 执行部署
deploy().catch((error) => {
  log.error(`部署过程出错: ${error.message}`);
  process.exit(1);
});
