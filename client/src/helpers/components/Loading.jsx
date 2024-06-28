import { Box } from '@mui/material'
import LoadingGif from '../../assets/loading/loading.gif'

const Loading = ({isLoading}) => {
    return (
        isLoading && (
            <Box className="loading-overlay">
                <img src={LoadingGif} alt="Loading..." />
            </Box>
        )
    );
  
}

export default Loading