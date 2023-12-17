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
import DocSlotAptsTable from "../viewDoctors/components/DocSlotAptsTable";

export function bookAptDetails() {
  const { isOpen, onToggle } = useDisclosure();
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

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
  let Cost = state.Cost;
  let CostFam = state.CostFam;



  console.log(state);
  //const username = user.Username;

  console.log(StartTime);
  console.log(DayName);
  console.log(DoctorId);


  const [aptDate, setAptDate] = useState(new Date());
 
  const [FamMemName, setFamMemName] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]); // State to store the list of family members
  const [selectedFamilyMember, setSelectedFamilyMember] = useState("");

  var DateFinal = new Date();

  const dateAptHandler = (event) => {
    setAptDate(event.target.value);
    console.log(event.target.value);
  };
  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        console.log(API_PATHS.viewFamilyMembers);
        const response = await axios.get(API_PATHS.viewFamilyMembers, { headers: { Authorization } });
       // console.log(API_PATHS.familyMembers);
        console.log(response);
        // Assuming the API response contains an array of family members with 'username' field
        setFamilyMembers(response.data); // Assuming the response is an array of family members
      } catch (error) {
        console.error("Error fetching family members:", error);
        // Handle error fetching family members
      }
    };

    fetchFamilyMembers();
  }, [Authorization]);

  const dateConfirmHandler = () => {
    const hourMinString = StartTime.toString().split(":");
    console.log("hourmin: " + hourMinString);
    const bookingDate = new Date(aptDate);
 

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
     
        toast({
          title: "Valid date !",
          description: `Booked at ${DateFinal} Proceed`,
          status: "success",
          duration: 5000, // Adjust duration as needed
          isClosable: true,
        });
    
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
  const checkOutHandler = () => {
    let newUrl = `../AppointmentConfirmation`;
    let newState = {
      DoctorId: DoctorId,
      Date: DateFinal,
      FamMemName: FamMemName,
      Cost: Cost,
      CostFam: CostFam,
    };

    console.log(user.username);
    console.log(user.Username);
    console.log(user);
    // console.log("hellostate");
    console.log(newState);
    history.push(newUrl, newState);
  };

  // useEffect(() => {
  //   setFamMemOptions([{}]);
  // }, []);

  return (
    <Box mt="70px">
      <Button
        onClick={() => setIsOpen1(!isOpen1)}
        mt="70px"
        size="lg"
        colorScheme="blue"
      >
        Book for me
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

      <Button
        onClick={() => setIsOpen2(!isOpen2)}
        mt="70px"
        size="lg"
        colorScheme="blue"
      >
        Book for fam member
      </Button>

      <Box>
        <Collapse
          in={isOpen2}
          transition={{ exit: { delay: 0.3 }, enter: { duration: 0.5 } }}
        >
          <Box>
            <Input bg="white" type="date" onChange={dateAptHandler} />
            <Select
              bg="white"
              placeholder="Select Family Member"
              onChange={(event) => setFamMemName(event.target.value)}
            >
              {familyMembers.map((member, index) => (
                <option key={index} value={member.Patient.Username}>
                  {member.Patient.Username}
                </option>
              ))}
            </Select>
            <Button onClick={dateConfirmHandler} colorScheme="green">
              Confirm
            </Button>
          </Box>
        </Collapse>
      </Box>
      <Box mt="90px">
        <Button onClick={checkOutHandler} colorScheme="red">
          Proceed to checkout
        </Button>
      </Box>
    </Box>
  );
}
export default bookAptDetails;


