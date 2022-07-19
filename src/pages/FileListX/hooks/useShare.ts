/**
 * @ Create Time: 2022-07-08 09:35:51
 * @ Modified time: 2022-07-11 15:11:53
 * @ Description:  分享抽屉
 */
import { useEffect, useMemo, useState } from 'react';

import { uniqBy } from 'lodash';

import useNoti from '@/hooks/useNoti';

import useShareDrawer from '../store/useShareDrawer';
import useQueryOrg from './req/useQueryOrg';
import useSearchOrg from './req/useQueryOrg copy';
import useShareReq from './req/useShareReq';

export default function useShare() {
  const noti = useNoti();
  const { isOpenShare, shareFiles, closeShare } = useShareDrawer();
  const { queryOrgAction } = useQueryOrg();
  const { searchOrgAction } = useSearchOrg();
  const { shareReqAciton } = useShareReq();

  const { openSearch, toggleSearch, closeSearch, showSearch } = useSearch();
  const { personList, setPersonList } = usePersonList();
  const { selected, setSelected, addPerson, deletePerson } = usePersonSelected();
  const { compPath, addPath, arrivePath, clearCompPath } = useCompPath();

  const loading = useMemo(() => {
    return queryOrgAction.loading || searchOrgAction.loading;
  }, [queryOrgAction.loading, searchOrgAction.loading]);

  const getPerson = async (dptItem?: SelPersonItemType) => {
    const { id = 0 } = dptItem || {};
    const data = await queryOrgAction.runAsync({ dptId: id });
    if (data?.org) {
      const { parent, list } = formatData(data.org);
      setPersonList(list);
      return { parent, list };
    }
  };

  const onClickDpt = async (dptItem?: SelPersonItemType) => {
    const { parent } = (await getPerson(dptItem)) || {};
    parent && addPath(parent);
  };

  const onClikCompPath = (dptItem: SelPersonItemType) => {
    arrivePath(dptItem);
    getPerson(dptItem);
  };

  const onSearch = async (value: string) => {
    const data = await searchOrgAction.runAsync({ content: value });
    if (data?.emps) {
      const { list } = formatData(data.emps);
      setPersonList(list);
    }
  };

  const onCloseSearch = () => {
    const pathItem = compPath[compPath.length - 1];
    pathItem && onClikCompPath(pathItem);
  };

  // 确认
  const onComfirmShare = async (folderName: string) => {
    const folderIds = shareFiles.map((file) => file.id).join(',');
    const empIds = selected.map((emp) => emp.id).join(',');

    const params: ShareParamType = {
      folderIds,
      folderName,
      empIds,
    };
    const { data } = await shareReqAciton.runAsync(params);

    if (data?.result === 0) {
      if (!data?.errmsg) {
        noti.success('分享成功');
        closeShare();
      } else {
        noti.warning(data.errmsg);
      }
    }
  };

  // 重置选择人员
  const reset = () => {
    setSelected([]);
    clearCompPath();
    setTimeout(() => {
      onClickDpt();
    });
  };

  useEffect(() => {
    if (isOpenShare) {
      reset();
    }
  }, [isOpenShare]);

  return {
    personList,
    selected,
    openSearch,
    compPath,
    loading,
    toggleSearch,
    closeSearch,
    showSearch,
    onSearch,
    onCloseSearch,
    setSelected,
    addPerson,
    deletePerson,
    onClickDpt,
    onClikCompPath,
    onComfirmShare,
  };
}

/**
 * 人员列表
 */
function usePersonList() {
  const [personList, setPersonList] = useState<SelPersonItemType[]>([]);

  return {
    personList,
    setPersonList,
  };
}

/**
 * 路径
 */
function useCompPath() {
  const [compPath, setCompPath] = useState<SelPersonItemType[]>([]); // 路径

  const addPath = (newPathItem: SelPersonItemType) => {
    setCompPath((paths) => [...paths, newPathItem]);
  };

  const arrivePath = (pathItem: SelPersonItemType) => {
    const arrivPathId = pathItem.id;
    const index = compPath.findIndex((p) => p.id === arrivPathId);

    const newCompPath = [...compPath].splice(0, index + 1);
    setCompPath(newCompPath);
  };

  const clearCompPath = () => {
    setCompPath([]);
  };

  return {
    compPath,
    addPath,
    arrivePath,
    clearCompPath,
  };
}

/**
 *  已经选择人员
 */
function usePersonSelected() {
  const [selected, setSelected] = useState<SelPersonItemType[]>([]);

  const addPerson = (personList: SelPersonItemType[]) => {
    setSelected((selected) => {
      const newSelected = uniqBy([...selected, ...personList], 'id');
      return newSelected;
    });
  };

  const deletePerson = (deletePersonList: SelPersonItemType[]) => {
    setSelected((selected) => {
      const newSelected = selected.filter((person) => {
        const exist = deletePersonList.find((delPerson) => delPerson.id === person.id);
        return !exist;
      });
      return newSelected;
    });
  };

  return {
    selected,
    setSelected,
    addPerson,
    deletePerson,
  };
}

/**
 * 搜索
 */
function useSearch() {
  const [openSearch, setOpenSearch] = useState(false);
  const toggleSearch = () => setOpenSearch((open) => !open);
  const closeSearch = () => setOpenSearch(false);
  const showSearch = () => setOpenSearch(true);

  return {
    openSearch,
    toggleSearch,
    closeSearch,
    showSearch,
  };
}

/**
 * 格式化请求的数据
 * 只接受三种 类型 emp | dpt | cmp
 */
function formatData(list: any[]) {
  let parentItem: SelPersonItemType | undefined;
  const retList: SelPersonItemType[] = [];

  list.map((person: any) => {
    const { id, name, type, jobName = '', avatarHash = '' } = person;
    const formatPerson = {
      id,
      name,
      type,
      jobName,
      avatarHash,
    };

    if (['emp', 'dpt', 'cmp'].includes(type)) {
      retList.push(formatPerson);
    }
    if (type === 'all') {
      parentItem = formatPerson;
    }
  });

  return {
    parent: parentItem,
    list: retList,
  };
}
