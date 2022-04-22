export default (state = 0, action) => {
  if (action.type === 'SET_PRICE') {
    return action.payload;
  }

  return state;
};
