import { createSlice } from '@reduxjs/toolkit';



export const TestimonySlice = createSlice({
    name: "testimony",
    initialState: {
        categories: localStorage.getItem('categories') || "",
        openViewTestimony: false,
        formEditTestimony: [],
        testimonyId: null,
        testimonies: [],
        testimonyIsEnable: null,
        isDelete : false
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
            localStorage.setItem('categories', action.payload);
        },
        setOpenViewTestimony: (state, action) => {
            state.openViewTestimony = action.payload;
        },
        setFormEditTestimony: (state, action) => {
            state.formEditTestimony = action.payload;
        },
        setTestimonyId: (state, action) => {
            state.testimonyId = action.payload;
        },
        setTestimonies: (state, action) => {
            state.testimonies = action.payload;
        },
        clearTestimonies: (state) => { // Nueva acción para limpiar testimonios
            state.testimonies = [];
        },
        setTestimonyIsEnable: (state, action) => {
            state.testimonyIsEnable = !state.testimonyIsEnable;
        },
        setIsDelete: (state, action) =>{
            state.isDelete = action.payload;
        },
    }
});

export const { setCategories,
    setOpenViewTestimony,
    setFormEditTestimony,
    setTestimonyId,
    setTestimonies,
    clearTestimonies,
    setTestimonyIsEnable,
    setIsDelete } = TestimonySlice.actions;

export default TestimonySlice.reducer;