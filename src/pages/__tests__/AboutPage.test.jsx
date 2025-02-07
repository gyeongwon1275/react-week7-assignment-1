import React from 'react';

import { render } from '@testing-library/react';

import AboutPage from '@pages/AboutPage';

describe('AboutPage', () => {
  it('renders title', () => {
    const { container } = render(<AboutPage />);

    expect(container).toHaveTextContent('About 페이지');
  });
});
