import {createSlice} from '@reduxjs/toolkit';



export const TestimonySlice = createSlice({
    name: "testimony",
    initialState:{
        categories: localStorage.getItem('categories') || "",
        openViewTestimony: false,
    },
    reducers:{
        setCategories: (state, action)=>{
            state.categories = action.payload;
            localStorage.setItem('categories', action.payload);
        },
        setOpenViewTestimony: (state, action) =>{
            state.openViewTestimony = action.payload;
        }
    }
});

export const {setCategories, setOpenViewTestimony} = TestimonySlice.actions;

export default TestimonySlice.reducer;