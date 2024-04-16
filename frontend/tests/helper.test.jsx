import { test, expect } from "vitest";
import getDataFromServer from "../src/services/helper.jsx";
import Pretender from 'pretender';

const IDSLIST = {
  idlist: [
    "38621307",
    "38621273",
    "38621271",
    "38621270",
    "38621269",
    "38621268",
    "38621250",
    "38621244",
    "38621241",
    "38621239",
  ]
};

test("fetches data from server", async () => {
  // Define a test URL and options
  const testUrl = "/get_ids";
  const testOptions = { method: "GET" };

  // Create a new Pretender instance
  let server = new Pretender();

  // Mock the server's response to a GET request to '/get_ids'
  server.get(testUrl, () => {
    return [200, { "Content-Type": "application/json" }, JSON.stringify(IDSLIST)];
  });

  // Call the function with the test URL and options
  const data = await getDataFromServer(testUrl, testOptions);

  // Check that the function returned the correct data
  expect(data).toEqual(IDSLIST);

  server.shutdown();
});
