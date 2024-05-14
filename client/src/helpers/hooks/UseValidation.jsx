import React from 'react'

const UseValidation = () => {

    const minLength = (text, length) => {
        const regex = new RegExp(`^.{${length},}$`);
        return regex.test(text);
    };

    const maxLength = (text, length) => {
        return text.length <= length;
    };

    return {
        minLength,
        maxLength
    }
}

export default UseValidation