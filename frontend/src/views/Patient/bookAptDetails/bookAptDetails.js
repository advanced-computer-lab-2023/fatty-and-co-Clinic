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

  const history = useHistory();

  //the doctor id
  //   const { row } = useParams();
  //   console.log(useParams());
  const location = useLocation();
  const { state } = location;
  let StartTime = state.StartTime;
  let DayName = state.DayName;
  let DoctorId = state.DoctorId;

  //const username = user.Username;

  console.log(StartTime);
  console.log(DayName);
  console.log(DoctorId);

  const [famMemOptions, setFamMemOptions] = useState([{}]);

  //check if date<new date
  const [aptDate, setAptDate] = useState(new Date());
  //const [isFamMember, setIsFamMember] = useState(false);
  const [famMemUsername, setFamMemUsername] = useState(null);
  const [famMemName, setFamMemName] = useState(null);


  var DateFinal = new Date();
  const price = 100;

  const dateAptHandler = (event) => {
    setAptDate(event.target.value);
    console.log(event.target.value);
  };

  const dateConfirmHandler = () => {
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
    axios.get(url, {
      params: { DayName, DateFinal, DoctorId },
      headers: { Authorization },
    });
  };
  const checkOutHandler = () => {
    let newUrl = `../AppointmentConfirmation`;
    let newState = {
      DoctorId: DoctorId,
      Date: DateFinal,
      Amount: price,
      FamMemUsername: famMemUsername,
      famMemName: famMemName,
    };

    console.log(user.username);
    console.log(user.Username);
    console.log(user);
    // console.log("hellostate");
    console.log(newState);
    history.push(newUrl, newState);
  };

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
            {/* <Select
              size="md"
             // onChange={handleFamMember}
            >
              <option value=""></option>
              {famMemOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.key}
                </option>
              ))}
            </Select> */}
            <Text>Registered </Text>
            <Input
              bg="white"
              type="text"
              placeholder="Username"
              onChange={(event) => setFamMemUsername(event.target.value)}
            />

            <Text>Unregistered </Text>
            <Input
              bg="white"
              type="text"
              placeholder="Name"
              onChange={(event) => setFamMemName(event.target.value)}
            />
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
