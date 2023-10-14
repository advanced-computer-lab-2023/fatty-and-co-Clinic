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
function UpdateEmail() {
  const [Email, setEmail] = useState("");
  const toast = useToast();
  const textColor = useColorModeValue("gray.700", "white");
  const { DoctorUsername } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the username to the backend for deletion
    try {
      const response = await fetch(API_PATHS.updateEmailDoc + DoctorUsername, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email }),
      });
      if (Email == "") {
        toast({
          title: "Please fill the email field!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else if (response.ok) {
        // Handle success or provide feedback to the user
        toast({
          title: "Email updated successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        setEmail;
        (""); // Clear the input field
      } else {
        // Handle errors or provide feedback to the user
        toast({
          title: "Failed to update email",
          description:
            "You could be typing an invalid mail or an email that is already registered!",
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Input
                variant="filled"
                type="email"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
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
                <Icon as={FaUserPlus} mr={2} />
                Save
              </Button>
            </Stack>
          </form>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default UpdateEmail;
