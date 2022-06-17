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
