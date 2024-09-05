import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import axiosClient from '../../config/Axios';
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

const Information = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [fetchData, setFetchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`/open-data?page=${currentPage}&size=5`)
                setFetchData(response.data.content)
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements)
                setIsLoading(false);
                console.log(response.data.content)
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
        <Container maxWidth="xl">
            <TableContainer component={Paper} sx={{ width: '100%', overflow: 'auto' }}>
                <Table aria-label="sticky table">
                    {!isMobile && (
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Categoria</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Titulo</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Descripcion</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Ubicación</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Fecha</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Video</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Imagen</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Audio</TableCell>
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {fetchData.map((data) => (
                            <TableRow key={data.testimonyId}
                                sx={{
                                    display: isMobile ?
                                        'block' : 'table-row', borderBottom: isMobile
                                            ?
                                            '3px solid '
                                            :
                                            'none',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',  // Cambia este color según tus necesidades
                                    }
                                }}>
                                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                    {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Categoria:</Box>}
                                    {data.category}
                                </TableCell>
                                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                    {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Titulo:</Box>}
                                    {data.title}
                                </TableCell>
                                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                    {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Descripcion:</Box>}
                                    {data.description}
                                </TableCell>
                                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                    {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Ubicación:</Box>}
                                    {data.department}-{data.municipio}
                                </TableCell>
                                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                    {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Fecha:</Box>}
                                    {data.evenDate}
                                </TableCell>
                                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                    {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Video:</Box>}
                                    {data.videoUrl ? (
                                        <a href={data.videoUrl} target="_blank" rel="noopener noreferrer">Ver Video</a>
                                    ) : 'Video no disponible'}
                                </TableCell>
                                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                    {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Imagen:</Box>}
                                    {data.imageUrl ? (
                                        <a href={data.imageUrl} target="_blank" rel="noopener noreferrer">Ver Imagen</a>
                                    ) : 'Imagen no disponible'}
                                </TableCell>
                                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                    {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Audio:</Box>}
                                    {data.audioUrl ? (
                                        <a href={data.audioUrl} target="_blank" rel="noopener noreferrer">Escuchar Audio</a>
                                    ) : 'Audio no disponible'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {totalElements > 6 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button variant="contained" disabled={currentPage === 0} onClick={handlePreviousPage}>
                        Anterior
                    </Button>
                    <Button variant="contained" disabled={currentPage === totalPages - 1} onClick={handleNextPage}>
                        Siguiente
                    </Button>
                </Box>
            )}
        </Container>
    )
}

export default Information