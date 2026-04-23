import { DropDownDirection } from '../../../types/ui';
import styles from './popup.module.scss';
export const mapDirectionClass: Record<DropDownDirection, string> = {
	'bottom left': styles.optionsBottomLeft,
	'bottom right': styles.optionsBottomRight,
	'top left': styles.optionsTopLeft,
	'top right': styles.optionsTopRight
};
