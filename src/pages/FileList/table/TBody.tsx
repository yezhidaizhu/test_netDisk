import { useCallback } from 'react';

import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';

import dayjs from 'dayjs';
import filesize from 'filesize';

import imgIcon from '@/utils/fileIcon/icons/image.svg';

import TableRowsRightContextMenu from '../components/TableRowsRightContextMenu';
import useFileContextMenu from '../store/useFileContextMenu';

// 文件大小
const fsize = filesize.partial({ base: 2, standard: 'jedec' });

export default function TBody(props: {
  data: FileInfo[];
  selected: string[];
  onRowClick: (id: string) => void;
  onCheckBoxClick: (e: any, id: string) => void;
}) {
  const { data = [], selected = [], onRowClick = () => {}, onCheckBoxClick = () => {} } = props;

  const { contextMenu, closeContextMenu, setCurRightSelFile, openContextMenu } =
    useFileContextMenu();

  const isSelected = useCallback(
    (id: string) => {
      return selected.findIndex((_id) => _id === id) !== -1;
    },
    [selected],
  );

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
          const { id, fileName, modifyTime, size } = fileItem;
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
                console.log('row onDoubleClick');
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
                <FileName name={fileName} />
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
function FileName(props: { name: string }) {
  const { name } = props;
  return (
    <div className="flex items-center gap-2 cursor-pointer select-none">
      <img src={imgIcon} className=" w-8 " />
      {name}
    </div>
  );
}

// 修改日期/文件大小 文字样式
function SecLabel(props: { label: string }) {
  return <span className="opacity-60 text-sm hover:opacity-100 cursor-pointer">{props.label}</span>;
}
