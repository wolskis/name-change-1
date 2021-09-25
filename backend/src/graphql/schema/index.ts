const { buildSchema } = require('graphql')

//Citizen => citizen of the country

module.exports = buildSchema(`
    type Citizen {
        id: ID!
        email: String!
        password: String
        currentName: Name!
        pastNames: [Name!]!
    }

    type Name {
        id: ID!
        name: String!
        citizen: Citizen!
        startDate: String
        endDate: String
    }

    input CitizenInput {
        email: String!
        password: String!
        name: String!
    }

    type AuthData {
        citizenId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input NameInput {
        name: String!
    }

    type NamesOutputResponse {
        id: ID!
        name: String!
        startDate: String!
        endDate: String
    }

    type RootQuery {
        citizens: [Citizen!]!
        expiringNames: [NamesOutputResponse!]!
        getCitizen (id: ID!) : Citizen!
    }
    
    type RootMutation {
        logout: Boolean
        login(email: String!, password:String!): AuthData!
        createCitizen(citizenInput: CitizenInput!): Citizen!
        createName (nameInput: NameInput!): Name!
        deleteNames: Boolean
        deleteCitizens: Boolean
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)