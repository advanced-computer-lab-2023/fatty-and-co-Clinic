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
import { useParams } from "react-router-dom";

import { useAuthContext } from "hooks/useAuthContext";
import DocSlotAptsTable from "../viewDoctors/components/DocSlotAptsTable";

export function bookAptDetails() {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  //the doctor id
  const { id } = useParams();
  console.log(id);

  const [famMemOptions, setFamMemOptions] = useState([{}]);

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

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
            <Input
              bg="white"
              type="date"
              //onChange={dateAptHandler}
            />
            <Button
              //onClick={dateConfirmHandler}
              colorScheme="green"
            >
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
            <Input
              bg="white"
              type="date"
              //onChange={dateAptHandler}
            />
            <Select
              size="md"
              //onChange={handleDayNumberToAdd}
            >
              <option value=""></option>
              {famMemOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.key}
                </option>
              ))}
            </Select>

            <Button
              //onClick={dateConfirmHandler}
              colorScheme="green"
            >
              Confirm
            </Button>
          </Box>
        </Collapse>
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
