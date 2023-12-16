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
Spinner 
} from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { formatISO } from "date-fns";
import { useHistory } from "react-router-dom";

import { useAuthContext } from "hooks/useAuthContext";
import DocSlotAptsTable from "../viewDoctors/components/DocSlotAptsTable";

export function reschduleappointment () {
  const { isOpen, onToggle } = useDisclosure();
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;


  const toast = useToast();

  const history = useHistory();

  //the doctor id
  //   const { row } = useParams();
  //   console.log(useParams());
  const location = useLocation();
  console.log(location);
  const { state } = location;
  console.log(state);
  let StartTime = state.StartTime;
  let DayName = state.DayName;
  let DoctorId = state.DoctorId;
  let Cost = state.Cost;
  let CostFam = state.CostFam;
  let PatientUsername=state.PatientUsername;
console.log("DoctorId",DoctorId);
console.log("heree",PatientUsername);

  console.log(state);
  //const username = user.Username;

  console.log(StartTime);
  console.log(DayName);
  console.log(DoctorId);

  const [famMemOptions, setFamMemOptions] = useState([{}]);

  //check if date<new date
  const [aptDate, setAptDate] = useState(new Date());
  const [isFamMember, setIsFamMember] = useState(false);
  const [FamMemName, setFamMemName] = useState(null);


  var DateFinal = new Date();

  const dateAptHandler = (event) => {
    setAptDate(event.target.value);
    console.log(event.target.value);
  };

const dateConfirmHandler = async() => {
  setIsLoading(true); 
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
    try {
        const response = await axios.get(url, {
          params: { DayName, DateFinal, DoctorId },
          headers: { Authorization },
        });
    
        if (response.status === 200) {
        //   toast({
        //     title: "Success",
        //     description: "Valid date proceed",
        //     status: "success",
        //     duration: 5000, // Adjust duration as needed
        //     isClosable: true,
        //   });
    console.log(PatientUsername);
    
          // If the booking date is valid, proceed with cancellation logic
          try {
            const cancelResponse = await fetch(API_PATHS.rescheduleForPatient, {
              method: "POST",
              headers: {
                Authorization,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                DoctorId: DoctorId,
                FamMemName: PatientUsername,
                Date: DateFinal,
              }),
            });
    
            const errorData = await cancelResponse.json();
    
            if (cancelResponse.ok) {
              toast({
                title: "Resceduled successfully",
                status: "success",
                description: errorData.success,
                duration: 9000,
                isClosable: true,
              });
    
            } else {
              toast({
                title: "Failed to Rescedule",
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
  
//   const checkOutHandler = () => {
//     let newUrl = `../AppointmentConfirmation`;
//     let newState = {
//       DoctorId: DoctorId,
//       Date: DateFinal,
//       FamMemName: FamMemName,
//       Cost: Cost,
//       CostFam: CostFam,
//     };

//     console.log(user.username);
//     console.log(user.Username);
//     console.log(user);
//     // console.log("hellostate");
//     console.log(newState);
//     history.push(newUrl, newState);
//   };

  useEffect(() => {
    setFamMemOptions([{}]);
  }, []);

  return (
    <Box mt="70px">
      <Button
        onClick={() => setIsOpen1(!isOpen1)}
        mt="70px"
        size="lg"
        colorScheme="blue"
      >
        reschdule Appointment
      </Button>

      <Box>
        <Collapse
          in={isOpen1}
          transition={{ exit: { delay: 0.3 }, enter: { duration: 0.5 } }}
        >
          <Box>
            <Input bg="white" type="date" onChange={dateAptHandler} />
            <Button onClick={dateConfirmHandler} colorScheme="green">
              confirm
            </Button>
          </Box>
        </Collapse>
      </Box>


      <Box>
        <Collapse
          in={isOpen2}
          transition={{ exit: { delay: 0.3 }, enter: { duration: 0.5 } }}
        >
          <Box>
            <Input bg="white" type="date" onChange={dateAptHandler} />
          
            <Input
              bg="white"
              type="text"
              placeholder="Family Member Name"
              onChange={(event) => setFamMemName(event.target.value)}
            />
            <Button onClick={dateConfirmHandler} colorScheme="green">
              Confirm
            </Button>
          </Box>
        </Collapse>
      </Box>
      {isLoading && (
         <Spinner />
      )}
      <Box mt="90px">
        {/* <Button onClick={checkOutHandler} colorScheme="red">
          Proceed to checkout
        </Button> */}
      </Box>
    </Box>
  );
}
export default reschduleappointment;

{
  /* <Select size="md" 
          //onChange={handleDayNumberToAdd}
          >
            <option value=""></option>
            {famMemOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            ))}
          </Select> */
}
