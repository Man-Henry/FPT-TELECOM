/** @type {import("@commitlint/types").UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Tính năng mới
        'fix', // Sửa bug
        'docs', // Tài liệu
        'style', // Format code (không ảnh hưởng logic)
        'refactor', // Tái cấu trúc
        'perf', // Tối ưu hiệu suất
        'test', // Thêm/sửa test
        'build', // Build system, dependencies
        'ci', // CI/CD config
        'chore', // Công việc khác
        'revert', // Revert commit
      ],
    ],
    'subject-case': [0],
  },
};

export default config;
