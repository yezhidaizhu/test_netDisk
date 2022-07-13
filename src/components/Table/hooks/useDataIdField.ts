/**
 * @ Create Time: 2022-07-13 10:08:01
 * @ Modified time: 2022-07-13 10:09:01
 * @ Description:  dataId Field
 */
import { useContext } from 'react';

import { DataIdFieldContext } from '../context';

export default function useDataIdField() {
  const dataIdField = useContext(DataIdFieldContext);
  return dataIdField;
}
