const { trusted } = require("mongoose");
const appointmentModel = require("../models/appointments");


//filter by  date or status

const getAppointments= async(req,res)=>{
    const current_type="Doctor" //session
    const current_user="Touny"   //session
    const statusInput=""   //khod input men el front end
    const dateSearch= "2023-10-06"  //khod input men el front end
    if(statusInput==="Pending" || statusInput==="Done"){
    const statusValue=(statusInput==="Pending"?false:true)
    const result= current_type==="Doctor"?await appointmentModel.find({DoctorUsername:current_user, Status:statusValue}) :await appointmentModel.find({PatientUsername:current_user,Status:statusValue}) 
    res.status(200).send(result)
}
    else if(dateSearch!=null && !isNaN(new Date(dateSearch))){            //Gets date greater than or equal 
        const result= current_type==="Doctor"?await appointmentModel.find({DoctorUsername:current_user,createdAt:{$gte:new Date(dateSearch)}}) : await appointmentModel.find({PatientUsername:current_user, createdAt:new Date(dateSearch)})
        res.status(200).send(result)
    }
  
    else {
        res.status(404).send("Error occured")
    }
    



}
module.exports = {getAppointments};
