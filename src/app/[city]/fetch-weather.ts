import { redirect } from 'next/navigation';
import { WeatherForecast, weatherForecastSchema } from '@/lib/data/weather-forecast-schema';

export async function getWeather(city: string): Promise<WeatherForecast> {
  'use server';

  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=1&key=${apiKey}`,
      {
        next: { revalidate: 30 },
        cache: 'force-cache',
      },
    );

    if (!res.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await res.json();

    const parsed = weatherForecastSchema.safeParse(data);

    if (!parsed.success) {
      console.error('Weather API response validation failed', parsed.error);
      redirect('/bad-request');
    }

    return parsed.data;
  } catch (error) {
    console.error('getWeather error:', error);
    redirect('/bad-request');
  }
}
