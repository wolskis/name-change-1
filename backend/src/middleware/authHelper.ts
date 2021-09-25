const { sign } = require('jsonwebtoken')
const Citizen = require('../models/CitizenModel')

export const createAccessToken = (citizen: typeof Citizen) => {
    return sign({ citizenId: citizen.id, }, process.env.ACCESS_TOKEN_SECRET!, {
            expiresIn: "15m"
        });
}

export const createRefreshToken = (citizen: typeof Citizen) => {
    return  sign({ citizenId: citizen.id, tokenVersion: citizen.tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, {
            expiresIn: "7d"
        });
}

export const sendRefreshToken = (res, token: string) => {
    res.cookie('jwt', token, { httpOnly: true, path: "/refresh_token" })
}
