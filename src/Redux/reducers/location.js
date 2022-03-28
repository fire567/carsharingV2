export default (state = null, action) => {
  if (action.type === 'SET_LOCATION') {
    return action.payload;
  }

  return state;
};
