import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from '@mui/material';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Cancel';

const InfoRegister = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }
    return (
        <>
            <Button
                onClick={handleClick}
                color='success'
                variant="contained"
                sx={{
                    position: 'fixed',
                    bottom: 50,
                    right: 40,
                    zIndex: 1000
                }}>
                ¿Como participar?

            </Button>
            <Dialog
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            marginTop: 2,
                            marginLeft: 60
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                <DialogTitle id="alert-dialog-title">
                    {"¿Como puedes participar del proyecto Memoria Oral?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Para compartir tu testimonio o historia y hacerla visible deberas registrarte en nuestra plataforma.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to='/usuarios/registrar'>
                    <Button
                        color='success'
                        variant="contained"
                        onClick={handleCloseModal}
                    >Deseo registrarme
                    </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default InfoRegister