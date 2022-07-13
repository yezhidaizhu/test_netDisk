import { useMemo } from 'react';

import { Box } from '@mui/system';
import { useDemoData } from '@mui/x-data-grid-generator';

import Meta from '@/components/Meta';
import DataTable from '@/components/Table';

import { toolbarHeight } from '../FileList/components/Toolbar';
import Title from '../MineShare/component/Title';
import useShareTable from '../MineShare/hooks/useShareTable';
import ShareTable from '../MineShare/table';

const _headerCells: ShareTheadCellType[] = [
  {
    id: 'fileName',
    label: '文件名',
  },
  {
    id: 'shareBy',
    label: '分享人',
    width: 250,
  },
  {
    id: 'modifyTime',
    label: '分享时间',
    width: 200,
  },
  {
    id: 'fileSize',
    label: '文件大小',
    width: 150,
  },
];

const rootPath = {
  id: 0,
  label: '分享',
};

const title = '查看分享';
export default function Share() {
  const { shareFileList, menuItems, loading, shareFilePath, addFilePath, arrivePath } =
    useShareTable({
      type: 2,
      rootPath,
    });

  const isRootPath = useMemo(() => {
    return shareFilePath.length === 1;
  }, [shareFilePath]);

  const headerCells: ShareTheadCellType[] = useMemo(() => {
    if (isRootPath) {
      return _headerCells;
    } else {
      return _headerCells.filter((cell) => cell.id !== 'shareBy');
    }
  }, [isRootPath]);

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  const rows = useMemo(() => {
    return data.rows;
  }, [data]);

  return (
    <>
      <Meta title={title} />
      <Box className="flex flex-col h-screen relative overflow-hidden pl-16 pb-2 ">
        <Title paths={shareFilePath} arrivePath={arrivePath} />
        <Box
          className="flex-1 flex flex-col overflow-hidden"
          style={{ paddingBottom: toolbarHeight + 1 }}
        >
          {/* <ShareTable
            shareFileList={shareFileList}
            menuItems={menuItems}
            loading={loading}
            addFilePath={addFilePath}
            isRootPath={isRootPath}
            headerCells={headerCells}
          /> */}

          <DataTable columns={demoCols} rows={rows} />
        </Box>
      </Box>
    </>
  );
}

const demoCols = [
  {
    id: 'fileName',
    field: 'desk',
    headerName: '文件名',
  },
  {
    id: 'shareBy',
    field: 'traderEmail',
    headerName: '分享人',
    width: 250,
    hidden: true,
  },
  {
    id: 'modifyTime',
    field: 'commodity',
    headerName: '分享时间',
    width: 200,
  },
  {
    id: 'fileSize',
    field: 'traderName',
    headerName: '文件大小',
    width: 150,
  },
];
