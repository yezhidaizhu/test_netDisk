/**
 * @ Create Time: 2022-06-16 17:45:40
 * @ Modified time: 2022-06-17 16:10:05
 * @ Description:  文件右键鼠标菜单
 */
import { atom, useRecoilState } from 'recoil';

const fileContextMenuState = atom<{
  mouseX: number;
  mouseY: number;
} | null>({
  key: 'file-list-context-menu-state',
  default: null,
});

const curFileSelState = atom<FileInfo | null>({
  key: 'cur-right-click-file-sel-state',
  default: null,
});

export default function useFileContextMenu() {
  const [contextMenu, setContextMenu] = useRecoilState(fileContextMenuState);

  const [curRightSelFile, setCurRightSelFile] = useRecoilState(curFileSelState);

  const openContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return {
    curRightSelFile,
    contextMenu,
    openContextMenu,
    closeContextMenu,
    setCurRightSelFile,
  };
}
