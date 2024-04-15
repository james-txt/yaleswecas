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
        <div className="card w-11/12 lg:w-4/5 xlg:w-3/4 flex flex-col items-center justify-center">
            <p><strong>ID:</strong> {details.uid}</p>
            <p><strong>Title:</strong> {details.title}</p>
            <p><strong>Author List:</strong> {details.authors.join(', ')}</p>
            <p><strong>Publication Date:</strong> {details.pubdate}</p>
            <Link to="/" className="text-slate-800 hover:text-slate-600 font-medium py-1 px-4 rounded bg-slate-200 hover:bg-slate-50 active:bg-slate-400">Back</Link>
        </div>
    ) : (
        <div className="card loading min-w-40 flex items-center justify-center font-medium m-4"></div>
    );
}

export default Details;
