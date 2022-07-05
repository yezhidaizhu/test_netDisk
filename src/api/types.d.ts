declare module 'qs';

type QueryListParamType = {
  folderId: number;
  isPublic: number;
  sortField: string;
  name?: string;
  isFolder: number;
};

type GetPrivilegeParamType = {
  folderId: number;
};

type CreatFolderParamType = {
  folderId: number;
  folderName: string;
  isPublic: number;
};

type DeleteFolderParamType = {
  folderId: number;
};

type RenameParamType = {
  folderId: number;
  folderName: string;
};

type MoveParamType = {
  fromId: number;
  toId: string;
  isPublic: number;
};

type ShareParamType = {
  folderId: number;
  folderName: string;
  empIds: number;
};

type UpLoadParamType = {
  isPublic: number;
  saveFolderId: number;
  randomKey: number;
};

type GetShareFolderParamType = {
  type: string;
};

type ShareDetailParamType = {
  ypsId: number;
  type: string;
};

type SaveToMyYpaParamType = {
  ypaId: number;
  targetYpaId: number;
  ypsId: number;
  ypaType: string;
};

type CancelShareParamType = {
  ypsId: number;
};

type GetYpsIdParamType = {
  linkId: number;
};
