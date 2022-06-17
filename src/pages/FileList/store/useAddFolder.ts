/**
 * @ Create Time: 2022-06-16 09:14:02
 * @ Modified time: 2022-06-16 14:24:36
 * @ Description:  与 AddFolder 组件连用
 */
import { atom, useRecoilState } from 'recoil';

const initFolderName = '新建文件夹';

const addFolderState = atom<boolean>({
  key: 'add-folder-state',
  default: false,
});

const addFolderNameState = atom<string>({
  key: 'new-folder-name-state',
  default: initFolderName,
});

export default function useAddFolder() {
  const [isOpen, setIsOpen] = useRecoilState(addFolderState); // 文件列表
  const [folderName, setFolderName] = useRecoilState(addFolderNameState);

  function closeAddFolderModal() {
    setIsOpen(false);
  }

  function openAddFolderModal() {
    setIsOpen(true);
  }

  function resetFolderName() {
    setFolderName(initFolderName);
  }

  return {
    isOpen,
    folderName,
    setFolderName,
    resetFolderName,
    closeAddFolderModal,
    openAddFolderModal,
  };
}
