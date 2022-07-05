/**
 * @ Create Time: 2022-06-17 14:31:16
 * @ Modified time: 2022-07-04 17:57:43
 * @ Description:  在文件列表上，文件右键菜单
 *
 * PS：右键分情况:
 *      1. 当选择多个文件，并在多个文件上的其中一个文件上进行右键
 *      2. 右键在一个未选择，或者只选择一个的文件上
 */
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import { FileOperationItem } from '../hooks/types';
import useFileOperation from '../hooks/useFileOperation';
import useDiskFiles from '../store/useDiskFiles';
import useFileContextMenu from '../store/useFileContextMenu';

export default function TableRowsRightContextMenu(props: {
  contextMenu: any;
  handleClose: () => void;
}) {
  const { contextMenu, handleClose } = props;
  const { curRightSelFile } = useFileContextMenu(); // 右键在当前哪一个文件上

  const { operations, execFileOperation } = useFileOperation();
  const { checkFileIsSelected, getSelectedFiles } = useDiskFiles();

  if (!curRightSelFile) return <></>;

  // 根据情况，获取当前右键时，所选取的文件
  const getRightClickSelectedFiles = () => {
    if (checkFileIsSelected(curRightSelFile?.id)) {
      // 右键在选择区域上
      return getSelectedFiles();
    } else {
      return [curRightSelFile];
    }
  };

  // 根据情况，获取当前菜单，空对象渲染成分界线
  const getOperations = (curRightClickSelectedFiles: FileInfo[]) => {
    const { Download, Share, Rename, Move } = operations;

    if (curRightClickSelectedFiles.length > 1) {
      //  当前选择的文件有多个
      return [Download, Share, null, Move];
    } else {
      return [Download, Share, null, Rename, Move];
    }
  };

  const curRightClickSelectedFiles = getRightClickSelectedFiles(); // 当前右键后，所选择的文件
  const curOperation = getOperations(curRightClickSelectedFiles); // 当前菜单列表

  const deleteOpration = operations.Delete; // 删除操作
  const DeleteIcon = deleteOpration.Icon; // 删除操作图标

  const openMenu = Boolean(contextMenu);

  const onClickMIem = (operation: FileOperationItem) => {
    execFileOperation(operation, curRightClickSelectedFiles);
    handleClose();
  };

  return (
    <Menu
      open={openMenu}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
      }
      onClick={(e) => e.stopPropagation()}
    >
      {curOperation.map((operation, index) => {
        if (!operation) return <Divider key={index} />;

        const { label, Icon } = operation;

        return (
          <MItem key={index} label={label} Icon={Icon} onClick={() => onClickMIem(operation)} />
        );
      })}

      <Divider />

      {/* 删除操作 */}
      <MenuItem onClick={() => onClickMIem(deleteOpration)}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" className="text-red-500" />
        </ListItemIcon>
        <div className="w-24 text-red-500">{deleteOpration.label}</div>
      </MenuItem>
    </Menu>
  );
}

export function MItem(props: { label: string; Icon: any; onClick: () => void }) {
  const { label, Icon, onClick } = props;

  return (
    <MenuItem onClick={onClick}>
      {Icon && (
        <ListItemIcon>
          <Icon fontSize="small" />
        </ListItemIcon>
      )}

      <ListItemText>
        <div className="w-24">{label}</div>
      </ListItemText>
    </MenuItem>
  );
}
