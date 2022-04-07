export default (state = null, action) => {
  if (action.type === 'SET_RATE') {
    return action.payload;
  }

  return state;
};
