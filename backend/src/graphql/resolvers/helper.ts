export { }
const Name = require('../../models/NameModel')
const Citizen = require('../../models/CitizenModel')
const moment = require('moment')

const citizen = async (citizenId: string) => {
  try {
    const citizen = await Citizen.findById(citizenId);
    return transformCitizen(citizen);
  } catch (err) {
    throw err;
  }
};

const names = async (nameIds: typeof Name) => {
  try {
    const names = await Name.find({ _id: { $in: nameIds } });
    return names.map((name:typeof Name) => {
      return transformName(name);
    });
  } catch (err) {
    throw err;
  }
};

const singleName = async (nameId: typeof Name) => {
  try {
      const name = await Name.findById(nameId);
      return transformName(name);
  } catch (err) {
      throw err;
  }
}

const transformName = (name: typeof Name) => {
  return {
    ...name._doc,
    id: name.id,
    citizen: citizen.bind(this,name.citizen),
    startDate: new Date(name._doc.startDate).toISOString(),
    endDate: name._doc.endDate && new Date(name._doc.endDate).toISOString()
  };
};

const transformCitizen = (citizen: typeof Citizen) => {
  return {
    ...citizen._doc,
    id: citizen._id,
    currentName: singleName.bind(this, citizen.currentName),
    pastNames: names.bind(this, citizen._doc.pastNames),
  };
};

const isNameExpiring = (startDate: string) => {

  // const oneYearForName = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
  // const today = new Date()
  // const expiringDate = new Date(new Date().setDate(today.getDate() + 28)).toISOString()

  const yearMoment = moment(startDate, 'mm-dd-yyyy').add(1,'y')
  const todayMoment = moment()
  const expiringDateMoment = moment().add(28, 'days')

  return (yearMoment.isBetween(todayMoment, expiringDateMoment))
}

exports.transformName = transformName;
exports.singleName = singleName;
exports.transformCitizen = transformCitizen;
exports.names = names;
exports.isNameExpiring = isNameExpiring;

