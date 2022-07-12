/**
 * @ Create Time: 2022-07-11 15:38:57
 * @ Modified time: 2022-07-12 11:01:48
 * @ Description:  表格数据
 */
import { Chip, TableBody, TableCell, TableRow } from '@mui/material';

import dayjs from 'dayjs';

import { FileName, SecLabel } from '@/pages/FileList/table/TBody';
import { fsize } from '@/utils/helper';

import { useContextMenu } from '../hooks/useContextMenu';
import ShareRightContextMenu from './ShareRightContextMenu';

export default function ShareTBody(props: {
  shareFileList: ShareFileInfo[];
  menuItems: ShareContextMenuItem[];
  isRootPath: boolean;
  addFilePath: (fileItem: ShareFileInfo) => void;
}) {
  const { shareFileList = [], menuItems = [], addFilePath, isRootPath } = props;
  const { rowData, contextMenu, setRowData, closeContextMenu, handleContextMenu } =
    useContextMenu();
  return (
    <TableBody
      onContextMenu={(e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isRootPath) {
          handleContextMenu(e);
        }
      }}
    >
      {shareFileList.map((file) => {
        const { id, fileName, thumb, modifyTime, size, isFolder, shareFrom = '' } = file;

        const shareToperson = shareFrom.split(',');
        return (
          <TableRow
            hover
            key={id}
            onDoubleClick={() => {
              if (isFolder) {
                addFilePath(file);
              }
            }}
            onContextMenu={() => {
              setRowData(file);
            }}
          >
            <TableCell>
              <FileName name={fileName} thumb={thumb} />
            </TableCell>

            {/* 分享对象 */}
            {isRootPath && (
              <TableCell size="small">
                <div className="flex flex-wrap place-self-start gap-1">
                  {shareToperson.map((person, index) => (
                    <Chip key={index} size="small" label={person} />
                  ))}
                </div>
              </TableCell>
            )}

            <TableCell size="small">
              <SecLabel label={dayjs(modifyTime).format('YYYY/MM/DD hh:mm')} />
            </TableCell>
            <TableCell size="small">{!isFolder && <SecLabel label={fsize(size)} />}</TableCell>
          </TableRow>
        );
      })}

      <ShareRightContextMenu
        contextMenu={contextMenu}
        menuItems={menuItems}
        handleClose={closeContextMenu}
        rowData={rowData}
      />
    </TableBody>
  );
}
