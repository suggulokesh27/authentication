import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const DetailShow = () => {

    const parmas = useParams();
    const [data, setData] = useState([])

    const fetchData = () => {
        return fetch(`http://localhost:9000/getuserdata/${parmas.id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data.userDetailsId)
            });
    }

    useEffect(() => {
        fetchData();
    })
    return (
        <div>
            <h2>{data.fullName}</h2>
            <h4>{data.age}</h4>
        </div>
    )
};


export default DetailShow;