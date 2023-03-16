import { render } from '@testing-library/react';

import ChatUI from './chat-ui';

describe('ChatUI', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatUI />);
    expect(baseElement).toBeTruthy();
  });
});
