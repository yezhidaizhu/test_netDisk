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
}

type DiskFiles = FileInfo[];

type DiskFilesSelected = string[];
