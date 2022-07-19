import { useEffect, useMemo, useState } from 'react';

import { Box } from '@mui/material';

import Meta from '@/components/Meta';
import DataTable from '@/components/Table';
import { FlexBox } from '@/components/styled';
import useDiskFiles from '@/pages/FileList/store/useDiskFiles';

import AddAction from './components/AddAction';
import DragOver from './components/DragOver';
import FilePath from './components/FilePath';
import Search from './components/Search';
import SearchInput from './components/SearchInput';
import ShareModal from './components/ShareModal';
import Toolbar, { toolbarHeight } from './components/Toolbar';
import { DragUploadBoxId, shareColumns, title } from './config';
import useQueryList from './hooks/req/useQueryList';
import useDragUpload from './hooks/useDragUpload';
import useFileListTable from './hooks/useFileListTable';
import useFileOperation from './hooks/useFileOperation';
import useRowContextMenu from './hooks/useRowContextMenu';
import useFilePath from './store/useFilePath';

function FileList() {
  useDragUpload(DragUploadBoxId);
  const { files, clearSelected, selected, setFiles, setSourceFiles, setSelected } = useDiskFiles();
  const { queryListAction } = useQueryList();
  const { isMineNetDisk, filePath, addPath } = useFilePath();

  const { contextMenu, onBeforeOpenContextMenu } = useRowContextMenu();
  const { onRowDoubleClick } = useFileListTable();

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

  const onSelectedChange = (ids: any[]) => {
    setSelected(ids);
  };

  return (
    <>
      <Meta title={title} />

      <Box
        id={DragUploadBoxId}
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

        <Box
          className="pt-6 flex-1 overflow-hidden flex flex-col"
          style={{ paddingBottom: toolbarHeight + 1 }}
        >
          <DataTable
            checkable
            showCheckbox
            loading={loading}
            columns={shareColumns}
            rows={files}
            contextMenu={contextMenu}
            onBeforeOpenContextMenu={onBeforeOpenContextMenu}
            onSelectedChange={onSelectedChange}
            onRowDbClick={onRowDoubleClick}
            className="max-h-full  pr-8"
          />
        </Box>

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
