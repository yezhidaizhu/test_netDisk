/**
 * @ Create Time: 2022-07-12 17:39:21
 * @ Modified time: 2022-07-13 17:07:37
 * @ Description:  右键菜单
 */
import { ControlledMenu, MenuDivider, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/theme-dark.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import useThemeMode from '@/hooks/useThemeMode';

import useContextMenu from '../hooks/useContextMenu';

export default function RowContextMenu(props: { contextMenu?: ContextMenuItem[] }) {
  const { contextMenu = [] } = props;

  const { mode } = useThemeMode();
  const { anchorPoint, menuProps, toggleMenu, tempData } = useContextMenu();

  return (
    <ControlledMenu
      {...menuProps}
      anchorPoint={anchorPoint}
      theming={mode}
      onClose={() => toggleMenu(false)}
    >
      {contextMenu.map((menuItem: ContextMenuItem, index) => {
        const { label, onClick, children, Icon, divider } = menuItem;

        if (divider) return <MenuDivider key={index} />;
        return (
          <MenuItem
            key={index}
            onClick={() => {
              onClick?.(tempData);
            }}
          >
            {children ? (
              children
            ) : (
              <div className="flex gap-2">
                {Icon && <Icon fontSize="small" />}
                {label}
              </div>
            )}
          </MenuItem>
        );
      })}
    </ControlledMenu>
  );
}
