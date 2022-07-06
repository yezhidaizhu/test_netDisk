/**
 * @ Create Time: 2022-06-20 11:20:28
 * @ Modified time: 2022-07-06 09:09:55
 * @ Description:  移动文件
 */
import { useState } from 'react';

import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grow,
  MenuItem,
  MenuList,
} from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';

import useNoti from '@/hooks/useNoti';
import imgIcon from '@/utils/fileIcon/icons/image.svg';

import useAddActions from '../hooks/useAddActions';
import useFileOperation from '../hooks/useFileOperation';

// import { createDemoRow } from '../store/useDiskFiles';

const demoData: any[] = [];

const initPath = [
  {
    id: 'all',
    label: '全部文件',
  },
];

export default function MoveFile(props: DialogProps & {}) {
  const { ...dialogprops } = props;
  const { operations } = useFileOperation();
  const noti = useNoti();

  const { onNewFolder } = useAddActions();
  const [curFilePath, setCurFilePath] = useState<CurFilePathType[]>(initPath);

  const onCloseDialog = () => {
    const close = dialogprops.onClose;
    close?.({}, 'escapeKeyDown');
  };

  const _onConfirm = async () => {
    onCloseDialog();
  };

  const onFileClick = (file: FileInfo) => {
    const { fileName, id } = file;
    // 防止重复点击多次文件
    const lastFilePath = curFilePath[curFilePath.length - 1];
    if (lastFilePath && id === lastFilePath.id) {
      return;
    }

    setCurFilePath((p) => [...p, { id, label: fileName }]);
  };

  const onCurFilePathClick = (pathItem: CurFilePathType) => {
    const index = curFilePath.findIndex((path) => path.id === pathItem.id);
    if (index !== -1) {
      const newCurFilePath = [...curFilePath].splice(0, index + 1);
      console.log(newCurFilePath);

      setCurFilePath(newCurFilePath);
    }
  };

  const onCreatFolder = () => {
    onNewFolder({ filePath: curFilePath });
  };

  const { label, Icon } = operations.Move;

  return (
    <Dialog fullWidth TransitionComponent={Grow} {...dialogprops}>
      <DialogTitle>
        <div className="flex items-center gap-2 ">
          <Icon />
          {label}
        </div>
      </DialogTitle>

      {/* 文件路劲 */}
      <div className="px-4 p-2">
        <CurFilePath curFilePath={curFilePath} onClick={onCurFilePathClick} />
      </div>

      {/* 文件列表 */}
      <DialogContent sx={{ height: 400 }}>
        <CurFileList fileList={demoData} onClick={onFileClick} />
        <div className="h-16"></div>
      </DialogContent>

      {/* 操作 */}
      <div className="flex  justify-between p-4 gap-2 bg-gray-700 ">
        <Button onClick={onCreatFolder}>新建文件夹</Button>
        <div className="flex gap-4 ">
          <Button variant="outlined" onClick={onCloseDialog}>
            取消
          </Button>
          <Button onClick={_onConfirm} variant="contained">
            移动到此处
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

// 当前文件路劲
function CurFilePath(props: { curFilePath: any[]; onClick: any }) {
  const { curFilePath = [], onClick } = props;
  return (
    <Breadcrumbs separator="›">
      {curFilePath.map((path, index) => (
        <BreadcrumbItem
          key={index}
          pathItem={path}
          isLast={index === curFilePath.length - 1}
          onClick={onClick}
        />
      ))}
    </Breadcrumbs>
  );
}

// 文件列表
function CurFileList(props: { fileList: FileInfo[]; onClick: any }) {
  const { fileList, onClick } = props;
  return (
    <MenuList>
      {fileList.map((file, index) => {
        const { fileName, id } = file;
        return (
          <MenuItem
            disabled={index > 4}
            key={id}
            onClick={() => {
              onClick(file);
            }}
          >
            <div className="flex items-center gap-2">
              <img src={imgIcon} className="w-4" />
              {fileName}
            </div>
          </MenuItem>
        );
      })}
    </MenuList>
  );
}

function BreadcrumbItem(props: {
  pathItem: CurFilePathType;
  isLast?: boolean;
  onClick: any;
  [x: string]: any;
}) {
  const { pathItem, isLast, onClick, ...spanProps } = props;

  const { label } = pathItem;

  return (
    <span
      className={`
      text-sm
    ${
      isLast
        ? 'text-gray-100 cursor-pointer'
        : 'opacity-70 hover:underline hover:opacity-90 active:opacity-100 cursor-pointer'
    }
    `}
      onClick={() => {
        !isLast && onClick(pathItem);
      }}
      {...spanProps}
    >
      {label}
    </span>
  );
}

type CurFilePathType = { label: string; id: string };
