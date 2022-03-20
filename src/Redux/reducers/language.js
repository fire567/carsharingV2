export default (state = true, action) => {
    if(action.type === "SET_LANGUAGE") {
        return action.payload;
    }

    return state;
}