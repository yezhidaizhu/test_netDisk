/**
 * @ Create Time: 2022-06-15 15:32:18
 * @ Modified time: 2022-06-16 18:14:51
 * @ Description: 当前文件夹路劲
 */
import { atom, useRecoilState } from 'recoil';

const demoLinks = [
  {
    label: '我的网盘',
  },
  {
    label: '测试',
  },
];

const diskFilePathState = atom<{ label: string }[]>({
  key: 'file-path-state',
  default: demoLinks,
});

function useFilePath() {
  const [filePath, setFilePath] = useRecoilState(diskFilePathState); // 当前文件路径

  return { filePath, setFilePath };
}

export default useFilePath;
