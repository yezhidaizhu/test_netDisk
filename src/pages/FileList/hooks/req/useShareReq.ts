/**
 * @ Create Time: 2022-07-08 17:55:48
 * @ Modified time: 2022-07-11 10:07:33
 * @ Description:  分享文件
 */
import { useRequest } from 'ahooks';

import { share } from '@/api';

export default function useShareReq() {
  const shareReqAciton = useRequest(share, { manual: true });
  return { shareReqAciton };
}
