import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './WeatherDetailsWrapper.module.css';
import { ShadowEffectWrapper } from '../ShadowEffectWrapper/ShadowEffectWrapper';

export const WeatherDetailsWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <ShadowEffectWrapper>
      <section className={styles.wrapper}>{children}</section>
    </ShadowEffectWrapper>
  );
};
