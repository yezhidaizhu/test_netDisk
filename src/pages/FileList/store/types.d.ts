type Actions = {
  toggle: () => void;
  close: () => void;
  open: () => void;
};

interface FileInfo {
  id: string;
  fileName: string;
  size: number;
  modifyTime: any;

  isFolder?: boolean; // 是否为文件

  thumb?: string; // 文件缩略图
}

type DiskFiles = FileInfo[];

type DiskFilesSelected = string[];

type filePathItemType = {
  label: string;
  folderId: string;
  [x: string]: any;
};
