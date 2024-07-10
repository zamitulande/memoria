import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'

import React, { useState } from 'react'
import axiosClient from '../../../config/Axios'

import Swal from 'sweetalert2';
import Recaptcha from '../../../helpers/components/Recaptcha';


import { useSelector } from 'react-redux';
import Loading from '../../../helpers/components/Loading';
import { useNavigate } from 'react-router-dom';

import Form from './Form';

const FormUser = ({ action, role }) => {

    const navigate = useNavigate();
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
    const [department, setDepartment] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('');

    const [recaptchaIsValid, setRecaptchaIsValid] = useState(false)
    const [conditios, setConditios] = useState(false);

    let municipio;
    if (city) {
        const { name } = city;
        municipio = name;
    }

    // Función para verificar la longitud mínima
    const minLength = (str, length) => {
        return str.length >= length;
    };

    // Función para verificar la longitud máxima
    const maxLength = (str, length) => {
        return str.length <= length;
    };

    const resetForm = () => {
        setIdentification("")
        setEmail("")
        setConfirmEmail("")
        setFirstName("")
        setSecondName("")
        setFirstLastName("")
        setSecondLastName("")
        setPassword("")
        setConfirmPassword("")
        setConditios(false)
        setCity("")
        setDepartment("")
        setContactNumber("")
        setFileName('')
    }

    const isDisable = () => {
        if (action === 'register') {
            return (
                !identification ||
                !minLength(identification, 8) ||
                !firstName ||
                !minLength(firstName, 3) ||
                !firstLastName ||
                !minLength(firstLastName, 3) ||
                !password ||
                !minLength(password, 8) ||
                !city ||
                !department ||
                !contactNumber ||
                !confirmPassword ||
                !minLength(confirmPassword, 8) ||
                !file
            );
        } else if (action === 'update') {
            return (
                !identification ||
                !minLength(identification, 8) ||
                !firstName ||
                !minLength(firstName, 3) ||
                !firstLastName ||
                !minLength(firstLastName, 3) ||
                !city ||
                !department ||
                !contactNumber
            );
        }
    }

    const handleSubmitRegisterUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = {
            identification,
            email,
            confirmEmail,
            firstName,
            secondName,
            firstLastName,
            secondLastName,
            contactNumber,
            department,
            municipio,
            password,
            confirmPassword
        }
        axiosClient.post('/auth/register', user)
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
                console.log(error)
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
            formData.append('contactNumber', contactNumber)
            formData.append('department', department)
            formData.append('municipio', municipio)
            formData.append('password', password)
            formData.append('confirmPassword', confirmPassword)
            formData.append('document', file[0]);
            console.log(formData)
            const config = {
                headers: {
                    'Authorization': `Bearer${getToken}`,
                    'content-Type': 'multipart/form-data'
                }
            }           
            try {
                const res = await axiosClient.post('/users/register', formData, config);
                const messageResponse = res.data.message;
                resetForm();
                setIsLoading(false);
                Swal.fire({
                    position: "bottom-end",
                    icon: "success",
                    title: messageResponse,
                });
            } catch (error) {
                console.log(error)
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
        const updateUser = { ...user };
        updateUser.identification = user.identification || getFormEditar.identification;
        updateUser.email = user.email || getFormEditar.email;
        updateUser.confirmEmail = user.confirmEmail || getFormEditar.confirmEmail;
        updateUser.firstName = user.firstName || getFormEditar.firstName;
        updateUser.secondName = user.secondName || getFormEditar.secondName;
        updateUser.firstLastName = user.firstLastName || getFormEditar.firstLastName;
        updateUser.secondLastName = user.secondLastName || getFormEditar.secondLastName;
        updateUser.contactNumber = user.contactNumber || getFormEditar.contactNumber;
        updateUser.department = user.department || getFormEditar.department;
        updateUser.municipio = user.municipio || getFormEditar.municipio;

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
                    console.log(error)
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