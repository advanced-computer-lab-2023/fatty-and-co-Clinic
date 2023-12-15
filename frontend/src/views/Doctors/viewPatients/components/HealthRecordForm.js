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
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "../../../../hooks/useAuthContext";

function HealthRecordForm({ PatientUsername }) {
  const { user } = useAuthContext();
  const [file, setFile] = useState(null);
  const [note, setNote] = useState(null);
  const Authorization = `Bearer ${user.token}`;

  const textColor = useColorModeValue("gray.700", "white");
  const toast = useToast();
  return (
    <Card
      p="22px"
      my={{ sm: "24px", lg: "0px" }}
      ms={{ sm: "0px", lg: "24px" }}
    >
      <CardBody>
        <Flex direction="column" w="100%">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            Upload new document
          </Text>
          <form
            id="myForm"
            onSubmit={async (e) => {
              e.preventDefault();
              console.log(file);
              const formData = new FormData();
              if (!file) {
                toast({
                  title: "Choose a file",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
                return;
              }
              formData.append("file", file);
              formData.append("note", note);
              const response = await fetch(
                API_PATHS.uploadFile + PatientUsername,
                {
                  method: "POST",
                  headers: {
                    Authorization,
                  },
                  body: formData,
                }
              );
              const data = await response.json();
              if (response.ok) {
                toast({
                  title: "File uploaded successfully",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
                // location.reload();
                // dispatch({ type: "ADD_PACKAGE", payload: data });
              } else {
                toast({
                  title: "File upload failed",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              }
            }}
          >
            <Stack spacing={1}>
              <FormLabel
                htmlFor="file"
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
                id="file"
                name="file"
                accept=".pdf,.png,.jpg,.jpeg"
                required
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />

              <Input
                type="text"
                id="note"
                name="note"
                placeholder="enter your notes.."
                onChange={(e) => setNote(e.target.value)}
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
