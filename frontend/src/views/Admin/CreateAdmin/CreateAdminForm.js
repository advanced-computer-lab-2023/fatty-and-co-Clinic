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

function CreateAdminForm() {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const toast = useToast();

  const textColor = useColorModeValue("gray.700", "white");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the username to the backend for deletion
    try {
      const response = await fetch(API_PATHS.createAdmin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Username, Email, Password }),
      });

      if (response.ok) {
        // Handle success or provide feedback to the user
        toast({
          title: "Admin created successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setUsername(""); // Clear the input field
      } else {
        // Handle errors or provide feedback to the user
        toast({
          title: "Failed to create admin",
          description: "An error occurred while creating the admin.",
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
    <Box pt="80px">
      <Flex
        direction="column"
        alignItems="flex-start"
        pt="50px"
        justifyContent="flex-start"
      >
    <Card
      p="22px"
      my={{ sm: "24px", lg: "0px" }}
      ms={{ sm: "0px", lg: "24px" }}
    >
      <CardHeader>
        <Flex justify="space-between" align="center" mb="1rem" w="100%">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Add Admin
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
              />
              <Input
                variant="filled"
                type="email"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                variant="filled"
                type="password"
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
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
                Create
              </Button>
            </Stack>
          </form>
        </Flex>
      </CardBody>
    </Card>
    </Flex>
    </Box>
  );
}

export default CreateAdminForm;
