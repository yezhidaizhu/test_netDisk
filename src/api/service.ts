import axios from 'axios';
import qs from 'qs';

// 获取文件夹和文件列表信息
export function queryList(queryListParamType: QueryListParamType) {
  const {
    folderId = 0,
    isPublic = 0,
    sortField = '',
    name = '',
    isFolder = 0,
  } = queryListParamType;

  const params = qs.stringify({
    FolderId: folderId,
    SortField: sortField,
    isPublic,
    name,
    isFolder,
  });

  return axios.get(`${window.API}/EAPYunPan/YunPanList?${params}`);
}

// 获取公共云盘文件权限
export function getPrivilege(getPrivilegeParamType: GetPrivilegeParamType) {
  const { folderId = 0 } = getPrivilegeParamType;
  const params = qs.stringify({
    id: folderId,
  });
  return axios.get(`${window.API}EAPYunPan/GetPrivilege?${params}`);
}

// 新建文件夹
export function creatFolder(creatFolderParamType: CreatFolderParamType) {
  const { folderId = 0, folderName = '', isPublic = 0 } = creatFolderParamType;
  const params = qs.stringify({
    folderId,
    name: folderName,
    isPublic,
  });

  return axios.get(`${window.API}EAPYunPan/CreatFolder?${params}`);
}

// 删除
export function deleteFolder(deleteFolderParamType: DeleteFolderParamType) {
  const { folderIds } = deleteFolderParamType;
  const params = qs.stringify({
    ypaIds: folderIds,
  });
  return axios.get(`${window.API}EAPYunPan/Delete?${params}`);
}

// 重命名
export function rename(renameParamType: RenameParamType) {
  const { folderId, folderName } = renameParamType;
  const params = qs.stringify({
    ypaId: folderId,
    newName: folderName,
  });
  return axios.get(`${window.API}EAPYunPan/Rename?${params}`);
}

// 移动文件
export function move(moveParamType: MoveParamType) {
  const { fromId, toId, isPublic = 0 } = moveParamType;
  const params = qs.stringify({
    fromYpaids: fromId,
    targetYpaId: toId,
    isPublic,
  });
  return axios.get(`${window.API}EAPYunPan/Move?${params}`);
}

// 分享文件
export function share(shareParamType: ShareParamType) {
  const { folderId, folderName, empIds } = shareParamType;
  const params = qs.stringify({
    ids: folderId,
    name: folderName,
    notice: 1,
    toEmpIds: empIds,
  });
  return axios.get(`${window.API}EAPYunPan/Shares?${params}`);
}

// 获取剩余的云盘存储空间
export function getSpace() {
  return axios.get(`${window.API}EAPYunPan/GetSpace`);
}

// 上传文件
export function upLoad(upLoadParamType: UpLoadParamType) {
  const { isPublic, saveFolderId, randomKey } = upLoadParamType;
  return axios.post(`${window.API}EAPYunPan/UploadMobile`, {
    isPublic,
    saveFolderId,
    moduleFileRandKey: randomKey,
  });
}

// 获取分享文件信息
export function getShareFolder(getShareFolderParamType: GetShareFolderParamType) {
  const { type } = getShareFolderParamType;
  const params = qs.stringify({
    type,
  });
  return axios.get(`${window.API}EAPYunPan/GetShareFolder?${params}`);
}

// 获取分享文件夹里的文件数据
export function shareDetail(shareDetailParamType: ShareDetailParamType) {
  const { ypsId, type } = shareDetailParamType;
  const params = qs.stringify({
    ypsId,
    type,
  });
  return axios.get(`${window.API}EAPYunPan/ShareDetail?${params}`);
}

// 分享文件转存至云盘
export function saveToMyYpa(saveToMyYpaParamType: SaveToMyYpaParamType) {
  const { ypaId, targetYpaId, ypsId, ypaType } = saveToMyYpaParamType;
  const params = qs.stringify({
    ypaId,
    ypsId,
    targetYpaId,
    ypaType,
  });
  return axios.get(`${window.API}EAPYunPan/SaveToMyYpa?${params}`);
}

// 取消分享
export function cancelShare(cancelShareParamType: CancelShareParamType) {
  const { ypsId } = cancelShareParamType;
  const params = qs.stringify({
    ypsId,
  });
  return axios.get(`${window.API}EAPYunPan/CancelShare?${params}`);
}

// 根据linkId获取YpsId
export function getYpsId(getYpsIdParamType: GetYpsIdParamType) {
  const { linkId } = getYpsIdParamType;
  const params = qs.stringify({
    linkId,
  });
  return axios.get(`${window.API}EAPYunPan/GetYpsId?${params}`);
}
