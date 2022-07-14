/**
 * @ Create Time: 2022-07-12 15:38:33
 * @ Modified time: 2022-07-14 14:43:16
 * @ Description:  数据头部
 */
import { memo, useCallback, useMemo } from 'react';

import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

import TableCellCheckbox from './components/TableCellCheckbox';
import useColumns from './hooks/useColumns';
import useDataIdField from './hooks/useDataIdField';
import useDataIdSelected from './hooks/useDataIdSelected';

function DTHeader(props: { data?: TableData[] }) {
  const { data = [] } = props;

  const columns = useColumns();

  const { dataIdSelected, clearDataIdSelected, addDataId } = useDataIdSelected();
  const dataIdField = useDataIdField();

  const dataLen = useMemo(() => {
    return data.length;
  }, [data]);

  const indeterminate = useMemo(() => {
    return !!(dataLen && dataIdSelected.length && dataIdSelected.length < dataLen);
  }, [dataIdSelected, dataLen]);

  const isSelAll = useMemo(() => {
    return dataLen > 0 && dataLen === dataIdSelected.length;
  }, [dataIdSelected, dataLen]);

  const onSelAll = useCallback(() => {
    const dataAllIds = data.map((d) => d[dataIdField]);
    clearDataIdSelected();
    !isSelAll && addDataId(dataAllIds);
  }, [data, isSelAll, dataIdField]);

  return (
    <TableHead>
      <TableRow>
        <TableCellCheckbox indeterminate={indeterminate} checked={isSelAll} onClick={onSelAll} />

        {columns.map((headCell, index) => {
          const { width, headerName, hidden } = headCell;
          if (hidden) return null;

          return (
            <TableCell key={index} width={width}>
              <span className="opacity-60 text-sm hover:opacity-100 cursor-pointer">
                {headerName}
              </span>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default memo(DTHeader);
