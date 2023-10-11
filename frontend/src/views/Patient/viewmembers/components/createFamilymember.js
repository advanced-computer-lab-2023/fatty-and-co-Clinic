import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Input,
  Select,
  Stack,
  useToast,
  FormLabel, 
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUserPlus  } from "react-icons/fa";
import { API_PATHS } from "API/api_paths";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";


  
  function createFamilymember() {
    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");
    const [Name, setName] = useState("");
    const [NationalID, setNationalid] = useState("");
    const [Age, setAge] = useState("");
    const [Gender, setGender] = useState("");
    const [Relation, setRelation] = useState("");
    const toast = useToast();
  
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Send the username to the backend for deletion
      try {
        const response = await fetch(API_PATHS.createFamilymember, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Name, NationalId,Age,Gender,Relation}),
        });
  
        if (response.ok) {
          // Handle success or provide feedback to the user
          toast({
            title: "Family member Adedd successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setName(""); // Clear the input field
        } else {
          // Handle errors or provide feedback to the user
          toast({
            title: "Failed to Add the memeber",
            description: "An error occurred while Adding the member.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };
    return (

        <Card
      p="22px"
      my={{ sm: "24px", lg: "0px" }}
      ms={{ sm: "0px", lg: "24px" }}
    >
      <CardHeader>
        <Flex justify="space-between" align="center" mb="1rem" w="100%">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Add Family member
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
                placeholder="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
               <Input
                variant="filled"
                type="NationalId"
                placeholder="NationalId"
                value={NationalID}
                onChange={(e) => setNationalid(e.target.value)}
              />
              <Input
                variant="filled"
                type="Age"
                placeholder="Age"
                value={Age}
                onChange={(e) => setAge(e.target.value)}
              />

<Input
                variant="filled"
                type="Gender"
                placeholder="Gender"
                value={Gender}
                onChange={(e) => setRelation(e.target.value)}
              />
              
               <Input
                variant="filled"
                type="Relation"
                placeholder="Relation"
                value={Relation}
                onChange={(e) => setRelation(e.target.value)}
              />
              
              <Button
                colorScheme="teal"
                borderColor="teal.300"
                color="teal.300"
                fontSize="xs"
                p="8px 32px"
                type="submit"
                textColor="white"
              >
                <Icon as={FaUserPlus } mr={2} />
                Create
              </Button>
            </Stack>
          </form>
        </Flex>
       </CardBody>
       </Card>
    
    );
  }
  
  export default createFamilymember;
  