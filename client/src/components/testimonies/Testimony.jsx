import { Card, Container, Grid, Button, CardActionArea, CardActions, Typography, CardMedia, CardContent, Box, Alert } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axiosClient from '../../config/Axios';
import Loading from '../../helpers/components/Loading';
import MessageData from '../../helpers/components/MessageData';
import Menu from '../../helpers/components/Menu';

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
            try {
                const response = await axiosClient.get(`/repository/show/${path}?page=${currentPage}&size=6`)
                setData(response.data.content)
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements)
                setIsLoading(false);
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [currentPage, path])

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
        <Grid container spacing={1} mb={6} justifyContent="center">
            <Grid item
                xs={12}
                sm={2}
                sx={{
                    position: 'sticky',
                    top:150,
                    alignSelf: 'flex-start'
                }}>
                <Menu />
            </Grid>
            <Grid item xs={12} sm={8}>
                <Grid container spacing={2}>
                    {data.map((testimony, index) => (
                        <Grid item key={index} xs={12} sm={8} md={6} lg={4}>
                            <Card sx={{
                                boxShadow: 8,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 6
                                }
                            }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={testimony.imageUrl}
                                        alt={testimony.category}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {testimony.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {testimony.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="secondary" variant="contained">
                                        Ver más
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
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
                <Loading isLoading={isLoading} />
                {totalElements < 1 && (
                    <MessageData action="testimony" />
                )}
            </Grid>
        </Grid>
    )
}

export default Testimony