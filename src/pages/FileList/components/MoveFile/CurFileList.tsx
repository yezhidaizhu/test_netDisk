import { MenuItem, MenuList } from '@mui/material';

import EmptyStatus from '@/components/EmptyStatus';

// 文件列表
export default function CurFileList(props: {
  fileList: FileInfo[];
  onClick: any;
  moveFileListIds: number[]; // 需要移动的文件列表，将会进行 disable
}) {
  const { fileList, onClick, moveFileListIds = [] } = props;
  return (
    <MenuList>
      {fileList.map((file) => {
        const { fileName, id, isFolder, thumb } = file;

        return (
          <MenuItem
            disabled={!isFolder || moveFileListIds.includes(id)}
            key={id}
            onClick={() => {
              onClick(file);
            }}
          >
            <div className="flex items-center gap-2">
              <img src={thumb} className="w-4" />

              {fileName}
            </div>
          </MenuItem>
        );
      })}

      {!fileList.length && (
        <div className="flex flex-col gap-4 pt-6 justify-center items-center ">
          <EmptyStatus />
          <span className="text-gray-400 ">文件夹为空</span>
        </div>
      )}
    </MenuList>
  );
}
