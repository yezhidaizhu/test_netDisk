/**
 * @ Create Time: 2022-07-11 15:26:12
 * @ Modified time: 2022-07-12 12:11:02
 * @ Description:  表格
 */
import { useMemo } from 'react';

import { Fade, Table, TableContainer } from '@mui/material';

import EmptyStatus from '@/components/EmptyStatus';
import { Loader } from '@/components/Loader';
import Toolbar from '@/pages/FileList/components/Toolbar';
import useTableDense from '@/store/netDisk/useTableDense';

import ShareTBady from './ShareTBody';
import ShareThead from './ShareThead';

export default function ShareTable(props: {
  shareFileList: ShareFileInfo[];
  loading: boolean;
  menuItems: ShareContextMenuItem[];
  isRootPath: boolean;
  addFilePath: (fileItem: ShareFileInfo) => void;
  headerCells: ShareTheadCellType[];
}) {
  const {
    shareFileList = [],
    menuItems = [],
    loading,
    addFilePath,
    isRootPath,
    headerCells = [],
  } = props;

  const { isDense } = useTableDense();

  const emptylabel = useMemo(() => {
    return isRootPath ? '暂无分享记录' : '文件为空';
  }, [isRootPath]);

  return (
    <>
      {!!shareFileList.length && !loading && (
        <div className="flex-1 overflow-auto">
          <Fade in={!!shareFileList.length}>
            <TableContainer className=" max-h-full  pr-8">
              <Table stickyHeader size={isDense ? 'small' : 'medium'}>
                <ShareThead headerCells={headerCells} />
                <ShareTBady
                  menuItems={menuItems}
                  shareFileList={shareFileList}
                  addFilePath={addFilePath}
                  isRootPath={isRootPath}
                />
              </Table>

              <div className="h-16"></div>
            </TableContainer>
          </Fade>
        </div>
      )}

      {!shareFileList.length && !loading && <EmptyStatus label={emptylabel} className="h-2/3" />}

      {loading && (
        <div className="flex justify-center flex-1" style={{ marginTop: '30vh' }}>
          <Loader loading={loading} />
        </div>
      )}

      <Toolbar rowCount={shareFileList.length} numSelected={0} />
    </>
  );
}
