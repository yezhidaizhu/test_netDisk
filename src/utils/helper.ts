import fileSize from 'filesize';

/**
 * 校验文件名是否合法
 * @param fileName 文件名
 * @returns
 */
export function validateFileName(fileName: string) {
  const reg = new RegExp('[\\\\/:*?"<>|]');

  if (reg.test(fileName)) {
    return false;
  }

  return true;
}

/**
 * 检查文件名，并返回错误的原因
 * @param folderName 文件名
 * @returns
 */
export function checkFolderName(folderName: string) {
  const value = folderName?.trim();
  if (!value) return '名称不能为空';

  if (!validateFileName(folderName)) {
    return '文件名不支持特殊字符';
  }
}

/**
 * 返回 KB，GB 结尾
 * @param size 文件大小
 * @returns
 */
export function fsize(size: number) {
  return fileSize.partial({ base: 2, standard: 'jedec' })(size);
}
