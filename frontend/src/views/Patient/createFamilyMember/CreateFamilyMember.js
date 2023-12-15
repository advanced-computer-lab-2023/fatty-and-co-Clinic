import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Input,
  Stack,
  useToast,
  Select,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { API_PATHS } from "API/api_paths";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { formatISO, set } from "date-fns";
import CardHeader from "components/Card/CardHeader.js";
//import { useParams } from "react-router-dom";

import { useAuthContext } from "hooks/useAuthContext";
export function CreateFamilyMember() {
  const [Name, setName] = useState("");
  const [NationalId, setNationalId] = useState("");
  const [Gender, setGender] = useState("");
  const [relation, setRelation] = useState("");
  // new additions because all family membrs will be signed up 
  const [Username,setUsername]=useState("");
  const [Password,setPassword]=useState("");
  const [Email,setEmail]=useState("");
  const [MobileNum,setMobileNum]=useState("");
  const [selectedDate, setSelectedDate] = useState(null); // New state for Date of Birth
  const [EmergencyContactNumber,setEmergencyContactNumber]=useState("");
  const [EmergencyContactName,setEmergencyContactName]=useState("");
  const [Wallet,setWallet]=useState("");
  /*
  Username/,
  Name -,
  Password/,
  Email/,
  MobileNum/,
  NationalId-,
  DateOfBirth/,
  Gender-,
  relation-,
  EmergencyContactNumber/,
  EmergencyContactName/,
  Wallet/, */
  const toast = useToast();
  const [data, setData] = useState([]);

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  // const { Createparameter } = useParams();
  
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the username to the backend for deletion
    try {
      const formattedDate = selectedDate ? formatISO(new Date(selectedDate)) : null;
      const response = await fetch(API_PATHS.createFamilyMember, {
        method: "POST",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username,
          Name,
          Password,
          Email,
          MobileNum,
          NationalId,
          DateOfBirth: formattedDate,
          Gender,
          relation,
          Wallet,

        }),
      });
      const errorData = await response.json();
       if (response.ok) {
        // Handle success or provide feedback to the user
        console.log("Hi");
        toast({
          title: "Family member Added successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        setName(""),
        setNationalId(""),
        setGender(""),
        setRelation(""),
        setUsername(""),
        setPassword(""),setMobileNum(""),setSelectedDate(null),setEmergencyContactName(""),setEmergencyContactNumber("")
        setEmail("");
      } else {
        // Handle errors or provide feedback to the user
        toast({
          title: "Failed to create Familymember",
          description:  errorData.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <Box pt="20px">
      <Flex
        direction="column"
        alignItems="flex-start"
        pt="40px"
        justifyContent="flex-start"
      >
        <Card
          p="30px"
          my={{ sm: "12px", lg: "0px" }}
          ms={{ sm: "0px", lg: "12px" }}
        >
          <CardHeader>
            <Flex justify="space-between" align="center" mb="1rem" w="100%">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Add Family Member
              </Text>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="column" w="100%">
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                <Input
                    variant="filled"
                    type="text"
                    placeholder="Username"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
            
                  />
                      <Input
                    variant="filled"
                    type="text"
                    placeholder="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                    <Input
                    variant="filled"
                    type="passowrd"
                    placeholder="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                
                  />
                  
                  <Input
                    variant="filled"
                    type="text"
                    placeholder="Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
               
                  />
                  <Input
                    variant="filled"
                    type="NationalId"
                    placeholder="National Id"
                    value={NationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    required
               
                  />
                     <Input
                    variant="filled"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    required
                   
                  />
                 
                       <Input
                    variant="filled"
                    type="number"
                    placeholder="Mobile Number "
                    value={MobileNum}
                    onChange={(e) => setMobileNum(e.target.value)}
                    required
                
                  />
                  <Select
                    variant="filled"
                    placeholder="Gender"
                    value={Gender}
                    onChange={(e) => setGender(e.target.value)}
                    isRequired
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Select>
                  <Select
                    variant="filled"
                    placeholder="Relation"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    isRequired
                  >
                    <option value="Child">Child</option>
                    <option value="Spouse">Spouse</option>
                  </Select>
             
                
                  <Button
                    colorScheme="teal"
                    borderColor="teal.300"
                    color="teal.300"
                    fontSize="xs"
                    p="8px 32px"
                    type="submit"
                    textColor="white"
                  >
                    <Icon as={FaUserPlus} mr={2} />
                    Create
                  </Button>
                </Stack>
              </form>
              <Text
                color={textColor}
                fontWeight="medium"
                justify="space-between"
                align="center"
                mt="20px"
                w="100%"
              >
                Your family member already has an account?
                <Link
                  color={titleColor}
                  ms="5px"
                  fontWeight="bold"
                  href="../linkPatient"
                >
                  Link an already existing patient
                </Link>
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
}
