/**
 * @ Create Time: 2022-07-13 09:42:43
 * @ Modified time: 2022-07-14 10:15:58
 * @ Description:  数据选择
 */
import { useContext } from 'react';

import { DataIdSelectedContext } from '../context';

export default function useDataIdSelected(): DataIdSelectedContextType {
  return useContext(DataIdSelectedContext);
}
