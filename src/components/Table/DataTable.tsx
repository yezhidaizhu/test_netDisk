import { useEffect } from 'react';

import { Fade, Table, TableContainer } from '@mui/material';

import EmptyStatus from '../EmptyStatus';
import { Loader } from '../Loader';
import DTBody from './DTBody';
import DTHeader from './DTHeader';
import RowContextMenu from './components/RowContextMenu';
import {
  ColumnsContext,
  ContextMenuAnchorPoint,
  DataIdFieldContext,
  DataIdSelectedContext,
} from './context';
import useContextMenuContext from './context/useContextMenuContext';
import useDataIdSelectedContext from './context/useDataIdSelectedContext';

export default function DataTable(props: {
  columns: DTHeaderCell[];
  rows: TableData[];
  contextMenu?: ContextMenuItem[]; // 右键菜单
  dataIdField?: string; // 作为 key 的值

  loading?: boolean;

  onRowClick?: (data: DataIdType) => void;
  onRowDbClick?: (data: DataIdType) => void;
}) {
  const {
    columns = [],
    rows = [],
    contextMenu = [],
    dataIdField = 'id',
    loading = false,

    onRowClick,
    onRowDbClick,
  } = props;

  const contextMenuProps = useContextMenuContext(contextMenu);
  const dataIdSelectedProps = useDataIdSelectedContext();

  useEffect(() => {
    if (rows) {
      dataIdSelectedProps.clearDataIdSelected();
    }
  }, [rows]);

  return (
    <ColumnsContext.Provider value={columns}>
      <ContextMenuAnchorPoint.Provider value={contextMenuProps}>
        <DataIdFieldContext.Provider value={dataIdField}>
          <DataIdSelectedContext.Provider value={dataIdSelectedProps}>
            {!loading && (
              <Fade in={!loading}>
                <TableContainer className=" max-h-full  pr-8">
                  {!!rows.length && (
                    <Table stickyHeader size="small">
                      {/* 表头 */}
                      <DTHeader data={rows} />

                      {/* 展示 */}
                      <DTBody data={rows} onRowClick={onRowClick} onRowDbClick={onRowDbClick} />
                    </Table>
                  )}

                  {!rows.length && (
                    <div className="flex justify-center flex-1" style={{ marginTop: '20vh' }}>
                      <EmptyStatus label="暂无内容" />
                    </div>
                  )}

                  <div className="h-16"></div>
                </TableContainer>
              </Fade>
            )}

            {loading && (
              <div className="flex justify-center flex-1" style={{ marginTop: '30vh' }}>
                <Loader loading={loading} />
              </div>
            )}

            {/* 右键菜单 */}
            <RowContextMenu contextMenu={contextMenu} />
          </DataIdSelectedContext.Provider>
        </DataIdFieldContext.Provider>
      </ContextMenuAnchorPoint.Provider>
    </ColumnsContext.Provider>
  );
}
