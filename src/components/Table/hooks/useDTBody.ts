/**
 * @ Create Time: 2022-07-13 11:50:10
 * @ Modified time: 2022-07-13 18:18:36
 * @ Description: 行数据处理
 */
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useKeyIsDown } from '@/hooks/useKeyIsDown';

import { dtBodyRowId } from '../components/DTBodyRow';
import useContextMenu from './useContextMenu';
import useDataIdField from './useDataIdField';
import useDataIdSelected from './useDataIdSelected';

export default function useDTBody(opts: {
  data: TableData[];
  onRowClick?: (data: DataIdType) => void;
  onRowDbClick?: (data: DataIdType) => void;
}) {
  const { data: dataList = [], onRowClick, onRowDbClick } = opts;

  const dataIdField = useDataIdField();
  const { setAnchorPoint, toggleMenu, setTempData } = useContextMenu();
  const { dataIdSelected, addDataId, rmDataId, uqDataId } = useDataIdSelected();

  const ctrlKeyIsDown = useKeyIsDown('ctrl');
  const shiftKeyIsDown = useKeyIsDown('shift');

  const [clickWithoutShiftId, setClickWithoutShiftId] = useState<DataIdType | undefined>(); // 未按下shift键前的最后一个选择， 用于按下 shift 键连选
  const [seriesId, setSeriesId] = useState<DataIdType[]>([]); // 按下 shift 进行连续选择的id

  useEffect(() => {
    dataList.length && !clickWithoutShiftId && setClickWithoutShiftId(dataList[0].id);
  }, [dataList]);

  const onClickRow = useCallback(
    (event: any, dataId: DataIdType, dataIndex: number) => {
      if (shiftKeyIsDown) {
        // 按下 shift
        const clickWithoutShiftFileIndex = dataList.findIndex(
          (d) => d[dataIdField] === clickWithoutShiftId,
        );
        const compare = dataIndex - clickWithoutShiftFileIndex;

        // 当前应该连续选择的Id
        const _seriesId: DataIdType[] = [];

        dataList.map((d, index) => {
          const _id = d[dataIdField];

          if (compare > 0) {
            if (index >= clickWithoutShiftFileIndex && index <= dataIndex) {
              _seriesId.push(_id);
            }
          } else {
            if (index >= dataIndex && index <= clickWithoutShiftFileIndex) {
              _seriesId.push(_id);
            }
          }
        });

        if (_seriesId.length) {
          rmDataId(seriesId);
          addDataId(_seriesId);

          setSeriesId(_seriesId);
        }
      } else if (ctrlKeyIsDown) {
        // 按下 ctrl
        addDataId([dataId]);

        setClickWithoutShiftId(dataId);
        seriesId.length && setSeriesId([]);
      } else {
        uqDataId(dataId);

        setClickWithoutShiftId(dataId);
        seriesId.length && setSeriesId([]);
      }

      onRowClick?.(dataId);
    },
    [dataList, dataIdSelected, ctrlKeyIsDown, shiftKeyIsDown, seriesId, clickWithoutShiftId],
  );

  const onRowDoubleClick = (event: any, dataId: DataIdType) => {
    onRowDbClick?.(dataId);
  };

  // 右键点击
  const onContextMenu = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    let targetId = getDataIdByNativeEvent(e.nativeEvent);

    if (!targetId) return;

    setAnchorPoint({ x: e.clientX, y: e.clientY });
    toggleMenu(true);

    if (idTypeIsNumber) {
      targetId = parseInt(targetId);
    }

    const data = {
      id: targetId,
      ids: dataIdSelected.includes(targetId) ? dataIdSelected : [targetId],
    };

    setTempData(data);
  };

  const idTypeIsNumber = useMemo(() => {
    const value = dataList[0]?.[dataIdField];
    return {}.toString.call(0) === {}.toString.call(value);
  }, [dataList, dataIdField]);

  return {
    onClickRow,
    onContextMenu,
    onRowDoubleClick,
  };
}

function getDataIdByNativeEvent(nativeEvent: any) {
  const targetNode = nativeEvent?.path?.find((node: any) => node.id === dtBodyRowId);

  return targetNode?.getAttribute?.('data-id');
}
