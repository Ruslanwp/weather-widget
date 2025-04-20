import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './ShadowEffectWrapper.module.css';

export const ShadowEffectWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <section className={styles.wrapper}>{children}</section>;
};
