import { render } from '@testing-library/react';
import Home from './page';

describe('page', () => {
  test('renders', () => {
    render(<Home />);
  });
});
