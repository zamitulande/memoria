import { Box, IconButton, Grid, List, ListItem, ListItemText, Modal, Typography, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Cancel';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useEffect, useState } from 'react';
import axiosClient from '../../config/Axios'
import { useSelector } from 'react-redux';

const ViewMore = ({ open, setOpen, user }) => {

    const getToken = useSelector((state) => state.user.token)

    const [urlPdf, setUrlPdf] = useState(null)

    const handleCloseModal = () => {
        setOpen(false)
    }
    
    const userInfo = [
        { label: 'Municipio', value: user?.municipio },
        { label: 'Teléfono', value: user?.contactNumber },
        { label: 'Correo', value: user?.email },
        { label: 'Identificación', value: user?.identification }
    ];
    useEffect(()=>{
        const loadPdf = async (url) => {
            console.log(url)
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${getToken}` // Asegúrate de que getToken() devuelva el token como una cadena
                    },
                    responseType: 'arraybuffer' // responseType debe estar dentro del objeto config
                };
                const response = await axiosClient.get(`users/consentimiento/${url}`,config);
                console.log(response)
                if(response.data instanceof ArrayBuffer){
                    const blob = new Blob([response.data], {type: response.headers['content-type']});
                    const pdfUrl = URL.createObjectURL(blob);
                    return pdfUrl;
                }else{
                    console.error("tipo de dato no compatible: ", typeof response.data);
                    return null;
                }
            } catch (error) {
                console.log("error al cargar el consentimiento "+ error);
                return null;
            }
        }

        const loadPdfUrl = async ()=>{
            if (user?.documentUrl) {
                const pdfUrl = await loadPdf(user.documentUrl);
                setUrlPdf(pdfUrl);
            }
        }
        if (open && user) {
            loadPdfUrl();
        }
    },[open, user])

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
                        {urlPdf && (
                            <IconButton onClick={() => window.open(urlPdf, '_blank')}>
                            <PictureAsPdfIcon fontSize='large' />
                            <Typography fontSize={18}>consentimiento informado</Typography>
                          </IconButton>
                        )}
                    </List>
                )}
            </Box>
        </Modal>
    )
}

export default ViewMore