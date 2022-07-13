/**
 * @ Create Time: 2022-07-13 09:42:43
 * @ Modified time: 2022-07-13 10:52:07
 * @ Description:  数据选择
 */
import { useContext } from 'react';

import { DataIdSelectedContext } from '../context';

export default function useDataIdSelected() {
  const { dataIdSelected, addDataId, rmDataId, uqDataId, clearDataIdSelected } =
    useContext(DataIdSelectedContext);

  return {
    dataIdSelected,
    addDataId,
    rmDataId,
    uqDataId,
    clearDataIdSelected,
  };
}
