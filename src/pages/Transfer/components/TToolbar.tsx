/**
 * @ Create Time: 2022-06-21 14:58:27
 * @ Modified time: 2022-06-21 16:44:50
 * @ Description:  表单前的显示
 */
import { Component } from 'react';

import { Button, ButtonGroup, ButtonProps } from '@mui/material';

export default function TToolbar(props: {
  label: any;
  actions: (ButtonProps & { label: string; Icon: any })[];
}) {
  const { label = '', actions = [] } = props;

  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center text-gray-700 text-sm dark:text-gray-400">{label}</div>

      <div className="flex gap-2">
        {actions.map((action, index) => {
          const { label, Icon, ...btnProps } = action;
          return (
            <Button key={index} size="small" variant="outlined" startIcon={<Icon />} {...btnProps}>
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
