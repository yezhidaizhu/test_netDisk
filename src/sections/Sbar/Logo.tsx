/**
 * @ Create Time: 2022-07-01 16:30:38
 * @ Modified time: 2022-07-01 16:38:04
 * @ Description:  图标
 */
import { Typography } from '@mui/material';

export default function Logo() {
  return (
    <div className="flex items-center gap-4 p-2 pb-4">
      <img src="/logo/128x128.png" className=" w-10 " />
      <span className="text-2xl font-medium ">网欣云盘</span>
    </div>
  );
}
