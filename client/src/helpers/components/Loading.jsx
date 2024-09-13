import { Box } from '@mui/material'
import SennovaLogo from '../../assets/loading/sennova-logo.png'

const Loading = ({isLoading}) => {
    return (
        isLoading && (
            <Box className="loading-overlay">
                <img src={SennovaLogo} alt="Imagen de carga" className="imagen-animada"/>
            </Box>
        )
    );  
}

export default Loading