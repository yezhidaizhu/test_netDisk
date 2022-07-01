/**
 * @ Create Time: 2022-06-21 17:07:01
 * @ Modified time: 2022-07-01 16:07:28
 * @ Description:  文件图标
 */
import { memo, useMemo } from 'react';

import getFileIcon, { getFolderIcon } from '@/utils/fileIcon';

/**
 *
 * @param props fileName: 文件名， isFolder: 是否为文件夹
 * @returns
 */
function _FileIcon(props: { fileName?: string; className?: string; isFolder?: boolean }) {
  const { fileName = '', className = '', isFolder = false, ...otherProps } = props;

  const fileIconSrc = useMemo(() => {
    if (isFolder) return getFolderIcon();
    return getFileIcon(fileName);
  }, [fileName, isFolder]);

  return <img src={fileIconSrc} draggable={false} className={`w-8 ${className}`} {...otherProps} />;
}

const FileIcon = memo(_FileIcon);

export default FileIcon;
