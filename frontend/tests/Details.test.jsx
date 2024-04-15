import { render} from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Details from '../src/components/Details';
import getDataFromServer from '../src/services/helper.jsx'
import { test, expect } from 'vitest';

test('renders Details component', async () => {
  render(
    <Router>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
    // Define a test URL and options
    const testUrl = 'http://localhost:5000/get_details'
    const testOptions = { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target_id: '38616118' }) 
    }
  
    // Call the function with the test URL and options
    const data = await getDataFromServer(testUrl, testOptions)
  
    // Check that the function returned the correct data
    expect(data).toEqual({ uid: '38616118', title: "Response to: Author's reply to: Effect of adjuvant treatment on survival in 2023 FIGO stage IIC endometrial cancer.", authors: ['Akgor U', 'Ozgul N', 'Ayhan A'], pubdate: '2024 Apr 11' })
  });

