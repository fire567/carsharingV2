export default (state = null, action) => {
    if(action.type === "GET_CATEGORY") {
        return action.payload;
    }

    return state;
}