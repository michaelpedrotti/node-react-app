/*import { createSlice, configureStore } from '@reduxjs/toolkit';

const sliceFormData = createSlice({
    name: 'formData',
    initialState: {},
    reducers:{
        // Actions
        set: (state, params) => {

            return {...params.payload};
        }
    }
});

export const formDataAction = sliceFormData.actions;


const sliceFormError = createSlice({
    name: 'formError',
    initialState: {},
    reducers:{
        // Actions
        set: (state, params) => {

            return {...params.payload};
        }
    }
});

export const formErrorAction = sliceFormError.actions;

const sliceCategory = createSlice({
    name: 'categories',
    initialState: [

        {id: 1, name: 'Bebida'},
        {id: 2, name: 'Padaria'}
    ],
    reducers:{
        // Actions
        add: (state, params) => {

            return [...state, params.payload];
        },
        set: (state, params) => {

            return [...params.payload];
        }
    }
});

export const categoryActions = sliceCategory.actions;


const slicePermission = createSlice({
    name: 'permission',
    initialState: [],
    reducers:{
        // Actions
        add: (state, params) => {

            return [...state, params.payload];
        },
        set: (state, params) => {

            return [...params.payload];
        }
    }
});

export const permissionAction = sliceCategory.actions;

export default configureStore({

    reducer: {

        categories: sliceCategory.reducer,
        permisssion: slicePermission.reducer,
        formData: sliceFormData.reducer,
        formError: sliceFormError.reducer
    }
});
*/