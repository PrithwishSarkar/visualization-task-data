import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FetchData(uri) {

    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/${uri}`);
                setData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();

    }, [uri]);

    return data;
}