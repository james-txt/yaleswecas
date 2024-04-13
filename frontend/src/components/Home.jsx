import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

async function getDataFromServer(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function Home() {
    const [ids, setIds] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getDataFromServer('http://localhost:5000/get_ids');
            setIds(data.idlist);
        }
        fetchData();
    }, []);

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
