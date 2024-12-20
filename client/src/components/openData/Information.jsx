import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import axiosClient from '../../config/Axios';
import { Box, Button, Container, Drawer, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import SennovaLogo from '../../assets/loading/sennova-logo.png'
import FilterOpenData from '../../helpers/components/FilterOpenData';
import SearchIcon from '@mui/icons-material/Search';
import ApiIcon from '@mui/icons-material/Api';
import FilterAltOffTwoToneIcon from '@mui/icons-material/FilterAltOffTwoTone';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import DocumentatioAPI from '../../helpers/components/DocumentatioAPI';
import Video from '../../helpers/components/Video';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxHeight: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
};

const Information = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [showFullText, setShowFullText] = useState(false);


    const [openVideo, setOpenVideo] = useState(false);

    // New state for filters
    const [open, setOpen] = useState(false);
    const [openApi, setOpenApi] = useState(false);
    const [category, setCategory] = useState('');
    const [city, setCity] = useState("");
    const [department, setDepartment] = useState("");
    const [evenDateStart, setEvenDateStart] = useState('');
    const [evenDateEnd, setEvenDateEnd] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage, search]);

    let municipio;
    if (city) {
        const { name } = city;
        municipio = name;
    }

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get(`/open-data`, {
                params: {
                    page: currentPage,
                    size: 10,
                    category,
                    municipio,
                    department,
                    evenDateStart,
                    evenDateEnd,
                    search
                }
            });
            if (response.data.content.length === 0) {
                Swal.fire({
                    title: "No se encontraron testimonios.",
                    timer: 1000
                });
            }
            setTimeout(() => {
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setIsLoading(false);
                setDepartment("");
                setCity("");
                setCategory("");
                setEvenDateStart("");
                setEvenDateEnd("");
            }, 700)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.message,
                text: "No hay conexión con el servidor.",
            });
            setIsLoading(false);
        }
    };

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

    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    const maxLength = 30;

    const handleFilterChange = (e) => {
        e.preventDefault();
        setCurrentPage(0);
        fetchData();
        setOpen(false)
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <Container maxWidth="xl">
            <Grid container alignItems='center'>
                <Grid item xs={12} md={3}>
                    <Button
                        variant='contained'
                        onClick={toggleDrawer(true)}
                        endIcon={<FilterAltTwoToneIcon />}
                    >Filtrar</Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        <FilterOpenData
                            category={category}
                            setCategory={setCategory}
                            city={city}
                            setCity={setCity}
                            department={department}
                            setDepartment={setDepartment}
                            evenDateStart={evenDateStart}
                            setEvenDateStart={setEvenDateStart}
                            evenDateEnd={evenDateEnd}
                            setEvenDateEnd={setEvenDateEnd}
                            handleFilterChange={handleFilterChange}
                        />
                    </Drawer>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button variant='contained' onClick={fetchData} endIcon={<FilterAltOffTwoToneIcon />}>Limpiar filtro</Button>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button variant='contained' onClick={(e) => setOpenApi(true)} endIcon={<ApiIcon />} >Documentación API</Button>
                    <DocumentatioAPI openApi={openApi} setOpenApi={setOpenApi} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <IconButton>
                        <SearchIcon />
                        <TextField
                            color='grayDark'
                            type='text'
                            variant="outlined"
                            fullWidth
                            label="Buscar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </IconButton>
                </Grid>
            </Grid>
            {isLoading ? (
                <Grid item xs={12}>
                    {/* Mostrar el Loading solo en la sección donde irían las tarjetas */}
                    <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                        <img src={SennovaLogo} alt="Imagen de carga" className="imagen-animada" />
                        <Typography variant="h4">Cargando contenido...</Typography>
                    </Box>
                </Grid>
            ) : (
                <TableContainer component={Paper} sx={{ width: '100%', overflow: 'auto', marginTop: 5 }}>
                    <Table aria-label="sticky table">
                        {!isMobile && (
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'secondary.main' }}>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Categoria</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Titulo</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Descripcion</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Ubicación</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Fecha</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Video</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Imagen</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Audio</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Detalles</TableCell>
                                </TableRow>
                            </TableHead>
                        )}
                        <TableBody>
                            {data.map((data) => (
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
                                            <>
                                                <Button onClick={(e) => setOpenVideo(!openVideo)} variant='contained' color='primary'> ver</Button>
                                                <Modal
                                                    open={openVideo}
                                                    onClose={(e) => setOpenVideo(!openVideo)}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style} >
                                                        <Video video={data.videoUrl} />
                                                    </Box>
                                                </Modal>
                                            </>
                                        ) : 'Video no disponible'}
                                    </TableCell>
                                    <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                        {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Imagen:</Box>}
                                        {data.imageUrl ? (
                                            <Button
                                                onClick={() => window.open(data.imageUrl, "_blank", "noopener,noreferrer")}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Ver
                                            </Button>
                                        ) : 'Imagen no disponible'}
                                    </TableCell>
                                    <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                        {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Audio:</Box>}
                                        {data.audioUrl ? (
                                            <Button
                                                onClick={() => window.open(data.audioUrl, "_blank", "noopener,noreferrer")}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Escuchar
                                            </Button>
                                        ) : 'Audio no disponible'}
                                    </TableCell>
                                    <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                        {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Detalles:</Box>}
                                        {data.descriptionDetail.length ? (
                                            <>
                                                {/* Mostrar texto truncado o completo basado en el estado */}
                                                {showFullText ? (
                                                    <span>{data.descriptionDetail}</span>
                                                ) : (
                                                    <span>
                                                        {data.descriptionDetail.slice(0, maxLength)}
                                                        {data.descriptionDetail.length > maxLength && '...'}
                                                    </span>
                                                )}

                                                {/* Mostrar botón de "Leer más" o "Leer menos" si el texto es largo */}
                                                {data.descriptionDetail.length > maxLength && (
                                                    <Button onClick={toggleText} size="small" color='grayDark'>
                                                        {showFullText ? 'Leer menos' : 'Leer más'}
                                                    </Button>
                                                )}
                                            </>
                                        ) : (
                                            'Detalle no disponible'
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
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