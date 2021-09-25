import moment from "moment"

export { }
const Citizen = require('../../models/CitizenModel')
const Name = require('../../models/NameModel')

const { transformName, names, isNameExpiring } = require('./helper')

module.exports = {
    createName: async (args: typeof Name, { req }) => {

        // if (!req.isAuth) {
        //     throw new Error('Unauthenticated!');
        // }
console.log(req)
        try {
            const citizen = await Citizen.findById(req.citizenId)

            if (!citizen) {
                throw new Error('Citizen doesn\'t exist')
            }

            const existingName = await Name.findOne({ name: args.nameInput.name, endDate: null })

            if (existingName) {
                throw new Error('This name is already used')
            }

            const checkPastName = await names(citizen.pastNames)

            const isPastName = checkPastName.find((pastName: typeof Name) => pastName.name === args.nameInput.name)

            if (isPastName) {
                throw new Error('You have already used this name in the past')
            }

            const name = new Name({
                name: args.nameInput.name,
                startDate: new Date(),
                endDate: null,
                citizen: req.citizenId
            })

            const result = await name.save()

            const createdName = transformName(result)

            //update past name for citizen

            const forPastName = await Name.findById(citizen.currentName)

            Name.findByIdAndUpdate(
                forPastName.id,
                { endDate: new Date() },
                { new: true },
                function (err: any, doc: typeof Citizen) {
                    if (err) {
                        console.log(err)
                    }
                }
            )
            citizen.pastNames.push(forPastName)
            citizen.currentName = name
            await citizen.save()

            return createdName
        } catch (err) {
            throw err;
        }
    },
    expiringNames: async () => {
        try {
            const names = await Name.find()

            const availableNames = names.filter((name: typeof Name) => isNameExpiring(name.startDate)) 

            return availableNames.map((name: typeof Name) => {
                return {
                    id: name.id,
                    name: name.name,
                    startDate: new Date(name.startDate).toISOString(),
                    endDate: moment(name.startDate).add(1, 'y').toISOString()
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}
