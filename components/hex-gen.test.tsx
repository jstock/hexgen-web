import { render, screen } from '@testing-library/react';
import { HexGen } from './hex-gen';
import { act } from 'react';
import userEvent from '@testing-library/user-event';

describe('hex-gen', () => {
  test('renders', () => {
    render(<HexGen />);
  });

  test('defaults to #000000 and #ffffff', () => {
    render(<HexGen />);

    const startColor = screen.getByLabelText('#000000');
    const endColor = screen.getByLabelText('#ffffff');

    expect(startColor).not.toBeNull();
    expect(endColor).not.toBeNull();
  });

  test('handles copying card hex to clipboard', async () => {
    const user = userEvent.setup();
    render(<HexGen />);

    const card = screen.getByRole('button', {
      description: 'copy #000000 to clipboard',
    });

    await user.click(card);

    const clipboardText = await navigator.clipboard.readText();

    expect(clipboardText).toBe('#000000');
  });

  test('handles color randomization', () => {
    render(<HexGen />);

    const randomize = screen.getByRole('button', { name: 'Randomize' });

    act(() => {
      randomize.click();
    });
  });

  test('handles include alpha toggle', () => {
    render(<HexGen />);

    const includeAlpha = screen.getByRole('switch', { name: 'Include Alpha' });

    expect(includeAlpha).toHaveAttribute('aria-checked', 'false');

    act(() => {
      includeAlpha.click();
    });

    expect(includeAlpha).toHaveAttribute('aria-checked', 'true');

    act(() => {
      includeAlpha.click();
    });

    expect(includeAlpha).toHaveAttribute('aria-checked', 'false');
  });

  test('handles changing start color', async () => {
    const user = userEvent.setup();
    render(<HexGen />);

    const start = screen.getByLabelText('Start');

    await user.type(start, '#abcdef');
  });

  test('handles changing end color', async () => {
    const user = userEvent.setup();
    render(<HexGen />);

    const end = screen.getByLabelText('End');

    await user.type(end, '#abcdef');
  });
});
