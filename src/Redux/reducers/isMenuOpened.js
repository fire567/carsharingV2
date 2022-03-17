export default (state = false, action) => {
    if(action.type === "SET_MENU") {
        return action.payload;
    }

    return state;
}