import { memo } from 'react';

import { Typography } from '@mui/material';

export const BreadItem = memo(function (props: {
  label?: string;
  isLast?: boolean;
  children?: any;
  [x: string]: any;
}) {
  const { label = '', isLast, children, ...otherProps } = props;

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
      className={`cursor-pointer  active:opacity-100 ${
        isLast ? '' : 'opacity-80 hover:opacity-100 active:opacity-80 hover:underline '
      } `}
      {...otherProps}
    >
      {children ? children : label}
    </Typography>
  );
});
