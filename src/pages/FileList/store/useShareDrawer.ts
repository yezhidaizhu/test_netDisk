/**
 * @ Create Time: 2022-07-07 17:56:47
 * @ Modified time: 2022-07-07 18:02:51
 * @ Description:  控制分享抽屉
 */
import { atom, useRecoilState } from 'recoil';

const shareDrawerState = atom<boolean>({
  key: 'share-drawer-state',
  default: false,
});

export default function useShareDrawer() {
  const [isOpenShare, setIsOpenShare] = useRecoilState(shareDrawerState);

  const closeShare = () => setIsOpenShare(false);

  const showShare = () => setIsOpenShare(true);

  return {
    isOpenShare,
    closeShare,
    showShare,
  };
}
