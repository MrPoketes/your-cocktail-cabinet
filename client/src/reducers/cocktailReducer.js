const initialState = {
    byIngredient: null,
    fullDrink: null
};

const cocktailReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_BY_INGREDIENT":
            return {
                ...state,
                byIngredient: action.payload
            }
        case "GET_BY_ID":
            let drink = {};
            let ingredients = [];
            let measures = [];
            let obj = action.payload.drinks[0];
            let index = 1;
            while(obj[`strIngredient${index}`]!==null){
                ingredients.push(obj[`strIngredient${index}`]);
                measures.push(obj[`strMeasure${index}`]);
                index++;
            }
            drink = Object.assign({},drink,{
                id: obj.idDrink,
                name:obj.strDrink,
                image:obj.strDrinkThumb,
                category:obj.strCategory,
                alcoholic:obj.strAlcoholic,
                instructions:obj.strInstructions,
                glass:obj.strGlass,
                ingredients:ingredients,
                measures:measures
            });
            return {
                ...state,
                fullDrink: drink
            }
        default:
            return state;
    }
}
export default cocktailReducer;