type ShareFileInfo = FileInfo & { shareFrom: string };

type ShareContextMenuItem = {
  label: string;
  onClick: (file: ShareFileInfo) => void;
  Icon?: any;
};

type ShareFilePathItemType = {
  id: number;
  label: string;
};
