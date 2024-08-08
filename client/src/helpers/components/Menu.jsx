import { Box, Typography } from '@mui/material';
import React from 'react'
import { useDispatch} from 'react-redux';

const Menu = () => {

    const dispatch = useDispatch();

    const images = [
        { category: "conflicto-armado"},
        { category: "pandemia" },
        { category: "conflicto-social" },
        { category: "cultura" },
        { category: "patrimonio-alimentario" }
      ];


  return (
    <Box position="fixed">
    <Typography variant="h6">Le puede interesar...</Typography>
    <Box sx={{
        '& button': {
            textDecoration: 'none',
            color: 'black',
            display: 'block',
            padding: '8px 16px',
            borderRadius: '4px',
            transition: 'background-color 0.3s, color 0.3s',
            '&:hover': {
                backgroundColor: '#f0f0f0',
                color: '#1976d2',
            }
        }
    }}>
        
    </Box>
</Box>
  )
}

export default Menu