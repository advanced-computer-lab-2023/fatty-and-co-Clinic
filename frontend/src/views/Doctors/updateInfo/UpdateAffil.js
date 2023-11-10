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
import axios from "axios";

function UpdateAffil() {
  const [Affiliation, setAffiliation] = useState("");
  const toast = useToast();
  const textColor = useColorModeValue("gray.700", "white");
  // const { Username } = useParams();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Affiliation == "") {
      toast({
        title: "Please fill the new affiliation field",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    axios
      .patch(
        API_PATHS.updateAffil,
        { Affiliation },
        { headers: { Authorization } }
      )
      .then((response) => {
        toast({
          title: "Affiliation updated successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setAffiliation(""); // Clear the input field
      })
      .catch((err) => {
        toast({
          title: "Failed to update Affiliation",
          description: "An error occurred while updating the affiliation.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Card
      p="80px"
      marginTop="50px"
      my={{ sm: "24px", lg: "0px" }}
      ms={{ sm: "0px", lg: "24px" }}
    >
      <CardHeader>
        <Flex justify="space-between" align="center" mb="1rem" w="100%">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Change your affiliation!
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
                placeholder="Affiliation"
                value={Affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
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

export default UpdateAffil;
