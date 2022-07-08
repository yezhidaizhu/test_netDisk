import { Divider, Drawer } from '@mui/material';

import useShare from '../../hooks/useShare';
import useShareDrawer from '../../store/useShareDrawer';
import CompPath from './CompPath';
import EndAction from './EndAction';
import IsSelected from './IsSelected';
import SearchPerson from './SearchPerson';
import SelectePerson from './SelectePerson';
import Title from './Title';

export default function SelectDrawer() {
  const {
    personList,
    selected,
    openSearch,
    compPath,
    loading,
    toggleSearch,
    closeSearch,
    onSearch,
    addPerson,
    deletePerson,
    onClickDpt,
    onClikCompPath,
    onCloseSearch,
  } = useShare();

  const { isOpenShare, closeShare } = useShareDrawer();

  return (
    <Drawer open={isOpenShare} anchor="right" onClose={closeShare}>
      <div className="   pt-4  flex flex-col h-full  " style={{ width: 400 }}>
        <Title toggleSearch={toggleSearch} />

        {/* 搜索 */}
        <SearchPerson
          open={openSearch}
          closeSearch={closeSearch}
          onClose={onCloseSearch}
          onSearch={onSearch}
        />

        {/* 路径 */}
        <CompPath isSearch={openSearch} compPath={compPath} onClikCompPath={onClikCompPath} />

        {/* 选择 */}
        <SelectePerson
          loading={loading}
          selectedList={selected}
          personList={personList}
          addPerson={addPerson}
          deletePerson={deletePerson}
          onClickDpt={onClickDpt}
        />

        {/* 已选择 */}
        <IsSelected list={selected} onDelete={deletePerson} />

        {/* 操作 */}
        <EndAction />
      </div>
    </Drawer>
  );
}
