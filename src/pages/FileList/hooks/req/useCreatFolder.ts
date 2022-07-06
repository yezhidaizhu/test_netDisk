/**
 * @ Create Time: 2022-07-06 11:58:41
 * @ Modified time: 2022-07-06 12:40:04
 * @ Description:  新建文件夹
 */
import { useRequest } from 'ahooks';

import { creatFolder, queryList } from '@/api';

import useFilePath from '../../store/useFilePath';

export default function useCreatFolder() {
  const { isMineNetDisk, getCurFolderId } = useFilePath();

  // 新建文件夹
  const creatFolderAction = useRequest(
    async (
      creatFolderParamType:
        | CreatFolderParamType
        | {
            folderName: string;
            folderId?: number;
            isPublic?: number;
          },
    ) => {
      const { folderId = 0, folderName = '', isPublic = -1 } = creatFolderParamType || {};
      const fname = folderName?.trim();
      if (!fname) {
        console.error('文件名不能为空');
        return;
      }

      // 如果不传递 isPublic 则按当前类型为准
      const _isPublic = isPublic === -1 ? (isMineNetDisk ? 0 : 1) : isPublic;

      // 如果folderId 不传递，则根据当前路劲获取id
      const _folderId = folderId ? folderId : getCurFolderId();

      const { data } = await creatFolder({
        isPublic: _isPublic,
        folderId: _folderId,
        folderName: fname,
      });

      return data;
    },
    { manual: true },
  );

  return {
    creatFolderAction,
  };
}
