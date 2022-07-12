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
  folderIds: string;
};

type RenameParamType = {
  folderId: number;
  folderName: string;
};

type MoveParamType = {
  fromIds: string;
  toId: number;
  isPublic: number;
};

type ShareParamType = {
  folderIds: string;
  folderName: string;
  empIds: string;
};

type UpLoadParamType = {
  isPublic: number;
  saveFolderId: number;
  randomKey: number;
};

type GetShareFolderParamType = {
  type: 2 | 3;
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
  ypsId: string;
};

type GetYpsIdParamType = {
  linkId: number;
};

// 人员
type QueryOrgParamType = {
  dptId: number;
  companyId: number;
};

type SearchOrgType = {
  content: string;
};
