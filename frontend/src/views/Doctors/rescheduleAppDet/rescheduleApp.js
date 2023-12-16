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
  const history = useHistory();

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  console.log(Authorization);

  const toast = useToast();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const patientUsername = searchParams.get("username");
  const DayName = searchParams.get("day");
  const StartTime = searchParams.get("startTime");
  const DoctorId=searchParams.get("id")

  console.log(DayName)
  console.log(DoctorId)
  console.log(patientUsername)

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
     const url = API_PATHS.validateForDoctor;
    try {
        const response = await axios.get(url, {
          params: { DayName, DateFinal, DoctorId },
          headers: { Authorization },
        });
        if (response.status === 200) {
         console.log(API_PATHS.rescheduleForDoctor)
          try {
            const reschedule = await fetch(API_PATHS.rescheduleForDoctor, {
              method: "POST",
              headers: {
                Authorization,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                patientUsername:patientUsername,
                date: DateFinal,
              }),
            });
    
            const errorData = await reschedule.json();
    
            if (reschedule.ok) {
              toast({
                title: "Rescheduled successfully",
                status: "success",
                description: errorData.success,
                duration: 9000,
                isClosable: true,
              });
              history.push('../viewAppointments');
              window.location.reload();
            } else {
              toast({
                title: "Failed to Reschedule",
                description: errorData.error,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          } catch (error) {
            console.error("An error occurred during Resceduling", error);
          }
        }
      } catch (error) {
        console.error("Error validating booking date", error);
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
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
