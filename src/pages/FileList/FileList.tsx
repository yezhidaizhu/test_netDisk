import { Box } from '@mui/material';

import { FlexBox } from '@/components/styled';
import useDiskFiles from '@/pages/FileList/store/useDiskFiles';

import AddAction from './components/AddAction';
import DragOver from './components/DragOver';
import EmptyFile from './components/EmptyFile';
import FilePath from './components/FilePath';
import ReName from './components/ReName';
import Search from './components/Search';
import useDragUpload from './hooks/useDragUpload';
import DataTable from './table';

const boxId = 'fileListBox';
function FileList() {
  useDragUpload(boxId);
  const { files } = useDiskFiles();

  return (
    <Box
      id={boxId}
      className="flex flex-col h-screen  overflow-hidden pl-16 pb-2
      transition scale-100
      "
    >
      <FlexBox className="select-none justify-between items-center pl-0 pb-0 p-8">
        <FilePath />
        <FlexBox className=" items-center gap-6 ">
          <Search />
          <AddAction />
        </FlexBox>
      </FlexBox>

      {files.length ? <DataTable /> : <EmptyFile />}

      {/* 拽入文件添加文件 */}
      <DragOver />
    </Box>
  );
}

export default FileList;
