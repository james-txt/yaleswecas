# Documentation

This serves as a guide to understanding the thought process, design, implementation, and functionality of the applications.

## Flask Backend Server for PubMed Data

1. **Importing necessary modules**:
- `Flask` is the web framework used to build the application
- `request` is used to handle incoming requests
- `CORS` is used to handle Cross-Origin Resource Sharing
- `requests` is used to make HTTP requests to the PubMed API
- `pytest` is used for testing the application

3. **Defining a helper function**: `get_data_from_api` function is defined to make a GET request to a given URL and return the JSON response. The use of a helper function to interact with the API keeps the code DRY (Don't Repeat Yourself) and improves readability.

4. **Defining the `/get_ids` route**: A GET request to the PubMed API to fetch the first 10 IDs related to the term "cancer". The IDs are extracted from the API response and returned in a dictionary.

5. **Defining the `/get_details` route**: A POST request with a JSON body containing a `target_id`. It makes a GET request to the PubMed API to fetch the details of the publication with the given ID. The details are extracted from the API response and returned in a dictionary.

6. **Pytest**:`test_main.py` contains tests for the Flask application. The tests check the status code and response data for the `/get_ids` and `/get_details` routes. The tests are ran using the following commands:

```bash
cd backend
venv\Scripts\activate
cd tests
py test_main.py
```

7. **Running the application**: Finally, if the script is run directly (not imported as a module), the Flask application is run in debug mode.

## React Frontend Server for PubMed Data

### App Component

Sets up the routing for the application. It uses the `BrowserRouter` component from `react-router-dom` to enable routing. There are two routes defined:

- The `/` route renders the `Home` component.
- The `/details/:id` route renders the `Details` component, with the `id` parameter in the URL passed to the component.

### Home Component

- Fetches a list of IDs from the backend server when it mounts, using the `useEffect` and `useState` hooks from React.
- Uses the `fetch` function to make a GET request to the backend server.
- The fetched IDs are stored in the `ids` state variable.
- Renders a list of links to the details page for each ID.
- Each link is a `Link` component from `react-router-dom`, which navigates to the `/details/:id` route when clicked.

### Details Component

- Fetches the details for a specific ID from the backend server, when it mounts or when the `id` parameter in the URL changes.
- Uses the `useParams` hook from `react-router-dom` to get the `id` parameter from the URL.
- `useEffect` and `useState` hooks from React to fetch the data and store it in the `details` state variable.
- Renders the details for the ID if they have been fetched, or a loading message otherwise.
- Renders a `Link` component that navigates back to the home page.

### Vitest application

- `Home` component test checks if component renders correctly.
- `Details` component test checks if component renders correctly and if it fetches the correct data from the server.
- `helper` service test checks if function `getDataFromServer` fetches the correct data from the server.

The tests are ran using the following commands:

```bash
cd backend
venv\Scripts\activate # Windows
venv/bin/activate # MacOS/Linux
py main.py
cd frontend
npm run test
```
