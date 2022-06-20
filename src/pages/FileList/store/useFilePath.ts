/**
 * @ Create Time: 2022-06-15 15:32:18
 * @ Modified time: 2022-06-20 10:00:49
 * @ Description: 当前文件夹路劲
 */
import { atom, useRecoilState } from 'recoil';

import { Person, Public } from '@mui/icons-material';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const demoLinks = [
  {
    label: 'temp',
  },
  {
    label: '测试',
  },
];

const isMineNetDiskState = atom<boolean>({
  key: 'is-mine-net-disk-state',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

const diskFilePathState = atom<{ label: string }[]>({
  key: 'file-path-state',
  default: demoLinks,
});

export default function useFilePath() {
  const [isMineNetDisk, setIsMineNetDisk] = useRecoilState(isMineNetDiskState); // 当前文件路径
  const [filePath, setFilePath] = useRecoilState(diskFilePathState); // 当前文件路径

  return { filePath, setFilePath, isMineNetDisk, setIsMineNetDisk };
}

export const netDiskType = {
  Mine: {
    label: '我的',
    Icon: Person,
  },
  Common: {
    label: '公共',
    Icon: Public,
  },
};
