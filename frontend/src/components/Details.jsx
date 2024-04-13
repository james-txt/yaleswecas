import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

async function getDataFromServer(url, options = {}) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

function Details() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getDataFromServer('http://localhost:5000/get_details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target_id: id, fields: ['uid', 'title', 'authors', 'pubdate'] })
            });
            setDetails(data);
        }
        fetchData();
    }, [id]);

    return details ? (
        <div>
            <p>ID: {details.uid}</p>
            <p>Title: {details.title}</p>
            <p>Authors: {details.authors.join(', ')}</p>
            <p>Publication Date: {details.pubdate}</p>
            <Link to="/">Back</Link>
        </div>
    ) : (
        <div>Loading...</div>
    );
}

export default Details;
