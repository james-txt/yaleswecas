import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getDataFromServer from '../services/helper.jsx';

function Home() {
    // useState hook to create a state variable for the IDs    
    const [ids, setIds] = useState([]);

    // useEffect hook to fetch the IDs when the component mounts
    useEffect(() => {
        async function fetchData() {
            // GET request to the backend to fetch the IDs
            const data = await getDataFromServer(`${import.meta.env.VITE_APIURL}/get_ids`);
            // Update the ids state variable with the fetched IDs
            setIds(data.idlist);
        }
        fetchData();
    }, []);

    // Return a list of links to the details page for each ID
    return (
        <div className="card flex flex-col items-center justify-center my-2">
            <h2 className="text-2xl font-bold m-4">Choose your Publication by ID:</h2>
            <hr className="w-11/12 mt-2 mb-4 border-slate-900" />
            <ul className="grid grid-cols-2 gap-2 w-11/12">
                {ids.map((id, index) => (
                    <li key={index}>
                        <Link to={`/details/${id}`} className="inline-block py-2 px-12 rounded bg-slate-200 hover:bg-slate-50 active:bg-slate-400 font-medium">
                            {id}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
