import { Box, IconButton, Grid, List, ListItem, ListItemText, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Cancel';

const ViewMore = ({ open, setOpen, user }) => {

    const handleCloseModal = () => {
        setOpen(false)
    }

    const userInfo = [
        { label: 'Municipio', value: user?.municipio },
        { label: 'Teléfono', value: user?.contactNumber },
        { label: 'Correo', value: user?.email },
        { label: 'Identificación', value: user?.identification }
    ];

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='modal-style'>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        left: '90%',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {user && (
                    <List>
                        <Typography variant='h5'>{user.names}</Typography>
                        <Grid container spacing={2}>
                            {userInfo.map((info, index) => (
                                <Grid item xs={6} key={index}>
                                    <ListItem>
                                        <ListItemText primary={info.label} secondary={info.value} />
                                    </ListItem>
                                </Grid>
                            ))}
                        </Grid>
                    </List>
                )}
            </Box>
        </Modal>
    )
}

export default ViewMore