import { useState, useEffect } from "react";
import {
  Flex,
  Button,
  Box,
  Text,
  Input,
  Textarea,
  Collapse,
  useDisclosure,
  UseDisclosureProps,
  Select,
  useToast,
} from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { formatISO } from "date-fns";
import { useHistory } from "react-router-dom";

import { useAuthContext } from "hooks/useAuthContext";
import DocSlotAptsTable from "../viewMySlotDetails/DocSlotAptsTable";

export function rescheduleApp() {
  const { isOpen, onToggle } = useDisclosure();
  const [isOpen1, setIsOpen1] = useState(false);

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  console.log(Authorization);

  const toast = useToast();

  const history = useHistory();

  const location = useLocation();
  console.log(location);
  const { state } = location;
  console.log(state);
  let StartTime = state.StartTime;
  let DayName = state.DayName;
  let DoctorId = state.DoctorId;
 


  console.log(state);
  //const username = user.Username;

  console.log(StartTime);
  console.log(DayName);
  console.log(DoctorId);

  
  const [aptDate, setAptDate] = useState(new Date());



  var DateFinal = new Date();

  const dateAptHandler = (event) => {
    setAptDate(event.target.value);
    console.log(event.target.value);
  };

  const dateConfirmHandler = async() => {
    const hourMinString = StartTime.toString().split(":");
    console.log("hourmin: " + hourMinString);
    const bookingDate = new Date(aptDate);
    // console.log((new Date(aptDate)).getFullYear());
    //const formattedDate = formatISO(date);

    const dateToCheck = new Date(
      bookingDate.getFullYear(),
      bookingDate.getMonth(),
      bookingDate.getDate(),
      hourMinString[0],
      hourMinString[1]
    );
    console.log("dateCheck" + dateToCheck);
    DateFinal = formatISO(dateToCheck);

    console.log("dateCheckF" + DateFinal);

    const url = API_PATHS.validateBookingDate;

    axios
      .get(url, {
        params: { DayName, DateFinal, DoctorId },
        headers: { Authorization },
      })
      .then((response) => {
        const url2= API_PATHS.rescheduleForPatient;
        axios.post(url2,{
          params: { patientUsername, DateFinal},
          headers: { Authorization }}).
        then((response)=>{
          if(response.status==200){
          toast({
            title: "Success",
            description: "Appointment rescheduled successfully!",
            status: "success",
            duration: 5000, // Adjust duration as needed
            isClosable: true,
          });}
          else{
            toast({
              title: "Error",
              description: "Cannot reschedule!",
              status: "error",
              duration: 5000, // Adjust duration as needed
              isClosable: true,
            });}
        })
      
      
      
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
 


  return (
    <Box mt="70px">
      <Button
        onClick={() => setIsOpen1(!isOpen1)}
        mt="70px"
        size="lg"
        colorScheme="blue"
      >
        Reshedule for patient
      </Button>

      <Box>
        <Collapse
          in={isOpen1}
          transition={{ exit: { delay: 0.3 }, enter: { duration: 0.5 } }}
        >
          <Box>
            <Input bg="white" type="date" onChange={dateAptHandler} />
            <Button onClick={dateConfirmHandler} colorScheme="green">
              Confirm
            </Button>
          </Box>
        </Collapse>
      </Box>

      
    </Box>
  );
}
export default rescheduleApp;
