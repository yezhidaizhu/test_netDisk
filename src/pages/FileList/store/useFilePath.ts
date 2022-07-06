/**
 * @ Create Time: 2022-06-15 15:32:18
 * @ Modified time: 2022-07-06 14:21:48
 * @ Description: 当前文件夹路劲
 */
import { atom, useRecoilState } from 'recoil';

import { Person, Public } from '@mui/icons-material';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const netDiskType = {
  Mine: {
    label: '我的',
    Icon: Person,
    folderId: 0,
  },
  Common: {
    label: '公共',
    Icon: Public,
    folderId: 0,
  },
};

const isMineNetDiskState = atom<boolean>({
  key: 'is-mine-net-disk-state',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

const diskFilePathState = atom<filePathItemType[]>({
  key: 'file-path-state',
  default: [],
});

export default function useFilePath() {
  const [isMineNetDisk, setIsMineNetDisk] = useRecoilState(isMineNetDiskState); // 当前文件路径
  const [filePath, setFilePath] = useRecoilState(diskFilePathState); // 当前文件路径

  // 增加路径
  const addPath = (item: filePathItemType) => {
    setFilePath((filePath) => [...filePath, item]);
  };

  /**
   * 返回到指定路径
   * @param item 路径对象 filePathItemType， 可以为空，为空则回到根目录
   * @returns
   */
  const arrivePath = (item: filePathItemType) => {
    const curFolderId = item.folderId;
    const fIndex = filePath.findIndex((item) => item.folderId === curFolderId);

    if (fIndex === -1) return;

    const newFilePath = [...filePath].splice(0, fIndex + 1);
    setFilePath(newFilePath);
  };

  /**
   * 回到根目录
   */
  const arriveRoot = () => {
    setFilePath([]);
  };

  /**
   * 触发一次修改路劲，起到刷新作用，可用于刷新文件列表，新增文件时，就可以使用上
   */
  const refreshFilePath = () => {
    setFilePath([...filePath]);
  };

  // 改变云盘类型，我的/公共
  const setDiskType = (isMine: boolean = false) => {
    if (isMine !== isMineNetDisk) {
      // 发生改变则重置
      setIsMineNetDisk(isMine);
      setFilePath([]);
    }
  };

  // 获取当前文件id，即 FolderId
  const getCurFolderId = () => {
    if (filePath.length === 0) {
      return 0;
    } else {
      return filePath[filePath.length - 1].folderId;
    }
  };

  return {
    filePath,
    isMineNetDisk,
    setFilePath,
    setDiskType,
    addPath,
    arrivePath,
    arriveRoot,
    refreshFilePath,
    getCurFolderId,
  };
}
