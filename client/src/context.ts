import React from 'react'

export const setAccessToken = (token: string) => {
    window.localStorage.setItem('token', token)
}

export const getAccessToken = () => {
    return window.localStorage.getItem('token')
}

export const setCitizenId = (citizenId: string) => {
    window.localStorage.setItem('citizenId', citizenId)
}

export const getCitizenId = () => {
    return window.localStorage.getItem('citizenId')
}

 


interface IContext {
    token: string | null
    citizenId?: string | null
    login : (token: string | null, citizenId?: string | null) => void
}

export default React.createContext<IContext>({
    token: null,
    citizenId: null,
    login: () => {}
})