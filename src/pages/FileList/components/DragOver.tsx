/**
 * @ Create Time: 2022-06-15 17:36:33
 * @ Modified time: 2022-06-16 14:24:49
 * @ Description:  文件拖入后，上面的内容
 */
import { Upload } from '@mui/icons-material';

import { drawerWidth } from '@/sections/Sbar';
import useSidebar from '@/store/sidebar';

export default function DragOver() {
  const [isOpen] = useSidebar();

  const size = isOpen ? `calc(60vw - ${drawerWidth}px)` : `60vw`;

  return (
    <div id="dragOverContent" className="fixed hidden bottom-0 top-0 right-0 left-0 opacity-0">
      <div className="absolute flex flex-col gap-4 items-center m-auto bottom-24 right-0 left-0">
        <div className="w-20 h-20 text-gray-900 bg-blue-600 flex justify-center items-center rounded-full">
          <Upload fontSize="large" />
        </div>
        <span className="text-gray-400">上传到 test</span>
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
