// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Button,
  Collapse,
  Box,
  Select,
  Th,
  Thead,
  Input,
  Tr,
  Td,
  useColorModeValue,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useAuthContext } from "hooks/useAuthContext";

import { useHistory } from "react-router-dom";
import DocSlotRow from "./DocSlotRow";

function SlotsTable({
  title,
  captions,
  tableData,
  setTableData,
  isLoading,
  day,
}) {
  // const { id } = useParams();

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const textColor = useColorModeValue("gray.700", "white");

  const [StartTimeToUpdate, setStartTimeToUpdate] = useState(0);
  const [StartTimeToAdd, setStartTimeToAdd] = useState(0);
  const [starttmp, setStartTmp] = useState("");
  // const [isChanged, setIsChanged] = useState(false);

  const { isOpen, onToggle } = useDisclosure();
  const [isChanged, setIsChanged] = useState(false);

  const [dayNumber, setDayNumber] = useState(0);
  const options = [
    { key: "Sunday", value: 0 },
    { key: "Monday", value: 1 },
    { key: "Tuesday", value: 2 },
    { key: "Wednesday", value: 3 },
    { key: "Thursday", value: 4 },
    { key: "Friday", value: 5 },
    { key: "Saturday", value: 6 },
  ];
  useEffect(() => {
    const selectedOption = options.find((option) => option.key === day);

    if (selectedOption) {
      setDayNumber(selectedOption.value);
    }
  }, [day]);

  const handleDelete = (row) => {
    const url = API_PATHS.deleteMySlotsDoc + row.SlotId;
    axios
      .delete(url, { headers: { Authorization } })
      .catch((error) => console.log(error));
    setTableData(tableData.filter((element) => element.SlotId !== row.SlotId));
  };

  const handleEditTimeValueChange = (event) => {
    const newStartTimeTmp = event.target.value;
    setStartTmp(newStartTimeTmp);
    const hour_min_array = newStartTimeTmp.toString().split(":");
    const hour = hour_min_array[0];
    const mins = hour_min_array[1];
    const newStartTimeToUpdate = parseFloat(`${hour}.${mins}`);
    setStartTimeToUpdate(newStartTimeToUpdate);
  };
  const handleAddTimeValueChange = (event) => {
    const newStartTimeTmp = event.target.value;
    console.log(newStartTimeTmp);
    console.log(newStartTimeTmp.toString());
    const hour_min_array = newStartTimeTmp.toString().split(":");
    const hour = hour_min_array[0];
    const mins = hour_min_array[1];
    console.log(mins);
    const newStartTimeToAdd = parseFloat(`${hour}.${mins}`);
    console.log(newStartTimeToAdd);
    setStartTimeToAdd(newStartTimeToAdd);
  };
  const handleAddSlotConfirm = async () => {
    const url = API_PATHS.addMySlotsDoc;
    // const slot =
    await axios
      .post(url, null, {
        params: { dayNumber, StartTimeToAdd },
        headers: { Authorization },
      })
      .catch((error) => console.log(error));
    fetchTableData();
    onToggle();
  };

  const handleEditConfirm = (row) => {
    const url = API_PATHS.updateMySlotsDoc + row.SlotId;
    axios
      .patch(url, null, {
        params: { StartTimeToUpdate },
        headers: { Authorization },
      })
      .catch((error) => console.log(error));
    // .then( () => fetchTableData());
    setTableData(
      tableData.map((item) =>
        item.SlotId === row.SlotId ? { ...item, StartTime: starttmp } : item
      )
    );
  };

  const fetchTableData = () => {
    const url = API_PATHS.viewMySlotsDoc;
    axios
      .get(url, { headers: { Authorization } })
      .then((response) => {
        setTableData(response.data);
        console.log("table data:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  };

  return (
    <Table variant="simple" color={textColor}>
      <Thead>
        <Tr my=".8rem" pl="0px">
          {captions.map((caption, idx) => (
            <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
              {caption}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {isLoading ? (
          <Spinner />
        ) : (
          tableData.map((row) => (
            // console.log(row.Username);
            <DocSlotRow
              key={row.id}
              SlotId={row.SlotId}
              Hour={row.StartTime}
              timeValueChangeHandler={() => handleEditTimeValueChange(event)}
              deleteClickHandler={() => handleDelete(row)}
              editConfirmHandler={() => handleEditConfirm(row)}
            />
          ))
        )}
        <Tr>
          <Td>
            <Button onClick={onToggle} colorScheme="teal" size="lg">
              Add a slot
            </Button>
            <Collapse
              in={isOpen}
              transition={{ exit: { delay: 0.3 }, enter: { duration: 0.5 } }}
            >
              <Box maxW="sm">
                <Flex>
                  <Input
                    bg="white"
                    type="time"
                    onChange={handleAddTimeValueChange}
                  />
                  <Button onClick={handleAddSlotConfirm} colorScheme="teal">
                    Confirm
                  </Button>
                </Flex>
              </Box>
            </Collapse>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default SlotsTable;
