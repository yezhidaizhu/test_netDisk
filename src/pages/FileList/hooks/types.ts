type FileOperationItem = {
  key: string;
  label: string;
  Icon: any;
};

export enum FileOperationType {
  Download = 'Download',
  Share = 'Share',
  Delete = 'Delete',
  Move = 'Move',
  Rename = 'Rename',
}

export type { FileOperationItem };
