import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axiosClient from '../../config/Axios';

const Testimony = () => {

    const category = useSelector((state) => state.testimony.category);

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    
    

    useEffect(()=>{
        setIsLoading(true);
        const fetchData = async () =>{
            try {
                const response = await axiosClient.get(`/repository/show/${category}?page=${currentPage}&size=6`)
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