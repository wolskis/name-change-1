export {}
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { verify } = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuthenticated = require('./middleware/isAuthenticated');
const Citizen = require('./models/CitizenModel')
const { createAccessToken, createRefreshToken, sendRefreshToken } = require("./middleware/authHelper");

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())

app.use(isAuthenticated);

app.post('/login', async (req, res) => {
    const citizen = await Citizen.findOne({ email: req.body.email })

    if (!citizen) {
        throw new Error('User does not exist')
    }
    
    const checkPassword = await bcrypt.compare(req.body.password, citizen.password)

    if (!checkPassword) {
        throw new Error('Password do not match')
    }

    const token = createAccessToken(citizen)

    sendRefreshToken(res, createRefreshToken(citizen))

     res.cookie('jwt', {ok: true, citizenId: citizen.id, token, tokenExpiration: 1 }, { httpOnly: true })
     return res.send()
})


//making special route for refresh token only
app.post("/refresh_token", async (req, res) => {
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
})

app.use('/graphql', graphqlHTTP((req, res)=> {
    return ({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    context: { req, res}
})}))

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.istcc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
).then(() => {
    console.log('Connected to Mongoose successfully')
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`)
    })
}).catch((err: any) => {
    console.log(err)
})