/**
 * @ Create Time: 2022-07-04 15:49:47
 * @ Modified time: 2022-07-05 15:02:41
 * @ Description: 上传操作
 */
import { atom, useRecoilState } from 'recoil';

import Uppy from '@uppy/core';
import zh_CN from '@uppy/locales/lib/zh_CN';

// const diskSpaceState = atom<number>({
//   key: 'disk-space-state',
//   default: 0,
// });

const uppy = new Uppy({
  locale: zh_CN,
});

export default function useUpload() {
  // const [space, setSpace] = useRecoilState(diskSpaceState); // 当前文件列表

  return {
    uppy,
  };
}
