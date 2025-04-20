import { FunctionComponent } from 'react';
import { TemperatureDisplay } from '../TemperatureDisplay/TemperatureDisplay';

import styles from './MinMaxTemperatureWidget.module.css';
import { ShadowEffectWrapper } from '../ShadowEffectWrapper/ShadowEffectWrapper';
import Image from 'next/image';

type TemperatureWidgetProps = {
  max: number;
  min: number;
};

export const MinMaxTemperatureWidget: FunctionComponent<TemperatureWidgetProps> = ({
  max,
  min,
}) => {
  return (
    <ShadowEffectWrapper>
      <section className={styles['widgets-wrapper']}>
        <section className={styles['widget-wrapper']}>
          <Image src="/icons/ArrowUp.png" alt="icon" width={16} height={16} />
          <TemperatureDisplay temperature={max} />
        </section>
        <section className={styles['widget-wrapper']}>
          <Image src="/icons/ArrowDown.png" alt="icon" width={16} height={16} />
          <TemperatureDisplay temperature={min} />
        </section>
      </section>
    </ShadowEffectWrapper>
  );
};
