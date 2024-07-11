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
        userName: "",
        userId: null,
        formEdit: [],
        activeAccount: false
    },
    reducers:{
        setToken: (state, action)=>{
            state.token = action.payload;
            guardarTokenJWT(action.payload);
        },
        setLogin: (state, action)=>{
            state.login = action.payload;
            if (!action.payload) {
                eliminarTokenJWT();
                state.role = "";
            }
        },
        setRole: (state, action)=>{
            state.role = action.payload;
        },
        setUserName: (state, action)=>{
            state.userName = action.payload
        },
        setUserId: (state, action)=>{
            state.userId = action.payload;
            console.log(action.payload)
        },
        setFormEdit: (state, action)=>{
            state.formEdit = action.payload;
        },
        setActiveAccount: (state, action)=>{
            state.activeAccount = action.payload;
        }
    }
});

export const {setToken, setLogin, setRole, setUserName, setUserId, setFormEdit, setActiveAccount} = userSlice.actions;

export default userSlice.reducer;