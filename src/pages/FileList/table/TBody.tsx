import { useCallback, useEffect } from 'react';

import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';

import dayjs from 'dayjs';
import filesize from 'filesize';

import FileIcon from '@/components/FileIcon';

import TableRowsRightContextMenu from '../components/TableRowsRightContextMenu';
import useFileContextMenu from '../store/useFileContextMenu';

// 文件大小
const fsize = filesize.partial({ base: 2, standard: 'jedec' });

export default function TBody(props: {
  data: FileInfo[];
  selected: number[];
  onRowClick: (id: number) => void;
  onCheckBoxClick: (e: any, id: number) => void;
  onRowDoubleClick: (item: FileInfo) => void;
}) {
  const {
    data = [],
    selected = [],
    onRowClick = () => {},
    onCheckBoxClick = () => {},
    onRowDoubleClick = () => {},
  } = props;

  const { contextMenu, closeContextMenu, setCurRightSelFile, openContextMenu } =
    useFileContextMenu();

  const isSelected = useCallback(
    (id: number) => {
      return selected.findIndex((_id) => _id === id) !== -1;
    },
    [selected],
  );

  useEffect(() => {
    !contextMenu && setCurRightSelFile(null);
  }, [contextMenu]);

  return (
    <>
      <TableBody
        onContextMenu={(e) => {
          e.stopPropagation();
          e.preventDefault();
          openContextMenu(e);
        }}
      >
        {data.map((fileItem) => {
          const { id, fileName, modifyTime, size, isFolder, thumb } = fileItem;
          const isItemSel = isSelected(id);

          return (
            <TableRow
              key={id}
              hover
              selected={isItemSel}
              onClick={() => {
                onRowClick(id);
              }}
              onDoubleClick={() => {
                if (isFolder) {
                  onRowDoubleClick(fileItem);
                }
              }}
              onContextMenu={() => {
                setCurRightSelFile(fileItem);
              }}
            >
              <TableCell
                padding="none"
                width={10}
                onClick={(e) => {
                  onCheckBoxClick(e, id);
                }}
              >
                <Checkbox color="primary" checked={isItemSel} size="small" />
              </TableCell>
              <TableCell>
                <FileName name={fileName} thumb={thumb} />
              </TableCell>
              <TableCell>
                <SecLabel label={dayjs(modifyTime).format('YYYY/MM/DD hh:mm')} />
              </TableCell>
              <TableCell>
                <SecLabel label={fsize(size)} />
              </TableCell>
            </TableRow>
          );
        })}

        <TableRowsRightContextMenu contextMenu={contextMenu} handleClose={closeContextMenu} />
      </TableBody>
    </>
  );
}

// 文件名
function FileName(props: { name: string; thumb?: string }) {
  const { name, thumb } = props;
  return (
    <div className="flex items-center gap-2 cursor-pointer select-none">
      {thumb ? <img src={thumb} className="w-8 h-8 object-cover " /> : <FileIcon fileName={name} />}
      <div className="truncate flex-1 w-0">{name}</div>
    </div>
  );
}

// 修改日期/文件大小 文字样式
function SecLabel(props: { label: string }) {
  return (
    <span className="opacity-60 truncate text-sm hover:opacity-100 cursor-pointer">
      {props.label}
    </span>
  );
}
