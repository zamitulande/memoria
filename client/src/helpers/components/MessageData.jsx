import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Alert, Box, Slide  } from '@mui/material';

const SlideTransition = (props) => {
    return <Slide {...props} direction="left" />;
};

const MessageData = ({action}) => {

    const [open, setOpen] = useState(true);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    let message;
    switch(action){
        case "testimony":
            message = "testimonios"
        break;
        case "user":
            message = "usuarios"
        break;
        case "colaborate":
            message = "colaboradores"
        break;
    } 

    return (
        <Box>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                TransitionComponent={SlideTransition}
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