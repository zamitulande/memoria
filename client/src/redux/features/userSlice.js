import {createSlice} from '@reduxjs/toolkit'

const guardarTokenJWT = (token) => {
    localStorage.setItem('jwtToken', token);
};

const obtenerTokenJWT = () => {
    return localStorage.getItem('jwtToken');
};

const eliminarTokenJWT = () => {
    localStorage.removeItem('jwtToken');
};

export const userSlice = createSlice({
    name: "user",
    initialState:{
        token : obtenerTokenJWT() || "",
        login: false,
        role: ""
    },
    reducers:{
        setToken: (state, action)=>{
            state.token = action.payload;
            guardarTokenJWT(action.payload);
        },
        setLogin: (state, action)=>{
            state.login = action.payload;
        },
        setRole: (state, action)=>{
            state.role = action.payload;
        }
    }
});

export const {setToken, setLogin, setRole} = userSlice.actions;

export default userSlice.reducer;