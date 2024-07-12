import React from 'react'

const UseValidation = () => {

    const isCellPhone = (number) => {
        // Expresión regular para validar el formato del número de celular
        //const regex = /^(?:3(?:0[0-5]|[1-9]\d{1})|3[1-2]\d{7})$/;
        const regex = /^3([0-2]|[5])\d{8}$/;

        return regex.test(number);
    };

    // Función para verificar la longitud mínima
    const minLength = (str, length) => {
        return str.length >= length;
    };

    // Función para verificar la longitud máxima
    const maxLength = (str, length) => {
        return str.length <= length;
    };
    const passwordValid = (text) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(text)
    }

    // funcion para colocar primera letra en mayusculas
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return {
        minLength,
        maxLength,
        isCellPhone,
        passwordValid,
        capitalizeFirstLetter
    }
}

export default UseValidation