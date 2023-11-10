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
import { useParams } from "react-router-dom";
import { useAuthContext } from "hooks/useAuthContext";
function CancelSubscription() {
  const [PackageName, setPackageName] = useState("");
  const [NationalId, setNationalId] = useState("");
  const toast = useToast();
  const textColor = useColorModeValue("gray.700", "white");

   const { user } = useAuthContext();
   const Authorization = `Bearer ${user.token}`;
   const handleSubscribe = async (e) => {
    e.preventDefault();
  
    try {
      if (PackageName === "") {
        toast({
          title: "Please fill the PackageName field!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return; // Don't proceed further
      } else if (NationalId === "") {
        toast({
          title: "Please fill the NationalId field!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return; // Don't proceed further
      }
  
      const response = await fetch(API_PATHS.subscribepackagefamilymem, {
        method: "POST",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ PackageName, NationalId }),
      });
  
      console.log("Response", response.status);
      const errorData = await response.json();
      if (response.ok) {
        toast({
          title: "Subscribed successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
  
        setPackageName("");
        setNationalId(""); // Clear the input fields
      } else {
        toast({
          title: "Failed to Subscribe",
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
  const handleCancellation = async (e) => {
    e.preventDefault();
  
    try {
      if (PackageName === "") {
        toast({
          title: "Please fill the PackageName field!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return; // Don't proceed further
      } else if (NationalId === "") {
        toast({
          title: "Please fill the NationalId field!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return; // Don't proceed further
      }
  
      const response = await fetch(API_PATHS.CancelFamilysubscribtion, {
        method: "PATCH",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ PackageName, NationalId }),
      });
  
      //console.log("Response", response.status);
      const errorData = await response.json();
  
      if (response.ok) {
        toast({
          title: "Cancelled successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
  
        setPackageName("");
        setNationalId(""); // Clear the input fields
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
  

  return (
    <Card
      p="80px"
      my={{ sm: "24px", lg: "0px" }}
      ms={{ sm: "0px", lg: "24px" }}
    >
      <CardHeader>
        <Flex justify="space-between" align="center" mb="1rem" w="100%">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Change your email!
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction="column" w="100%">
          <form >
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
                subscribe
              </Button>
              <Button
             colorScheme="red"  // Change to red color scheme
             borderColor="red.300"  // Change to red border color
             color="red.300"  // Change to red text color
                fontSize="xs"
                p="8px 32px"
                type="submit"
                textColor="white"
                onClick={handleCancellation}
              >
                <Icon as={FaUserPlus} mr={2} />
                Cancel subscribtion
              </Button>
            </Stack>
          </form>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default CancelSubscription;
