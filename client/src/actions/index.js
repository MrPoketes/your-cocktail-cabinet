export const getByIngredient = (ingredient) => (dispatch) =>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then(res => res.json())
    .then(data =>
        dispatch({
            type:"GET_BY_INGREDIENT",
            payload:data
        }));
}