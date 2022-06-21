import icons, * as Icons from './icons';
import fileIcons from './fileIcons';

// 默认图标
const defaultIcon = fileIcons.defaultIcon;

/**
 * @ Create Time: 2022-06-21 16:46:51
 * @ Modified time: 2022-06-21 17:34:13
 * @ Description:  根据文件名，返回图标
 */
export default function getFileIcon(fileName: string) {
  const fileExt = getFileExt(fileName);
  const tempFileIcon = fileIcons.icons.find((icon) => icon.fileExtensions.includes(fileExt));
  const { name } = tempFileIcon || defaultIcon;
  return (icons as any)[name];
}

/**
 * 获取文件后缀名
 * @param fileName 文件名
 * @returns
 */
export function getFileExt(fileName: string) {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
}
