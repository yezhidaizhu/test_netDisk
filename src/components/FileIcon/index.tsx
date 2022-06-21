/**
 * @ Create Time: 2022-06-21 17:07:01
 * @ Modified time: 2022-06-21 18:16:30
 * @ Description:  文件图标
 */
import { ImgHTMLAttributes, memo, useEffect, useMemo } from 'react';

import getFileIcon from '@/utils/fileIcon';
import fileIcons from '@/utils/fileIcon/fileIcons';

function _FileIcon(props: { fileName?: string; className?: string }) {
  const { fileName = '', className = '', ...otherProps } = props;

  const fileIconSrc = useMemo(() => {
    return getFileIcon(fileName);
  }, [fileName]);

  return <img src={fileIconSrc} className={`w-8 ${className}`} {...otherProps} />;
}

const FileIcon = memo(_FileIcon);

export default FileIcon;
