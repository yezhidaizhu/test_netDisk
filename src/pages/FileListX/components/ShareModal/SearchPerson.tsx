import { useEffect, useRef, useState } from 'react';

import { ManageSearch } from '@mui/icons-material';
import { Collapse, InputAdornment, TextField } from '@mui/material';

import { useDebounceFn, useKeyPress } from 'ahooks';

export default function SearchPerson(props: {
  open: boolean;
  autoDebounceSearch?: boolean;
  onSearch?: (value: string) => void;
  closeSearch?: () => void;
  onClose?: () => void;
}) {
  const { open, onSearch, onClose, autoDebounceSearch = true } = props;
  const [searchValue, setSearchValue] = useState('');

  const [openFlag, setOpenFlag] = useState(false); // 用于判断打开过

  const inputRef = useRef<any>();

  const { run, cancel } = useDebounceFn(
    () => {
      if (autoDebounceSearch) {
        onSearch?.(searchValue);
      }
    },
    { trailing: true, wait: 500 },
  );

  // 按下回车确认
  useKeyPress('Enter', (e) => {
    if (!open) return;
    e.stopPropagation();
    e.preventDefault();
    cancel();
    onSearch?.(searchValue);
  });

  const onChangeInput = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
    run();
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      });
    } else {
      setSearchValue('');
      cancel();
      if (openFlag) {
        setTimeout(() => {
          onClose?.();
        }, 200);
      }
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setOpenFlag(true);
    }
  }, [open]);

  return (
    <div>
      <Collapse in={open}>
        <div className="flex gap-2 py-4 px-4">
          <TextField
            inputRef={inputRef}
            value={searchValue}
            fullWidth
            label="搜索"
            placeholder="请输入搜索关键词"
            size="small"
            spellCheck={false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <ManageSearch />
                </InputAdornment>
              ),
            }}
            onChange={onChangeInput}
          />
        </div>
      </Collapse>
    </div>
  );
}
