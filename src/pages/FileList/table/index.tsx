import { useMemo } from 'react';

import { Box, Fade, Table, TableContainer } from '@mui/material';

import FileOperation from '../components/FileOperation';
import useTable from '../hooks/useTable';
import TBody from './TBody';
import THead from './THead';
import Toolbar, { toolbarHeight } from './Toolbar';

export default function DataTabel() {
  const { files, selected, onSelAll, onCheckBoxClick, onRowClick, clearSelected } = useTable();

  const rowCount = useMemo(() => files.length, [files]);

  return (
    <Box className="pt-6 flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto" style={{ paddingBottom: toolbarHeight + 1 }}>
        <Fade in={!!files.length}>
          <TableContainer className=" max-h-full  pr-8">
            <Table size="small" stickyHeader sx={{ minWidth: 750 }}>
              <THead rowCount={rowCount} numSelected={selected.length} onSelAll={onSelAll} />
              <TBody
                data={files}
                selected={selected}
                onCheckBoxClick={onCheckBoxClick}
                onRowClick={onRowClick}
              />
            </Table>

            <div className="h-16"></div>
          </TableContainer>
        </Fade>
      </div>

      <Toolbar rowCount={rowCount} numSelected={selected.length} />

      {/* 下方弹出文件操作 */}
      <FileOperation numSelected={selected.length} clearSelected={clearSelected} />
    </Box>
  );
}
