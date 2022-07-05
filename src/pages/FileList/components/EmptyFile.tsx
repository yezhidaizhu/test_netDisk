/**
 * @ Create Time: 2022-06-15 15:25:00
 * @ Modified time: 2022-07-05 14:36:21
 * @ Description: 空文件夹
 */
import { Box, Button, ButtonGroup } from '@mui/material';

import useAddActions, { addActions } from '../hooks/useAddActions';

export default function EmptyFile() {
  const { execAddAction } = useAddActions();
  const actions = [addActions.NewFolder, addActions.UploadFile];

  return (
    <Box className="pt-8 flex-1 overflow-hidden flex justify-center">
      <div className=" mt-24 flex flex-col gap-8 items-center">
        <div>将文件拖拽到这里</div>
        <div className="text-gray-500 text-sm">或者</div>

        <ButtonGroup variant="outlined">
          {actions.map((action) => (
            <Button
              key={action.key}
              size="large"
              startIcon={<action.Icon />}
              onClick={() => execAddAction(action)}
            >
              {action.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </Box>
  );
}
