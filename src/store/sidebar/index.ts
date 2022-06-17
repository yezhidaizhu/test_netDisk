import { atom, useRecoilState } from 'recoil';

import { recoilPersist } from 'recoil-persist';

import type { Actions } from './types';

const { persistAtom } = recoilPersist();

const sidebarIsOpenState = atom<boolean>({
  key: 'sidebar-openness-state',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

function useSidebar(): [boolean, Actions] {
  const [isOpen, setIsOpen] = useRecoilState(sidebarIsOpenState);

  function toggle() {
    setIsOpen((isOpen: boolean) => !isOpen);
  }

  function close() {
    setIsOpen(false);
  }

  function open() {
    setIsOpen(true);
  }

  return [isOpen, { toggle, close, open }];
}

export default useSidebar;
