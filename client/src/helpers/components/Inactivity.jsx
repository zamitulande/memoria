import { Box, Modal, Typography } from '@mui/material';
import React from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    maxHeight: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
};
const Inactivity = ({ open, onClose, countdown }) => {
    return (
        <Modal open={open} onClose={onClose}>
          <Box  sx={style}>
            <Typography variant='h6' color="primary.main" >No se registra actividad en la plataforma Memoria Oral</Typography>
            <Typography variant='p' color="secondary.main" fontWeight="bold">Su sesión será cerrada en {countdown} segundos.</Typography>
          </Box>
        </Modal>
      );
}

export default Inactivity