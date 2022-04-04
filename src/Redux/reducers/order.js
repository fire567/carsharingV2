export default (state = null, action) => {
  if (action.type === 'GET_ORDER') {
    return action.payload;
  }

  return state;
};
