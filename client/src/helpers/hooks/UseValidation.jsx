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

    // Validar si la persona es mayor de 18 años
    const isAdult = (birthDate) => {
        const selectedDate = new Date(birthDate);
        const currentDate = new Date();

        // Calcular diferencia de años
        const age = currentDate.getFullYear() - selectedDate.getFullYear();
        const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
        const dayDiff = currentDate.getDate() - selectedDate.getDate();

        // Validar si tiene al menos 18 años
        return age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
    };

    return {
        minLength,
        maxLength,
        isCellPhone,
        passwordValid,
        capitalizeFirstLetter,
        isAdult
    }
}

export default UseValidation