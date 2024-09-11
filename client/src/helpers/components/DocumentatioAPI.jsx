import { Box, Grid, IconButton, Modal, Typography } from '@mui/material';
import React from 'react'
import CloseIcon from '@mui/icons-material/Cancel';

const DocumentatioAPI = ({ openApi, setOpenApi }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 1300,
        maxHeight: '90vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 5,
        overflowY: 'auto'
    };

    const handleCloseModal = () => {
        setOpenApi(false)
    }
    return (
        <Modal
            open={openApi}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        left: '95%',
                        marginTop: -5,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Typography variant='h6' fontWeight='bold'>Documentación API</Typography>
                </Box>
                <Typography>El api de testimonios le permitirá acceder, desde otros sistemas, a los testimonios almacenado en la plataforma Memoria Oral.</Typography>
                <Grid container  justifyContent='space-around' mt={2}>
                    <Grid item>
                        <Typography fontWeight='bold'>¿Cómo utilizar el API?</Typography>
                        <Typography variant='spam'>A continuación, se listan y describen las caracteristicas del API de testimonios a tener en cuenta para utilizar de forma correcta.</Typography>
                        <Typography fontWeight='bold'>Url de API</Typography>
                        <Typography variant='spam'>http://memoriaoral.com/api/v1/open-data</Typography>
                        <Typography fontWeight='bold'>Tipo de petición Http</Typography>
                        <Typography variant='spam'>GET</Typography>
                        <Typography fontWeight='bold'>Parametros en la consulta.</Typography>
                        <ul>
                            <li>page:(INT) - requerido</li>
                            <li>size:(INT) - requerido</li>
                            <li>category: (String) - opcional</li>
                            <li>municipio: (String) - opcional</li>
                            <li>department: (String) - opcional</li>
                            <li>evenDateStart: (String) - opcional</li>
                            <li>evenDateEnd: (String) - opcional</li>
                            <li>search: (String) - opcional</li>
                        </ul>
                        <Typography fontWeight='bold'>Ejemplo de petición Http</Typography>
                        <Typography component="div" variant="span">
                            <pre>
                                {`
const fetchData = async () => {
  try {
    const response = await axios.get('http://memoriaoral.com/api/v1/open-data', {
      params: {
        page: 0,
        size: 5,
        category='Pandemia',
        department='Cauca,
        municipio='Popayán',        
        evenDateStart='05/09/2024',
        evenDateEnd='05/12/2024',
        search='palabra'
      }
    });
    console.log(response.data.content);
  } catch (error) {
    console.log(error);
  }
};
        `}
                            </pre>
                        </Typography>
                        <Typography fontWeight='bold'>Ejemplo de respuesta Http</Typography>
                        <Typography component="div" variant="span">
                            <pre>{`
 [
    {
        "testimonyId": 3,
        "category": "Patrimonio alimentario",
        "title": "EDITADO TODO CON PESO",
        "description": "Cambiando a mayusculas desde la primera letra",
        "evenDate": "2024-09-13",
        "municipio": "Inírida",
        "department": "Guainía",
        "descriptionDetail": "",
        "audioUrl": null,
        "videoUrl": "http://localhost:6868/api/v1/repository/files/show/video/EDITADO TODO CON PESO_CAMINA POR FE l SARA MORENO. Y GUISELLA DUARTE l BETHEL PRODUCCIONES.mp4",
        "imageUrl": "http://localhost:6868/api/v1/repository/files/show/image/EDITADO TODO_Captura desde 2024-07-03 13-37-19.png"
    },
]
    `}
                            </pre>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default DocumentatioAPI