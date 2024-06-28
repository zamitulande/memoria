import { Box, Button, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosClient from '../../config/Axios'
import ViewMore from './ViewMore';


const Users = () => {

  const getToken = useSelector((state) => state.user.token)

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
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
      } catch (error) {
        console.log(error)
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

  const handleOpenModal = (user) => { 
    setSelectedUser(user);
    setOpen(true)
 }

  return (
    <Container>
      <Paper sx={{ width: '100%', overflow: 'auto'}}>
        <TableContainer sx={{ minWidth: 650 }}>
          <Table sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Identificacion</TableCell>
              <TableCell align="center">Nombres</TableCell>
              <TableCell align="center">Apellidos</TableCell>
              <TableCell align="center">Telefono</TableCell>
              <TableCell align="center">Correo</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.userId}>
                  <TableCell align="center">{user.identification}</TableCell>
                  <TableCell align="center">{user.names}</TableCell>
                  <TableCell align="center">{user.lastNames}</TableCell>
                  <TableCell align="center">{user.contactNumber}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell>
                    <Tooltip title="Ver más">
                      <IconButton onClick={() => handleOpenModal(user)}>
                        <VisibilityIcon/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Bloquear">
                      <IconButton>
                        <LockIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" disabled={currentPage === 0} onClick={handlePreviousPage}>
            Anterior
          </Button>
          <Button variant="contained" disabled={currentPage === totalPages - 1} onClick={handleNextPage}>
            Siguiente
          </Button>
        </Box>
      </Paper>
      <ViewMore open={open} setOpen={setOpen} user={selectedUser}/>
    </Container>
  )
}

export default Users