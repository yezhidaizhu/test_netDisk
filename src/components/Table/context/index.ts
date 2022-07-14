import { createContext } from 'react';

// header columns
export const ColumnsContext = createContext<DTHeaderCell[]>([]);

// data-id
export const DataIdFieldContext = createContext<string>('id');

// contextMenu
export const ContextMenuAnchorPoint = createContext<ContextMenuAnchorPoint>({
  anchorPoint: { x: 0, y: 0 },
  setAnchorPoint: (point: AnchorPoint) => {},
  menuProps: {},
  toggleMenu: (open?: boolean) => {},
  tempData: { id: undefined, ids: [] }, // 临时数据 (要传递右键当前选择的数据)
  setTempData: (data: ContextMenuTempSelData) => {}, // 临时数据 (要传递右键当前选择的数据)
  onBeforeOpenContextMenu: (data: ContextMenuTempSelData) => {},
});

// data selected
export const DataIdSelectedContext = createContext<DataIdSelectedContextType>({
  dataIdSelected: [],
  checkable: false,
  showCheckbox: false,
  addDataId: (id: DataIdType[]) => {},
  rmDataId: (id: DataIdType[]) => {},
  uqDataId: (id: DataIdType) => {},
  clearDataIdSelected: () => {},
});
