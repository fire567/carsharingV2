export default (state = null, action) => {
  if (action.type === 'SET_COLOR') {
    return action.payload;
  }
  return state;
};
