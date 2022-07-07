/**
 * @ Create Time: 2022-07-06 08:58:35
 * @ Modified time: 2022-07-07 15:39:50
 * @ Description:  获取文件列表
 */
import { useRequest } from 'ahooks';

import { queryList } from '@/api';

import useFilePath from '../../store/useFilePath';
import useSearch from '../../store/useSearch';

export default function useQueryList() {
  const { isMineNetDisk, getCurFolderId } = useFilePath();

  const { searchValue, isOpenSearchFileList } = useSearch();

  // 获取文件
  const queryListAction = useRequest(
    async (
      queryListParamType:
        | QueryListParamType
        | {
            folderId?: number;
            isPublic?: number;
            sortField?: string;
            name?: string | undefined;
            isFolder?: number;
          } = {
        folderId: -1,
        sortField: '',
        isFolder: 0,
        isPublic: -1,
      },
      opts?: {
        dismissSearch?: boolean; // 是否忽视搜索值
      },
    ) => {
      const {
        folderId = -1,
        sortField = '',
        name = '',
        isFolder = 0,
        isPublic = -1,
      } = queryListParamType || {};

      const { dismissSearch } = opts || {};

      // 如果不传递 isPublic 则按当前类型为准
      const _isPublic = isPublic === -1 ? (isMineNetDisk ? 0 : 1) : isPublic;

      // 如果folderId 不传递，则根据当前路劲获取id
      const _folderId = folderId === -1 ? getCurFolderId() : folderId;

      // 如果打开搜索，且name为空，则按搜索值传入
      const _name = isOpenSearchFileList && !name ? searchValue : name;

      const { data } = await queryList({
        folderId: _folderId,
        isPublic: _isPublic,
        sortField,
        name: dismissSearch ? '' : _name,
        isFolder,
      });

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
