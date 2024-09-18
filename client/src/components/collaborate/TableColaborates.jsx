import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosClient from '../../config/Axios';
import { Box, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SennovaLogo from '../../assets/loading/sennova-logo.png'
import Swal from 'sweetalert2';
import MessageData from '../../helpers/components/MessageData';

const TableColaborates = () => {

    const getToken = useSelector((state) => state.user.token)

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [colaborates, setColaborates] = useState([])

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer${getToken}`
                    }
                }
                const response = await axiosClient.get(`/list-colaborate?page=${currentPage}&size=10`, config);
                setTimeout(() => {
                    setColaborates(response.data.content);
                    setTotalPages(response.data.totalPages);
                    setTotalElements(response.data.totalElements)
                    setIsLoading(false);
                }, 700)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [currentPage])

    const handleDelete = async (coloborate) => {
        const {colaborateId} = coloborate;
        Swal.fire({
            title: "Estas seguro?",
            text: "Esta accion elimina el colaborador, no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar"
          }).then(async (result) => {
            try {
              if (result.isConfirmed) {
                const config = {
                  headers: {
                    'Authorization': `Bearer${getToken}`
                  }
                }
                const response = await axiosClient.delete(`colaborate/delete/${colaborateId}`, config);
                if (response.status === 200) {
                  const colaborateFilter = colaborates.filter(colaborate => colaborate.colaborateId !== colaborateId);
                  Swal.fire({
                    title: "Borrado!",
                    text: "El colaborador ha sido borrado",
                    icon: "success"
                  });
                  setColaborates(colaborateFilter);
                }
              }
            } catch (error) {
              console.log(error)
            }
          })
    }
    return (
        <Container maxWidth="xl">
            {isLoading ? (
                <Grid item xs={12}>
                    {/* Mostrar el Loading solo en la sección donde irían las tarjetas */}
                    <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                        <img src={SennovaLogo} alt="Imagen de carga" className="imagen-animada" />
                        <Typography variant="h4">Cargando contenido...</Typography>
                    </Box>
                </Grid>
            ) : (
                <TableContainer component={Paper} sx={{ width: '100%', overflow: 'auto' }}>
                    <Table aria-label="sticky table">
                        {!isMobile && (
                            <TableHead >
                                <TableRow sx={{ backgroundColor: 'secondary.main' }}>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Organización</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Sitio web</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Facebook</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Telefono</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Correo</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Objeto social</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'textField.main' }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                        )}
                        <TableBody>
                            {colaborates.map((coloborate) => (
                                <TableRow key={coloborate.coloborateId} sx={{
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
                                        {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Organización:</Box>}
                                        {coloborate.name}
                                    </TableCell>
                                    <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                        {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Sitio web:</Box>}
                                        {coloborate.siteWeb.length ? (coloborate.siteWeb) : "no disponible"}
                                    </TableCell>
                                    <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                        {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Facebook:</Box>}
                                        {coloborate.facebook.length ? (coloborate.facebook) : "no disponible"}
                                    </TableCell>
                                    <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                        {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Telefono:</Box>}
                                        {coloborate.contactNumber}
                                    </TableCell>
                                    <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                        {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Correo:</Box>}
                                        {coloborate.email}
                                    </TableCell>
                                    <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                        {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Objeto social:</Box>}
                                        {coloborate.corporatePurpose}
                                    </TableCell>
                                    <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                                        {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Acciones:</Box>}
                                        <Tooltip title="Eliminar">
                                            <IconButton onClick={() => handleDelete(coloborate)}>
                                                <DeleteIcon color='error' />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {totalElements < 1 && (
                <MessageData action="colaborate" />
      )}
        </Container>
    )
}

export default TableColaborates