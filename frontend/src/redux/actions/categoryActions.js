import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from "../constants/messageConstants";
import { GET_CATEGORIES, CREATE_CATEGORY } from "../constants/categoryConstants";
import axios from "axios";
//import { application, json } from "express";



export const getCategories = () => async dispatch => {

    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get('http://localhost:4000/api/category');
        dispatch({ type: STOP_LOADING });
        dispatch({ type: GET_CATEGORIES, payload: response.data.categories });


    } catch (err) {
        console.log('getCategories api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage });
    }


};

export const createCategory = formData => async dispatch => {

    try {
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // };
        dispatch({ type: START_LOADING});
        const response = await axios.post('http://localhost:4000/api/category', formData);
        dispatch({ type: STOP_LOADING});
        dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: response.data.successMessage});
        dispatch({ type: CREATE_CATEGORY, payload: response.data.category});

    } catch (err) {
        console.log('createCategories api error: ', err);
        dispatch({ type: STOP_LOADING});
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage});

    }


};