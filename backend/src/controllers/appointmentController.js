const appointmentModel = require("../models/appointments");



const getAppointments= async(req,res)=>{
    const statusInput=false
    if(statusInput!=null){
        const result=await appointmentModel.find({Status:statusInput})
        res.status(200).send(result)
    }
    else{
        res.status(404).send("Error occured")
    }
    



}
module.exports = {getAppointments};
