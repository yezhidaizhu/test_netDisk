import { Breadcrumbs } from '@mui/material';

// 当前文件路劲
export default function CurFilePath(props: { curFilePath: any[]; onClick: any }) {
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
      cursor-pointer
    ${
      isLast
        ? 'text-gray-900 dark:text-gray-100 font-bold'
        : `text-gray-800 dark:text-inherit opacity-90 
           hover:underline hover:opacity-90 active:opacity-100`
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
