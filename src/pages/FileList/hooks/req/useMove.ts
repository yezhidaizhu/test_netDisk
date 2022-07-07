/**
 * @ Create Time: 2022-07-07 14:48:45
 * @ Modified time: 2022-07-07 14:58:02
 * @ Description:  移动
 */
import { useRequest } from 'ahooks';

import { move } from '@/api';

import useFilePath from '../../store/useFilePath';

export default function useMove() {
  const { isMineNetDisk, getCurFolderId } = useFilePath();

  const moveAction = useRequest(
    async (
      moveParamType:
        | MoveParamType
        | {
            fromIds: string;
            toId: number;
            isPublic?: number;
          },
    ) => {
      const { fromIds, toId, isPublic = -1 } = moveParamType;
      // 如果不传递 isPublic 则按当前类型为准
      const _isPublic = isPublic === -1 ? (isMineNetDisk ? 0 : 1) : isPublic;
      const { data } = await move({
        fromIds,
        toId,
        isPublic: _isPublic,
      });

      return data;
    },
    { manual: true },
  );

  return {
    moveAction,
  };
}
