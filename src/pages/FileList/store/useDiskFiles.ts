/**
 * @ Create Time: 2022-06-15 15:32:18
 * @ Modified time: 2022-07-06 12:41:05
 * @ Description: 当前文件夹下的文件
 */
import { atom, useRecoilState } from 'recoil';

const diskSourceFilesState = atom<{ [x: string]: any }[]>({
  key: 'disk-source-files-state',
  default: [],
});

const diskFilesState = atom<DiskFiles>({
  key: 'disk-files-state',
  default: [],
});

const diskFilesSelectedState = atom<DiskFilesSelected>({
  key: 'disk-files-selected-state',
  default: [],
});

function useDiskFiles() {
  const [sourceFiles, setSourceFiles] = useRecoilState(diskSourceFilesState); // 源请求文件列表，未格式化
  const [files, setFiles] = useRecoilState(diskFilesState); // 当前文件列表，格式化
  const [selected, setSelected] = useRecoilState(diskFilesSelectedState); // 当前选择的文件，只保存id

  const clearSelected = () => {
    setSelected([]);
  };

  // 获取selected中id中对应的文件
  const getSelectedFiles = () => {
    const curSelectedFiles: FileInfo[] = [];
    for (let i = 0; i < selected.length; i++) {
      const curFileId = selected[i];
      const file = files.find((file) => file.id === curFileId);
      file && curSelectedFiles.push(file);
    }

    return curSelectedFiles;
  };

  // 判断文件是否被选择到
  const checkFileIsSelected = (fileId: number) => {
    return selected.includes(fileId);
  };

  return {
    sourceFiles,
    files,
    selected,
    setSourceFiles,
    setFiles,
    setSelected,
    clearSelected,
    getSelectedFiles,
    checkFileIsSelected,
  };
}

export default useDiskFiles;
