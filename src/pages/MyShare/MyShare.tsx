import { useCallback, useMemo } from 'react';

import { Chip } from '@mui/material';
import { Box } from '@mui/system';

import Meta from '@/components/Meta';
import DataTable from '@/components/Table';
import { toolbarHeight } from '@/pages/FileList/components/Toolbar';
import { fsize } from '@/utils/helper';

import { FileName } from '../FileList/table/TBody';
import ShareFilePath from './components/ShareFilePath';
import useShareTable from './hooks/useShareTable';

const title = '我的分享';
export default function MineShare() {
  const {
    shareFileList,
    menuItems,
    loading,
    shareFilePath,
    addFilePath,
    arrivePath,
    getFileDataById,
  } = useShareTable({ type: 3, rootPath });

  const isRootPath = useMemo(() => {
    return shareFilePath.length === 1;
  }, [shareFilePath]);

  const headerCells = useMemo(() => {
    if (isRootPath) {
      return columns;
    } else {
      return columns.filter((cell) => cell.field !== 'shareTo');
    }
  }, [isRootPath]);

  const onRowDbClick = (dataId: any) => {
    const curFile = getFileDataById(dataId);
    if (!curFile) return;

    if (curFile.isFolder) {
      addFilePath(curFile);
    }
  };

  return (
    <>
      <Meta title={title} />
      <Box className="flex flex-col h-screen relative overflow-hidden pl-16 pb-2 ">
        <ShareFilePath paths={shareFilePath} arrivePath={arrivePath} />
        <Box
          className="flex-1 flex flex-col overflow-hidden"
          style={{ paddingBottom: toolbarHeight + 1 }}
        >
          <div className="flex-1 overflow-auto select-none">
            <DataTable
              loading={loading}
              columns={headerCells}
              rows={shareFileList}
              contextMenu={menuItems}
              onRowDbClick={onRowDbClick}
            />
          </div>
        </Box>
      </Box>
    </>
  );
}

const rootPath = {
  id: 0,
  label: '我的分享',
};

const columns = [
  {
    field: 'fileName',
    headerName: '文件名',
    render: (fileName: string, rowData: ShareFileInfo) => {
      const { thumb } = rowData;
      return <FileName name={fileName} thumb={thumb} />;
    },
  },
  {
    field: 'shareFrom',
    headerName: '分享对象',
    width: 250,
    render: (shareFrom: string) => {
      const shareToperson = shareFrom?.split(',') || [];
      return (
        <div className="flex flex-wrap place-self-start gap-1">
          {shareToperson.map((person, index) => (
            <Chip key={index} size="small" label={person} />
          ))}
        </div>
      );
    },
  },
  {
    field: 'modifyTime',
    headerName: '分享时间',
    width: 200,
  },
  {
    field: 'size',
    headerName: '文件大小',
    width: 150,
    render: (value: any, rowData: ShareFileInfo) => {
      const isFolder = rowData.isFolder;
      const size = !isFolder ? fsize(value) : '';
      return size;
    },
  },
];
