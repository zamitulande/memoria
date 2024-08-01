import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    categories: localStorage.getItem('categories') || "",
  }

export const TestimonySlice = createSlice({
    name: "testimony",
    initialState,
    reducers:{
        setCategories: (state, action)=>{
            state.categories = action.payload;
            localStorage.setItem('categories', action.payload);
        }
    }
});

export const {setCategories} = TestimonySlice.actions;

export default TestimonySlice.reducer;