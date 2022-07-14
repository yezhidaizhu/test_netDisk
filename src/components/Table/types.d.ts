type DTHeaderCell = {
  headerName: string;
  field: string;
  width?: number;
  hidden?: boolean;
  render?: (value: any, rowData: any) => any;
};

type TableData = {
  [props: string]: any;
};

type DataIdType = number | string;

/**
 * ContextMenu
 */
type AnchorPoint = {
  x: number;
  y: number;
};

type ContextMenuAnchorPoint = {
  anchorPoint: AnchorPoint;
  setAnchorPoint: (point: AnchorPoint) => void;
  menuProps: any;
  toggleMenu: (open?: boolean) => void;

  tempData: { id: DataIdType | undefined; ids: DataIdType[] };
  setTempData: (data: ContextMenuTempSelData) => void;
  onBeforeOpenContextMenu?: (data: ContextMenuTempSelData) => void | boolean;
};

type ContextMenuItem = {
  label?: any;
  Icon?: any;
  children?: any;
  onClick?: (data: { id: DataIdType | undefined; ids: DataIdType[] }) => void;
  divider?: boolean;
  [x: string]: any;
};

type ContextMenuTempSelData = {
  id: DataIdType | undefined;
  ids: DataIdType[];
};

// Context
type DataIdSelectedContextType = {
  dataIdSelected: DataIdType[];
  checkable: boolean;
  showCheckbox: boolean;
  addDataId: (id: DataIdType[]) => void;
  rmDataId: (id: DataIdType[]) => void;
  uqDataId: (id: DataIdType) => void;
  clearDataIdSelected: () => void;
};
