import React from 'react';

import { render } from '@testing-library/react';

import NotFoundPage from '@pages/NotFoundPage';

test('NotFoundPage', () => {
  const { container } = render(<NotFoundPage />);

  expect(container).toHaveTextContent('404 Not Found');
});
