/**
 * @ Create Time: 2022-07-11 15:21:38
 * @ Modified time: 2022-07-11 16:45:10
 * @ Description:  表格头
 */
import { TableCell, TableHead, TableRow } from '@mui/material';

import { HeadLabel } from '@/pages/FileList/table/THead';

export default function ShareThead(props: { headerCells: ShareTheadCellType[] }) {
  const { headerCells = [] } = props;
  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headCell) => (
          <TableCell key={headCell.id} width={headCell.width}>
            <HeadLabel label={headCell.label} />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
