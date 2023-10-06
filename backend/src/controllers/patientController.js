const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");
const { default: mongoose } = require("mongoose");
const packageModel = require("../models/packages");
const doctorModel = require("../models/doctors");
const Patient = require("../models/patients");
const { isNull } = require("util");


//view all doctors with speciality and session price 

const session_index = (req,res) => {
    const clinicMarkup = 19;
    const packageDis = 0;
    const patientId = req.params.id;
    patientModel.findById(patientId)
    .then(result => {
        const packageName = result.PackageName;
             if(!packageName == null){
            packageModel.find({Name: packageName})
             .then(result => {
             packageDis = result.SessionDiscount;
            })
             .catch(err => {
            console.log (err);
             })
             }
            
        const mySessions = new Array();
        doctorModel.find().
        then(doctors => {
        doctors.forEach( doctor => {
            const calcCost = (1-(packageDis%100)) * (doctor.HourlyRate +(0.1*clinicMarkup)) 
            mySessions.push({
                 name: doctor.Name,
                speciality: doctor.Speciality,
                cost: calcCost,
                    },)
                })
             } )
             console.log(mySessions);
    })
    .catch(err => {
        console.log(err);
    })
}




module.exports = {session_index};
