/**
 * @ Create Time: 2022-07-04 17:31:46
 * @ Modified time: 2022-07-04 17:53:04
 * @ Description:  右键新增文件夹
 */
import { useMemo } from 'react';

import { Menu, MenuItem } from '@mui/material';

import useAddActions, { addActions } from '../hooks/useAddActions';
import { MItem } from './TableRowsRightContextMenu';

export default function AddContextMenu(props: { contextMenu: any; handleClose: () => void }) {
  const { execAddAction } = useAddActions();
  const { contextMenu, handleClose } = props;

  const openMenu = Boolean(contextMenu);

  const opts = useMemo(() => {
    return [addActions.NewFolder, addActions.UploadFile];
  }, []);

  return (
    <Menu
      open={openMenu}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
      }
      onClick={(e) => e.stopPropagation()}
    >
      {opts.map((operation, index) => {
        const { label, Icon } = operation;
        return (
          <MItem key={index} label={label} Icon={Icon} onClick={() => execAddAction(operation)} />
        );
      })}
    </Menu>
  );
}
