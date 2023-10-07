const { trusted } = require("mongoose");
const appointmentModel = require("../models/appointments");


//filter by  date or status


//Filter by date mengheir time wala be time? 
const getAppointments= async(req,res)=>{
    const current_type="Doctor" //session
    const current_user=req.body.Username //session
    const statusInput= req.body.Status //khod input men el front end
    const dateSearch=req.body.Date   //khod input men el front end
    //Check if both are present
    if( (statusInput===0 || statusInput===1) && dateSearch!=null && !isNaN(new Date(dateSearch))){
        const statusValue=(statusInput===0?false:true)
        const dateValue= new Date(dateSearch)        
        if(dateValue.getUTCHours()===0){
            //Gets all appointments on a certain day
            const result= current_type==="Doctor"?await appointmentModel.find({DoctorUsername:current_user,Status:statusValue,Date:{$lt:new Date(dateValue.getFullYear,dateValue.getMonth,dateValue.getDay+1)},Date:{$gte:dateValue}}) : await appointmentModel.find({PatientUsername:current_user, Status:statusValue,Date:{$lt:new Date(dateValue.getFullYear,dateValue.getMonth,dateValue.getDay+1)},Date:{$gte:dateValue}})
            res.status(200).send(result)
        }
        else{
            // Gets all appointments on a certain day and time
            const result= current_type==="Doctor"?await appointmentModel.find({DoctorUsername:current_user,Status:statusValue,Date:dateValue}) : await appointmentModel.find({PatientUsername:current_user,Status:statusValue, Date:dateValue})
            res.status(200).send(result)
        }
    }

    else if(statusInput==="0" || statusInput==="1"){
    const statusValue=(statusInput==="0"?false:true)
    const result= current_type==="Doctor"?await appointmentModel.find({DoctorUsername:current_user, Status:statusValue}) :await appointmentModel.find({PatientUsername:current_user,Status:statusValue}) 
    res.status(200).send(result)
}
    else if(dateSearch!=null && !isNaN(new Date(dateSearch))){ 
        //Gets date on exact day
        const dateValue= new Date(dateSearch)        
        if(dateValue.getUTCHours()===0){
            //Gets all appointments on a certain day
            const result= current_type==="Doctor"?await appointmentModel.find({DoctorUsername:current_user,Date:{$lt:new Date(dateValue.getFullYear,dateValue.getMonth,dateValue.getDay+1)},Date:{$gte:dateValue}}) : await appointmentModel.find({PatientUsername:current_user, Date:{$lt:new Date(dateValue.getFullYear,dateValue.getMonth,dateValue.getDay+1)},Date:{$gte:dateValue}})
            res.status(200).send(result)
        }
        else{
            // Gets all appointments on a certain day and time
            const result= current_type==="Doctor"?await appointmentModel.find({DoctorUsername:current_user,Date:dateValue}) : await appointmentModel.find({PatientUsername:current_user, Date:dateValue})
            res.status(200).send(result)
        }
      
    }
  
    else {
        res.status(404).send("Error occured")
    }
    



}
module.exports = {getAppointments};
