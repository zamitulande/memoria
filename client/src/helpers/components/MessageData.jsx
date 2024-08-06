import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Alert, Box } from '@mui/material';

const MessageData = ({action}) => {

    const [open, setOpen] = useState(true);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    let message;
    
    if(action === "testimony"){
        message = "testimonios"
    }else{
        message = "usuarios"
    } 

    return (
        <Box>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    onClose={handleClose}
                    severity="warning"
                    sx={{
                        width: '100%',
                        maxWidth: '800px',
                        fontSize: '1.4em',
                        '& .MuiAlert-icon': { fontSize: '1.5em' },
                    }}
                >
                    {}
                    No hay {message} registrados.
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default MessageData