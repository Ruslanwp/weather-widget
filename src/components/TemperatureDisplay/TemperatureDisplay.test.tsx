import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, afterEach } from 'vitest';
import { TemperatureDisplay } from './TemperatureDisplay';
import assert from 'node:assert/strict';

afterEach(cleanup);

describe('TemperatureDisplay', () => {
  it('renders the correct positive temperature and temperature-font-size-small by default', () => {
    render(<TemperatureDisplay temperature={20} />);

    const element = screen.getByText(/20°/i);

    assert.equal(element.className.includes('temperature-font-size-small'), true);
  });

  it('renders the correct positive temperature with large text size', () => {
    render(<TemperatureDisplay temperature={20} textSize="large" />);

    const element = screen.getByText(/20°/i);

    assert.equal(element.className.includes('temperature-font-size-large'), true);
  });

  it('renders the correct negative temperature and temperature-font-size-small by default', () => {
    render(<TemperatureDisplay temperature={-20} />);

    const element = screen.getByText(/-20°/i);

    assert.equal(element.className.includes('temperature-font-size-small'), true);
  });
});
