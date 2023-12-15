import React, { useEffect, useState } from "react";
import { Flex, Button, Box, Input, Select,useToast,Text } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import PatientAppTable from "./components/PatientAppTable";
import { useAuthContext } from "hooks/useAuthContext";

export function ViewPatientAppointments() {
  const [DoctorUsername, setDoctorUsername] = useState("");
  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Status: "",
    Date: "",
  });
  const [statusSearchValue, setStatusSearchValue] = useState("");
  const [dateSearchValue, setDateSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  // const { PatientUsername } = useParams();
  const options = [
    { label: "Cancelled", value: "Cancelled" },
    { label: "Upcoming", value: "Upcoming" },
    { label: "Completed", value: "Completed" },
    { label: "Rescheduled", value: "Rescheduled" },
  ];

  useEffect(() => {
    const url = API_PATHS.viewAppointPat;
    setIsLoading(true);
    axios
      .get(url, { params: searchParams, headers: { Authorization } })
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [searchParams]);
  const toast = useToast();

 

  const handleCancelAppointment = async (DoctorUsername) => {
   // e.preventDefault();
   //console.log("DoctorUsername:", DoctorUsername);
   setDoctorUsername(DoctorUsername);

    try {
   
      const response = await fetch(API_PATHS.cancellappointment, {
        method: "PATCH",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
    
        body: JSON.stringify({doctorUsername:DoctorUsername})
      // body: JSON.stringify({Package2}),
      });
  
      console.log("Response", response.status);
      const errorData = await response.json();
      if (response.ok) {
        toast({
          title: "Cancelled successfully",
          status: "success",
      //    description:response.data,
          duration: 9000,
          isClosable: true,
        });
        // const timer = setTimeout(() => {
        //   location.reload();
        // }, 1000); // 1000ms delay
        // window.location.reload();
     
   
      } else {
        toast({
          title: "Failed to Cancel",
          description: errorData.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  const handleSearchButtonClick = () => {
    // Call both search functions with the current search values
    setSearchParams({
      Status: statusSearchValue,
      Date: dateSearchValue,
    });
  };

  const handleClrButtonClick = () => {
    setSearchParams({
      Status: "",
      Date: "",
    });
  };

  const handleStatusSearchValueChange = (event) => {
    setStatusSearchValue(event.target.value);
    console.log(statusSearchValue);
  };

  const handleDateSearchValueChange = (event) => {
    setDateSearchValue(event.target.value);
  };

  return (
    <Box pt="80px">
      <Flex
        direction="column"
        alignItems="flex-start"
        pt="50px"
        justifyContent="flex-start"
      >
        <Flex direction="row" alignItems="flex-start">    <Text
                fontSize="lg"
                color="black"
                fontWeight="bold"
                pb=".2rem"
                marginLeft={8}
              
              >
                Appointments
              </Text>

          <Select
            bg="white"
            marginLeft={10}
            onChange={(e) => {
              handleStatusSearchValueChange(e);
            }}
          >
            <option value="">All</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Input
            bg="white"
            type="date"
            placeholder="Filter by Date"
            marginLeft={10}
            onChange={handleDateSearchValueChange}
          />
          <Button
            colorScheme="teal"
            borderColor="teal.300"
            color="teal.300"
            fontSize="xs"
            p="8px 32px"
           textColor="white"

           onClick={handleSearchButtonClick} marginLeft={10}>
            Search
          </Button>

          <Button
           colorScheme="teal"
            borderColor="teal.500"
            color="teal.500"
            fontSize="xs"
            p="8px 32px"
           textColor="white"
           onClick={handleClrButtonClick} marginLeft={10}>
            Clear
          </Button>
        </Flex>

        {/* {(PatientUsername && PatientUsername !== ":PatientUsername" && ( */}
        <PatientAppTable
          // title={"Your Appointments"}
          captions={["Doctor Name", "Status", "Type", "Date", "Time","Cancell"]}
          data={data}
          isLoading={isLoading}
          handleCancelAppointment={handleCancelAppointment}
        />
      
      </Flex>
    </Box>
  );
}
