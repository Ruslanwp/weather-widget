import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, afterEach } from 'vitest';
import { WeatherDetail } from './WeatherDetail';
import assert from 'node:assert/strict';

afterEach(cleanup);

describe('WeatherDetail', () => {
  it('renders test that is passed to the `text` prop', () => {
    render(<WeatherDetail text="Humidity" iconSrc="/path/humidity" />);

    const element = screen.getByText(/Humidity/i);
    assert.ok(element);
  });

  it('renders an image with alt tag that is equal to passed `text` prop', () => {
    render(<WeatherDetail text="Fog" iconSrc="/path/Fog" />);

    const element = screen.getByText(/Fog/i);
    const image = element.previousElementSibling as HTMLImageElement;
    assert.equal(image.alt, 'Fog');
  });
});
