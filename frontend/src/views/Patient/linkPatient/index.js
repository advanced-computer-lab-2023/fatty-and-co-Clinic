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
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { API_PATHS } from "API/api_paths";
import { FaUserPlus } from "react-icons/fa";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { useAuthContext } from "hooks/useAuthContext";

export function linkPatient() {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [Id, setId] = useState("");
  const [Relation, setRelation] = useState("");
  const textColor = useColorModeValue("gray.700", "white");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        Id == "" ||
        Relation == ""
      ) {
        toast({
          title: "Please fill all the inputs",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      else {
        const response = await axios.patch(
          API_PATHS.linkPatient,
          {
            Id,
            Relation
          },
          { headers: { Authorization, "Content-Type": "application/json" } },
          { body: JSON.stringify({ Id, Relation }) }
        );
        if (response.status == 200) {
          toast({
            title: "Patient linked successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setId(""),
          setRelation("");
        }
        else {
          toast({
            title: "Failed to link patient",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Patient not found",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the username to the backend for deletion
    try {
      const response = await fetch(
        API_PATHS.createFamilyMember + Createparameter,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name, NationalId, Age, Gender, Relation }),
        }
      );
      if (
        Name == "" ||
        NationalId == "" ||
        Age == "" ||
        Gender == "" ||
        Relation == ""
      ) {
        toast({
          title: "Please fill ALL the inputs",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      if (NationalId.length !== 16) {
        toast({
          title: "National id must be 16",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }

      if (response.ok) {
        // Handle success or provide feedback to the user
        toast({
          title: "Family member Added successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setName(""),
          setNationalId(""),
          setAge(""),
          setGender(""),
          setRelation(""); // Clear the input field
      } else {
        // Handle errors or provide feedback to the user
        toast({
          title: "Failed to create Familymember",
          description: "An error occurred while creating the admin.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };*/

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
                Link Patient
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
                    placeholder="Enter patient's email address or phone number"
                    value={Id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  <Select
                    variant="filled"
                    placeholder="Relation"
                    value={Relation}
                    onChange={(e) => setRelation(e.target.value)}
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
                    Link
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

export default linkPatient;
