# Documentation

This documentation is a file that serves as a guide to understanding the thought process, design, implementation, and functionality of the project.

## Flask Backend Server for PubMed Data

1. **Importing necessary modules**:
`Flask` is the web framework used to build the application
`request` is used to handle incoming requests
`CORS` is used to handle Cross-Origin Resource Sharing
`requests` is used to make HTTP requests to the PubMed API

2. **Setting up the Flask application**: An instance of the Flask application is created and CORS is enabled on the application.

3. **Defining a helper function**: The `get_data_from_api` function is defined to make a GET request to a given URL and return the JSON response. This function is used to interact with the PubMed API. The use of a helper function to interact with the API keeps the code DRY (Don't Repeat Yourself) and improves readability.

4. **Defining the `/get_ids` route**: This route makes a GET request to the PubMed API to fetch the first 10 IDs related to the term "cancer". The IDs are extracted from the API response and returned in a dictionary.

5. **Defining the `/get_details` route**: This route takes a POST request with a JSON body containing a `target_id`. It makes a GET request to the PubMed API to fetch the details of the publication with the given ID. The details are extracted from the API response and returned in a dictionary.

6. **Running the application**: Finally, if the script is run directly (not imported as a module), the Flask application is run in debug mode.

## React Frontend Server for PubMed Data

### App Component

The `App` component sets up the routing for the application. It uses the `BrowserRouter` component from `react-router-dom` to enable routing. There are two routes defined:

- The `/` route renders the `Home` component.
- The `/details/:id` route renders the `Details` component, with the `id` parameter in the URL passed to the component.

### Home Component

The `Home` component fetches a list of IDs from the backend server when it mounts, using the `useEffect` and `useState` hooks from React. It uses the `fetch` function to make a GET request to the backend server. The fetched IDs are stored in the `ids` state variable.

The `Home` component renders a list of links to the details page for each ID. Each link is a `Link` component from `react-router-dom`, which navigates to the `/details/:id` route when clicked.

### Details Component

The `Details` component fetches the details for a specific ID from the backend server when it mounts or when the `id` parameter in the URL changes. It uses the `useParams` hook from `react-router-dom` to get the `id` parameter from the URL, and the `useEffect` and `useState` hooks from React to fetch the data and store it in the `details` state variable.

The `Details` component renders the details for the ID if they have been fetched, or a loading message otherwise. It also renders a `Link` component that navigates back to the home page.