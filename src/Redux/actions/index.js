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

export const getCategory = () => {
  return async (dispatch) => {
    const response = await API.get('category/');

    dispatch({
      type: 'GET_CATEGORY',
      payload: response.data,
    });
  };
};

export const getRateTypes = () => {
  return async (dispatch) => {
    const response = await API.get('rate/');

    dispatch({
      type: 'GET_RATETYPES',
      payload: response.data,
    });
  };
};

export const getCars = () => {
  return async (dispatch) => {
    const response = await API.get('car/');

    dispatch({
      type: 'GET_CARS',
      payload: response.data,
    });
  };
};

export const setCurrentCar = (car) => ({
  type: 'SET_CURRENTCAR',
  payload: car,
});

export const setColor = (color) => ({
  type: 'SET_COLOR',
  payload: color,
});

export const setRate = (rate) => ({
  type: 'SET_RATE',
  payload: rate,
});

export const setExtra = (extra) => ({
  type: 'SET_EXTRA',
  payload: extra,
});

export const setDate = (date) => ({
  type: 'SET_DATE',
  payload: date,
});

export const setCurrentPrice = (price) => ({
  type: 'SET_PRICE',
  payload: price,
});

export const postOrder = (data) => {
  return async (dispatch) => {
    const response = await API.post('order/', data);

    dispatch({
      type: 'POST_ORDER',
      payload: response.data,
    });
  };
};
