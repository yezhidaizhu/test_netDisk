import { useMemo, useState } from 'react';

import { Chip } from '@mui/material';
import { Box } from '@mui/system';

import Meta from '@/components/Meta';
import DataTable from '@/components/Table';
import Toolbar, { toolbarHeight } from '@/pages/FileList/components/Toolbar';
import routes from '@/routes';
import { Pages } from '@/routes/types';
import { fsize } from '@/utils/helper';

import { FileName } from '../FileList/table/TBody';
import ShareFilePath from './components/ShareFilePath';
import useMyShareContextMenu from './hooks/useMyShareContextMenu';
import useShareTable from './hooks/useShareTable';

const title = routes[Pages.MyShare].title;

export default function MineShare() {
  const {
    shareFileList,
    isRootPath,
    loading,
    shareFilePath,
    refreshRoot,
    onRowDbClick,
    arrivePath,
    getFileDataByIds,
  } = useShareTable({ type: 3, rootPath });

  const { menuItems } = useMyShareContextMenu({
    getFileDataByIds,
    refreshRoot,
    shareFileList,
    isRootPath,
  });

  const [numSelected, setNumSelected] = useState(0);

  const headerCells = useMemo(() => {
    if (isRootPath) {
      const newColumns = [...shareColumns];
      newColumns.splice(1, 0, shareTo);
      return newColumns;
    } else {
      return shareColumns;
    }
  }, [isRootPath]);

  const onSelectedChange = (ids: any[]) => {
    setNumSelected(ids.length);
  };

  const emptyLabel = useMemo(() => {
    return isRootPath ? '暂无分享记录' : '文件为空';
  }, [isRootPath]);

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
              checkable
              showCheckbox
              loading={loading}
              columns={headerCells}
              rows={shareFileList}
              contextMenu={menuItems}
              emptyLabel={emptyLabel}
              onRowDbClick={onRowDbClick}
              onSelectedChange={onSelectedChange}
              className="max-h-full  pr-8"
            />
          </div>

          <Toolbar rowCount={shareFileList.length} numSelected={numSelected} />
        </Box>
      </Box>
    </>
  );
}

const rootPath = {
  id: 0,
  label: title + '',
};

// 分享对象
const shareTo: any = {
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
};

export const shareColumns = [
  {
    field: 'fileName',
    headerName: '文件名',
    render: (fileName: string, rowData: ShareFileInfo) => {
      const { thumb } = rowData;
      return <FileName name={fileName} thumb={thumb} />;
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
      const { isFolder } = rowData;
      const size = !isFolder ? fsize(value) : '';
      return size;
    },
  },
];
