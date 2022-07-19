import routes from '@/routes';
import { Pages } from '@/routes/types';
import { fsize } from '@/utils/helper';

import { FileName } from './table/TBody';

export const DragUploadBoxId = 'fileListBox';

export const title = routes[Pages.FileList].title;

export const shareColumns = [
  {
    field: 'fileName',
    headerName: '文件名',
    render: (fileName: string, rowData: FileInfo) => {
      const { thumb } = rowData;
      return <FileName name={fileName} thumb={thumb} />;
    },
  },
  {
    field: 'modifyTime',
    headerName: '分享时间',
    width: 200,
  },
  {
    field: 'size',
    headerName: '文件大小',
    width: 150,
    render: (value: any, rowData: FileInfo) => {
      const { isFolder } = rowData;
      const size = !isFolder ? fsize(value) : '';
      return size;
    },
  },
];
