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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { API_PATHS } from "API/api_paths";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { useAuthContext } from "hooks/useAuthContext";
function SubscribePackage() {
  const [PackageName, setPackageName] = useState("");
  // const [PackageName2, setPackageName2] = useState("");
  const [NationalId, setNationalId] = useState("");
  const toast = useToast();
  const textColor = useColorModeValue("gray.700", "white");

   const { user } = useAuthContext();
   const Authorization = `Bearer ${user.token}`;
   const handleSubscribe = async (e) => {
    e.preventDefault();
  
    try {
      if (PackageName === "" ) {
        toast({
          title: "Please fill the PackageName field!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return; // Don't proceed further
      } 
      else if(PackageName!=="" && NationalId===""){
      const response = await fetch(API_PATHS.subscribePackageSelf, {
        method: "PATCH",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({PackageName}),
      });
      const errorData = await response.json();
      if (response.ok) {
        toast({
          title: "Subscription process successfull!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
  } else {
        toast({
          title: "Failed to pay & subscribe",
          description: errorData.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }}
      else if(PackageName!=="" && NationalId!==""){
        const response = await fetch(API_PATHS.subscribePackageFam, {
          method: "PATCH",
          headers: {
            Authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({PackageName,NationalId}),
        });
        const errorData = await response.json();
        if (response.ok) {
          toast({
            title: "Subscription process successfull for family member!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
    } else {
          toast({
            title: "Failed to pay & subscribe for family member!",
            description: errorData.error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }

      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  

  return (
    <Card
      p="80px"
      my={{ sm: "24px", lg: "0px" }}
      ms={{ sm: "0px", lg: "24px" }}
    >
      <CardHeader>
        <Flex justify="space-between" align="center" mb="1rem" w="100%">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Subscribe For Yourself/Family Member
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction="column" w="100%">
          <form >
          <Text>Steps To Subscribe:</Text>
          <Text>1. Yourself by enter package name</Text>
          <Text>2. Your family by entering package name & National ID</Text>
          
          <br/>
            <Stack spacing={3}>
              <Input
                variant="filled"
                type="text"
                placeholder="PackageName"
                value={PackageName}
                onChange={(e) => setPackageName(e.target.value)}
              />
                 <Input
                variant="filled"
                type="NationalId"
                placeholder="NationalId"
                value={NationalId}
                onChange={(e) => setNationalId(e.target.value)}
              />
              <Button
                colorScheme="teal"
                borderColor="teal.300"
                color="teal.300"
                fontSize="xs"
                p="8px 32px"
                type="submit"
                textColor="white"
                onClick={handleSubscribe}
              >
                <Icon as={FaUserPlus} mr={2} />
                Pay with wallet
              </Button>
            </Stack>
          </form>
         
        </Flex>
      </CardBody>
    </Card>
  );
}

export default SubscribePackage;
