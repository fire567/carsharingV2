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

export const getCategory = () => {
    return async (dispatch) => {
        const response = await API.get("category/")

        dispatch({
            type: "GET_CATEGORY",
            payload: response.data,
        })
    }
}

export const getCars = () => {
    return async (dispatch) => {
        const response = await API.get("car/", {
            params:{
                limit: 10,
            }
        })

        dispatch({
            type: "GET_CARS",
            payload: response.data,
        })
    }
}

export const setLocation = (location) => {
    return{
        type: "SET_LOCATION",
        payload: location,
    }
}
