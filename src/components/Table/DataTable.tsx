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
  checkable?: boolean; // 是否可以多选
  showCheckbox?: boolean; // 仅在 checkable 为 true 时有效
  className?: any;
  emptyLabel?: string; // 列表空白时，底下的文字说明

  onRowClick?: (data: DataIdType) => void;
  onRowDbClick?: (data: DataIdType) => void;
  onSelectedChange?: (data: DataIdType[]) => void;
  // 在右键菜单前执行，返回 true 时，则不会发起弹窗
  onBeforeOpenContextMenu?: (data: ContextMenuTempSelData) => void | boolean;
}) {
  const {
    columns = [],
    rows = [],
    contextMenu = [],
    dataIdField = 'id',
    loading = false,
    checkable = false,
    showCheckbox = false,
    className = '',
    emptyLabel = '列表为空',
    onRowClick,
    onRowDbClick,
    onSelectedChange,
    onBeforeOpenContextMenu,
  } = props;

  const contextMenuProps = useContextMenuContext({ contextMenu, onBeforeOpenContextMenu });
  const dataIdSelectedProps = useDataIdSelectedContext({ checkable, showCheckbox });

  useEffect(() => {
    onSelectedChange?.(dataIdSelectedProps.dataIdSelected);
  }, [dataIdSelectedProps.dataIdSelected]);

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
                <TableContainer className={className}>
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
                      <EmptyStatus label={emptyLabel} />
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
