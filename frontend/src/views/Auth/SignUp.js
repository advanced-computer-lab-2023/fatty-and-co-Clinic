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

const genders = ["M", "F"];

function SignUp() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");
  const [Gender, setGender] = React.useState("M");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const [Username, setUsername] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [EmergencyContactName, setEmergencyContactName] = useState("");
  const [EmergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [MobileNum, setMobileNumber] = useState("");
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
          Please fill in this registration form to create a patient account and
          access our services!
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
          {/* <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Register With
          </Text>
          <HStack spacing="15px" justify="center" mb="22px">
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon
                  as={FaFacebook}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon
                  as={FaApple}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon
                  as={FaGoogle}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
          </HStack>
          <Text
            fontSize="lg"
            color="gray.400"
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            or
          </Text> */}
          <form
            id="signup"
            onSubmit={async (e) => {
              e.preventDefault();
              const Patient = {
                Username,
                Name,
                Email,
                Password,
                DateOfBirth,
                MobileNum,
                Gender,
                EmergencyContactName,
                EmergencyContactNumber,
              };
              const response = await fetch(API_PATHS.signup, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Patient),
              });
              const data = await response.json();
              console.log(data);
              if (response.ok) {
                console.log("Patient added successfully!");
                window.location.href = "/auth/signin";
              } else {
                console.log("Error adding patient!");
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
                Mobile Number
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="number"
                placeholder="Enter a valid number"
                mb="24px"
                size="lg"
                required
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Gender
                </FormLabel>
                {genders.map((gender) => (
                  <Flex key={gender} align="center" ms="10px">
                    <Radio
                      value={gender}
                      isChecked={Gender === gender}
                      onChange={handleGenderChange}
                      required
                    >
                      {gender}
                    </Radio>
                  </Flex>
                ))}
              </FormControl>
              <FormLabel ms="4px" mt="16px" fontSize="sm" fontWeight="normal">
                Emergency Contact Name
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="Please Enter Full Name"
                mb="24px"
                size="lg"
                required
                onChange={(e) => setEmergencyContactName(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Emergency Contact Number
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="number"
                placeholder="Enter a valid phone number"
                mb="24px"
                size="lg"
                value={EmergencyContactNumber}
                required
                onChange={(e) => setEmergencyContactNumber(e.target.value)}
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
                SIGN UP
              </Button>
            </FormControl>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Already have an account?
              <Link
                color={titleColor}
                ms="5px"
                href="./signin "
                fontWeight="bold"
              >
                Sign In
              </Link>
            </Text>
            <Text
              color={textColor}
              fontWeight="medium"
              align="center"
              mb="5px"
              mt="5px"
              textColor="grey"
            >
              OR
            </Text>
            <Text color={textColor} fontWeight="medium">
              Register as a doctor
              <Link
                color={titleColor}
                ms="5px"
                href="./docSignUp"
                fontWeight="bold"
              >
                here
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
