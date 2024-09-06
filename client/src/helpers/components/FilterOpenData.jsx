import { Box, Button, Grid, MenuItem, Paper, Select, TextField } from '@mui/material'
import React from 'react'

const FilterOpenData = ({
    toggleDrawer,
    category,
    setCategory,
    location,
    setLocation,
    date,
    setDate,
    handleFilterChange
}) => {
    
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
     <Paper sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} md={3}>
                        <Select
                            fullWidth
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="">Todas las categorías</MenuItem>
                            <MenuItem value="categoria1">Categoria 1</MenuItem>
                            <MenuItem value="categoria2">Categoria 2</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Ubicación"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Fecha"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleFilterChange}>
                            Aplicar Filtros
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
  </Box>
  )
}

export default FilterOpenData