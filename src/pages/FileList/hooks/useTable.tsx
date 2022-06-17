import { useCallback, useState } from 'react';

import useDiskFiles from '@/pages/FileList/store/useDiskFiles';

export default function useTable() {
  const { files, selected, setSelected } = useDiskFiles();

  const onRowClick = useCallback(
    (id: string) => {
      setSelected([id]);
    },
    [files, selected],
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

  return {
    files,
    selected,
    onSelAll,
    onCheckBoxClick,
    onRowClick,
    clearSelected,
  };
}
