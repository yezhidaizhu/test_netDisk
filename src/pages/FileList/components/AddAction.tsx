/**
 * @ Create Time: 2022-06-13 17:38:46
 * @ Modified time: 2022-06-20 09:17:17
 * @ Description:  右上角加操作
 */
import { useState } from 'react';

import { AddCircle } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material';
import { Box } from '@mui/system';

import useAddActions, { addActions } from '../hooks/useAddActions';

export default function AddAction() {
  const { onAddAction } = useAddActions();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const actions = [addActions.NewFolder, addActions.UploadFile];

  return (
    <>
      <div onClick={handleClick}>
        <AddCircle
          fontSize="large"
          className="text-blue-500  opacity-90 hover:opacity-100 cursor-pointer"
        />
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box className="p-2">
          <List disablePadding onClick={handleClose}>
            {actions.map((action, index) => (
              <ListItem
                dense
                divider={index !== actions.length - 1}
                key={action.label}
                disablePadding
                onClick={() => onAddAction(action.key)}
              >
                <ListItemButton>
                  <ListItemContent Icon={action.Icon} label={action.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
}

function ListItemContent(props: { label: string; Icon: any }) {
  const { label = '', Icon } = props;

  return (
    <ListItemText>
      <div className="flex gap-2 items-center w-28">
        <Icon fontSize="small" /> {label}
      </div>
    </ListItemText>
  );
}
