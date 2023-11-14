import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import SlotsTable from "./components/SlotsTable";
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
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";

export function UpdateSlots() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const { isOpen, onToggle } = useDisclosure();

  const [tableData, setTableData] = useState([{}]);
  const [dayNumber, setDayNumber] = useState(0);
  const [StartTimeToAdd, setStartTimeToAdd] = useState(0);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const options = [
    { key: "sunday", value: 0 },
    { key: "monday", value: 1 },
    { key: "tuesday", value: 2 },
    { key: "wednesday", value: 3 },
    { key: "thursday", value: 4 },
    { key: "friday", value: 5 },
    { key: "saturday", value: 6 },
  ];

  const handleDayNumberToAdd = (event) => {
    console.log(event.target.value);
    setDayNumber(Number(event.target.value));
  };

  const handleAddTimeValueChange = (event) => {
    const newStartTimeTmp = event.target.value;
    console.log(newStartTimeTmp);
    console.log(newStartTimeTmp.toString());
    var hour_min_array = newStartTimeTmp.toString().split(":");
    const hour = hour_min_array[0];
    const mins = hour_min_array[1];
    console.log(mins);
    const newStartTimeToAdd = parseFloat(hour + "." + mins);
    console.log(newStartTimeToAdd);
    setStartTimeToAdd(newStartTimeToAdd);
  };

  const fetchTableData = () => {
    const url = API_PATHS.viewMySlotsDoc;
    setIsLoading(true);
    axios
      .get(url, { headers: { Authorization } })
      .then((response) => {
        setTableData(response.data);
        console.log("hello");
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      })
      .finally(() => setIsLoading(false));
  };

  const fetchDataAA = async () => {
    console.log("ana hena");
    if (isChanged) {
      const newTableData = await fetchTableData();
      setTableData(newTableData);
      setIsChanged(false);
    }
    console.log("this is table data" + tableData);
  };

  //TODO: TRY CATCH
  const handleAddSlotConfirm = async () => {
    const url = API_PATHS.addMySlotsDoc;
    //const slot =
    await axios
      .post(url, null, {
        params: { dayNumber, StartTimeToAdd },
        headers: { Authorization },
      })
      .catch((error) => console.log(error));
    fetchTableData();
    //console.log(tableData);
    //if(slot)
    //setIsChanged(true);
  };

  useEffect(() => {
    console.log("ana hena");
    fetchTableData();
  }, []);

  return (
    <Box>
      <Button onClick={onToggle} mt="70px" colorScheme="teal" size="lg">
        Add a slot
      </Button>
      <Collapse
        in={isOpen}
        transition={{ exit: { delay: 0.3 }, enter: { duration: 0.5 } }}
      >
        <Box maxW="sm">
          <Select size="md" onChange={handleDayNumberToAdd}>
            <option value="">All</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            ))}
          </Select>

          <Flex>
            <Input bg="white" type="time" onChange={handleAddTimeValueChange} />
            <Button onClick={handleAddSlotConfirm} colorScheme="green">
              Confirm
            </Button>
          </Flex>
        </Box>
      </Collapse>
      <SlotsTable
        title={"My Slots"}
        captions={["Day", "Hour", "EditTime", "Delete"]}
        tableData={tableData}
        setTableData={setTableData}
        isLoading={isLoading}
      />
    </Box>
  );
}
export default UpdateSlots;
