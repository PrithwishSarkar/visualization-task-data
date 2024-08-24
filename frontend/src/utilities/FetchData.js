import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FetchData(uri) {

    const [data, setData] = useState([]);
    const backendURL = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`${backendURL}/api/${uri}`);
                setData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();

    }, [uri]);

    return data;
}