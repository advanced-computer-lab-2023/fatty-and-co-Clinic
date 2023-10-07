const doctorModel = require("../models/doctors");
const { default: mongoose } = require("mongoose");

// get a doctor by ID
const getDoctorByID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid ID" });
    return;
  }

  try {
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    const { Name, Speciality, Affiliation, EducationalBackground } = doctor;
    const doctorDetails = {
      Name,
      Speciality,
      Affiliation,
      EducationalBackground,
    };
    res.status(200).json(doctorDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a doctor by username
const getDoctorByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const doctor = await doctorModel.findOne({ Username: username });
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    const { Name, Speciality, Affiliation, EducationalBackground } = doctor;
    const doctorDetails = {
      Name,
      Speciality,
      Affiliation,
      EducationalBackground,
    };
    res.status(200).json(doctorDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get doctor by name and/or speciality (search)
const getDoctorByNameAndSpeciality = async (req, res) => {
  const { Name, Speciality } = req.body;
  try {
    const doctors = await doctorModel.find({
      // Search for documents whose 'Name' field contains the 'Name' variable, if it is not empty
      ...(Name ? { Name: { $regex: Name, $options: "i" } } : {}),
      // Search for documents whose 'Speciality' field contains the 'Speciality' variable, if it is not empty
      ...(Speciality && !Name
        ? { Speciality: { $regex: Speciality, $options: "i" } }
        : {}),
    });
    if (doctors.length === 0 || !doctors) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    // TODO: uncomment this if you want to return only the fields you want
    // const doctorDetails = doctors.map((doctor) => {
    //   const { Name, Speciality, Affiliation, EducationalBackground } = doctor;
    //   return {
    //     Name,
    //     Speciality,
    //     Affiliation,
    //     EducationalBackground,
    //   };
    // });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//filter doctors by speciality or/and (date and time)
const filterDoctor = async (req,res) => { 
  try
    {console.log(req.query);
   const urlParams = new URLSearchParams(req.query);
   var myDoctors = new Array(); 

   console.log(urlParams);

    if (urlParams.has('date')){

      const date = new Date(req.query.date);
      const day = date.getDay();
      const time = date.getHours();

      doctorModel.
      filter(function (el){
      return el.WorkingDays.includes(day) &&
             el.StartTime<=time && 
             el.EndTime>time
      })
      .then((dateDocs)=> {
          if (urlParams.has('speciality')){
            dateDocs.array.forEach(element => {
            if (element.Speciality == req.query.speciality)
            {
              myDoctors.push(element)
            }
            });
          }
          else{
            myDoctors = dateDocs;
          }
          })
      .catch((err) => {
          console.log(err);
          })
    }else{
      if (urlParams.has('speciality')){
        console.log('ana hena');
        myDoctors = doctorModel.find({Speciality: req.body.speciality});
      }
      else{
        //get all doctors.
      }
    }
    res.status(200).json(myDoctors);
  }
  catch(err){
    console.log(err);
  }
}


const filterDoctor2 = async (req, res) => {
 try {
    console.log(req.query);
    const urlParams = new URLSearchParams(req.query);
    var myDoctors = new Array();

    console.log(urlParams);

    if (urlParams.has('date')) {
      const date = new Date(req.query.date);
      const day = date.getDay();
      const time = date.getHours();

      const dateDocs = await doctorModel.find({
        WorkingDays: {$in: [day]},
        StartTime: { $lte: time },
        EndTime: { $gte: time },
      });

      if (urlParams.has('speciality')) {
        dateDocs.forEach((element) => {
          if (element.Speciality == req.query.speciality) {
            myDoctors.push(element);
          }
        });
      } else {
        myDoctors = dateDocs;
      }
    } else {
      if (urlParams.has('speciality')) {
        myDoctors = await doctorModel.find({ Speciality: req.query.speciality });
      } else {
        //get all doctors.
        myDoctors = await doctorModel.find();
      }
    }
    res.status(200).json(myDoctors);
 } catch (err) {
    console.log(err);
 }
};
  
  








   






module.exports = {
  getDoctorByID,
  getDoctorByUsername,
  getDoctorByNameAndSpeciality,
  filterDoctor2,
};
