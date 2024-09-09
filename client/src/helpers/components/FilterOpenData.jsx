import { Alert, Box, Button, Container, Grid, MenuItem, Paper, Select, TextField } from '@mui/material'
import React from 'react'
import SelectDepartment from './SelectDepartment';
import SelectCity from './SelectCity';

const FilterOpenData = ({
    category,
    setCategory,
    department,
    setDepartment,
    city,
    setCity,
    evenDateStart,
    setEvenDateStart,
    evenDateEnd,
    setEvenDateEnd,
    handleFilterChange,
}) => {
    
  return (
    <Box sx={{ width: 400 }} role="presentation">
    {/* Filter Section */}
    <Paper sx={{ p: 2, mb: 2 }} >
      <form onSubmit={handleFilterChange}>
                <Grid container >                    
                    <Grid item xs={12} md={10} mt={10}>
                    <Alert severity="info">Filtrar por categoria</Alert>
                        <Select
                            fullWidth
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="">Todas las categorías</MenuItem>
                            <MenuItem value="Conflicto social">Conflicto Social</MenuItem>
                            <MenuItem value="Pandemia">Pandemia</MenuItem>
                            <MenuItem value="Conflicto armado">Conflicto Armado</MenuItem>
                            <MenuItem value="Cultura">Cultura</MenuItem>
                            <MenuItem value="Patrimonio alimentario">Patrimonio Alimentario</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={10} mt={3}>
                    <Alert severity="info">Filtrar por ubicación</Alert>
                    <SelectDepartment
                        value={department}
                        onChange={(e, item) => {
                            setDepartment(e.target.value);
                        }}
                    />
                    </Grid>
                    <Grid item xs={12} md={10} mt={3}>
                    <SelectCity
                        value={city}
                        setCity={setCity}
                        department={department}
                    />
                    </Grid>
                    <Grid item xs={12} md={10} mt={3}>
                    <Alert severity="info">Filtrar por rango fecha</Alert>
                        <TextField
                            fullWidth
                            label="Fecha inicio"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={evenDateStart}
                            onChange={(e) => setEvenDateStart(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={10} mt={3}>
                        <TextField
                            fullWidth
                            label="Fecha Fin"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={evenDateEnd}
                            onChange={(e) => setEvenDateEnd(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} mt={5}>
                        <Button variant="contained" type="submit">
                            Aplicar Filtros
                        </Button>
                    </Grid>
                </Grid>
                </form>
                </Paper>
  </Box>
  )
}

export default FilterOpenData