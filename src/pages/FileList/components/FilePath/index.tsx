/**
 * @ Create Time: 2022-06-13 17:08:23
 * @ Modified time: 2022-07-06 09:57:04
 * @ Description:  文件路径
 */
import { useMemo } from 'react';

import { Breadcrumbs } from '@mui/material';

import useFilePath, { netDiskType } from '../../store/useFilePath';
import { BreadItem } from './BreadItem';
import HomeBreadItem from './HomeBreadItem';

export default function FilePath() {
  const { filePath, arrivePath } = useFilePath();

  const filePathLen = useMemo(() => filePath.length, [filePath]);

  return (
    <Breadcrumbs separator="›">
      <HomeBreadItem />

      {filePath.map((link, index) => (
        <BreadItem
          key={index}
          label={link.label}
          isLast={index === filePathLen - 1}
          onClick={() => {
            arrivePath(link);
          }}
        />
      ))}
    </Breadcrumbs>
  );
}
