/**
 * @ Create Time: 2022-07-11 17:54:21
 * @ Modified time: 2022-07-12 10:29:31
 * @ Description:  取消分享
 */
import { useRequest } from 'ahooks';

import { cancelShare } from '@/api';

export default function useCancelShare() {
  const cancelShareAciton = useRequest(
    async (cancelShareParamType: CancelShareParamType) => {
      const { data } = await cancelShare(cancelShareParamType);
      return data;
    },
    { manual: true },
  );
  return { cancelShareAciton };
}
