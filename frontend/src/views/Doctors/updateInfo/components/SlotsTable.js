// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import DocSlotRow from "components/Tables/DocSlotRow";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useAuthContext } from "hooks/useAuthContext";

import { useHistory } from "react-router-dom";

const SlotsTable = ({
  title,
  captions,
  tableData,
  setTableData,
  isLoading,
}) => {
  //const { id } = useParams();

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const textColor = useColorModeValue("gray.700", "white");

  const [StartTimeToUpdate, setStartTimeToUpdate] = useState(0);
  const [starttmp, setStartTmp] = useState("");
  // const [isChanged, setIsChanged] = useState(false);

  const { isOpen, onToggle } = useDisclosure();

  const handleDelete = (row) => {
    const url = API_PATHS.deleteMySlotsDoc + row.SlotId;
    axios.delete(url, { headers: { Authorization } });
    setTableData(tableData.filter((element) => element.SlotId !== row.SlotId));
  };

  const handleEditTimeValueChange = (event) => {
    const newStartTimeTmp = event.target.value;
    console.log(newStartTimeTmp);
    setStartTmp(newStartTimeTmp);
    console.log(newStartTimeTmp.toString());
    var hour_min_array = newStartTimeTmp.toString().split(":");
    const hour = hour_min_array[0];
    const mins = hour_min_array[1];
    console.log(mins);
    const newStartTimeToUpdate = parseFloat(hour + "." + mins);
    console.log(newStartTimeToUpdate);
    setStartTimeToUpdate(newStartTimeToUpdate);
  };

  const handleEditConfirm = (row) => {
    const url = API_PATHS.updateMySlotsDoc + row.SlotId;
    axios.patch(url, null, {
      params: { StartTimeToUpdate },
      headers: { Authorization },
    });
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
        console.log("hello");
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  };

  // useEffect(() => {
  //   console.log("ana henak");
  //   fetchTableData();
  // }, []);

  return (
    <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {/* title will be All doctors  */}
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        {
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px">
                {captions.map((caption, idx) => {
                  return (
                    <Th
                      color="gray.400"
                      key={idx}
                      ps={idx === 0 ? "0px" : null}
                    >
                      {caption}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <Spinner />
              ) : (
                tableData.map((row) => {
                  //console.log(row.Username);
                  return (
                    <DocSlotRow
                      key={row.id}
                      SlotId={row.SlotId}
                      DayName={row.DayName}
                      Hour={row.StartTime}
                      // isSelected={selectedRow === row}
                      timeValueChangeHandler={() =>
                        handleEditTimeValueChange(event)
                      }
                      deleteClickHandler={() => handleDelete(row)}
                      editConfirmHandler={() => handleEditConfirm(row)}
                    />
                  );
                })
              )}
            </Tbody>
          </Table>
        }
      </CardBody>
    </Card>
  );
};

export default SlotsTable;
