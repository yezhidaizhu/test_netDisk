import { useEffect, useRef, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ListItemIcon } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

import useFilePath, { netDiskType } from '../../store/useFilePath';

export default function HomeBreadItem() {
  const { isMineNetDisk, setDiskType, arrivePath } = useFilePath();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedType, setSelectedType] = useState(0);

  const options = [netDiskType.Mine, netDiskType.Common];

  const handleClick = () => {
    arrivePath();
    console.info(`You clicked ${options[selectedType]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedType(index);

    const isMine = index === 0;
    setDiskType(isMine);

    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const CurIcon = options[selectedType].Icon;

  useEffect(() => {
    setSelectedType(isMineNetDisk ? 0 : 1);
  }, []);

  return (
    <>
      <div className=" rounded-xl overflow-hidden border-blue-300 dark:border-gray-700 border ">
        <ButtonGroup variant="text" size="small" ref={anchorRef}>
          <Button onClick={handleClick}>
            <div className="flex items-center gap-2 px-2">
              <CurIcon fontSize="small" />

              <span className="font-semibold text-lg">{options[selectedType].label}</span>
            </div>
          </Button>
          <Button onClick={handleToggle}>
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className="z-10"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      selected={index === selectedType}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      <ListItemIcon>
                        <option.Icon fontSize="small" />
                      </ListItemIcon>
                      {option.label}云盘
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
