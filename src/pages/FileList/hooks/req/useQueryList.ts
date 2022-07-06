/**
 * @ Create Time: 2022-07-06 08:58:35
 * @ Modified time: 2022-07-06 12:09:15
 * @ Description:  获取文件列表
 */
import { useRequest } from 'ahooks';

import { queryList } from '@/api';

import useFilePath from '../../store/useFilePath';

export default function useQueryList() {
  const { isMineNetDisk, getCurFolderId } = useFilePath();
  // 获取文件
  const queryListAction = useRequest(
    async (
      queryListParamType: QueryListParamType = {
        folderId: 0,
        sortField: '',
        isFolder: 0,
        isPublic: -1,
      },
    ) => {
      // 如果不传递 isPublic 则按当前类型为准
      const isPublic =
        queryListParamType.isPublic === -1 ? (isMineNetDisk ? 0 : 1) : queryListParamType.isPublic;

      // 如果folderId 不传递，则根据当前路劲获取id
      const folderId = queryListParamType.folderId ? queryListParamType.folderId : getCurFolderId();

      Object.assign(queryListParamType, {
        isPublic,
        folderId,
      });

      const { data } = await queryList(queryListParamType);
      if (data?.result === 0 && data?.list) {
        return {
          list: formatFileListData(data.list),
          source: data.list,
        };
      }
    },
    { manual: true },
  );

  return {
    queryListAction,
  };
}

/**
 * 格式化文件列表
 * @param list 请求获取的文件列表
 */
function formatFileListData(list: any[] = []) {
  const ret = list.map((fileItem) => {
    const { id, name, size, time, ypaImg = '', type } = fileItem;

    return {
      id,
      fileName: name,
      size,
      modifyTime: time,
      isFolder: type === 0,
      thumb: ypaImg ? `${window.EAP}${ypaImg}` : '',
    };
  });

  return ret;
}
