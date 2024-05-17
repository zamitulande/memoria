import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import colombia from '../../helpers/components/colombia.json';
import { FormControl } from '@mui/material';
import { useEffect } from 'react';


const SelectCity = ({ value, setCity, department }) => {

    const cities = colombia
        .filter(option => option.name === department)
        .flatMap(option => option.cities.map(city => ({ code: city[0], name: city[1] })));

    const newCities = cities.map(option => option)

    useEffect(()=>{
        setCity("")
    },[department])

    return (
        <FormControl color='textField' fullWidth required>
            <Autocomplete

                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setCity({
                            name: newValue,
                        });
                    } else if (newValue && newValue.inputValue) {
                        setCity({
                            name: newValue.inputValue,
                        });
                    } else {
                        setCity(newValue);
                    }
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={newCities}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                }}
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label="Municipio"  variant="outlined"/>
                )}
            />
        </FormControl>
    );
}

export default SelectCity;
