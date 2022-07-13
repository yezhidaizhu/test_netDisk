/**
 * @ Create Time: 2022-07-12 15:48:54
 * @ Modified time: 2022-07-13 16:49:25
 * @ Description:  数据展示
 */
import { memo, useMemo } from 'react';

import { TableBody } from '@mui/material';

import DTBodyRow from './components/DTBodyRow';
import useDTBody from './hooks/useDTBody';
import useDataIdField from './hooks/useDataIdField';

function DTBody(props: {
  data: TableData[];
  onRowClick?: (data: DataIdType) => void;
  onRowDbClick?: (data: DataIdType) => void;
}) {
  const { data = [], onRowClick, onRowDbClick } = props;

  const dataIdField = useDataIdField();
  const { onClickRow, onContextMenu, onRowDoubleClick } = useDTBody({
    data,
    onRowClick,
    onRowDbClick,
  });

  const dataList = useMemo(() => {
    // 这里的index 作为 dataIndex ，用于在按下shift时进行连选
    return data.map((rowData, index) => {
      const key = rowData[dataIdField];
      return (
        <DTBodyRow
          key={key}
          rowData={rowData}
          dataIndex={index}
          dataId={key}
          onClickRow={onClickRow}
          onDoubleClickRow={onRowDoubleClick}
        />
      );
    });
  }, [data, onClickRow]);

  return <TableBody onContextMenu={onContextMenu}>{dataList}</TableBody>;
}

export default memo(DTBody);
