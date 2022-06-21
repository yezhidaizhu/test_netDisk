/**
 * @ Create Time: 2022-06-15 15:32:18
 * @ Modified time: 2022-06-21 18:08:50
 * @ Description: 当前文件夹下的文件
 */
import { atom, useRecoilState } from 'recoil';

const demoData = createDemoRow(12);

const diskFilesState = atom<DiskFiles>({
  key: 'disk-files-state',
  default: demoData,
});

const diskFilesSelectedState = atom<DiskFilesSelected>({
  key: 'disk-files-selected-state',
  default: [],
});

function useDiskFiles() {
  const [files, setFiles] = useRecoilState(diskFilesState); // 当前文件列表
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
  const checkFileIsSelected = (fileId: string) => {
    return selected.includes(fileId);
  };

  return {
    files,
    selected,
    setSelected,
    clearSelected,
    getSelectedFiles,
    checkFileIsSelected,
  };
}

export default useDiskFiles;

// 测试数据 =====================>

export function createDemoRow(num: number): FileInfo[] {
  const row = new Array(num);

  return [...row].map(() => {
    return {
      id: randomString(6),
      fileName: randomString(Math.floor(Math.random() * 30)) + '.' + randomExt(),
      size: Math.random() * 10000,
      modifyTime: randomDate(),
    };
  });
}

function randomString(e: any) {
  e = e || 32;
  let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = '';
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

function randomDate() {
  const time = new Date().getTime();

  return time - Math.floor(Math.random() * 10000);
}

// 随机文件后缀名
function randomExt() {
  const ext = [
    'html',
    'css',
    'json',
    'png',
    'js',
    'pdf',
    'zip',
    'exe',
    'sh',
    'doc',
    'ttf',
    'ppt',
    'xls',
    'mp4',
    'mp3',
    'txt',
    'apk',
    'log',
    'svg',
    '',
  ];
  const randomIndex = Math.floor(Math.random() * ext.length);
  return ext[randomIndex];
}
