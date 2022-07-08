/**
 * @ Create Time: 2022-07-08 17:08:19
 * @ Modified time: 2022-07-08 17:09:49
 * @ Description:  人员查询
 */
import { useRequest } from 'ahooks';

import { searchOrg } from '@/api/person';

export default function useSearchOrg() {
  const searchOrgAction = useRequest(
    async (searchOrgType: SearchOrgType) => {
      const { content } = searchOrgType;
      const { data } = await searchOrg({ content });
      return data;
    },
    { manual: true },
  );

  return { searchOrgAction };
}
