import { useEffect, useMemo, useState } from 'react';

import useGetShareFolder from './req/useGetShareFolder';
import useShareDetail from './req/useShareDetail';

/**
 * @param opts type 分享类型 3： 我的分享 2：别人分享
 * @returns
 */
export default function useShareFileList(opts?: { type?: 2 | 3 }) {
  const { type = 2 } = opts || {};
  const [shareFileList, setShareFileList] = useState<ShareFileInfo[]>([]);
  const { getShareFolderAciton } = useGetShareFolder();
  const { shareDetailAciton } = useShareDetail();

  const loading = useMemo(() => {
    return getShareFolderAciton.loading || shareDetailAciton.loading;
  }, [getShareFolderAciton, shareDetailAciton]);

  const getShareRootFileList = async () => {
    const data = await getShareFolderAciton.runAsync({ type });
    if (data?.list) {
      setShareFileList(data.list);
    }
  };

  const getShareDetailFileList = async (opts: { id: number; type: 1 | -1 }) => {
    const { id, type } = opts;
    const data = await shareDetailAciton.runAsync({ ypsId: id, type });
    if (data?.list) {
      setShareFileList(data.list);
    }
  };

  const refreshRoot = () => {
    getShareRootFileList();
  };

  return {
    loading,
    shareFileList,
    getShareRootFileList,
    getShareDetailFileList,
    refreshRoot,
  };
}
