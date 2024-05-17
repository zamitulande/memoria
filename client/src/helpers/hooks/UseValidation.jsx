import React from 'react'

const UseValidation = () => {

    const isCellPhone = (number) => {
        // Expresión regular para validar el formato del número de celular
        //const regex = /^(?:3(?:0[0-5]|[1-9]\d{1})|3[1-2]\d{7})$/;
        const regex = /^3([0-2]|[5])\d{8}$/;

        return regex.test(number);
    };

    const minLength = (text, length) => {
        const regex = new RegExp(`^.{${length},}$`);
        return regex.test(text);
    };

    const maxLength = (text, length) => {
        return text.length <= length;
    };

    const passwordValid = (text) =>{
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(text)
    }

    return {
        minLength,
        maxLength,
        isCellPhone,
        passwordValid
    }
}

export default UseValidation