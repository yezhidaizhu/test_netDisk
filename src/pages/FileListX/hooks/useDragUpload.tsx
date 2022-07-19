/**
 * @ Create Time: 2022-06-20 10:08:00
 * @ Modified time: 2022-06-20 10:12:04
 * @ Description:  拖拽文件进入
 */
import { useEffect, useRef } from 'react';

import Uppy from '@uppy/core';
import DropTarget from '@uppy/drop-target';

export default function useDragUpload(targetId: string) {
  const uppy = useRef<Uppy>();

  useEffect(() => {
    uppy.current = new Uppy().use(DropTarget, {
      target: '#' + targetId,
    });

    return () => {
      uppy.current?.close();
    };
  }, []);
}
