/**
 * @ Create Time: 2022-07-13 10:09:55
 * @ Modified time: 2022-07-13 10:10:44
 * @ Description:  columns
 */
import { useContext } from 'react';

import { ColumnsContext } from '../context';

export default function useColumns() {
  const columns = useContext(ColumnsContext);
  return columns;
}
