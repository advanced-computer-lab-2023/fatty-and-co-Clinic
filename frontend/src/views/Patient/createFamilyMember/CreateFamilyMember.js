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
import CardHeader from "components/Card/CardHeader.js";
//import { useParams } from "react-router-dom";
import { useAuthContext } from "hooks/useAuthContext";
export function CreateFamilyMember() {
  const [Name, setName] = useState("");
  const [NationalId, setNationalId] = useState("");
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
  const [Relation, setRelation] = useState("");
  const toast = useToast();
  const [data, setData] = useState([]);

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  // const { Createparameter } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the username to the backend for deletion
    try {
      const response = await fetch(API_PATHS.createFamilyMember, {
        method: "POST",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name,
          NationalId,
          Age,
          Gender,
          Relation,
        }),
      });
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
        setRelation("");
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
                    placeholder="Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    variant="filled"
                    type="NationalId"
                    placeholder="NationalId"
                    value={NationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                  />
                  <Input
                    variant="filled"
                    type="Age"
                    placeholder="Age"
                    value={Age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <Select
                    variant="filled"
                    placeholder="Gender"
                    value={Gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Select>
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
