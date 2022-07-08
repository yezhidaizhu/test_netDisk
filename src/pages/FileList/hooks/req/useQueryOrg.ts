/**
 * @ Create Time: 2022-07-08 12:06:11
 * @ Modified time: 2022-07-08 12:09:48
 * @ Description: 获取人员，用于分型
 */
import { useRequest } from 'ahooks';

import { queryOrg } from '@/api/person';

export default function useQueryOrg() {
  const queryOrgAction = useRequest(
    async (
      queryOrgParamType:
        | QueryOrgParamType
        | {
            dptId: number;
            companyId?: number;
          },
    ) => {
      const { dptId, companyId = 0 } = queryOrgParamType;

      const { data } = await queryOrg({
        dptId,
        companyId,
      });

      return data;
    },
    { manual: true },
  );

  return { queryOrgAction };
}
