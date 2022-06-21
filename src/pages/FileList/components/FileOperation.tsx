/**
 * @ Create Time: 2022-06-14 17:36:45
 * @ Modified time: 2022-06-21 11:57:18
 * @ Description:  选择文件后，下方弹出的文件操作
 */
import { useMemo, useRef, useState } from 'react';

import { Cancel, MoreHoriz } from '@mui/icons-material';
import { IconButton, ListItemIcon, MenuItem, MenuList, Popover, Tooltip } from '@mui/material';

import { useKeyPress } from 'ahooks';

import useFileOperation from '../hooks/useFileOperation';
import useDiskFiles from '../store/useDiskFiles';

export default function FileOperation(props: { numSelected: number; clearSelected: () => void }) {
  const { numSelected = 0, clearSelected = () => {} } = props;

  const { operations, execFileOperation } = useFileOperation();
  const { getSelectedFiles, selected } = useDiskFiles();

  useKeyPress('Esc', () => {
    numSelected && clearSelected();
  });

  const [openMore, setOpenMore] = useState(false);
  const moreOparetionRef = useRef(null);

  const normalOperations = useMemo(() => {
    return [operations.Download, operations.Share, operations.Delete];
  }, [operations]);

  // 折叠起来的操作，包括移动、重命名
  const foldOperations = useMemo(() => {
    if (selected.length === 1) {
      return [operations.Rename, operations.Move];
    } else if (selected.length > 1) {
      return [operations.Move];
    }
    return [];
  }, [operations, selected]);

  return (
    <div
      className={`
      absolute m-auto left-0 right-0 
      w-fit rounded p-2 py-1.5
      flex justify-center items-center gap-2
      ring-1 ring-slate-100 dark:ring-gray-600 shadow-md
      bg-gray-50 dark:bg-gray-800 
      transition-all opacity-0
        ${numSelected ? 'bottom-16 opacity-100' : '-bottom-6'}
      `}
      ref={moreOparetionRef}
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

      <OperationIcon Icon={MoreHoriz} onClick={() => setOpenMore(true)} title="更多" />

      <OperationIcon Icon={Cancel} onClick={clearSelected} title="取消" />

      {!!foldOperations.length && (
        <MoreOparetion
          open={openMore}
          onClose={() => setOpenMore(false)}
          anchorEl={moreOparetionRef}
          operations={foldOperations}
          onOperationClick={(operation) => {
            setOpenMore(false);
            execFileOperation(operation, getSelectedFiles());
          }}
        />
      )}
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
          className="opacity-80 hover:opacity-100 cursor-pointer text-gray-600 dark:text-gray-100"
        />
      </IconButton>
    </Tooltip>
  );
}

function MoreOparetion(props: {
  open: boolean;
  anchorEl: any;
  onClose: () => void;
  operations: any[];
  onOperationClick: (operation: any) => void;
}) {
  const { open = false, operations = [], anchorEl, onClose, onOperationClick } = props;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl.current}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <MenuList>
        {operations.map((operation) => {
          const { label, Icon } = operation;
          return (
            <MenuItem key={label} onClick={() => onOperationClick(operation)}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <div className=" w-24 ">{label}</div>
            </MenuItem>
          );
        })}
      </MenuList>
    </Popover>
  );
}
