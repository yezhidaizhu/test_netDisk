/**
 * @ Create Time: 2022-07-13 10:15:26
 * @ Modified time: 2022-07-13 17:49:48
 * @ Description:  数据行
 */
import { memo, useCallback, useMemo } from 'react';

import { Checkbox, TableCell, TableRow } from '@mui/material';

import { TableCellCheckbox } from '../DTHeader';
import useColumns from '../hooks/useColumns';
import useDataIdSelected from '../hooks/useDataIdSelected';

export const dtBodyRowId = '_wx_dt_body_row';
function DTBodyRow(props: {
  rowData: TableData;
  dataId: DataIdType;
  dataIndex: number;
  onClickRow: (e: any, dataId: DataIdType, dataIndex: number) => void;
  onDoubleClickRow: (e: any, dataId: DataIdType) => void;
}) {
  const { rowData, dataId, onClickRow, onDoubleClickRow, dataIndex } = props;

  const columns = useColumns();
  const { dataIdSelected, rmDataId, addDataId } = useDataIdSelected();

  const isSelected = useMemo(() => {
    return dataIdSelected.includes(dataId);
  }, [dataIdSelected]);

  const _onClickRow = useCallback(
    (e: any) => {
      onClickRow(e, dataId, dataIndex);
    },
    [dataId, onClickRow, dataIndex],
  );

  const _onDoubleClickRow = useCallback(
    (e: any) => {
      onDoubleClickRow(e, dataId);
    },
    [dataId, onDoubleClickRow],
  );

  const onClickCheckBox = (e: any) => {
    e.stopPropagation();
    const cked = e.target?.checked;
    cked ? addDataId([dataId]) : rmDataId([dataId]);
  };

  return (
    <TableRow
      hover
      selected={isSelected}
      id={dtBodyRowId}
      data-id={dataId}
      onClick={_onClickRow}
      onDoubleClick={_onDoubleClickRow}
    >
      <TableCellCheckbox>
        <Checkbox checked={isSelected} onClick={onClickCheckBox} />
      </TableCellCheckbox>

      {columns.map((headCell) => {
        const { field, hidden, render } = headCell;
        if (hidden) return null;

        const fieldValue = rowData?.[field];
        const child = render ? render(fieldValue, rowData) : fieldValue;

        return <TableCell key={field}>{child}</TableCell>;
      })}
    </TableRow>
  );
}

export default memo(DTBodyRow);
