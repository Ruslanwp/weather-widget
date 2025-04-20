import Image from 'next/image';
import { FunctionComponent } from 'react';
import styles from './WeatherDetail.module.css';

type WeatherDetailProps = {
  text: string;
  iconSrc: string;
};

export const WeatherDetail: FunctionComponent<WeatherDetailProps> = ({ text, iconSrc }) => {
  const iconPath = iconSrc.startsWith('//') ? `https:${iconSrc}` : iconSrc;

  return (
    <section className={styles.wrapper}>
      <Image src={iconPath} alt={text} width={32} height={32} />
      <p>{text}</p>
    </section>
  );
};
