import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    category: localStorage.getItem('category') || "",
  }

export const TestimonySlice = createSlice({
    name: "testimony",
    initialState,
    reducers:{
        setCategory: (state, action)=>{
            state.category = action.payload;
            localStorage.setItem('category', action.payload);
        }
    }
});

export const {setCategory} = TestimonySlice.actions;

export default TestimonySlice.reducer;