type UploadActionItem = {
  key: string;
  label: string;
  Icon: any;
};

export enum UploadActionType {
  Start = 'Start',
  Stop = 'Stop',
  Cancel = 'Cancel',
}

export type { UploadActionItem };
