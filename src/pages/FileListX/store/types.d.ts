type Actions = {
  toggle: () => void;
  close: () => void;
  open: () => void;
};

interface FileInfo {
  id: number;
  fileName: string;
  size: number;
  modifyTime: any;

  isFolder?: boolean; // 是否为文件

  thumb?: string; // 文件缩略图
}

type DiskFiles = FileInfo[];

type DiskFilesSelected = number[];

type filePathItemType = {
  label: string;
  folderId: number;
  [x: string]: any;
};
