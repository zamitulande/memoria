import { Box, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Cancel';
import React from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
};

const Conditions = ({ open, setOpen }) => {

    const handleCloseModal = () => {
        setOpen(false)
    }
    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        left: '95%',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Términos y condiciones
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Usted acepta ser participante del proyecto "Memoria Oral" y,
                    en conformidad con la legislación colombiana sobre tratamiento de
                    datos personales segun Ley 1581 de 2012, declara su voluntad de participar de manera voluntaria
                    en el proceso de recolección de información a través del testimonio de las
                    experiencias que ha vivido, las afectaciones sufridas y los proyectos de
                    vida posteriores a los hechos ocurridos en el lugar objeto de sus testimonios.
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Se compromete a proporcionar información verídica y a participar, si fuera necesario,
                    en actividades relacionadas con el proceso de sistematización y divulgación de
                    información, en total cumplimiento de las disposiciones legales vigentes en
                    Colombia en cuanto al tratamiento de datos personales segun Ley 1581 de 2012. Además, otorga su
                    autorización expresa para que los testimonios que registre en el sistema
                    sean analizados, autorizados y divulgados públicamente, siempre en estricto
                    cumplimiento de la normativa colombiana de protección de datos segun Ley 1581 de 2012.
                </Typography>
            </Box>
        </Modal>
    )
}

export default Conditions