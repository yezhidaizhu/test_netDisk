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
 * 返回 KB，GB 结尾
 * @param size 文件大小
 * @returns
 */
export function fsize(size: number) {
  return fileSize.partial({ base: 2, standard: 'jedec' })(size);
}
