/**
 * @ Create Time: 2022-07-12 11:40:06
 * @ Modified time: 2022-07-12 11:42:33
 * @ Description:  表格是否为紧凑型
 */
import { atom, useRecoilState } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const tableDenseState = atom<boolean>({
  key: 'table-Dense-state',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

function useTableDense() {
  const [isDense, setIsDense] = useRecoilState(tableDenseState);

  function toggleDense() {
    setIsDense((isDense: boolean) => !isDense);
  }

  return { isDense, toggleDense };
}

export default useTableDense;
