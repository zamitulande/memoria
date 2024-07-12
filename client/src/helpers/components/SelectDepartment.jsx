import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import colombia from '../../helpers/components/colombia.json'

const SelectDepartment = ({ value, onChange }) => {

    return (
        <FormControl color='textField' fullWidth>
            <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Departamento"
                value={value}
                onChange={onChange}
            >
                {colombia.map((option) => (
                    <MenuItem
                        key={option.code}
                        name={option.name}
                        value={option.name}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectDepartment