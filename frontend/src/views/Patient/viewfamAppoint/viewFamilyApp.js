import React, { useEffect, useState } from "react";
import { Flex, Button, Box, Input, Select,useToast , Text,useColorModeValue} from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { FamAppTable } from "./components/FamAppTable";

// window . location . reload 
export function ViewFamilyApp() {
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
    const url = API_PATHS.viewFamAppoint;
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

  const handleCancelAppointment = async (DoctorUsername,PatientUsername) => {
   // e.preventDefault();
   //console.log("DoctorUsername:", DoctorUsername);
   setDoctorUsername(DoctorUsername);

    try {
   
      const response = await fetch(API_PATHS.cancellappointmentfam, {
        method: "PATCH",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
    
        body: JSON.stringify({doctorUsername:DoctorUsername,patientUsername:PatientUsername})
      // body: JSON.stringify({Package2}),
      });

      console.log("Response", response.status);
      const errorData = await response.json();
      if (response.ok) {
        toast({
          title: "Cancelled successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        const timer = setTimeout(() => {
          location.reload();
        }, 500); // 1000ms delay
        window.location.reload();
     
   
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
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Box pt="80px">
      <Flex
        direction="column"
        alignItems="flex-start"
        pt="50px"
        justifyContent="flex-start"
      >
    
        <Flex direction="row" alignItems="flex-start">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                pb=".2rem"
                marginLeft={8}
              >
                Appointments
              </Text>
         
          <Select
               w="150%" h="10" 
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
               w="100%" h="10" 
            bg="white"
            type="date"
            marginLeft={10}
            placeholder="Filter by Date"
            onChange={handleDateSearchValueChange}
          />
      
          <Button
          //  marginLeft="10"
          w="100%" h="10" 
            p="15px 40px"
           textColor="black"
           onClick={handleSearchButtonClick} marginLeft={10}>
            Search
          </Button>

          <Button
          //  marginLeft="10"
          w="100%" h="10" 
          p="15px 40px"
         textColor="black"
           onClick={handleClrButtonClick} marginLeft={10}>
            Clear
          </Button>
        </Flex>

        {/* {(PatientUsername && PatientUsername !== ":PatientUsername" && ( */}
        <FamAppTable
        //  title={"Available Appointments"}
          captions={["Doctor Name","Patient Name", "Status", "Type", "Date", "Time"]}
          data={data}
          isLoading={isLoading}
          handleCancelAppointment={handleCancelAppointment}
        />
        {/* )) || (
                <Text fontSize="3xl" fontWeight="bold">
                  Username not found
                </Text>
              )} */}
      </Flex>
    </Box>
  );
}
