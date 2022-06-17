import { Box } from '@mui/material';

import { FlexBox } from '@/components/styled';
import useDiskFiles from '@/pages/FileList/store/useDiskFiles';

import AddAction from './components/AddAction';
import AddFolder from './components/AddFolder';
import Bread from './components/Bread';
import DragOver from './components/DragOver';
import EmptyFile from './components/EmptyFile';
import Search from './components/Search';
import DataTable from './table';

function FileList() {
  const { files } = useDiskFiles();

  return (
    <Box
      id="fileListBox"
      className="flex flex-col h-screen  overflow-hidden pl-16 pb-2
      transition scale-100
      "
    >
      <FlexBox className="select-none justify-between items-center pl-0 pb-0 p-8">
        <Bread />
        <FlexBox className=" items-center gap-6 ">
          <Search />
          <AddAction />
        </FlexBox>
      </FlexBox>

      {files.length ? <DataTable /> : <EmptyFile />}

      {/* 拽入文件添加文件 */}
      <DragOver />

      {/* 新建文件夹弹窗 */}
      <AddFolder />
    </Box>
  );
}

export default FileList;
