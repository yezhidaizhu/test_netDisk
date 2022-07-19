/**
 * @ Create Time: 2022-07-06 15:29:10
 * @ Modified time: 2022-07-06 15:40:12
 * @ Description:  删除文件
 */
import { useRequest } from 'ahooks';

import { deleteFolder } from '@/api';

export default function useDeleteFolder() {
  // 删除文件
  const deleteFolderAction = useRequest(
    async (deleteFolderParamType: DeleteFolderParamType) => {
      const { folderIds } = deleteFolderParamType || {};
      const { data } = await deleteFolder({ folderIds });

      return data;
    },
    { manual: true },
  );

  return {
    deleteFolderAction,
  };
}
