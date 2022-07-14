/**
 * @ Create Time: 2022-07-12 17:52:06
 * @ Modified time: 2022-07-14 12:09:11
 * @ Description:  右键菜单
 */
import { useContext } from 'react';

import { ContextMenuAnchorPoint } from '../context';

export default function useContextMenu(): ContextMenuAnchorPoint {
  return useContext(ContextMenuAnchorPoint);
}
