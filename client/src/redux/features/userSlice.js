import {createSlice} from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const guardarTokenJWT = (token) => {
    Cookies.set('jwtToken', token, { expires: 0.125 }); //la cookie expirará en 3 horas
};

const obtenerTokenJWT = () => {
    return Cookies.get('jwtToken');
};

const eliminarTokenJWT = () => {
    Cookies.remove('jwtToken');
};

export const userSlice = createSlice({
    name: "user",
    initialState:{
        token : obtenerTokenJWT() || "",
        login: false,
        role: "",
        activeAccount: false
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
        },
        setActiveAccount: (state, action)=>{
            state.activeAccount = action.payload;
        }
    }
});

export const {setToken, setLogin, setRole, setActiveAccount} = userSlice.actions;

export default userSlice.reducer;