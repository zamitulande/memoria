import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setCategories } from '../../redux/features/TestimonySlice';
import { useNavigate } from 'react-router-dom';

const Menu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    const paths = [
        { category: "conflicto-armado", title: "Conflcito armado" },
        { category: "pandemia", title: "Pandemia" },
        { category: "conflicto-social", title: "Conflicto social" },
        { category: "cultura", title: "Cultura" },
        { category: "patrimonio-alimentario", title: "Patrimonio alimetario" }
    ];

    if (!isDesktop) {
        return null;
    }



    return (
        <Box>
            <Typography mt={5} variant="h6">Le puede interesar...</Typography>

            <Box mt={5} sx={{
                '& button': {
                    textDecoration: 'none',
                    color: 'black',
                    display: 'block',

                    padding: '8px 16px',
                    borderRadius: '4px',
                    textTransform: 'lowercase',
                    transition: 'background-color 0.3s, color 0.3s',
                    '&:hover': {
                        backgroundColor: '#DDC90F',
                    }
                }
            }}>
                <Typography variant="h6">Testimonios de:</Typography>
                {paths.map((path, index) => (
                    <Box key={index} mt={2}>
                        <Button onClick={(e) => { dispatch(setCategories(path.category)), navigate(`/repositorio/${path.category}`, { replace: true }); }}>{path.title}</Button>
                    </Box>
                ))}

            </Box>
        </Box>
    )
}

export default Menu