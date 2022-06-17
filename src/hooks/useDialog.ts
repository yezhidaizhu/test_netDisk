import { useModal } from 'mui-modal-provider';

import CusDiglog from '@/components/Dialog';
import { CusDialogProps } from '@/components/Dialog/types';

export default function useDialog() {
  const { showModal } = useModal();

  const warning = (props: CusDialogProps) => {
    showModal(CusDiglog, props);
  };

  return {
    warning,
  };
}
