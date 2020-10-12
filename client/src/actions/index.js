const axios = require("axios");
require("dotenv").config();
// const url = "https://your-cocktail-cabinet-backend.herokuapp.com" || "http://localhost:8088";
const url = "http://localhost:8088"

export const getByIngredient = (ingredient) => (dispatch) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(res => res.json())
        .then(data =>
            dispatch({
                type: "GET_BY_INGREDIENT",
                payload: data
            }));
}
export const getById = (id) => (dispatch) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data =>
            dispatch({
                type: "GET_BY_ID",
                payload: data
            }))
}
export const getByName = (name) => (dispatch) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data =>
            dispatch({
                type: "GET_BY_NAME",
                payload: data
            }))
}

// Fetching from backend

export const login = (loginUsername, loginPassword) => (dispatch) => {
    axios({
        method: "POST",
        withCredentials: true,
        url: `${url}/api/auth/login`,
        data: {
            username: loginUsername,
            password: loginPassword
        }
    })
        .then(data =>
            dispatch({
                type: "LOGIN_USER",
                payload: data
            }))
}

export const register = (registerUsername, registerPassword) => (dispatch) => {
    axios({
        method: "POST",
        withCredentials: true,
        url: `${url}/api/auth/register`,
        data: {
            username: registerUsername,
            password: registerPassword
        }
    })
        .then(data =>
            dispatch({
                type: "REGISTER_USER",
                payload: data
            }))
}
export const getCocktails = (username) => (dispatch) => {
    fetch(`${url}/api/userCocktails/${username}`)
        .then(res => res.json())
        .then(data =>
            dispatch({
                type: "GET_COCKTAILS",
                payload: data
            }))
}
export const saveCocktail = (loginUsername, drinkName, drinkId, drinkImage) => (dispatch) => {
    axios({
        method: "POST",
        withCredentials: true,
        url: `${url}/api/userCocktails/`,
        data: {
            username: loginUsername,
            name: drinkName,
            id: drinkId,
            image: drinkImage
        }
    })
        .then(data =>
            dispatch({
                type: "SAVE_COCKTAIL",
                payload: data
            }))
}
export const deleteCocktail = (loginUsername, drinkId) => (dispatch) => {
    axios({
        method: "DELETE",
        withCredentials: true,
        url: `${url}/api/userCocktails/delete`,
        data: {
            username: loginUsername,
            id: drinkId
        }
    })
        .then(data =>
            dispatch({
                type: "DELETE_COCKTAIL",
                payload: data
            }))
}

// Unmounting

export const unmountByIngredient = () => (dispatch) => {
    dispatch({
        type: "UNMOUNT_BY_INGREDIENT"
    });
}
export const unmountByName = () => (dispatch) => {
    dispatch({
        type: "UNMOUNT_BY_NAME"
    });
}
export const unmountById = () => (dispatch) => {
    dispatch({
        type: "UNMOUNT_BY_ID"
    });
}
export const unmountSaved = () => (dispatch) => {
    dispatch({
        type: "UNMOUNT_SAVED"
    });
}
export const logout = () => (dispatch) => {
    dispatch({
        type: "LOGOUT"
    })
}
export const unmountLogin = () => (dispatch) => {
    dispatch({
        type: "UNMOUNT_LOGIN"
    })
}