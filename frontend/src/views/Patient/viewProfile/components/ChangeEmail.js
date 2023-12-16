import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  Heading,
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
import axios from "axios";

function ChangeEmail() {
  const [Email, setEmail] = useState("");
  const toast = useToast();
  const textColor = useColorModeValue("gray.700", "white");
  // const { DoctorUsername } = useParams();

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Email == "") {
      toast({
        title: "Please fill the email field",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    axios
      .patch(API_PATHS.updateEmail, { Email }, { headers: { Authorization } })
      .then((response) => {
        toast({
          title: "Email updated successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setEmail(""); // Clear the input field
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Failed to update Email",
          description: err.response.data.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (

      <CardBody>
        <Flex direction="column" w="100%">
          <form onSubmit={handleSubmit}>
            <Stack spacing={20} mb="20px">
                <Heading as='h4' size='md'>
                    New Email
                </Heading>
              <Input
                variant="filled"
                type="email"
                placeholder="New Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                colorScheme="teal"
                borderColor="teal.300"
                color="teal.300"
                p="8px 32px"
                type="submit"
                textColor="white"
                w="100%"
                mb="10"
              >
                Save
              </Button>
            </Stack>
          </form>
        </Flex>
      </CardBody>
  );
}

export default ChangeEmail;
