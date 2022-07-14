import { useMemo, useState } from 'react';

import { Chip } from '@mui/material';
import { Box } from '@mui/system';

import Meta from '@/components/Meta';
import DataTable from '@/components/Table';
import Toolbar, { toolbarHeight } from '@/pages/FileList/components/Toolbar';
import routes from '@/routes';
import { Pages } from '@/routes/types';

import { shareColumns } from '../MyShare/MyShare';
import ShareFilePath from '../MyShare/components/ShareFilePath';
import useShareTable from '../MyShare/hooks/useShareTable';
import useMyShareContextMenu from './hooks/useMyShareContextMenu';

const title = routes[Pages.Share].title;

export default function Share() {
  const {
    shareFileList,
    isRootPath,
    loading,
    shareFilePath,
    refreshRoot,
    onRowDbClick,
    arrivePath,
    getFileDataByIds,
    getFileDataById,
  } = useShareTable({ type: 2, rootPath });

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

  const onBeforeOpenContextMenu = (data: any) => {
    const { id } = data;
    const curFile = getFileDataById(id);

    const isFolder = curFile?.isFolder;

    const disabelOpenContextMenu = !!(isFolder && isRootPath);
    // 阻止弹窗
    return disabelOpenContextMenu;
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
              loading={loading}
              columns={headerCells}
              rows={shareFileList}
              contextMenu={menuItems}
              emptyLabel={emptyLabel}
              onBeforeOpenContextMenu={onBeforeOpenContextMenu}
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
  headerName: '分享人',
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
