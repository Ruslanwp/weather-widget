import { FunctionComponent } from 'react';

type TimeWidgetProps = {
  localtime: Date | null;
};

export const TimeWidget: FunctionComponent<TimeWidgetProps> = ({ localtime }) => {
  if (localtime === null) {
    return <section>--:--</section>;
  }

  const currentTime = localtime.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return <section>{currentTime}</section>;
};
