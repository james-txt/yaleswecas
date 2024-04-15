import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import Home from '../src/components/Home';
import { test } from 'vitest';

test('renders Home component', async () => {
  render(
    <Router>
      <Home />
    </Router>
  );
});
