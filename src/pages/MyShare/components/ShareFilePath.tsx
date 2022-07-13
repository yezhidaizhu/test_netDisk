/**
 * @ Create Time: 2022-07-13 16:36:56
 * @ Modified time: 2022-07-13 16:37:52
 * @ Description:  最上面的路径
 */
import { Breadcrumbs } from '@mui/material';

import { BreadItem } from '@/pages/FileList/components/FilePath/BreadItem';

export default function ShareFilePath(props: {
  paths: ShareFilePathItemType[];
  arrivePath: (pathItem: ShareFilePathItemType) => void;
}) {
  const { paths = [], arrivePath } = props;
  return (
    <div className="py-4 pt-6">
      <Breadcrumbs>
        {paths.map((path, index) => {
          const { id, label } = path;
          return (
            <BreadItem
              key={id}
              label={label}
              isLast={index === paths.length - 1}
              onClick={() => {
                arrivePath(path);
              }}
            />
          );
        })}
      </Breadcrumbs>
      {/* <span className=" text-xl font-bold ">{title}</span> */}
    </div>
  );
}
