export default (state = null, action) => {
  if (action.type === 'GET_CARS') {
    return action.payload;
  }

  return state;
};
