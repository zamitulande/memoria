import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UseValidation from '../../../helpers/hooks/UseValidation';
import SelectCity from '../../../helpers/components/SelectCity';
import SelectDepartment from '../../../helpers/components/SelectDepartment';
import LoadFiles from './LoadFiles';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import axiosClient from '../../../config/Axios';
import { useNavigate } from 'react-router-dom';
import {animateScroll} from 'react-scroll';
import ViewTestimony from '../../../helpers/components/ViewTestimony';

const FormTestimony = ({ userId }) => {

    const getToken = useSelector((state) => state.user.token)

    const navigate = useNavigate();

    const { capitalizeFirstLetter, maxLength, minLength } = UseValidation();

    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEvenDate] = useState("");
    const [city, setCity] = useState("");
    const [department, setDapartmet] = useState("");
    const [descriptionDetail, setDescriptionDetail] = useState("");
    const [files, setFiles] = useState({ audio: [], video: [], image: [] });
    const [path, setPath] = useState("")
    const [resetTrigger, setResetTrigger] = useState(false);


    let municipio;
    if (city) {
        const { name } = city;
        municipio = name;
    }

    const categories = [
        'Conflicto armado',
        'Pandemia',
        'Cultura',
        'Patrimonio alimentario',
        'Conflicto social'
    ];
    useEffect(() => {
        switch (category) {
            case "Conflicto armado":
                setPath("conflicto-armado");
                break;
            case "Pandemia":
                setPath("pandemia");
                break;
            case "Cultura":
                setPath("cultura");
                break;
            case "Patrimonio alimentario":
                setPath("patrimonio-alimentario");
                break;
            case "Conflicto social":
                setPath("conflicto-social");
                break;
            default:
                setPath("default-path"); // Valor de respaldo
                break;
        }
    }, [category]);

    const resetForm = () => {
        setCategory("")
        setTitle("")
        setDescription("")
        setEvenDate("")
        setCity("")
        setDapartmet("")
        setDescriptionDetail("")
        setFiles({ audio: [], video: [], image: [] })
        setResetTrigger((prev) => !prev);
    }

    const isDisable = () => {
        return (
        !title ||
        !minLength(title, 10) ||
        !description ||
        !minLength(description, 30) ||
        !eventDate ||
        !city ||
        !department
        )
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const postTestimony = async () => {
            if (files.image == 0) {
                setOpen(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Debe cargar una imagen",
                });
            }
            if (files.audio.length === 0 && files.video.length === 0 && descriptionDetail.length < 1000) {
                setOpen(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Debe cargar un audio o video o dilenciar el campo descripción detallada",
                });
                
            }
            const { audio, video, image } = files;
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("category", category);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("eventDate", eventDate);
            formData.append("municipio", municipio);
            formData.append("department", department);
            formData.append("descriptionDetail", descriptionDetail);
            formData.append("path", path);
            formData.append("audio", audio[0]);
            formData.append("video", video[0]);
            formData.append("image", image[0]);
            const config = {
                headers: {
                    'Authorization': `Bearer${getToken}`,
                    'content-Type': 'multipart/form-data'
                }
            }
            try {
                const res = await axiosClient.post('/repository/register', formData, config);
                const messageResponse = res.data.message;
                setIsLoading(false)
                setOpen(false)
                resetForm();
                Swal.fire({
                    title: messageResponse,
                    icon: "success",
                    text: "Desea crear otro testimonio para este mismo usuario?",
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                    showCancelButton: true,
                    showCloseButton: true
                  }).then((result)=>{
                    if(!result.isConfirmed){
                        resetForm();
                        navigate('/repositorio')
                    }else{
                        resetForm();
                        animateScroll.scrollToTop()
                    }
                  })
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
                        value={city}
                        setCity={setCity}
                        department={department}
                    //department={action === 'register' ? department : getFormEditar.department}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Alert severity="info">Elige la forma de guardar el testimonio.</Alert>
                    <LoadFiles onFilesChange={handleFilesChange} resetTrigger={resetTrigger}/>
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
                        <Button onClick={(e)=>setOpen(true)} variant="contained" disabled={isDisable()} color='secondary'>Enviar</Button>
                    </Grid>
                </Grid>
                {open && (
                    <ViewTestimony 
                    submit={handleSubmit} 
                    open={open} 
                    setOpen={setOpen} 
                    category={category} 
                    title={title}
                    description={description}
                    eventDate={eventDate}
                    municipio={municipio}
                    department={department}
                    descriptionDetail={descriptionDetail}
                    files={files}/>
                )}
            </Grid>

        </form>
    )
}

export default FormTestimony