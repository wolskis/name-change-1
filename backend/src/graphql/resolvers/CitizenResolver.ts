const bcrypt = require('bcryptjs')
const Citizen = require('../../models/CitizenModel')
const Name = require('../../models/NameModel')

const { singleName, transformCitizen } = require('./helper')

module.exports = {
    createCitizen: async (args: typeof Citizen) => {

        try {
            const existingCitizen = await Citizen.findOne({ email: args.citizenInput.email })

            if (existingCitizen) {
                throw new Error('Citizen already exists with this email address')
            }

            const existingName = await Name.findOne({ name: args.citizenInput.name, endDate: null })

            if (existingName) {
                throw new Error('This name is already used')
            }

            const hashedPassword = await bcrypt.hash(args.citizenInput.password, 12)

            const citizen = new Citizen({
                email: args.citizenInput.email,
                password: hashedPassword,
            });

            const result = await citizen.save();

            const name = new Name({
                name: args.citizenInput.name,
                citizen: result.id,
                startDate: new Date(),
                endDate: null
            })

            const nameResult = await name.save()

            Citizen.findByIdAndUpdate(
                result.id,
                { currentName: nameResult.id },
                { new: true },
                function (err: any, doc: typeof Citizen) {
                    if (err) {
                        console.log(err)
                    }
                }
            )

            return {
                ...result._doc,
                password: null,
                id: result.id,
                currentName: singleName(nameResult.id),
                pastNames: []
            }
        } catch (err) {
            throw err;
        }
    },
    citizens: async (_,{req}) => {
        // if (!req.isAuth) {
        //     throw new Error('Unauthenticated!');
        // }
        try {
            const citizens = await Citizen.find()
            return citizens.map((citizen: typeof Citizen) => {
                return transformCitizen(citizen)
            })
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getCitizen: async (args, {req}) => {
        // if (!req.isAuth) {
        //     throw new Error('Unauthenticated!');
        // }
        try {
            const citizen = await Citizen.findById(args.id)
            return transformCitizen(citizen)
        } catch (err) {
            console.log(err)
            return false
        }
    },
    deleteCitizens: async () => {
        try {
            await Citizen.deleteMany({})
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    },
    deleteNames: async () => {
        try {
            await Name.deleteMany({})
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    },
}
