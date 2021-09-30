const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuthenticated = require('./middleware/isAuthenticated');
const { login, refreshToken } = require("./middleware/authHelper");

const app = express();

const {
    MONGO_HOST,
    MONGO_USER,
    MONGO_PASS,
    MONGO_DB,
    MONGO_PORT,
    PORT,
} = process.env;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(isAuthenticated);


app.post('/login',login)
app.post("/refresh_token", refreshToken)

app.use('/graphql', graphqlHTTP((req, res)=> {
    return ({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    context: { req, res}
})}))

mongoose.connect(
    `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    console.log('Connected to Mongoose successfully')
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`)
    })
}).catch((err: any) => {
    console.log(err)
})