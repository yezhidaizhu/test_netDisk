/**
 * @ Create Time: 2022-07-05 14:39:18
 * @ Modified time: 2022-07-05 15:21:20
 * @ Description:  一个隐藏的上传 input，用于点击上传时，上传文件
 */
import { useEffect } from 'react';

import FileInput from '@uppy/file-input';

import useUpload from '@/store/netDisk/useUpload';

import { AddActionType } from '../../pages/FileList/hooks/types';

const id = AddActionType.UploadFile;
export default function InputUpload() {
  const { uppy } = useUpload();

  useEffect(() => {
    if (!uppy.getPlugin('FileInput')) {
      uppy.use(FileInput, {
        target: `#${id}`,
      });
    }
  }, []);

  return (
    <div className="hidden">
      <div id={id}></div>
    </div>
  );
}
