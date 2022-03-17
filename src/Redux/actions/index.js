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