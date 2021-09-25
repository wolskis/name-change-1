const citizenResolver = require('./CitizenResolver')
const authResolver = require('./AuthResolver')
const nameResolver = require('./NameResolver')

module.exports = {
    ...citizenResolver,
    ...authResolver,
    ...nameResolver
} 