/**
 * @ Create Time: 2022-07-14 10:12:19
 * @ Modified time: 2022-07-14 14:42:34
 * @ Description:  选择框
 */
import { memo } from 'react';

import { Checkbox, CheckboxProps, TableCell } from '@mui/material';

import useDataIdSelected from '../hooks/useDataIdSelected';

// 统一 开始的 checkbox
function TableCellCheckbox(props: CheckboxProps) {
  const { checkable, showCheckbox } = useDataIdSelected();

  if (!checkable || !showCheckbox) return null;
  return (
    <TableCell padding="none" width={10}>
      <Checkbox {...props} />
    </TableCell>
  );
}

export default memo(TableCellCheckbox);
