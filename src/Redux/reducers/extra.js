export default (state = {}, action) => {
  if (action.type === "SET_EXTRA") {
    return action.payload;
  }

  return state;
};
