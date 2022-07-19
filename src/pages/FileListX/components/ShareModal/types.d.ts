type SelPersonItemType = {
  id: number;
  name: string;
  type: 'emp' | 'dpt' | 'cmp';
  jobName?: string;
  avatarHash?: string;
  [props: string]: any;
};
