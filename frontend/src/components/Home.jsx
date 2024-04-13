import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Helper function to make a fetch request
async function getDataFromServer(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


function Home() {
    // useState hook to create a state variable for the IDs    
    const [ids, setIds] = useState([]);

    // useEffect hook to fetch the IDs when the component mounts
    useEffect(() => {
        async function fetchData() {
            // GET request to the backend to fetch the IDs
            const data = await getDataFromServer('http://localhost:5000/get_ids');
            // Update the ids state variable with the fetched IDs
            setIds(data.idlist);
        }
        fetchData();
    }, []);

    // Return a list of links to the details page for each ID
    return (
        <div id="uid">
            <h2>Choose your Publication by ID</h2>
            {ids.map((id, index) => (
                <div key={index}>
                    <Link to={`/details/${id}`}>{id}</Link>
                </div>
            ))}
        </div>
    );
}

export default Home;
