import { FunctionComponent } from 'react';
import styles from './TemperatureDisplay.module.css';

type TemperatureDisplayProps = {
  temperature: number;
  textSize?: 'small' | 'large';
};

export const TemperatureDisplay: FunctionComponent<TemperatureDisplayProps> = ({
  temperature,
  textSize = 'small',
}) => {
  return (
    <section
      className={`${styles.temperature} ${textSize === 'small' ? styles['temperature-font-size-small'] : styles['temperature-font-size-large']}`}
    >
      {temperature}°
    </section>
  );
};
