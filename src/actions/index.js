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
// TODO: add login,register,adding user cocktails, removing user cocktails, getting user cocktails (From backend)


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