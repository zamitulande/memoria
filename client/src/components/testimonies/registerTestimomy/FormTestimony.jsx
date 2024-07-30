import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import UseValidation from '../../../helpers/hooks/UseValidation';
import SelectCity from '../../../helpers/components/SelectCity';
import SelectDepartment from '../../../helpers/components/SelectDepartment';
import LoadFiles from './LoadFiles';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import axiosClient from '../../../config/Axios';

const FormTestimony = ({ userId }) => {

    const getToken = useSelector((state) => state.user.token)

    const { capitalizeFirstLetter, maxLength, minLength } = UseValidation();

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEvenDate] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [department, setDapartmet] = useState("");
    const [descriptionDetail, setDescriptionDetail] = useState("");
    const [files, setFiles] = useState({ audio: [], video: [], image: [] });

    const categories = [
        'Conflicto armado',
        'Pandemia',
        'Cultura',
        'Patrimonio alimentario',
        'Conflicto social'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        const postTestimony = async () => {
            if (files.image == 0) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Debe cargar una imagen",
                });
            }
            if (files.audio.length === 0 && files.video.length === 0 && descriptionDetail.length < 1000) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Debe cargar un audio o video o dilenciar el campo descripción detallada",
                });
            }
            const { audio, video, image } = files;
            console.log(audio[0])
            const formData = new FormData();
            formData.append("category", category);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("eventDate", eventDate);
            formData.append("municipio", municipio);
            formData.append("department", department);
            formData.append("descriptionDetail", descriptionDetail);
            formData.append("audio", audio[0]);
            formData.append("video", video[0]);
            formData.append("image", image[0]);
            
            
            const config = {
                headers: {
                    'Authorization': `Bearer${getToken}`,
                    'content-Type': 'multipart/form-data'
                }
            }
            console.log(formData)
            try {
                const res = await axiosClient.post('/repository/register', formData, config);
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        postTestimony();
    }

    const handleFilesChange = (updatedFiles) => {
        setFiles(updatedFiles);
    };
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="center">
                <Grid item xs={6}>
                    <FormControl color='textField' fullWidth>
                        <InputLabel id="demo-simple-select-label">Testimonio</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Categoria"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                        >
                            {categories.map((categoryItem, index) => (
                                <MenuItem key={index} value={categoryItem}>
                                    {categoryItem}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Titulo"
                        color='textField'
                        variant="outlined"
                        name="titulo"
                        type='text'
                        required
                        value={title}
                        //defaultValue={action === 'update' ? getFormEditar.secondLastName : undefined}
                        onChange={(e) => setTitle(capitalizeFirstLetter(e.target.value))}
                        fullWidth
                        inputProps={{ maxLength: 41 }}
                        helperText={
                            (!minLength(title, 10) && title)
                                ? "Este campo debe tener al menos 10 caracteres"
                                : (!maxLength(title, 40) && title)
                                    ? "Este campo no puede ser mayor a 40 caracteres"
                                    : ""
                        }
                        FormHelperTextProps={{ sx: { color: "error.main" } }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Descripción corta"
                        color='textField'
                        variant="outlined"
                        name="descripcion"
                        required
                        type='text'
                        value={description}
                        //defaultValue={action === 'update' ? getFormEditar.secondLastName : undefined}
                        onChange={(e) => setDescription(capitalizeFirstLetter(e.target.value))}
                        fullWidth
                        inputProps={{ maxLength: 81 }}
                        helperText={
                            (!minLength(description, 30) && description)
                                ? "Este campo debe tener al menos 30 caracteres"
                                : (!maxLength(description, 80) && description)
                                    ? "Este campo no puede ser mayor a 80 caracteres"
                                    : ""
                        }
                        FormHelperTextProps={{ sx: { color: "error.main" } }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField
                            label="Fecha"
                            type="date"
                            required
                            value={eventDate}
                            onChange={(e) => setEvenDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <SelectDepartment
                        //value={action === 'register' ? department : getFormEditar.department}
                        value={department}
                        onChange={(e, item) => {
                            setDapartmet(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <SelectCity
                        //value={action === 'register' ? city : getFormEditar.municipio}
                        value={municipio}
                        setCity={setMunicipio}
                        department={department}
                    //department={action === 'register' ? department : getFormEditar.department}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Alert severity="info">Elige la forma de guardar el testimonio.</Alert>
                    <LoadFiles onFilesChange={handleFilesChange} />
                </Grid>
                <Grid item xs={12}>
                    <Alert sx={{ mb: 2 }} severity="info">Describe de forma detallada los sucesos del testimonio.</Alert>
                    <TextField
                        id="outlined-multiline-static"
                        label="Descripción detallada"
                        multiline
                        rows={8}
                        color='textField'
                        name="descripcionDetallada"
                        type='text'
                        value={descriptionDetail}
                        //defaultValue={action === 'update' ? getFormEditar.secondLastName : undefined}
                        onChange={(e) => setDescriptionDetail(capitalizeFirstLetter(e.target.value))}
                        fullWidth
                        inputProps={{ maxLength: 3001 }}
                        helperText={
                            (!minLength(descriptionDetail, 1000) && descriptionDetail)
                                ? "Este campo debe tener al menos 1000 caracteres"
                                : (!maxLength(descriptionDetail, 3000) && descriptionDetail)
                                    ? "Este campo no puede ser mayor a 3000 caracteres"
                                    : ""
                        }
                        FormHelperTextProps={{ sx: { color: "error.main" } }}
                    />
                </Grid>
                <Grid
                    container
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center"
                    mt={4}>
                    <Grid>
                        <Button type="submit" variant="contained" color='secondary'>Enviar</Button>
                    </Grid>
                </Grid>
            </Grid>

        </form>
    )
}

export default FormTestimony