import { useCallback, useEffect, useState } from 'react';

import { useKeyIsDown } from '@/hooks/useKeyIsDown';
import useDiskFiles from '@/pages/FileList/store/useDiskFiles';

import useFilePath from '../store/useFilePath';

export default function useTable() {
  const { files, selected, setSelected } = useDiskFiles();
  const { addPath } = useFilePath();
  const ctrlKeyIsDown = useKeyIsDown('ctrl');
  const shiftKeyIsDown = useKeyIsDown('shift');

  const [clickWithoutShift, setClickWithoutShift] = useState(''); // 未按下shift键前的最后一个选择， 用于按下 shift 键连选
  const [seriesId, setSeriesId] = useState<string[]>([]); // 按下 shift 进行连续选择的id
  useEffect(() => {
    files.length && setClickWithoutShift(files[0].id);
  }, []);

  const onRowClick = useCallback(
    (id: string) => {
      // 按下 ctrl 键可以多选
      if (ctrlKeyIsDown) {
        const existId = selected.find((fid) => fid === id);
        if (existId) {
          setSelected((selected) => selected.filter((fid) => fid !== id));
        } else {
          setSelected((selected) => Array.from(new Set([...selected, id])));
        }

        if (!shiftKeyIsDown) {
          setClickWithoutShift(id);
          setSeriesId([]);
        }
      }

      // 按下 shift 键
      if (shiftKeyIsDown) {
        const clickWithoutShiftFileIndex = files.findIndex((file) => file.id === clickWithoutShift);
        const curSelFileIndex = files.findIndex((file) => file.id === id);
        const compare = curSelFileIndex - clickWithoutShiftFileIndex;
        // 当前应该连续选择的Id
        const _seriesId: string[] = [];
        files.map((file, index) => {
          const _id = file.id;

          if (compare > 0) {
            if (index >= clickWithoutShiftFileIndex && index <= curSelFileIndex) {
              _seriesId.push(_id);
            }
          } else {
            if (index >= curSelFileIndex && index <= clickWithoutShiftFileIndex) {
              _seriesId.push(_id);
            }
          }
        });

        if (_seriesId.length) {
          setSelected((selected) => {
            const rmSeriesIdInSelected = [...selected].filter((id) => !seriesId.includes(id));
            return Array.from(new Set([...rmSeriesIdInSelected, ..._seriesId]));
          });
          setSeriesId(_seriesId);
        }
      }

      if (!ctrlKeyIsDown && !shiftKeyIsDown) {
        setSelected([id]);
        setClickWithoutShift(id);
        setSeriesId([]);
      }
    },
    [files, selected, ctrlKeyIsDown, shiftKeyIsDown, seriesId],
  );

  const onCheckBoxClick = useCallback(
    (e: any, id: string) => {
      e.stopPropagation();
      const checked = e.target.checked;
      const index = selected.findIndex((_id) => _id === id);
      if (checked) {
        setSelected((ids) => Array.from(new Set([...ids, id])));
      } else {
        const newItems = [...selected];
        newItems.splice(index, 1);
        setSelected(Array.from(new Set(newItems)));
      }
    },
    [files, selected],
  );

  const onSelAll = useCallback(
    (isSelAllNow: boolean) => {
      const rowIds = files.map((file) => file.id);
      const sel = isSelAllNow ? [] : [...rowIds];
      setSelected(sel);
    },
    [files, selected],
  );

  const clearSelected = () => {
    setSelected([]);
  };

  const onRowDoubleClick = (fileItem: FileInfo) => {
    const { id: folderId, fileName: label } = fileItem;
    addPath({ folderId, label });
  };

  return {
    files,
    selected,
    onSelAll,
    onCheckBoxClick,
    onRowClick,
    clearSelected,
    onRowDoubleClick,
  };
}
