import { Alert, Button, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UseValidation from '../../../helpers/hooks/UseValidation';
import SelectCity from '../../../helpers/components/SelectCity';
import SelectDepartment from '../../../helpers/components/SelectDepartment';
import LoadFiles from './LoadFiles';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../../config/Axios';
import { useNavigate } from 'react-router-dom';
import { animateScroll } from 'react-scroll';
import ViewTestimony from '../../../helpers/components/ViewTestimony';
import { setOpenViewTestimony } from '../../../redux/features/TestimonySlice';

const FormTestimony = ({ userId, action }) => {

    const getToken = useSelector((state) => state.user.token)
    const openViewTestimony = useSelector((state) => state.testimony.openViewTestimony)
    const getformEditTestimony = useSelector((state) => state.testimony.formEditTestimony)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { capitalizeFirstLetter, maxLength, minLength } = UseValidation();

    const [isLoading, setIsLoading] = useState(false);

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [evenDate, setEvenDate] = useState("");
    const [city, setCity] = useState("");
    const [department, setDapartmet] = useState("");
    const [descriptionDetail, setDescriptionDetail] = useState("");
    const [files, setFiles] = useState({ audio: [], video: [], image: [] });
    const [path, setPath] = useState("")
    const [resetTrigger, setResetTrigger] = useState(false);
    const [messageResponse, setMessageResponse] = useState("");

    const [testimony, setTestimony] = useState([])

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
            !evenDate ||
            !city ||
            !department
        )
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const postTestimony = async () => {
            if (files.image == 0) {
                dispatch(setOpenViewTestimony(false))
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Debe cargar una imagen",
                });
            }
            if (files.audio.length === 0 && files.video.length === 0 && descriptionDetail.length < 1000) {
                dispatch(setOpenViewTestimony(false))
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
            formData.append("evenDate", evenDate);
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
                dispatch(setOpenViewTestimony(false))
                resetForm();
                Swal.fire({
                    title: messageResponse,
                    icon: "success",
                    text: "Desea crear otro testimonio para este mismo usuario?",
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                    showCancelButton: true,
                    showCloseButton: true
                }).then((result) => {
                    if (!result.isConfirmed) {
                        resetForm();
                        navigate('/repositorio')
                    } else {
                        resetForm();
                        animateScroll.scrollToTop()
                    }
                })
            } catch (error) {
                const messageError = error.response.data.message;
                Swal.fire({
                    icon: "error",
                    title: messageError,
                    customClass: {
                        container: 'my-swal'
                    }
                });
            }
        }
        postTestimony();
    }

    const handleFilesChange = (updatedFiles) => {
        setFiles(updatedFiles);
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        const updateTestimony = { ...testimony }
        updateTestimony.category = category || getformEditTestimony.category;
        updateTestimony.title = title || getformEditTestimony.title;
        updateTestimony.description = description || getformEditTestimony.description;
        updateTestimony.evenDate = evenDate || getformEditTestimony.evenDate;
        updateTestimony.department = department || getformEditTestimony.department;
        updateTestimony.municipio = municipio || getformEditTestimony.municipio;

        Swal.fire({
            title: "¿Quieres guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const config = {
                        headers: {
                            'Authorization': `Bearer${getToken}`
                        }
                    }
                    const response = await axiosClient.put(`repository/update/${getformEditTestimony.testimonyId}`, updateTestimony, config);
                    Swal.fire("¡Guardado!", "Los cambios han sido guardados exitosamente.", "success");
                    //navigate('/usuarios');
                } catch (error) {
                    Swal.fire("Error", error.response.data.message, "error");
                }
            } else if (result.isDenied) {
                Swal.fire("Cambios no guardados", "Los cambios no han sido guardados.", "info");
                //navigate('/usuarios');
            }
        });
    }
    console.log(getformEditTestimony)
    const determineSubmitHandler = () => {
        switch (true) {
            case action === 'register':
                return handleSubmit;
            case action === 'update':
                return handleSubmitUpdate;
            default:
                return (event) => event.preventDefault(); // Default handler
        }
    };

    let messageFiles = ""
    if (action === 'update') {
        messageFiles = <Grid item xs={12}>
            <Alert severity="info">A continuacion se listan los archivos (audio, video o imagen) ya cargados, si desea modificar estos archivos puede seleccionar los nuevo archivos.</Alert>
            <Link href={getformEditTestimony.videoUrl} underline="none">
                {'underline="none"'}
            </Link>
        </Grid>
    }
    return (
        <form onSubmit={determineSubmitHandler()}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="center">
                <Grid item xs={6}>
                    <FormControl color='textField' fullWidth>
                        <InputLabel id="demo-simple-select-label">Testimonio</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Categoria"
                            value={action === 'register' ? category : getformEditTestimony.category}
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
                        value={action === 'register' ? title : undefined}
                        defaultValue={action === 'update' ? getformEditTestimony.title : undefined}
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
                        value={action === 'register' ? description : undefined}
                        defaultValue={action === 'update' ? getformEditTestimony.description : undefined}
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
                            value={action === 'register' ? evenDate : undefined}
                            defaultValue={action === 'update' ? getformEditTestimony.evenDate : undefined}
                            onChange={(e) => setEvenDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <SelectDepartment
                        value={action === 'register' ? department : getformEditTestimony.department}
                        onChange={(e, item) => {
                            setDapartmet(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <SelectCity
                        value={action === 'register' ? city : getformEditTestimony.municipio}
                        setCity={setCity}
                        department={action === 'register' ? department : getformEditTestimony.department}
                    />
                </Grid>
                {messageFiles}
                <Grid item xs={12}>
                    {action === 'register' ?
                        <Alert severity="info">Elige la forma de guardar el testimonio.</Alert>
                        :
                        <Alert severity="info">Elige la forma de editar el testimonio.</Alert>
                    }

                    <LoadFiles
                        onFilesChange={handleFilesChange}
                        resetTrigger={resetTrigger}
                        action={action}
                        videoUpdate={getformEditTestimony.videoUrl}
                        imageUpdate={getformEditTestimony.imageUrl}
                    />
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
                        value={action === 'register' ? descriptionDetail : undefined}
                        defaultValue={action === 'update' ? getformEditTestimony.undefined : undefined}
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
                        <Button onClick={(e) => dispatch(setOpenViewTestimony(true))} variant="contained" disabled={isDisable()} color='secondary'>Enviar</Button>
                    </Grid>
                </Grid>
                {openViewTestimony && (
                    <ViewTestimony
                        submit={handleSubmit}
                        dataPreview={
                            {
                                category,
                                title,
                                description,
                                evenDate,
                                municipio,
                                department,
                                descriptionDetail,
                                files
                            }
                        }
                        action="preview" />
                )}
            </Grid>

        </form>
    )
}

export default FormTestimony