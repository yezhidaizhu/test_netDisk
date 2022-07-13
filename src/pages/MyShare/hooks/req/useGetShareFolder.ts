/**
 * @ Create Time: 2022-07-11 15:28:53
 * @ Modified time: 2022-07-12 10:29:35
 * @ Description:  我的分享文件
 */
import { useRequest } from 'ahooks';

import { getShareFolder } from '@/api';

export default function useGetShareFolder() {
  const getShareFolderAciton = useRequest(
    async (getShareFolderParamType: GetShareFolderParamType) => {
      const { data } = await getShareFolder(getShareFolderParamType);

      if (data?.result === 0 && data?.list) {
        return {
          list: formatFileListData(data.list),
          source: data.list,
        };
      }
    },
    { manual: true },
  );
  return { getShareFolderAciton };
}

/**
 * 格式化文件列表
 * @param list 请求获取的文件列表
 */
export function formatFileListData(list: any[] = []) {
  const ret = list.map((fileItem) => {
    const { id, name, size, time, ypaImg = '', shareFrom, type } = fileItem;

    return {
      id,
      fileName: name,
      size,
      shareFrom,
      modifyTime: time,
      isFolder: type === 0,
      thumb: ypaImg ? `${window.EAP}${ypaImg}` : '',
    };
  });

  return ret;
}
