/**
 * @ Create Time: 2022-07-05 09:06:10
 * @ Modified time: 2022-07-05 09:12:24
 * @ Description:  当前主题颜色
 */
import { useMemo } from 'react';

import { useMediaQuery } from '@mui/material';

export default function useThemeMode() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');

  const mode: 'dark' | 'light' = useMemo(() => {
    return isDark ? 'dark' : 'light';
  }, [isDark]);

  return { mode, isDark };
}
