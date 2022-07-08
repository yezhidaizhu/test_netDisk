import { useEffect, useMemo } from 'react';

import { Box } from '@mui/material';

import { Loader } from '@/components/Loader';
import Meta from '@/components/Meta';
import { FlexBox } from '@/components/styled';
import useDiskFiles from '@/pages/FileList/store/useDiskFiles';

import AddAction from './components/AddAction';
import DragOver from './components/DragOver';
import EmptyFile from './components/EmptyFile';
import FilePath from './components/FilePath';
import Search from './components/Search';
import SearchInput from './components/SearchInput';
import ShareModal from './components/ShareModal';
import useQueryList from './hooks/req/useQueryList';
import useDragUpload from './hooks/useDragUpload';
import useFilePath from './store/useFilePath';
import useSearch from './store/useSearch';
import DataTable from './table';
import Toolbar from './table/Toolbar';

const boxId = 'fileListBox';
function FileList() {
  useDragUpload(boxId);
  const { files, clearSelected, selected, setFiles, setSourceFiles } = useDiskFiles();
  const { queryListAction } = useQueryList();
  const { isMineNetDisk, filePath } = useFilePath();
  const { run, loading } = queryListAction;

  const rowCount = useMemo(() => files.length, [files]);

  const onChangeFilePath = () => {
    clearSelected();
    run();
  };

  // 路径发生改变
  useEffect(() => {
    onChangeFilePath();
  }, [isMineNetDisk, filePath]);

  // 返回数据
  useEffect(() => {
    const data = queryListAction.data;
    if (data?.list) {
      setFiles(data.list);
      setSourceFiles(data.source);
    }
  }, [queryListAction.data]);

  return (
    <>
      <Meta title="云盘" />

      <Box
        id={boxId}
        className="flex flex-col h-screen  overflow-hidden pl-16 
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

        {/* 搜索 */}
        <SearchInput />

        {!!files.length && !loading && <DataTable />}

        {!files.length && !loading && <EmptyFile show={!files.length && !loading} />}

        {loading && (
          <div className="flex justify-center flex-1" style={{ marginTop: '30vh' }}>
            <Loader loading={loading} />
          </div>
        )}

        <Toolbar rowCount={rowCount} numSelected={selected.length} />

        {/* 拽入文件添加文件 */}
        <DragOver />

        {/* 分享 */}
        <ShareModal />
      </Box>
    </>
  );
}

export default FileList;
