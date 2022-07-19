/**
 * @ Create Time: 2022-06-15 15:25:00
 * @ Modified time: 2022-07-07 15:21:22
 * @ Description: 空文件夹
 */
import { useMemo } from 'react';

import { Box, Button, ButtonGroup, Fade } from '@mui/material';

import EmptyStatus from '@/components/EmptyStatus';
import useThemeMode from '@/hooks/useThemeMode';

import useAddActions, { addActions } from '../hooks/useAddActions';
import useSearch from '../store/useSearch';

export default function EmptyFile(props: { show: boolean }) {
  const { show } = props;
  const { execAddAction } = useAddActions();
  const { isOpenSearchFileList } = useSearch(); // 打开搜索下不显示新建文件夹
  const actions = [addActions.NewFolder, addActions.UploadFile];

  return (
    <Fade in={show}>
      <Box className="pt-8 flex-1 overflow-hidden flex justify-center select-none">
        <div className=" flex flex-col gap-6 items-center" style={{ marginTop: '10vh' }}>
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <EmptyStatus />
            {isOpenSearchFileList && <span>暂无搜索内容</span>}
          </div>

          {!isOpenSearchFileList && (
            <>
              <div className="dark:text-gray-300 text-gray-600">将文件拖拽到这里</div>
              <div className="dark:text-gray-500 text-gray-400 text-sm">或者</div>

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
            </>
          )}
        </div>
      </Box>
    </Fade>
  );
}
