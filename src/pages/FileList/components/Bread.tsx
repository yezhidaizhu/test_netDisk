/**
 * @ Create Time: 2022-06-13 17:08:23
 * @ Modified time: 2022-06-16 14:38:21
 * @ Description:  文件路径
 */
import { memo, useMemo } from 'react';

import { Home } from '@mui/icons-material';
import { Breadcrumbs, Typography } from '@mui/material';

import useFilePath from '../store/useFilePath';

export default function Bread() {
  const { filePath } = useFilePath();

  const filePathLen = useMemo(() => filePath.length, [filePath]);

  return (
    <Breadcrumbs separator="›">
      <BreadItem>
        <Home sx={{ mr: 0.5 }} fontSize="inherit" /> 网盘
      </BreadItem>
      {filePath.map((link, index) => (
        <BreadItem key={index} label={link.label} isLast={index === filePathLen - 1} />
      ))}
    </Breadcrumbs>
  );
}

const BreadItem = memo(_BreadItem);

function _BreadItem(props: { label?: string; isLast?: boolean; children?: any }) {
  const { label = '', isLast, children } = props;

  const cfg = isLast
    ? {
        color: 'text.primary',
        sx: { fontWeight: 600 },
      }
    : {
        color: 'gray',
      };

  return (
    <Typography
      {...cfg}
      variant="h6"
      className={`cursor-pointer ${isLast ? '' : 'hover:text-blue-500 '} `}
    >
      {children ? children : label}
    </Typography>
  );
}
