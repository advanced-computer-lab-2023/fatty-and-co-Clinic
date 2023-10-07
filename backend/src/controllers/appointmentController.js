const { trusted } = require("mongoose");
const appointmentModel = require("../models/appointments");
const { default: mongoose } = require("mongoose");

//filter by  date or status

//Filter by date mengheir time wala be time?
const getAppointments = async (req, res) => {
  const current_type = "Doctor"; //session
  const current_user = "Kholoud"; //session
  const statusInput = ""; //khod input men el front end
  const dateSearch = "2023-06-21T02:53:00.000Z"; //khod input men el front end
  if (statusInput === "Pending" || statusInput === "Done") {
    const statusValue = statusInput === "Pending" ? false : true;
    const result =
      current_type === "Doctor"
        ? await appointmentModel.find({
            DoctorUsername: current_user,
            Status: statusValue,
          })
        : await appointmentModel.find({
            PatientUsername: current_user,
            Status: statusValue,
          });
    res.status(200).send(result);
  } else if (dateSearch != null && !isNaN(new Date(dateSearch))) {
    //Gets date on exact day
    const dateValue = new Date(dateSearch);
    if (dateValue.getUTCHours() === 0) {
      console.log("hena");
      const result =
        current_type === "Doctor"
          ? await appointmentModel.find({
              DoctorUsername: current_user,
              Date: {
                $lt: new Date(
                  dateValue.getFullYear,
                  dateValue.getMonth,
                  dateValue.getDay + 1
                ),
              },
              Date: { $gte: dateValue },
            })
          : await appointmentModel.find({
              PatientUsername: current_user,
              Date: {
                $lt: new Date(
                  dateValue.getFullYear,
                  dateValue.getMonth,
                  dateValue.getDay + 1
                ),
              },
              Date: { $gte: dateValue },
            });
      res.status(200).send(result);
    } else {
      console.log("else part");
      console.log(dateValue.getUTCHours());
      const result =
        current_type === "Doctor"
          ? await appointmentModel.find({
              DoctorUsername: current_user,
              Date: dateValue,
            })
          : await appointmentModel.find({
              PatientUsername: current_user,
              Date: dateValue,
            });
      res.status(200).send(result);
    }
  } else {
    res.status(404).send("Error occured");
  }
};
module.exports = { getAppointments };
