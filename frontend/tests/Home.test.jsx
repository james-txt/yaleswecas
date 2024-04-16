import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import Home from '../src/components/Home';
import { test, expect, beforeEach, afterEach } from 'vitest';
import Pretender from 'pretender';
import getDataFromServer from '../src/services/helper.jsx'

const IDS = {
    idlist: ['38616118', '38616114', '38616103', '38616102', '38616095', '38616067', '38616063', '38616056', '38616055', '38616046']
};

let server;
  beforeEach(() => {
    server = new Pretender();
  })

  afterEach(() =>{
    server.shutdown ()
    server = null 
  })

test('renders Home component and fetches first 10 IDs', async () => {
  server.get('/get_ids', () => {
    return [200, { "Content-Type": "application/json" }, JSON.stringify(IDS)];
  });

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  await waitFor(async () => {
    const data = await getDataFromServer('/get_ids');
    expect(data).toEqual(IDS);
  })

  const idlist = await screen.findByTestId('idlist');
  expect(idlist).toBeTruthy();
});
