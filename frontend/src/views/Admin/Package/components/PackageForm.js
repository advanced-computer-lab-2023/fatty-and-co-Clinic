import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Input,
  useDisclosure,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { usePackageContext } from "../hooks/usePackageContext";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

function PackageForm() {
  const { dispatch } = usePackageContext();
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Session_Discount, setSession_Discount] = useState("");
  const [Medicine_Discount, setMedicine_Discount] = useState("");
  const [Family_Discount, setFamily_Discount] = useState("");
  const [message, setMessage] = useState("");

  //   const handleSubmit =

  const textColor = useColorModeValue("gray.700", "white");
  const toast = useToast();
  return (
    <Card
      p="22px"
      my={{ sm: "24px", lg: "0px" }}
      ms={{ sm: "0px", lg: "24px" }}
    >
      <CardHeader>
        <Flex justify="space-between" align="center" mb="1rem" w="100%">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Add New Package
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction="column" w="100%">
          <form 
            id="myForm"
            onSubmit={async (e) => {
              e.preventDefault();
              const Package = {
                Name,
                Price,
                Session_Discount,
                Medicine_Discount,
                Family_Discount,
              };

              const response = await fetch("/package/addPackage", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(Package),
              });
              const data = await response.json();
              if (response.ok) {
                dispatch({ type: "ADD_PACKAGE", payload: data });
                setMessage(null);
                setName("");
                setPrice("");
                setSession_Discount("");
                setMedicine_Discount("");
                setFamily_Discount("");
                toast({
                  title: "Package Added.",
                  description: "You Added the package succsefuly.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                document.getElementById("myForm").reset();
              } else {
                setMessage(data.message);
                toast({
                  title: "failed Package Update.",
                  description: "Something went wrong try again.",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}
          >
            <Stack spacing={3}>
              <Input
                variant="filled"
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="Price EGP"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="Session Discount %"
                required
                onChange={(e) => setSession_Discount(e.target.value)}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="Medicine Discount %"
                required
                onChange={(e) => setMedicine_Discount(e.target.value)}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="Family Discount %"
                onChange={(e) => setFamily_Discount(e.target.value)}
              />
              <Button
                colorScheme="teal"
                borderColor="teal.300"
                color="teal.300"
                fontSize="xs"
                p="8px 32px"
                type="submit"
              >
                add
              </Button>
              {/* <input type="submit" value="Submit" /> */}
            </Stack>
          </form>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default PackageForm;
