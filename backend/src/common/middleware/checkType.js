const checkAdmin = async (req, res, next) => {
  if (req.user.Type !== "Admin")
    return res
      .status(401)
      .send({ error: "You have to be an admin to perform this request" });
  next();
};

const checkDoctor = async (req, res, next) => {
  if (req.user.Type !== "Doctor")
    return res
      .status(401)
      .send({ error: "You have to be a doctor to perform this request" });
  next();
};

const checkPatient = async (req, res, next) => {
  if (req.user.Type !== "Patient")
    return res
      .status(401)
      .send({ error: "You have to be a patient to perform this request" });
  next();
};

module.exports = { checkAdmin, checkDoctor, checkPatient };
