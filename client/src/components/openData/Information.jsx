import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import axiosClient from '../../config/Axios';

const Information = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`/open-data?page=${currentPage}&size=6`)
                
                console.log(response)
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements)
                setIsLoading(false);
                //animateScroll.scrollToTop()
            } catch (error) {
              console.log(error)
                Swal.fire({
                    icon: "error",
                    title: error.message,
                    text: "No hay conexión con el servidor.",
                });
                setIsLoading(false);
            }
        }
        fetchData();
    }, [currentPage])

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };
  return (
    <div>Information</div>
  )
}

export default Information