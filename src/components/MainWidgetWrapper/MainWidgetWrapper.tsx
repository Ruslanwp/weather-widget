import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './MainWidgetWrapper.module.css';

type MainWidgetWrapperProps = {
  background: string;
} & PropsWithChildren;

export const MainWidgetWrapper: FunctionComponent<MainWidgetWrapperProps> = ({
  children,
  background,
}) => {
  return (
    <section
      style={{
        backgroundImage: `url('${background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className={styles.container}
    >
      {children}
    </section>
  );
};
