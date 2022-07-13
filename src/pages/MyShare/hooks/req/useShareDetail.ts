/**
 * @ Create Time: 2022-07-11 17:54:21
 * @ Modified time: 2022-07-12 10:29:47
 * @ Description:  取消分享
 */
import { useRequest } from 'ahooks';

import { shareDetail } from '@/api';

import { formatFileListData } from './useGetShareFolder';

export default function useShareDetail() {
  const shareDetailAciton = useRequest(
    async (shareDetailParamType: ShareDetailParamType) => {
      const { data } = await shareDetail(shareDetailParamType);
      if (data?.result === 0 && data?.list) {
        return {
          list: formatFileListData(data.list),
          source: data.list,
        };
      }
    },
    { manual: true },
  );
  return { shareDetailAciton };
}
