const initialState = {
    byIngredient: null
};

const cocktailReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_BY_INGREDIENT":
            return{
                ...state,
                byIngredient:action.payload
            }
        default:
            return state;
    }
}
export default cocktailReducer;