import { useMemo } from 'react';

import { useMediaQuery } from '@mui/material';

import emptyIcon from './empty.svg';
import emptyLightIcon from './emptyLight.svg';

export default function EmptyStatus(props: { label: string; className?: string }) {
  const { label, className = '' } = props;

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const icon = useMemo(() => {
    return prefersDarkMode ? emptyIcon : emptyLightIcon;
  }, [prefersDarkMode]);
  return (
    <div className={`flex flex-col items-center text-gray-400 ${className}`}>
      <img src={icon} className="w-36" />
      {label}
    </div>
  );
}
