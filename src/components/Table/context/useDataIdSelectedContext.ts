/**
 * @ Create Time: 2022-07-13 09:42:43
 * @ Modified time: 2022-07-14 10:11:27
 * @ Description:  数据选择
 */
import { useState } from 'react';

export default function useDataIdSelectedContext(opts: {
  checkable: boolean;
  showCheckbox: boolean;
}) {
  const { checkable, showCheckbox } = opts;
  const [dataIdSelected, setDataIdSelected] = useState<DataIdType[]>([]);

  const addDataId = (ids: DataIdType[]) => {
    setDataIdSelected((sels) => {
      const newData = Array.from(new Set([...sels, ...ids]));
      return newData;
    });
  };

  const rmDataId = (ids: DataIdType[]) => {
    const newData = dataIdSelected.filter((dataId) => !ids.includes(dataId));
    setDataIdSelected(newData);
  };

  const uqDataId = (id: DataIdType) => {
    setDataIdSelected([id]);
  };

  const clearDataIdSelected = () => {
    setDataIdSelected([]);
  };

  return {
    dataIdSelected,
    checkable,
    showCheckbox,
    addDataId,
    rmDataId,
    uqDataId,
    clearDataIdSelected,
  };
}
