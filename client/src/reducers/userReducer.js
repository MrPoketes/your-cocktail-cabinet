const initialState = {
    login: null,
    register: null,
    userCocktails: null,
    saved: null,
    deleted: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return {
                ...state,
                login: action.payload
            }
        case "REGISTER_USER":
            return {
                ...state,
                register: action.payload
            }
        case "GET_COCKTAILS":
            return {
                ...state,
                userCocktails: action.payload
            }
        case "SAVE_COCKTAIL":
            return {
                ...state,
                saved: action.payload
            }
        case "DELETE_COCKTAIL":
            return {
                ...state,
                deleted: action.payload
            }
        // Unmounting
        case "UNMOUNT_SAVED":
            return {
                ...state,
                saved: null
            }
        case "LOGOUT":
            return {
                ...state,
                login: "Loged out",
                register: null
            }
        case "UNMOUNT_LOGIN":
            return {
                ...state,
                login: null,
            }
        default:
            return state;
    }
}
export default userReducer;