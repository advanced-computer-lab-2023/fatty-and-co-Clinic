import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import {
  Flex,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
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
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import SlotsTable from "./components/SlotsTable";

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

  const fetchTableData = () => {
    const url = API_PATHS.viewMySlotsDoc;
    setIsLoading(true);
    axios
      .get(url, { headers: { Authorization } })
      .then((response) => {
        setTableData(response.data);
        console.log("hello");
        console.log("table data:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const daysMap = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color="black" fontWeight="bold">
          Slots
        </Text>
      </CardHeader>
      <CardBody px="5px">
        <Tabs
          size="md"
          variant="enclosed"
          onChange={(index) => setSelectedTabIndex(index)}
        >
          <TabList>
            <Tab>Monday</Tab>
            <Tab>Tuesday</Tab>
            <Tab>Wednesday</Tab>
            <Tab>Thursday</Tab>
            <Tab>Friday</Tab>
            <Tab>Saturday</Tab>
            <Tab>Sunday</Tab>
          </TabList>

          <TabPanels>
            {daysMap.map((day, index) => (
              <TabPanel key={day}>
                <SlotsTable
                  captions={["Time", "Edit Slot", "Delete"]}
                  tableData={tableData.filter((item) => item.DayName === day)}
                  setTableData={setTableData}
                  isLoading={isLoading}
                  day={day}
                />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
}
export default UpdateSlots;
