import useSidebar from '@/store/sidebar';

import styles from './styles.module.scss';

export default function ControlBar() {
  const [isSidebarOpen, sidebarActions] = useSidebar();

  return (
    <div className={styles.cBox}>
      <div className={styles.itemBox} onClick={sidebarActions.toggle}>
        <div className={styles.item}>
          <div className={`translate-y-1 ${!isSidebarOpen ? styles.topen : styles.tclose}`}></div>
          <div className={`-translate-y-1 ${!isSidebarOpen ? styles.dopen : styles.dclose}`}></div>
        </div>
      </div>
    </div>
  );
}
