import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axiosClient from '../../config/Axios';

const Testimony = () => {

    const category = useSelector((state) => state.testimony.categories);

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [data, setData] = useState([])

    let path;
    path = category;

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            console.log(category)
            try {
                const response = await axiosClient.get(`/repository/show/${path}?page=${currentPage}&size=6`)
                setData(response.data.content)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            {data.map((testimony) => (
                <div key={testimony.testimonyId}>
                    <h3>{testimony.title}</h3>
                    <p>{testimony.description}</p>
                    <p>{testimony.evenDate}</p>
                    <p>{testimony.municipio}, {testimony.department}</p>
                    <p>{testimony.descriptionDetail}</p>
                    <div>
                        {testimony.imageUrl && (
                            <img
                                src={testimony.imageUrl}
                                alt={testimony.title}
                                style={{ width: '100px', height: 'auto' }}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Testimony