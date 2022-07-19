/**
 * @ Create Time: 2022-07-06 16:03:51
 * @ Modified time: 2022-07-06 16:16:58
 * @ Description: 查询新建文件夹权限, 这个真的能获取到权限？？？不用isPublic 这个参数？
 */
import { useRequest } from 'ahooks';

import { getPrivilege } from '@/api';

import useFilePath from '../../store/useFilePath';

export default function useGetPrivilege() {
  const { getCurFolderId } = useFilePath();

  const getPrivilegeAction = useRequest(
    async (getPrivilegeParamType?: GetPrivilegeParamType) => {
      // 默认查询当前文件夹下权限
      const { folderId = getCurFolderId() } = getPrivilegeParamType || {};

      const { data } = await getPrivilege({ folderId });
      return data;
    },
    { manual: true },
  );

  return {
    getPrivilegeAction,
  };
}
