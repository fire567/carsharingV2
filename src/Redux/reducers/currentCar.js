export default (state = null, action) => {
  if (action.type === 'SET_CURRENTCAR') {
    return action.payload;
  }

  return state;
};
