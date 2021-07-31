const key = 'UserName'
export const setUserName = (name) => {
    localStorage.setItem(key, name)
}
export const getUserName = () => {
    return localStorage.getItem(key)
}