import React, { useEffect, useState } from "react";
import { Flex, Button, Box, Input, Select } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import AppointmentsTable from "./components/AppointmentsTable";
import { useAuthContext } from "hooks/useAuthContext";
import { useDoctorAppointmentsContext } from "hooks/useDoctorAppointmentsContext";
import { useHistory } from "react-router-dom";
//const redirectUrl = `/patient/payment/?amount=${amount}&description=${description}&PackageName=${PackageName}`;
//history.replace(redirectUrl);
export default function ViewAppointmentsInner() {
  const { appointments, dispatch } = useDoctorAppointmentsContext();
  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Status: "",
    Date: "",
  });
  const [statusSearchValue, setStatusSearchValue] = useState("");
  const [dateSearchValue, setDateSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [patientUsername,setPatientUsername]=useState("");
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const history = useHistory();
  // const { DoctorUsername } = useParams();
  const options = [
    { label: "Cancelled", value: "Cancelled" },
    { label: "Upcoming", value: "Upcoming" },
    { label: "Completed", value: "Completed" },
    { label: "Rescheduled", value: "Rescheduled" },
  ];

  useEffect(() => {
    setIsLoading(true);
    const url = API_PATHS.viewAppointments;
    axios
      .get(url, { params: searchParams, headers: { Authorization } })
      .then((response) => {
        // setData(response.data);
        dispatch({ type: "SET_APPOINTMENTS", payload: response.data });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  const handleRescheduleAppointment=(DoctorUsername,PatientUsername)=>{
   setPatientUsername(PatientUsername);
   const redirectUrl=`/doctor/viewMySlots/?username=${PatientUsername}&doctor=${DoctorUsername}`
   history.replace(redirectUrl)
  }




  const handleSearchButtonClick = () => {
    // Call both search functions with the current search values
    setSearchParams({
      Status: statusSearchValue,
      Date: dateSearchValue,
    });
    console.log(statusSearchValue);
  };

  const handleClrButtonClick = () => {
    setSearchParams({
      Status: "",
      Date: "",
    });
  };

  const handleStatusSearchValueChange = (event) => {
    setStatusSearchValue(event.target.value);
    console.log(statusSearchValue);
  };

  const handleDateSearchValueChange = (event) => {
    setDateSearchValue(event.target.value);
  };

  return (
    <Box pt="80px">
      <Flex
        direction="column"
        alignItems="flex-start"
        pt="50px"
        justifyContent="flex-start"
      >
        <Flex direction="row" alignItems="flex-start">
          <Select
            bg="white"
            onChange={(e) => {
              handleStatusSearchValueChange(e);
            }}
          >
            <option value="">All</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Input
            bg="white"
            type="date"
            placeholder="Filter by Date"
            onChange={handleDateSearchValueChange}
          />
          <Button onClick={handleSearchButtonClick} marginLeft={4}>
            Filter
          </Button>

          <Button onClick={handleClrButtonClick} marginLeft={4}>
            Clear
          </Button>
        </Flex>
        <AppointmentsTable
          title={"Available Appointments"}
          captions={["Patient Name", "Status", "Type", "Date", "Time"]}
          data={appointments}
          isLoading={isLoading}
          handleRescheduleAppointment={handleRescheduleAppointment}
        />
      </Flex>
    </Box>
  );
}
