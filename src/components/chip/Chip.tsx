import styles from "./Chip.module.scss";
import type { ChipProps } from "./Chip.type";

export const Chip: React.FC<ChipProps> = ({ item, onRemove }) => {
  return (
    <div className={styles.chip}>
      {item.label}
      <span className={styles.remove} onClick={() => onRemove(item.id)}>
        ×
      </span>
    </div>
  );
};
