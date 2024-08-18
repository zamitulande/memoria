import {createSlice} from '@reduxjs/toolkit';



export const TestimonySlice = createSlice({
    name: "testimony",
    initialState:{
        categories: localStorage.getItem('categories') || "",
        openViewTestimony: false,
        formEditTestimony: [], 
        testimonyId: null
    },
    reducers:{
        setCategories: (state, action)=>{
            state.categories = action.payload;
            localStorage.setItem('categories', action.payload);
        },
        setOpenViewTestimony: (state, action) =>{
            state.openViewTestimony = action.payload;
        },
        setFormEditTestimony: (state, action) =>{
            state.formEditTestimony = action.payload;
            console.log(action.payload)
        },
        setTestimonyId: (state, action) =>{
            state.testimonyId = action.payload;
        }
    }
});

export const {setCategories, setOpenViewTestimony, setFormEditTestimony, setTestimonyId} = TestimonySlice.actions;

export default TestimonySlice.reducer;