/**
 * @ Create Time: 2022-07-08 15:28:49
 * @ Modified time: 2022-07-08 18:27:17
 * @ Description:  公司路径
 */
import { useMemo } from 'react';

import CurFilePath from '../MoveFile/CurFilePath';

export default function CompPath(props: {
  isSearch: boolean;
  compPath: SelPersonItemType[];
  onClikCompPath: (path: SelPersonItemType) => void;
}) {
  const { isSearch, compPath = [], onClikCompPath } = props;

  const fComppath = useMemo(() => {
    if (isSearch) {
      // 如果是搜索，则只显示根路径
      const rootPath = compPath[0];
      if (rootPath) {
        return [{ ...rootPath, label: rootPath.name }];
      } else {
        return [];
      }
    }
    return compPath.map((path) => ({ ...path, label: path.name }));
  }, [compPath]);

  return (
    <div className="pt-2 pr-2 pl-4">
      <CurFilePath curFilePath={fComppath} onClick={onClikCompPath} />
    </div>
  );
}
