import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Details from '../src/components/Details';
import { expect, test, beforeEach, afterEach } from 'vitest';
import Pretender from 'pretender';

const DETAILS = {
    uid: '38616118',
    title: "Response to: Author's reply to: Effect of adjuvant treatment on survival in 2023 FIGO stage IIC endometrial cancer.",
    authors: ['Akgor U', 'Ozgul N', 'Ayhan A'],
    pubdate: '2024 Apr 11'
};

let server;
  beforeEach(() => {
    server = new Pretender();
  })

  afterEach(() =>{
    server.shutdown ()
    server = null 
  })

test('renders Details component and fetches data from uid', async () => {
  let requestBody;
  server.post('/get_details', request => {
    requestBody = JSON.parse(request.requestBody);
    return [200, { "Content-Type": "application/json" }, JSON.stringify(DETAILS)];
  });

  render(
    <MemoryRouter initialEntries={["/123"]}>
      <Routes>
        <Route path=":id" element={<Details />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(requestBody).toEqual({ target_id:'123', fields: [ 'uid', 'title', 'authors', 'pubdate' ] });
  })

  const uid = await screen.findByTestId('uid');
  expect(uid).toBeTruthy();
});
