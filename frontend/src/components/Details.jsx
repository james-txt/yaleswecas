import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Helper function to make a fetch request
async function getDataFromServer(url, options = {}) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

function Details() {
    // useParams hook to get the ID from the URL parameters
    const { id } = useParams();
    // useState hook to create a state variable for the details
    const [details, setDetails] = useState(null);

    // useEffect hook to fetch the details when the component mounts or the ID changes
    useEffect(() => {
        async function fetchData() {
            // POST request to the backend to fetch the details for the given ID
            const data = await getDataFromServer('http://localhost:5000/get_details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target_id: id, fields: ['uid', 'title', 'authors', 'pubdate'] })
            });
            setDetails(data);
        }
        fetchData();
    }, [id]);

    // Return the details if they have been fetched, or a loading message otherwise
    return details ? (
        <div>
            <p>ID: {details.uid}</p>
            <p>Title: {details.title}</p>
            <p>Author List: {details.authors.join(', ')}</p>
            <p>Publication Date: {details.pubdate}</p>
            <Link to="/">Back</Link>
        </div>
    ) : (
        <div>Loading...</div>
    );
}

export default Details;