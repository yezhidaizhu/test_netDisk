/**
 * @ Create Time: 2022-07-06 15:27:26
 * @ Modified time: 2022-07-07 16:06:36
 * @ Description:  删除时，删除的文件列表
 */
import { Divider } from '@mui/material';

export default function DeleteFileContent(props: { files: FileInfo[] }) {
  const { files } = props;
  return (
    <div>
      确定删除以下文件？
      <Divider />
      <TempFileList files={files} />
    </div>
  );
}

export function TempFileList(props: { files: FileInfo[]; className?: any }) {
  const { files = [], className = '' } = props;
  return (
    <div className={`pt-2 flex flex-col gap-1 flex-wrap text-sm ${className}`}>
      {files.map((file) => (
        <div key={file.id} className="flex gap-2 items-center">
          <img src={file.thumb} className="w-4 h-4 object-cover " />
          {file.fileName}
        </div>
      ))}
    </div>
  );
}
