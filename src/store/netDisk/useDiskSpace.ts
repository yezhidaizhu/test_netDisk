/**
 * @ Create Time: 2022-07-04 15:49:47
 * @ Modified time: 2022-07-04 16:04:21
 * @ Description: 储存空间剩余量
 */
import { atom, useRecoilState } from 'recoil';

import { getSpace } from '@/api';

const diskSpaceState = atom<number>({
  key: 'disk-space-state',
  default: 0,
});
export default function useDiskSpace() {
  const [space, setSpace] = useRecoilState(diskSpaceState); // 当前文件列表

  const refreshSpace = async () => {
    const { data } = await getSpace();
    const { result, space } = data;
    if (result === 0) {
      setSpace(space);
    }
  };

  return {
    space,
    refreshSpace,
  };
}
