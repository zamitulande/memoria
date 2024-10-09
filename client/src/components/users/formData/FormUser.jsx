import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'

import React, { useState } from 'react'
import axiosClient from '../../../config/Axios'

import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../helpers/components/Loading';
import { useNavigate } from 'react-router-dom';

import Form from './Form';
import { setUserId } from '../../../redux/features/userSlice';
import UseValidation from '../../../helpers/hooks/UseValidation';

const FormUser = ({ action, role }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getFormEditar = useSelector((state) => state.user.formEdit)
    const getToken = useSelector((state) => state.user.token)

    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [identification, setIdentification] = useState("")
    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [firstLastName, setFirstLastName] = useState("")
    const [secondLastName, setSecondLastName] = useState("")
    const [gender, setGender] = useState("");
    const [poblacion, setPoblacion] = useState("");
    const [disability, setDisability] = useState("");
    const [department, setDepartment] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('');

    const [user, setUser] = useState([])

    const [recaptchaIsValid, setRecaptchaIsValid] = useState(false)
    const [conditios, setConditios] = useState(false);

    let municipio;
    if (city) {
        const { name } = city;
        municipio = name;
    }

    const { maxLength, minLength } = UseValidation();

    const resetForm = () => {
        setIdentification("")
        setEmail("")
        setConfirmEmail("")
        setFirstName("")
        setSecondName("")
        setFirstLastName("")
        setSecondLastName("")
        setGender("")
        setPoblacion("")
        setDisability("")
        setPassword("")
        setConfirmPassword("")
        setConditios(false)
        setCity("")
        setDepartment("")
        setContactNumber("")
        setFileName('')
    }

    const isDisable = () => {
        const commonConditions = () => (
            !identification ||
            !minLength(identification, 7) ||
            !firstName ||
            !minLength(firstName, 3) ||
            !firstLastName ||
            !minLength(firstLastName, 3) ||
            !city ||
            !department ||
            !contactNumber
        );
        if (action === 'register') {
            const registerConditions = () => (
                !password ||
                !minLength(password, 8) ||
                !confirmPassword ||
                !minLength(confirmPassword, 8)
            );

            if (role === "ADMIN") {
                return commonConditions() || registerConditions() || !file;
            }

        } else if (action === 'update') {
            return commonConditions();
        }
    }
    const handleSubmitRegisterUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const userData = {
            identification,
            email,
            confirmEmail,
            firstName,
            secondName,
            firstLastName,
            secondLastName,
            gender,
            poblacion,
            disability,
            contactNumber,
            department,
            municipio,
            password,
            confirmPassword
        }
        axiosClient.post('/auth/register', userData)
            .then((response) => {
                const messageResponse = response.data.message;
                resetForm();
                setIsLoading(false)
                Swal.fire({
                    position: "bottom-end",
                    icon: "success",
                    title: messageResponse,
                });
            })
            .catch((error) => {
                setIsLoading(false);
                const errorMessage = error.response.data.message
                Swal.fire({
                    icon: "error",
                    text: errorMessage,
                });
            });
    }

    const handleSubmitRegisterAdmin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const postUser = async () => {
            const formData = new FormData();
            formData.append('identification', identification)
            formData.append('email', email)
            formData.append('confirmEmail', confirmEmail)
            formData.append('firstName', firstName)
            formData.append('secondName', secondName)
            formData.append('firstLastName', firstLastName)
            formData.append('secondLastName', secondLastName)
            formData.append('gender', gender)
            formData.append('poblacion', poblacion)
            formData.append('disability', disability)
            formData.append('contactNumber', contactNumber)
            formData.append('department', department)
            formData.append('municipio', municipio)
            formData.append('password', password)
            formData.append('confirmPassword', confirmPassword)
            formData.append('document', file[0]);
            const config = {
                headers: {
                    'Authorization': `Bearer${getToken}`,
                    'content-Type': 'multipart/form-data'
                }
            }
            try {
                const res = await axiosClient.post('/users/register', formData, config);
                const messageResponse = res.data.message;
                dispatch(setUserId(res.data.id))
                resetForm();
                setIsLoading(false);
                Swal.fire({
                    position: "bottom-end",
                    icon: "success",
                    title: messageResponse,
                });
                navigate('/repositorio/registrar');
            } catch (error) {
                setIsLoading(false);
                const errorMessage = error.response.data.message
                Swal.fire({
                    icon: "error",
                    text: errorMessage,
                });
            }
        }
        postUser();
    }


    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        const updateUser = { ...user }
        updateUser.identification = identification || getFormEditar.identification;
        updateUser.email = email || getFormEditar.email;
        updateUser.confirmEmail = confirmEmail || getFormEditar.confirmEmail;
        updateUser.firstName = firstName || getFormEditar.firstName;
        updateUser.secondName = secondName || getFormEditar.secondName;
        updateUser.firstLastName = firstLastName || getFormEditar.firstLastName;
        updateUser.secondLastName = secondLastName || getFormEditar.secondLastName;
        updateUser.gender = gender || getFormEditar.gender;
        updateUser.disability = disability || getFormEditar.disability;
        updateUser.poblacion = poblacion || getFormEditar.poblacion;
        updateUser.contactNumber = contactNumber || getFormEditar.contactNumber;
        updateUser.department = department || getFormEditar.department;
        updateUser.municipio = municipio || getFormEditar.municipio;

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
                    const response = await axiosClient.put(`users/update/${getFormEditar.userId}`, updateUser, config);
                    Swal.fire("¡Guardado!", "Los cambios han sido guardados exitosamente.", "success");
                    navigate('/usuarios');
                } catch (error) {
                    Swal.fire("Error", error.response.data.message, "error");
                }
            } else if (result.isDenied) {
                Swal.fire("Cambios no guardados", "Los cambios no han sido guardados.", "info");
                navigate('/usuarios');
            }
        });
    }

    return (
        <Box position="relative">
            <Form
                open={open}
                setOpen={setOpen}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showPasswordConfirm={showPasswordConfirm}
                setShowPasswordConfirm={setShowPasswordConfirm}
                identification={identification}
                setIdentification={setIdentification}
                email={email}
                setEmail={setEmail}
                confirmEmail={confirmEmail}
                setConfirmEmail={setConfirmEmail}
                firstName={firstName}
                setFirstName={setFirstName}
                secondName={secondName}
                setSecondName={setSecondName}
                firstLastName={firstLastName}
                setFirstLastName={setFirstLastName}
                secondLastName={secondLastName}
                setSecondLastName={setSecondLastName}
                gender={gender}
                setGender={setGender}
                poblacion={poblacion}
                setPoblacion={setPoblacion}
                disability={disability}
                setDisability={setDisability}
                department={department}
                setDepartment={setDepartment}
                contactNumber={contactNumber}
                setContactNumber={setContactNumber}
                city={city}
                setCity={setCity}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                file={file}
                setFile={setFile}
                recaptchaIsValid={recaptchaIsValid}
                setRecaptchaIsValid={setRecaptchaIsValid}
                conditios={conditios}
                setConditios={setConditios}
                resetForm={resetForm}
                isDisable={isDisable}
                handleSubmitRegisterUser={handleSubmitRegisterUser}
                handleSubmitUpdate={handleSubmitUpdate}
                action={action}
                role={role}
                minLength={minLength}
                maxLength={maxLength}
                handleSubmitRegisterAdmin={handleSubmitRegisterAdmin}
                getFormEditar={getFormEditar}
                fileName={fileName}
                setFileName={setFileName}
            />
            <Loading isLoading={isLoading} />
        </Box >

    )
}

export default FormUser