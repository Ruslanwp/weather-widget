import { z } from 'zod';

enum WeatherCondition {
  Sunny = 'Sunny',
  Clear = 'Clear',
  Cloudy = 'Cloudy',
  Overcast = 'Overcast',
  'Partly cloudy' = 'Partly cloudy',
  Rain = 'Rain',
  Snow = 'Snow',
  Fog = 'Fog',
  Mist = 'Mist',
  'Patchy light rain in area with thunder' = 'Patchy light rain in area with thunder',
  'Patchy rain nearby' = 'Patchy rain nearby',
}

export const weatherForecastSchema = z.object({
  location: z.object({
    name: z.string(),
    country: z.string(),
    localtime: z.string().transform((value) => {
      const date = new Date(value);

      if (isNaN(date.getTime())) {
        return null;
      }

      return value;
    }),
  }),
  current: z.object({
    temp_c: z.number(),
    condition: z
      .object({
        text: z.nativeEnum(WeatherCondition),
        icon: z.string(),
      })
      .transform((data) => ({
        ...data,
        background: backgroundImages[data.text] || '/images/Default.png',
      })),
    humidity: z.number(),
    wind_kph: z.number(),
    wind_dir: z.string(),
  }),
  forecast: z.object({
    forecastday: z
      .array(
        z.object({
          day: z.object({
            maxtemp_c: z.number(),
            mintemp_c: z.number(),
            daily_chance_of_rain: z.number(),
            daily_chance_of_snow: z.number(),
          }),
        }),
      )
      .refine((arr) => arr.length === 1, {
        message: 'Expected exactly one forecast day',
      })
      .transform((arr) => arr[0].day),
  }),
});

export type WeatherForecast = z.infer<typeof weatherForecastSchema>;

const backgroundImages: Record<WeatherCondition, `/${string}/${string}.${'png' | 'jpg'}`> = {
  [WeatherCondition.Sunny]: '/images/sunny.png',
  [WeatherCondition.Clear]: '/images/clear.jpg',
  [WeatherCondition.Cloudy]: '/images/clouds.jpg',
  [WeatherCondition.Overcast]: '/images/overcast.jpg',
  [WeatherCondition['Partly cloudy']]: '/images/partly-cloudy.jpg',
  [WeatherCondition.Rain]: '/images/rain.jpg',
  [WeatherCondition.Snow]: '/images/snowy.jpg',
  [WeatherCondition.Fog]: '/images/fog.jpg',
  [WeatherCondition.Mist]: '/images/mist.jpg',
  [WeatherCondition['Patchy light rain in area with thunder']]: '/images/thunderstorm.jpg',
  [WeatherCondition['Patchy rain nearby']]: '/images/thunderstorm.jpg',
};
