import { useMemo } from 'react';

import useThemeMode from '@/hooks/useThemeMode';

export default function EmptyStatus(props?: { size?: number }) {
  const { size = 96 } = props || {};
  const { isDark } = useThemeMode();

  const imgSrc = useMemo(() => {
    return isDark ? '/img/emptyDark.svg' : '/img/emptyLight.svg';
  }, [isDark]);

  const style = useMemo(() => {
    return { width: size };
  }, [size]);

  return <img src={imgSrc} draggable={false} style={style} />;
}
