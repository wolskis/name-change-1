
export {};
const bcrypt = require('bcryptjs');
const Citizen = require('../../models/CitizenModel')
const { createAccessToken,createRefreshToken, sendRefreshToken } = require('../../middleware/authHelper')

module.exports  = {
    login: async ({ email,password }: {email: string, password: string}, { res }) => {
       const citizen = await Citizen.findOne({ email })

       if (!citizen) {
           throw new Error('User does not exist')
       }
       
       const checkPassword = await bcrypt.compare(password, citizen.password)

       if (!checkPassword) {
           throw new Error('Password do not match')
       }
   
       const token = createAccessToken(citizen)

       sendRefreshToken(res, createRefreshToken(citizen))

       return { citizenId: citizen.id, token, tokenExpiration: 1 }
    },
    logout: (_,{res}) => {
        sendRefreshToken(res, '')
        return true
    }
}