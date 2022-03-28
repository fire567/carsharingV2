import API from '../../apis/API';

export const getCities = () => async (dispatch) => {
  const response = await API.get('city/');

  dispatch({
    type: 'GET_CITIES',
    payload: response.data,
  });
};

export const getPoint = () => async (dispatch) => {
  const response = await API.get('point/');

  dispatch({
    type: 'GET_POINT',
    payload: response.data,
  });
};

export const setLocation = (location) => ({
  type: 'SET_LOCATION',
  payload: location,
});
