export default (state = null, action) => {
  if (action.type === 'POST_ORDER') {
    return action.payload;
  }

  return state;
};
