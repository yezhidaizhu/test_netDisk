/**
 * @ Create Time: 2022-07-06 11:58:41
 * @ Modified time: 2022-07-06 15:01:16
 * @ Description:  重命名
 */
import { useRequest } from 'ahooks';

import { rename } from '@/api';

export default function useRename() {
  // 重命名
  const renameAction = useRequest(
    async (renameParamType: RenameParamType) => {
      const { folderName } = renameParamType;
      const fname = folderName?.trim();
      if (!fname) {
        console.error('文件名不能为空');
        return;
      }
      const { data } = await rename(renameParamType);
      return data;
    },
    { manual: true },
  );

  return {
    renameAction,
  };
}
