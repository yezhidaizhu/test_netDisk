/**
 * @ Create Time: 2022-07-07 15:58:19
 * @ Modified time: 2022-07-07 16:24:34
 * @ Description:  将要移动的文件列表
 */
import { useState } from 'react';

import { Collapse, Divider } from '@mui/material';

import { TempFileList } from '../DeleteFileContent';

export default function MoveFileList(props: { moveFileList: FileInfo[] }) {
  const { moveFileList = [] } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="flex justify-end py-1
       text-xs text-blue-400 cursor-pointer"
      >
        <span onClick={() => setOpen((open) => !open)}>{!open ? '展开' : '关闭'}移动文件列表</span>
      </div>
      <Collapse in={open}>
        <div>
          <TempFileList files={moveFileList} className="p-2 opacity-80  " />
          <Divider />
        </div>
      </Collapse>
    </>
  );
}
