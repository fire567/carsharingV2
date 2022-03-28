const initialState = [];

export default (state = initialState, action) => {
  if (action.type === 'GET_POINT') {
    return action.payload;
  }

  return state;
};
