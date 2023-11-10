// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  CircularProgress,
  CircularProgressLabel
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React from "react";
import { useState } from "react";
import { API_PATHS } from "API/api_paths";

function docSignUp() {
  const bgColor = useColorModeValue("white", "gray.700");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [HourlyRate, setHourlyRate] = useState("");
  const [Affiliation, setAffiliation] = useState("");
  const [EducationalBackground, setEducationalBackground] = useState("");
  const [Speciality, setSpeciality] = useState("");
  const [IdFile , setIdFile] = useState("");
  const [MedicalLicense, setMedicalLicense] = useState("");
  const [MedicalDegree , setMedicalDegree] = useState(""); 
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
      ></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          Welcome!
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
        >
          Please fill in this registration form to request creating a doctor
          account and access our services!
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <form
            id="docSignUp"
            onSubmit={async (e) => {
              e.preventDefault();
              const Request = {
                Username,
                Password,
                Email,
                Name,
                DateOfBirth,
                HourlyRate,
                Affiliation,
                EducationalBackground,
                Speciality,
              };
              const formData = new FormData();
              formData.append("Username", Username);
              formData.append("Password", Password);
              formData.append("Email", Email);
              formData.append("Name", Name);
              formData.append("DateOfBirth", DateOfBirth);
              formData.append("HourlyRate", HourlyRate);
              formData.append("Affiliation", Affiliation);
              formData.append("EducationalBackground", EducationalBackground);
              formData.append("Speciality", Speciality);
              formData.append("IdFile", IdFile);
              formData.append("MedicalLicense", MedicalLicense);
              formData.append("MedicalDegree", MedicalDegree);
              onOpen();
              //show spinner on modal while waiting for response
              console.log("IdFile", IdFile);
              console.log("MedicalLicense", MedicalLicense);
              console.log("MedicalDegree", MedicalDegree);
              const response = await fetch(API_PATHS.docSignUp, {
                method: "POST",
                body: formData,
              });
              //const data = response.json();
              if (response.ok) {
                console.log("Doctor request submitted successfully!");
                window.location.href = "/auth/signin";
              } else {
                onClose();
                console.log("Error submitting doctor request!");
              }
            }}
          >
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Username
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="Enter your username"
                mb="24px"
                size="lg"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="password"
                placeholder="Your password"
                mb="24px"
                size="lg"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Email
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="email"
                placeholder="Your email address"
                mb="24px"
                size="lg"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Name
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="Your full name"
                mb="24px"
                size="lg"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Date of Birth
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="date"
                placeholder="..."
                mb="24px"
                size="lg"
                required
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Hourly Rate
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="number"
                placeholder="..."
                mb="24px"
                size="lg"
                required
                onChange={(e) => setHourlyRate(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Affiliation
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="..."
                mb="24px"
                size="lg"
                required
                onChange={(e) => setAffiliation(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Educational Background
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="..."
                mb="24px"
                size="lg"
                required
                onChange={(e) => setEducationalBackground(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Speciality
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="..."
                mb="24px"
                size="lg"
                required
                onChange={(e) => setSpeciality(e.target.value)}
              />
              {/* //////// Upload files ///////// */}
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
                Upload Id <AttachmentIcon boxSize={3} />
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
              <FormLabel
                htmlFor="MedicalLicense"
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
                Upload Medical License <AttachmentIcon boxSize={3} />
              </FormLabel>
              <Input
                type="file"
                placeholder="..."
                id="MedicalLicense"
                name="MedicalLicense"
                style={{ display: "none" }}
                required
                onChange={(e) => setMedicalLicense(e.target.files[0])}
              />
              <FormLabel
                htmlFor="MedicalDegree"
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
                Upload Medical Degree <AttachmentIcon boxSize={3} />
              </FormLabel>
              <Input
                type="file"
                placeholder="..."
                id="MedicalDegree"
                name="MedicalDegree"
                style={{ display: "none" }}
                required
                onChange={(e) => setMedicalDegree(e.target.files[0])}
              />
              {/* ////////////end of upload files //////////// */}
              <Button
                type="submit"
                bg="teal.300"
                fontSize="10px"
                color="white"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
              >
                SUBMIT REQUEST
              </Button>
            </FormControl>
          </form>
          {/* //////// Modal ///////// */}
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} h="200">
            <ModalOverlay />
            <ModalContent>
              <ModalBody>
                This will take a few seconds... <CircularProgress size='20px' isIndeterminate color='green.300' />
              </ModalBody>
            </ModalContent>
          </Modal>
          {/* ////////////end of modal //////////// */}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default docSignUp;
