import API from "../../apis/API"

export const getCities = () => {
    return async (dispatch) => {
        const response = await API.get("city/")

        dispatch({
            type: "GET_CITIES",
            payload: response.data,
        })
    }
}

export const getPoint = () => {
    return async (dispatch) => {
        const response = await API.get("point/")

        dispatch({
            type: "GET_POINT",
            payload: response.data,
        })
    }
}

export const getCategory = () => {
    return async (dispatch) => {
        const response = await API.get("category/")

        dispatch({
            type: "GET_CATEGORY",
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