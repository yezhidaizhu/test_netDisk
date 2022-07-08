import { Table, TableContainer, Typography } from '@mui/material';
import { Box } from '@mui/system';

import Meta from '@/components/Meta';

import THead from '../FileList/table/THead';
import Toolbar from '../FileList/table/Toolbar';
import Title from './component/Title';

const title = '查看分享';
export default function Share() {
  return (
    <>
      <Meta title={title} />
      <Box className="flex flex-col h-screen relative overflow-hidden pl-16 pb-2 ">
        <Title title={title} />
        <Box className="flex-1">
          <TableContainer>
            <Table>
              <THead rowCount={0} numSelected={0} onSelAll={() => {}} />
            </Table>
          </TableContainer>
        </Box>

        <Toolbar rowCount={0} numSelected={0} />
      </Box>
    </>
  );
}
