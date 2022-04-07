export default (state = {}, action) => {
  if (action.type === "SET_DATE") {
    return action.payload;
  }

  return state;
};
