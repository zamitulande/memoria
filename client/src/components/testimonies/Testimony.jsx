import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axiosClient from '../../config/Axios';

const Testimony = () => {

    const category = useSelector((state) => state.testimony.categories);

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    
    let path;
    path=category;

    useEffect(()=>{
        setIsLoading(true);
        const fetchData = async () =>{
            console.log(category)
            try {
                const response = await axiosClient.get(`/repository/show/${path}?page=${currentPage}&size=6`)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    },[])

    return (
        <div>Testimony {category}</div>
    )
}

export default Testimony