import { TemperatureDisplay } from '@/components/TemperatureDisplay/TemperatureDisplay';
import { getWeather } from './fetch-weather';
import { MinMaxTemperatureWidget } from '@/components/MinMaxTemperatureWidget/MinMaxTemperatureWidget';
import { MainWidgetWrapper } from '@/components/MainWidgetWrapper/MainWidgetWrapper';
import { WeatherDetailsWrapper } from '@/components/WeatherDetailsWrapper/WeatherDetailsWrapper';
import { WeatherDetail } from '@/components/WeatherDetail/WeatherDetail';
import { TimeWidget } from '@/components/TimeWidget/TimeWidget';
import { Metadata } from 'next';
import Image from 'next/image';
import { CSSProperties } from 'react';

const locationStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const weather = await getWeather(city);

  return {
    title: `Weather in ${city} - ${weather.current.condition.text}`,
    description: `The current temperature in ${city} is ${weather.current.temp_c}°C with ${weather.current.condition.text.toLowerCase()}.`,
    openGraph: {
      title: `Weather in ${city}`,
      description: `It's currently ${weather.current.temp_c}°C and ${weather.current.condition.text.toLowerCase()} in ${city}.`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { city } = await params;

  const data = await getWeather(city);

  const { location, forecast, current } = data;

  const timeWidgetData = location.localtime ? new Date(location.localtime) : null;

  const background = current.condition.background;

  return (
    <MainWidgetWrapper background={background}>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '230px',
        }}
      >
        <section style={locationStyles}>
          <Image src="/icons/Pin.png" alt="location" width={28} height={32} />
          {location.name}, {location.country}
        </section>
        <TemperatureDisplay temperature={current.temp_c} textSize="large" />
        <MinMaxTemperatureWidget
          min={forecast.forecastday.mintemp_c}
          max={forecast.forecastday.maxtemp_c}
        />
      </section>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '240px',
        }}
      >
        <TimeWidget localtime={timeWidgetData} />
        <WeatherDetailsWrapper>
          <WeatherDetail text={current.condition.text} iconSrc={current.condition.icon} />
          <WeatherDetail
            text={`${forecast.forecastday.daily_chance_of_rain}%`}
            iconSrc={'/icons/Rainy.png'}
          />
          <WeatherDetail
            text={`${forecast.forecastday.daily_chance_of_snow}%`}
            iconSrc={'/icons/Snowy.png'}
          />
          <WeatherDetail text={`${current.humidity}%`} iconSrc={'/icons/Humidity.png'} />
          <WeatherDetail text={`${current.wind_kph} km/h`} iconSrc={'/icons/Wind.png'} />
        </WeatherDetailsWrapper>
      </section>
    </MainWidgetWrapper>
  );
}
