const initialState = {
    byIngredient: null,
    fullDrink: null,
    byName: null
};

const cocktailReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_BY_INGREDIENT":
            return {
                ...state,
                byIngredient: action.payload,
                byName: null
            }
        case "GET_BY_ID":
            // Extracting the needed data from the api response
            let drink = {};
            let ingredients = [];
            let measures = [];
            let obj = action.payload.drinks[0];
            let index = 1;

            // Api gives strIngredient1, strIngredient2, ... as strings not in array
            // So this while loop just check if strIngredientN is not null and adds it to the array. N being the index
            // Same with measurements.

            while (obj[`strIngredient${index}`] !== null) {
                ingredients.push(obj[`strIngredient${index}`]);
                measures.push(obj[`strMeasure${index}`]);
                index++;
            }
            drink = Object.assign({}, drink, {
                id: obj.idDrink,
                name: obj.strDrink,
                image: obj.strDrinkThumb,
                category: obj.strCategory,
                alcoholic: obj.strAlcoholic,
                instructions: obj.strInstructions,
                glass: obj.strGlass,
                ingredients: ingredients,
                measures: measures
            });
            return {
                ...state,
                fullDrink: drink
            }
        case "GET_BY_NAME":
            return {
                ...state,
                byName: action.payload,
                byIngredient: null
            }

        // Unmounting
        case "UNMOUNT_BY_INGREDIENT":
            return {
                ...state,
                byIngredient: null
            }
        case "UNMOUNT_BY_NAME":
            return {
                ...state,
                byName: null
            }
        case "UNMOUNT_BY_ID":
            return {
                ...state,
                fullDrink: null
            }
        default:
            return state;
    }
}
export default cocktailReducer;