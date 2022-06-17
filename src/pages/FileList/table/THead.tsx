import { useMemo } from 'react';

import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

export default function THead(props: {
  rowCount: number;
  numSelected: number;
  onSelAll: (selAll: boolean) => void;
}) {
  const { rowCount = 0, numSelected, onSelAll = () => {} } = props;

  const isSelAll = useMemo(() => {
    return rowCount > 0 && numSelected === rowCount;
  }, [rowCount, numSelected]);
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="none" width={10}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={isSelAll}
            size="small"
            onClick={() => onSelAll(isSelAll)}
          />
        </TableCell>
        <TableCell size="small">
          <HeadLabel label={'文件名'} />
        </TableCell>
        <TableCell width={200} size="small">
          <HeadLabel label={'修改时间'} />
        </TableCell>
        <TableCell width={200} size="small">
          <HeadLabel label={'大小'} />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

function HeadLabel(props: { label: string }) {
  return (
    <div>
      <span className="opacity-60 text-sm hover:opacity-100 cursor-pointer">{props.label}</span>
    </div>
  );
}
