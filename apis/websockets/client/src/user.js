const user = {name: 'Anonymous'}
export const setUserName = (name) => {
    user.name = name
}
export const getUserName = () => {
    return user.name
}