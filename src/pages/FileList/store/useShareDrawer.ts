/**
 * @ Create Time: 2022-07-07 17:56:47
 * @ Modified time: 2022-07-11 15:47:09
 * @ Description:  控制分享抽屉
 */
import { atom, useRecoilState } from 'recoil';

const shareDrawerState = atom<boolean>({
  key: 'share-drawer-state',
  default: false,
});

const shareFilesState = atom<FileInfo[]>({
  key: 'share-files-state',
  default: [],
});

export default function useShareDrawer() {
  const [isOpenShare, setIsOpenShare] = useRecoilState(shareDrawerState);

  const [shareFiles, setShareFiles] = useRecoilState(shareFilesState); // 保存分享的文件

  const closeShare = () => {
    setShareFiles([]);
    setIsOpenShare(false);
  };

  const showShare = () => setIsOpenShare(true);

  return {
    isOpenShare,
    shareFiles,
    closeShare,
    showShare,
    setShareFiles,
  };
}
