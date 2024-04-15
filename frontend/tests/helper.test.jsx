import { test, expect } from 'vitest'
import getDataFromServer from '../src/services/helper.jsx'

test('fetches data from server', async () => {
  // Define a test URL and options
  const testUrl = 'http://localhost:5000/get_ids'
  const testOptions = { method: 'GET' }

  // Call the function with the test URL and options
  const data = await getDataFromServer(testUrl, testOptions)

  // Check that the function returned the correct data
  expect(data).toEqual({ idlist: ['38616118', '38616114', '38616103', '38616102', '38616095', '38616067', '38616063', '38616056', '38616055', '38616046'] })
})
