import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Input,
  useDisclosure,
  FormLabel,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { usePackageContext } from "../hooks/usePackageContext";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";

function HealthRecordForm() {
  const { dispatch } = usePackageContext();
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Session_Discount, setSession_Discount] = useState("");
  const [Medicine_Discount, setMedicine_Discount] = useState("");
  const [Family_Discount, setFamily_Discount] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

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
            Upload new document
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction="column" w="100%">
          <form
            id="myForm"
            action={API_PATHS.uploadFile}
            method="POST"
          >
            <Stack spacing={3}>
            <FormLabel
                htmlFor="IdFile"
                ms="4px"
                fontSize="sm"
                bg="teal.300"
                color="white"
                fontWeight="xsmall"
                w="60%"
                h="45"
                mb="24px"
                borderRadius="15px"
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  paddingTop: "10px",
                }}
              >
                choose file <AttachmentIcon boxSize={3} />
              </FormLabel>
              <Input
                type="file"
                placeholder="..."
                id="IdFile"
                name="IdFile"
                style={{ display: "none" }}
                required
                onChange={(e) => setIdFile(e.target.files[0])}
              />
              
              <Button
                colorScheme="teal"
                borderColor="teal.300"
                color="teal.300"
                fontSize="xs"
                p="8px 32px"
                type="submit"
              >
                Upload
              </Button>
              {/* <input type="submit" value="Submit" /> */}
            </Stack>
          </form>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default HealthRecordForm;
