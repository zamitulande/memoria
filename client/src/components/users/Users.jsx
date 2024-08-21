import { Box, Button, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useMediaQuery } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosClient from '../../config/Axios'
import ViewMore from './ViewMore';
import { useNavigate } from 'react-router-dom';
import { setFormEdit, setUserId } from '../../redux/features/userSlice';
import Loading from '../../helpers/components/Loading';
import Swal from 'sweetalert2';
import { useTheme } from '@mui/material/styles';
import MessageData from '../../helpers/components/MessageData';


const Users = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getToken = useSelector((state) => state.user.token)

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [stateUser, setStateUser] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer${getToken}`
          }
        }
        const response = await axiosClient.get(`/users?page=${currentPage}&size=10`, config);
        setUsers(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements)
        setIsLoading(false);

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
  }, [currentPage])

  const handleBlockUnblock = async (user) => {
    setStateUser(true)
    const { userId, accountLocked } = user;
    const action = accountLocked ? 'unblock' : 'block';
    const actionText = accountLocked ? 'desbloque' : 'bloque';
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${getToken}`
        }
      };
      const response = await axiosClient.put(`/users/${action}/${user.userId}`, {}, config);
      if (response.status === 200) {
        const updatedUsers = users.map((u) =>
          u.userId === userId ? { ...u, accountLocked: !accountLocked } : u
        );
        setUsers(updatedUsers);
        Swal.fire(`Usuario ${actionText}ado`, `El usuario ha sido ${actionText}ado correctamente`, 'success');
      } else {
        Swal.fire('Error', `No se pudo ${actionText}ar el usuario`, 'error');
      }
    } catch (error) {
      Swal.fire('Error', `${error.response.data.message}, no se pudo ${actionText}ar el usuario`, 'error');
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

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpen(true)
  }

  const handleUpdate = (user) => {
    navigate('/usuarios/editar');
    dispatch(setFormEdit(user))
    dispatch(setUserId(user))
  }

  const handleDelete = async (user) => {
    const { userId } = user;
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta accion elimina los testimonios asociados a este usuario y no se puede revertir!",
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
          const response = await axiosClient.delete(`users/delete/${userId}`, config);
          if (response.status === 200) {
            const userFilter = users.filter(user => user.userId !== userId);
            Swal.fire({
              title: "Borrado!",
              text: "El usuario ha sido borrado",
              icon: "success"
            });
            setUsers(userFilter);
          }
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  return (
    <Container>
      <TableContainer component={Paper} sx={{ width: '100%', overflow: 'auto' }}>
        <Table aria-label="sticky table">
          {!isMobile && (
            <TableHead >
              <TableRow >
                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Identificacion</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Nombres</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Apellidos</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Telefono</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Correo</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
          )}

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId} sx={{ display: isMobile ? 'block' : 'table-row', borderBottom: isMobile ? '3px solid ' : 'none' }}>
                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                  {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Identificacion:</Box>}
                  {user.identification}
                </TableCell>
                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                  {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Nombres:</Box>}
                  {user.firstName}
                </TableCell>
                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                  {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Apellidos:</Box>}
                  {user.firstLastName}
                </TableCell>
                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                  {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Telefono:</Box>}
                  {user.contactNumber}
                </TableCell>
                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                  {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Correo:</Box>}
                  {user.email}
                </TableCell>
                <TableCell align={isMobile ? 'right' : 'center'} sx={{ display: isMobile ? 'block' : 'table-cell' }}>
                  {isMobile && <Box component="span" sx={{ fontWeight: 'bold', textTransform: 'uppercase', float: 'left' }}>Acciones:</Box>}
                  <Tooltip title="Ver más">
                    <IconButton onClick={() => handleOpenModal(user)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton onClick={() => handleUpdate(user)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleDelete(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={user.accountLocked ? "Desbloquear" : "Bloquear"}>
                    <IconButton onClick={() => handleBlockUnblock(user)}>
                      {user.accountLocked ? <LockIcon /> : <LockOpenIcon />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {totalElements > 10 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" disabled={currentPage === 0} onClick={handlePreviousPage}>
            Anterior
          </Button>
          <Button variant="contained" disabled={currentPage === totalPages - 1} onClick={handleNextPage}>
            Siguiente
          </Button>
        </Box>
      )}
      <ViewMore open={open} setOpen={setOpen} user={selectedUser} />
      <Loading isLoading={isLoading} />
      {totalElements < 1 && (
        <MessageData action="user" />
      )}
    </Container>
  )
}

export default Users