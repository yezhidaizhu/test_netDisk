/**
 * @ Create Time: 2022-07-06 17:14:22
 * @ Modified time: 2022-07-06 17:25:38
 * @ Description:  文件搜索
 */
import { atom, useRecoilState } from 'recoil';

const openSearchFileListState = atom<boolean>({
  key: 'open-search-file-list-state',
  default: false,
});

const searchFileListValueState = atom<string>({
  key: 'search-file-list-value-state',
  default: '',
});

function useSearch() {
  const [isOpenSearchFileList, setIsOpenSearchFileList] = useRecoilState(openSearchFileListState);
  const [searchValue, setSearchValue] = useRecoilState(searchFileListValueState);

  function toggleOpenSearch() {
    setIsOpenSearchFileList((isOpen: boolean) => !isOpen);
  }

  function closeSearch() {
    setIsOpenSearchFileList(false);
  }

  function openSearch() {
    setIsOpenSearchFileList(true);
  }

  function setValue(value: string) {
    setSearchValue(value);
  }

  return {
    isOpenSearchFileList,
    searchValue,
    toggleOpenSearch,
    closeSearch,
    openSearch,
    setValue,
  };
}

export default useSearch;
