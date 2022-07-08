import { useMemo } from 'react';

import useThemeMode from '@/hooks/useThemeMode';

export default function EmptyStatus(props?: { size?: number; label?: string; className?: any }) {
  const { size = 96, label, className } = props || {};
  const { isDark } = useThemeMode();

  const imgSrc = useMemo(() => {
    return isDark ? '/img/emptyDark.svg' : '/img/emptyLight.svg';
  }, [isDark]);

  const style = useMemo(() => {
    return { width: size };
  }, [size]);

  return (
    <div className={`flex flex-col w-full gap-2 items-center justify-center ${className}`}>
      <img src={imgSrc} draggable={false} style={style} />
      {label && <span className="text-gray-400">{label}</span>}
    </div>
  );
}
