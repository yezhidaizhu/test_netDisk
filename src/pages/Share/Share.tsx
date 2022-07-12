import { useMemo } from 'react';

import { Box } from '@mui/system';

import Meta from '@/components/Meta';

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

  return (
    <>
      <Meta title={title} />
      <Box className="flex flex-col h-screen relative overflow-hidden pl-16 pb-2 ">
        <Title paths={shareFilePath} arrivePath={arrivePath} />
        <Box
          className="flex-1 flex flex-col overflow-hidden"
          style={{ paddingBottom: toolbarHeight + 1 }}
        >
          <ShareTable
            shareFileList={shareFileList}
            menuItems={menuItems}
            loading={loading}
            addFilePath={addFilePath}
            isRootPath={isRootPath}
            headerCells={headerCells}
          />
        </Box>
      </Box>
    </>
  );
}
