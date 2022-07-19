/**
 * @ Create Time: 2022-06-15 17:36:33
 * @ Modified time: 2022-07-05 18:47:18
 * @ Description:  文件拖入后，上面的内容，拽入后的背景在 style.scss 全局样式中
 */
import { useMemo } from 'react';

import { Upload } from '@mui/icons-material';

import { drawerWidth } from '@/sections/Sbar';
import useSidebar from '@/store/sidebar';

import useFilePath, { netDiskType } from '../store/useFilePath';

export default function DragOver() {
  const { filePath, isMineNetDisk } = useFilePath();
  const [isOpen] = useSidebar();

  const size = isOpen ? `calc(60vw - ${drawerWidth}px)` : `60vw`;

  const curFolder = useMemo(() => {
    if (!filePath.length) {
      const label = isMineNetDisk ? netDiskType.Mine.label : netDiskType.Common.label;
      return `${label}云盘 根目录`;
    } else {
      return filePath[filePath.length - 1].label;
    }
  }, []);

  return (
    <div id="dragOverContent" className="fixed hidden bottom-0 top-0 right-0 left-0 opacity-0">
      <div className="absolute flex flex-col gap-4 items-center m-auto bottom-24 right-0 left-0">
        <div className="w-20 h-20 text-gray-100 bg-blue-600 flex justify-center items-center rounded-full">
          <Upload fontSize="large" />
        </div>
        <span className="dark:text-gray-400">
          上传到
          <span className="ml-2 text-lg font-semibold dark:text-gray-200">{curFolder}</span>
        </span>
      </div>
      <div
        className="absolute m-auto top-full right-0 left-0  rounded-full "
        style={{
          boxShadow: '0 0 15vw 100px rgb(37, 99 ,235,0.3)',
          height: size,
          width: size,
        }}
      ></div>
    </div>
  );
}
