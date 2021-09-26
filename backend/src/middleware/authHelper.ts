const { sign } = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { verify } = require('jsonwebtoken')
const Citizen = require('../models/CitizenModel')

export const createAccessToken = (citizen: typeof Citizen) => {
    return sign({ citizenId: citizen.id }, process.env.ACCESS_TOKEN_SECRET!, {
            expiresIn: "15m"
        });
}

export const createRefreshToken = (citizen: typeof Citizen) => {
    return  sign({ citizenId: citizen.id }, process.env.REFRESH_TOKEN_SECRET!, {
            expiresIn: "7d"
        });
}

export const sendRefreshToken = (res, token: string) => {
    res.cookie('refreshTokenId', token, { httpOnly: true, path: "/refresh_token" })
}

export const login =  async (req, res) => {

    const citizen = await Citizen.findOne({ email: req.body.email })

    
    if (!citizen) {
        return res.send({ error: 'User does not exist' })
    }
    console.log(req.body.email)
    
    const checkPassword = await bcrypt.compare(req.body.password, citizen.password)

    if (!checkPassword) {
        return res.send({ error: 'Password do not match' })
    }

    const token = createAccessToken(citizen)

    sendRefreshToken(res, createRefreshToken(citizen))

    // return res.status(201).json({ citizenId: citizen.id, token})
    //  res.cookie('token', token, {httpOnly: true, path: '/login'})
    // return res.cookie('token',{ citizenId: citizen.id, token}, { httpOnly: true, path: "/login" })
    return res.send({ok:true, token, citizenId: citizen.id })
}

export const refreshToken = async (req, res) => {
    const token = req.cookies.refreshTokenId;

    if (!token) {
        return res.send({ ok: false, accessToken: '' })
    }

    let payload: any = null;

    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
        console.log(err);
        return res.send({ ok: false, accessToken: '' });
    }

    const citizen = await Citizen.findOne({ id: payload.citizenId });

    if (!citizen) {
        return res.send({ ok: false, accessToken: '' });
    }

    if (citizen.tokenVersion !== payload.tokenVersion) {
        return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(citizen));

    return res.send({ ok: true, accessToken: createAccessToken(citizen) });
}