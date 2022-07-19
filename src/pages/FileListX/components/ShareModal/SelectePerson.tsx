import { useMemo } from 'react';

import { Apartment, KeyboardArrowRight, PermContactCalendar } from '@mui/icons-material';
import { Divider, Fade } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import EmptyStatus from '@/components/EmptyStatus';
import { Loader } from '@/components/Loader';

export default function CheckboxListSecondary(props: {
  selectedList: SelPersonItemType[];
  loading?: boolean;
  personList?: SelPersonItemType[];
  onClickDpt?: (clickItem: SelPersonItemType) => void;
  addPerson?: (list: SelPersonItemType[]) => void;
  deletePerson?: (delList: SelPersonItemType[]) => void;
}) {
  const {
    selectedList = [],
    personList = [],
    loading,
    addPerson,
    deletePerson,
    onClickDpt,
  } = props;

  const empList = useMemo(() => {
    return personList.filter((p) => p.type === 'emp');
  }, [personList]);

  const hasNoEmpSel = useMemo(() => !empList.length, [empList]);

  const isSelAll = useMemo(() => {
    return !!(!empList.find((p) => !selectedList.find((sp) => sp.id === p.id)) && empList.length);
  }, [selectedList, empList]);

  const handleToggle = (person: SelPersonItemType) => () => {
    const currentIndex = selectedList.findIndex((p) => p.id === person.id);

    if (currentIndex === -1) {
      addPerson?.([person]);
    } else {
      deletePerson?.([person]);
    }
  };

  const onSelAll = () => {
    if (hasNoEmpSel) return;
    isSelAll ? deletePerson?.(empList) : addPerson?.(empList);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden overflow-y-auto pt-2 pl-4">
      <ListItem
        dense
        secondaryAction={<Checkbox checked={isSelAll} disabled={hasNoEmpSel} />}
        disablePadding
        onClick={onSelAll}
      >
        <ListItemButton>
          <ListItemText primary={'全选'} />
        </ListItemButton>
      </ListItem>
      <Divider />

      {!personList.length && !loading && <EmptyStatus label="列表暂无人员" className={'flex-1'} />}

      {loading && (
        <div className="flex-1 flex justify-center items-center ">
          <Loader size={40} loading={loading} />
        </div>
      )}

      <div className={`flex-1 overflow-hidden overflow-y-auto ${loading ? 'hidden' : ''}`}>
        <Fade in={!loading}>
          <List>
            {personList.map((person) => {
              const { id, name, type } = person;
              const isCked = Boolean(selectedList.find((p) => p.id === id));
              const isEmp = type === 'emp';
              const action = isEmp ? <Checkbox checked={isCked} /> : <KeyboardArrowRight />;

              const onClick = () => {
                isEmp ? handleToggle(person)() : onClickDpt?.(person);
              };

              return (
                <ListItem key={id} secondaryAction={action} disablePadding onClick={onClick}>
                  <ListItemButton>
                    <ListItemAvatar>
                      <PersonAvatar person={person} />
                    </ListItemAvatar>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Fade>
        <div className="h-16"></div>
      </div>
    </div>
  );
}

function PersonAvatar(props: { person: SelPersonItemType }) {
  const { person } = props;
  const { id, name = '', type = '', avatarHash = '' } = person;
  const isDpt = type === 'dpt';
  const isCmp = type === 'cmp';

  const dptAvatar = useMemo(() => {
    if (isCmp) return <Apartment />;
    if (isDpt) return <PermContactCalendar />;
    return [...name]?.[0] || undefined;
  }, [id]);

  const bgColor = useMemo(() => {
    return isCmp ? '#3B82F6' : isDpt ? '#FBBF24' : '#10B981';
  }, [id]);

  const imgSrc = useMemo(() => {
    return avatarHash
      ? `${window.EAP}/Service/WxGetFile?hash=${avatarHash}&imgSize=small`
      : undefined;
  }, [id]);

  return (
    <Avatar
      alt={name}
      src={imgSrc}
      sx={{ width: 36, height: 36, background: bgColor, color: '#fff' }}
    >
      {dptAvatar}
    </Avatar>
  );
}
