const initialState = [];

export default (state = initialState, action) => {
  if (action.type === 'GET_CITIES') {
    return action.payload;
  }

  return state;
};
