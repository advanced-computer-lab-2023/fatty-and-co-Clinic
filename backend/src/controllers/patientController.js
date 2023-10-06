const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");
const createFamilymember = async (req, res) => {
    const { Name, NationalId, Age, Gender,Relation } = req.body;
    try {
      const newFamilymember = await familyMemberModel.create({
        Name,
        NationalId,
        Age,
        Gender,
        Relation
      });
      res.status(201).json(newFamilymember);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
module.exports = {createFamilymember};
