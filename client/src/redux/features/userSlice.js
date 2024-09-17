import {createSlice} from '@reduxjs/toolkit';

// Función para guardar el token en localStorage
const guardarTokenJWT = (token) => {
    localStorage.setItem('jwtToken', token); // Guardar token en localStorage
};

// Función para obtener el token desde localStorage
const obtenerTokenJWT = () => {
    return localStorage.getItem('jwtToken'); // Obtener token desde localStorage
};

// Función para eliminar el token desde localStorage
const eliminarTokenJWT = () => {
    localStorage.removeItem('jwtToken'); // Eliminar token de localStorage
};
export const userSlice = createSlice({
    name: "user",
    initialState:{
        token : obtenerTokenJWT(),
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
                state.token = "";
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