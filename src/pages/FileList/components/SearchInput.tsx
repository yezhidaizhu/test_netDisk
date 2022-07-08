/**
 * @ Create Time: 2022-07-06 16:36:53
 * @ Modified time: 2022-07-08 17:20:22
 * @ Description:  搜索
 */
import { useEffect, useRef } from 'react';

import { ManageSearch } from '@mui/icons-material';
import { Button, Collapse, Fade, InputAdornment, TextField } from '@mui/material';

import { useDebounceFn, useKeyPress } from 'ahooks';

import useFilePath from '../store/useFilePath';
import useSearch from '../store/useSearch';

export default function SearchInput() {
  const { refreshFilePath } = useFilePath();
  const { isOpenSearchFileList, closeSearch, searchValue, setValue } = useSearch();
  const inputRef = useRef<any>(null);

  const { run, cancel } = useDebounceFn(
    () => {
      refreshFilePath();
    },
    { trailing: true, wait: 500 },
  );

  // 按下回车确认
  useKeyPress('Enter', (e) => {
    if (!isOpenSearchFileList) return;
    e.stopPropagation();
    e.preventDefault();
    cancel();
    refreshFilePath();
  });

  // ESC 取消搜索
  useKeyPress('ESC', (e) => {
    if (!isOpenSearchFileList) return;
    e.stopPropagation();
    e.preventDefault();
    closeSearch();
  });

  const onChangeInput = (e: any) => {
    const value = e.target.value;
    setValue(value);
    run();
  };

  useEffect(() => {
    if (isOpenSearchFileList) {
      setTimeout(() => {
        inputRef.current?.focus();
      });
    } else {
      if (!searchValue) return;
      setValue('');
      cancel();
      setTimeout(() => {
        refreshFilePath();
      }, 200);
    }
  }, [isOpenSearchFileList]);

  return (
    <Collapse in={isOpenSearchFileList}>
      <Fade in={isOpenSearchFileList}>
        <div className="pt-6 pr-8 flex gap-4 items-center">
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

          <div className="flex gap-2">
            <Button onClick={closeSearch}>取消</Button>
          </div>
        </div>
      </Fade>
    </Collapse>
  );
}
