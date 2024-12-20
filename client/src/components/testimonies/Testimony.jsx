import { Card, Grid, Button, CardActionArea, CardActions, Typography, CardMedia, CardContent, Box, Alert, Skeleton, Stack } from '@mui/material'
import LockClockTwoToneIcon from '@mui/icons-material/LockClockTwoTone';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../config/Axios';
import MessageData from '../../helpers/components/MessageData';
import Menu from '../../helpers/components/Menu';
import { animateScroll } from 'react-scroll';
import { setOpenViewTestimony, setTestimonies } from '../../redux/features/TestimonySlice';
import ViewTestimony from '../../helpers/components/ViewTestimony';
import Swal from 'sweetalert2';

const Testimony = () => {

    const dispatch = useDispatch();

    const category = useSelector((state) => state.testimony.categories);
    const openViewTestimony = useSelector((state) => state.testimony.openViewTestimony);
    const dataTestimonies = useSelector((state) => state.testimony.testimonies)
    const testimonyIsEnable = useSelector((state) => state.testimony.testimonyIsEnable)
    const getToken = useSelector((state) => state.user.token)
    const getRole = useSelector((state) => state.user.role)
    const isDelete = useSelector((state)=> state.testimony.isDelete)

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [selectedTestimony, setSelectedTestimony] = useState({})

    let path = category;
    
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${getToken}`
                }
            };
            try {
                let response;
                if (getRole === "ADMIN" || getRole === "USER") {
                    response = await axiosClient.get(`/repository/show/${path}?page=${currentPage}&size=6`, config)
                } else {
                    response = await axiosClient.get(`/repository/show/${path}?page=${currentPage}&size=6`)
                }
                setTimeout(() => {
                    dispatch(setTestimonies(response.data.content))
                    setTotalPages(response.data.totalPages);
                    setTotalElements(response.data.totalElements)
                    setIsLoading(false);
                    animateScroll.scrollToTop()
                }, 700)
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: error.message,
                    text: "No hay conexión con el servidor.",
                });
                setIsLoading(false);
            }
        }
        fetchData();
    }, [currentPage, path, getRole, testimonyIsEnable, isDelete])

    useEffect(() => {
        setCurrentPage(0)
    }, [path])

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

    const handleViewMore = (testimony) => {
        setSelectedTestimony(testimony); // Establecer el testimonio seleccionado
        dispatch(setOpenViewTestimony(true)); // Despachar la acción para abrir el modal o vista de detalles
    };

    return (
        <Grid container spacing={1} mb={6} justifyContent="center">
            <Grid item
                xs={12}
                sm={2}
                sx={{
                    position: 'sticky',
                    top: 190,
                    alignSelf: 'flex-start'
                }}>
                <Menu />
            </Grid>
            <Grid item xs={12} sm={8}>
                <Grid container spacing={2}>
                    {isLoading
                        ? Array.from(new Array(dataTestimonies.length || 6)).map((_, index) => (
                            <Grid item key={index} xs={12} sm={8} md={6} lg={4}>
                                <Stack spacing={1}>
                                    <Skeleton variant="rectangular" width={330} height={90}/>                                    <Skeleton variant="text" width={300} height={40} />
                                    <Skeleton variant="text" width={210} height={30} />
                                    <Skeleton variant="rectangular" width={330} height={60} />
                                </Stack>
                            </Grid>
                        ))
                        : dataTestimonies.length > 0 ? (
                            dataTestimonies.map((testimony, index) => (
                                <Grid item key={index} xs={12} sm={8} md={6} lg={4}>
                                    <Card
                                        sx={{
                                            boxShadow: 8,
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        <CardActionArea component="div">
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={testimony.imageUrl}
                                                alt={testimony.category}
                                                loading="lazy"
                                            />
                                            <CardContent
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    color: '#fff',
                                                }}
                                            >
                                                <Typography gutterBottom fontSize={25} style={{ padding: '0px 60px 0px 0px' }}>
                                                    {testimony.title}
                                                </Typography>
                                                <Typography variant="span" fontSize={15} style={{ padding: '0px 50px 0px 0px' }}>
                                                    {testimony.description}
                                                </Typography>
                                                {!testimony.enabled && (
                                                    <LockClockTwoToneIcon
                                                        style={{
                                                            position: 'absolute',
                                                            top: 5,
                                                            right: 40,
                                                            backgroundColor: '#DDC90F',
                                                            borderRadius: '30%',
                                                            padding: '5px',
                                                        }}
                                                    />
                                                )}
                                            </CardContent>
                                            <CardActions>
                                                <Box>
                                                    <Button size="small" color="secondary" variant="contained" onClick={() => handleViewMore(testimony)}>
                                                        Ver más
                                                    </Button>
                                                </Box>
                                            </CardActions>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <MessageData action="testimony" />
                            </Grid>
                        )}
                </Grid>

                {/* Navegación de páginas */}
                {totalElements > 6 && !isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" disabled={currentPage === 0} onClick={handlePreviousPage}>
                            Anterior
                        </Button>
                        <Button variant="contained" disabled={currentPage === totalPages - 1} onClick={handleNextPage}>
                            Siguiente
                        </Button>
                    </Box>
                )}
                {openViewTestimony && (
                    <ViewTestimony
                        dataView={selectedTestimony}
                        action="view" />
                )}
            </Grid>
        </Grid>
    )
}

export default Testimony