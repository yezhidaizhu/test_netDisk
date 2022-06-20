type FileOperationItem = {
  key: keyof FileOperationType;
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

type AddActionItem = {
  key: keyof AddActionType;
  label: string;
  Icon: any;
};

export enum AddActionType {
  NewFolder = 'NewFolder',
  UploadFile = 'UploadFile',
}

export type { FileOperationItem, AddActionItem };
