import { useEffect, useState } from 'react';

export default function useShareFilePath(opts?: { rootPath?: ShareFilePathItemType }) {
  const { rootPath } = opts || {};

  const [shareFilePath, setShareFilePath] = useState<ShareFilePathItemType[]>([]);

  const addFilePath = (file: ShareFileInfo) => {
    const { id, fileName } = file;
    const pathItem = { id, label: fileName };

    setShareFilePath((paths) => {
      const lastPath = paths[paths.length - 1];
      if (lastPath.id === pathItem.id) return paths;
      return [...paths, pathItem];
    });
  };

  const arrivePath = (pathItem: ShareFilePathItemType) => {
    const targetPathIndex = shareFilePath.findIndex((path) => path.id === pathItem.id);
    if (targetPathIndex === -1) return;
    const newPath = [...shareFilePath].splice(0, targetPathIndex + 1);
    setShareFilePath(newPath);
  };

  const refreshPath = () => {
    setShareFilePath([...shareFilePath]);
  };

  useEffect(() => {
    if (rootPath) {
      setShareFilePath([rootPath]);
    }
  }, []);

  return {
    shareFilePath,
    addFilePath,
    arrivePath,
    refreshPath,
  };
}
