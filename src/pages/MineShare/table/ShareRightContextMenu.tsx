/**
 * @ Create Time: 2022-07-11 17:09:00
 * @ Modified time: 2022-07-12 11:16:33
 * @ Description:  右键菜单
 */
import { ListItemIcon, Menu, MenuItem } from '@mui/material';

export default function ShareRightContextMenu(props: {
  contextMenu: any;
  handleClose: () => void;
  rowData: any;
  menuItems: ShareContextMenuItem[];
}) {
  const { contextMenu, handleClose, rowData, menuItems = [] } = props;

  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
      }
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item) => {
        const { label, onClick, Icon } = item;
        return (
          <MenuItem
            key={label}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(rowData);
              handleClose();
            }}
          >
            {Icon && (
              <ListItemIcon>
                <Icon fontSize="small" />
              </ListItemIcon>
            )}

            {label}
          </MenuItem>
        );
      })}
    </Menu>
  );
}
