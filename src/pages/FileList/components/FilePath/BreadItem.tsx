import { memo } from 'react';

import { Typography } from '@mui/material';

export const BreadItem = memo(function (props: {
  label?: string;
  isLast?: boolean;
  children?: any;
}) {
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
      className={`cursor-pointer  active:opacity-100 ${isLast ? '' : 'hover:opacity-80 '} `}
    >
      {children ? children : label}
    </Typography>
  );
});
