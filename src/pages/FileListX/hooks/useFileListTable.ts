/**
 * @ Create Time: 2022-07-14 16:14:43
 * @ Modified time: 2022-07-14 16:27:26
 * @ Description:  表格中的操作
 */
import useDiskFiles from '../store/useDiskFiles';
import useFilePath from '../store/useFilePath';

export default function useFileListTable() {
  const { addPath } = useFilePath();
  const { getFileDataById } = useDiskFiles();

  const onRowDoubleClick = (id: any) => {
    const curFile = getFileDataById(id);
    if (!curFile) return;

    const { id: folderId, fileName: label } = curFile;
    addPath({ folderId, label });
  };

  return {
    onRowDoubleClick,
  };
}
