export default (state = null, action) => {
  if (action.type === 'GET_RATETYPES') {
    return action.payload;
  }

  return state;
};
