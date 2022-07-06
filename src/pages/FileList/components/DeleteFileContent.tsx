/**
 * @ Create Time: 2022-07-06 15:27:26
 * @ Modified time: 2022-07-06 15:28:17
 * @ Description:  删除时，删除的文件列表
 */
import { Divider } from '@mui/material';

export default function DeleteFileContent(props: { files: FileInfo[] }) {
  const { files } = props;
  return (
    <div>
      确定删除以下文件？
      <Divider />
      <div className="pt-2 flex flex-col gap-1 flex-wrap text-sm">
        {files.map((file) => (
          <div key={file.id} className="flex gap-2 items-center">
            <img src={file.thumb} className="w-4 h-4 object-cover " />
            {file.fileName}
          </div>
        ))}
      </div>
    </div>
  );
}
