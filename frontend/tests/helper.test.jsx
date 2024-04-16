import { test, expect } from "vitest";
import getDataFromServer from "../src/services/helper.jsx";

test("fetches data from server", async () => {
  // Define a test URL and options
  const testUrl = "http://localhost:5000/get_ids";
  const testOptions = { method: "GET" };

  // Call the function with the test URL and options
  const data = await getDataFromServer(testUrl, testOptions);

  // Check that the function returned the correct data
  expect(data).toEqual({
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
    ],
  });
});
