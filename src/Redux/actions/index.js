import API from "../../apis/API"

export const setLanguage = (language) => {
    return{
        type: "SET_LANGUAGE",
        payload: language,
    }
}

export const switchMenu = (isOpened) => {
    return{
        type: "SET_MENU",
        payload: isOpened,
    }
}

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