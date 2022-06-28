/**
 * @ Create Time: 2022-06-21 14:42:45
 * @ Modified time: 2022-06-28 14:28:54
 * @ Description:  上传列表
 */
import { Divider, Table, TableContainer } from '@mui/material';

import THead from '../components/THead';
import Toolbar from './components/Toolbar';

export default function UploadTab() {
  return (
    <>
      <Toolbar />
      <Divider />

      <TableContainer>
        <Table>
          <THead rowCount={0} numSelected={0} onSelAll={() => {}} />
        </Table>
      </TableContainer>
    </>
  );
}
