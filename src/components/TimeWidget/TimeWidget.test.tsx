import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, afterEach } from 'vitest';
import { TimeWidget } from './TimeWidget';
import assert from 'node:assert/strict';

afterEach(cleanup);

describe('TimeWidget', () => {
  it('renders PM time correctly from localtime in format YYYY-MM-DD HH:mm', () => {
    render(<TimeWidget localtime={new Date('2025-04-12 16:45')} />);

    const element = screen.getByText(/4:45 PM/i);
    assert.ok(element);
  });

  it('renders AM time correctly from localtime in format YYYY-MM-DD HH:mm', () => {
    render(<TimeWidget localtime={new Date('2025-04-12 04:45')} />);

    const element = screen.getByText(/4:45 AM/i);
    assert.ok(element);
  });

  it('shows `--:--` fallback message when localtime is `null`', () => {
    render(<TimeWidget localtime={null} />);

    const element = screen.getByText('--:--');
    assert.ok(element);
  });
});
