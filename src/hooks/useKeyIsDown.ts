/**
 * @ Create Time: 2022-06-21 09:30:27
 * @ Modified time: 2022-06-21 09:31:15
 * @ Description:  监听某个键按下与松开
 */
import { useState } from 'react';

import { useKeyPress } from 'ahooks';
import { KeyFilter } from 'ahooks/lib/useKeyPress';

export function useKeyIsDown(keyFilter: KeyFilter) {
  const [keyIsDown, setKeyIsDown] = useState(false);

  useKeyPress(
    keyFilter,
    (e) => {
      setKeyIsDown(true);
    },
    { events: ['keydown'] },
  );

  useKeyPress(
    keyFilter,
    (e) => {
      setKeyIsDown(false);
    },
    { events: ['keyup'] },
  );
  return keyIsDown;
}
