/**
 * @ Create Time: 2022-07-07 18:20:23
 * @ Modified time: 2022-07-08 18:14:39
 * @ Description:  已选人员
 */
import { useState } from 'react';

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  Chip,
  Collapse,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import EmptyStatus from '@/components/EmptyStatus';

export default function IsSelected(props: {
  list: SelPersonItemType[];
  onDelete: (person: any) => void;
}) {
  const { onDelete, list = [] } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col pl-4">
      <Divider />
      <ListItem
        secondaryAction={
          <IconButton size="small">{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</IconButton>
        }
        disablePadding
        onClick={() => setOpen((open) => !open)}
      >
        <ListItemButton sx={{ paddingLeft: 1 }}>
          <ListItemText primary={`已选人员(${list.length})`} />
        </ListItemButton>
      </ListItem>

      <Collapse in={open}>
        <div
          className="py-2 h-56 
      flex gap-2 flex-wrap place-content-start
       overflow-hidden overflow-y-auto"
        >
          {list.map((person, index) => (
            <Chip
              key={index}
              label={person.name}
              variant="outlined"
              onDelete={() => {
                onDelete([person]);
              }}
            />
          ))}

          {!list.length && <EmptyStatus size={40} label="未选择人员" />}
          <div className="h-16"></div>
        </div>
      </Collapse>
    </div>
  );
}
