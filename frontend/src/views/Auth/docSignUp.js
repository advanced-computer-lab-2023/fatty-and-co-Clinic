// Chakra imports
import {
    Box,
    Radio,
    Button,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    Input,
    Link,
    Switch,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  // Assets
  import BgSignUp from "assets/img/BgSignUp.png";
  import React from "react";
  import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
  import { useState } from "react";
  import { API_PATHS } from "API/api_paths";
  
  function docSignUp() {
    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [DateOfBirth, setDateOfBirth] = useState("");
    const [HourlyRate, setHourlyRate] = useState("");
    const [Affiliation, setAffiliation] = useState("");
    const [EducationalBackground, setEducationalBackground] = useState("");
    const [Speciality, setSpeciality] = useState("");
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
                Please fill in this registration form to create a
                doctor account and access our services!
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
                            Speciality
                        };
                        const response = await fetch(API_PATHS.docSignUp, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(Request),
                        });
                        const data = await response.json();
                        console.log(data);
                        if (response.ok) {
                            console.log("Doctor request submitted added successfully!");
                            window.location.href = "/auth/signin";
                        } else {
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
            </Flex>
        </Flex>
    </Flex>
    );
}

export default docSignUp;
