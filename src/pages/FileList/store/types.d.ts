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

  thumb?: string; // 文件缩略图
}

type DiskFiles = FileInfo[];

type DiskFilesSelected = string[];
