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
        <dl className="card w-11/12 lg:w-4/5 xlg:w-3/4 flex flex-col items-center justify-center">
            <div className="flex">
                <dt className="font-bold detail flex-initial">ID:&nbsp;</dt>
                <dd className="detail flex-initial">{details.uid}</dd>
            </div>

            <div className="flex">
                <dt className="font-bold detail flex-initial">Title:&nbsp;</dt>
                <dd className="detail flex-initial">{details.title}</dd>
            </div>

            <div className="flex">
                <dt className="font-bold detail flex-initial">Author&nbsp;List:&nbsp;</dt>
                <dd className="detail flex-initial">{details.authors.join(', ')}</dd>
            </div>

            <div className="flex">
                <dt className="font-bold detail flex-initial">Publication&nbsp;Date:&nbsp;</dt>
                <dd className="detail flex-initial">{details.pubdate}</dd>
            </div>
            <Link to="/" className="text-slate-800 hover:text-slate-600 font-medium py-1 mt-3 px-4 rounded bg-slate-200 hover:bg-slate-50 active:bg-slate-400">Back</Link>
        </dl>
    ) : (
        <div className="card loading min-w-40 flex items-center justify-center font-medium m-4"></div>
    );
}

export default Details;
