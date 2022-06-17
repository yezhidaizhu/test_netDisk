/**
 * @ Create Time: 2022-06-14 17:36:45
 * @ Modified time: 2022-06-17 12:03:37
 * @ Description:  下方弹出的文件操作
 */
import { useMemo } from 'react';

import { Cancel, DeleteForever, FileDownload, Share } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { useKeyPress } from 'ahooks';

import useFileOperation from '../hooks/useFileOperation';
import useDiskFiles from '../store/useDiskFiles';

export default function FileOperation(props: { numSelected: number; clearSelected: () => void }) {
  const { numSelected = 0, clearSelected = () => {} } = props;

  const { operations, execFileOperation } = useFileOperation();
  const { getSelectedFiles } = useDiskFiles();

  useKeyPress('Esc', () => {
    numSelected && clearSelected();
  });

  const normalOperations = useMemo(() => {
    return [operations.Download, operations.Share, operations.Delete];
  }, [operations]);

  return (
    <div
      className={`
      absolute m-auto left-0 right-0 
      p-2 py-1.5 flex justify-center items-center gap-2 w-48 rounded
      ring-1 ring-slate-200 dark:ring-gray-600
      bg-gray-900 dark:bg-gray-800 
      transition-all opacity-0
        ${numSelected ? 'bottom-16 opacity-100' : '-bottom-6'}
      `}
    >
      {normalOperations.map((operation) => (
        <OperationIcon
          key={operation.key}
          Icon={operation.Icon}
          title={operation.label}
          onClick={() => {
            execFileOperation(operation, getSelectedFiles());
          }}
        />
      ))}
      <OperationIcon Icon={Cancel} onClick={clearSelected} title="取消" />
    </div>
  );
}

function OperationIcon(props: { Icon: any; title?: string; onClick?: () => void }) {
  const { Icon, title = '', onClick } = props;
  return (
    <Tooltip title={title}>
      <IconButton onClick={() => onClick?.()}>
        <Icon
          fontSize="small"
          className="opacity-80 hover:opacity-100 cursor-pointer text-gray-100"
        />
      </IconButton>
    </Tooltip>
  );
}
