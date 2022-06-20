/**
 * @ Create Time: 2022-06-15 15:25:00
 * @ Modified time: 2022-06-20 10:12:42
 * @ Description: 空文件夹
 */
import { useEffect, useRef } from 'react';

import { Box, Button, ButtonGroup } from '@mui/material';

import useAddFolder from '@/pages/FileList/store/useAddFolder';

import useAddActions, { addActions } from '../hooks/useAddActions';

export default function EmptyFile() {
  const { onAddAction } = useAddActions();
  const { isOpen, openAddFolderModal } = useAddFolder();
  const actions = [addActions.NewFolder, addActions.UploadFile];

  return (
    <Box className="pt-8 flex-1 overflow-hidden flex justify-center">
      <div className=" mt-24 flex flex-col gap-8 items-center">
        <div>将文件拖拽到这里</div>
        <div className="text-gray-500 text-sm">或者</div>

        <ButtonGroup variant="outlined" disabled={isOpen}>
          {actions.map((action) => (
            <Button
              key={action.key}
              size="large"
              startIcon={<action.Icon />}
              onClick={() => onAddAction(action.key)}
            >
              {action.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </Box>
  );
}
