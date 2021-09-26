export const setAccessToken = (token: string) => {
    localStorage.setItem('token', token)
}

export const getAccessToken = () => {
    return localStorage.getItem('token')
}

export const setCitizenId = (citizenId: string ) => {
    localStorage.setItem('citizenId', citizenId)
}

export const getCitizenId = () => {
    return localStorage.getItem('citizenId')
}
