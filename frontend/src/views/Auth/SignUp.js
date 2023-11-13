// Chakra imports
import {
  Box,
  Radio,
  RadioGroup,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Switch,
  Text,
  useColorModeValue,
  useToast,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React from "react";
import { useState } from "react";
import { API_PATHS } from "API/api_paths";

const genders = ["M", "F"];

const SignUpSchema = Yup.object().shape({
  Username: Yup.string().required("Required"),
  Name: Yup.string().required("Required"),
  Email: Yup.string().email("Invalid Email").required("Required").lowercase(),
  Password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
    ),
  DateOfBirth: Yup.date().required("Required"),
  MobileNum: Yup.string()
    .required("Required")
    .length(11, "Invalid Mobile Number"),
  NationalId: Yup.string()
    .required("Required")
    .length(16, "Invalid National ID"),
  Gender: Yup.string()
    .required("Required")
    .oneOf(genders, "Gender must be M or F"),
  EmergencyContactName: Yup.string().required("Required"),
  EmergencyContactNumber: Yup.string()
    .required("Required")
    .length(11, "Invalid Mobile Number")
    .notOneOf(
      [Yup.ref("MobileNum")],
      "Emergency contact number cannot be the same as mobile number"
    ),
});

function SignUp() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");
  // const [Gender, setGender] = React.useState("M");
  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };
  // const [Username, setUsername] = useState("");
  // const [Name, setName] = useState("");
  // const [Email, setEmail] = useState("");
  // const [Password, setPassword] = useState("");
  // const [DateOfBirth, setDateOfBirth] = useState("");
  // const [NationalId, setNationalId] = useState("");
  // const [EmergencyContactName, setEmergencyContactName] = useState("");
  // const [EmergencyContactNumber, setEmergencyContactNumber] = useState("");
  // const [MobileNum, setMobileNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(API_PATHS.signup, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
      console.log(response);
      if (response.ok) {
        console.log("Patient added successfully!");
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        window.location.href = "/auth/signin";
      } else {
        setError(data.message);
        toast({
          title: "An error occurred.",
          description: "Unable to create your account.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log("Error adding patient!");
        setSubmitting(false);
      }
    } catch (error) {
      setError(error);
      console.log(error);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

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
          <Formik
            initialValues={{
              Username: "",
              Name: "",
              Email: "",
              Password: "",
              DateOfBirth: "",
              NationalId: "",
              MobileNum: "",
              Gender: "",
              EmergencyContactName: "",
              EmergencyContactNumber: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Field name="Username">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.Username && touched.Username}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Username <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="text"
                        placeholder="Enter your Username"
                        // mb="24px"
                        size="lg"
                        // required
                        // onChange={(e) => setUsername(e.target.value)}
                      />
                      <FormErrorMessage>{errors.Username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="Name">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.Name && touched.Name}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Name <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="text"
                        placeholder="Your full Name"
                        // mb="24px"
                        size="lg"
                        // required
                        // onChange={(e) => setName(e.target.value)}
                      />
                      <FormErrorMessage>{errors.Name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="Email">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.Email && touched.Email}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Email <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="Email"
                        placeholder="Your Email address"
                        // mb="24px"
                        size="lg"
                        // required
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                      <FormErrorMessage>{errors.Email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="Password">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.Password && touched.Password}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Password <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          borderRadius="15px"
                          // mb="36px"
                          fontSize="sm"
                          type={showPassword ? "text" : "Password"}
                          placeholder="Your Password"
                          size="lg"
                          // required
                          // onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <FaEyeSlash onClick={handleShowClick} />
                          ) : (
                            <FaEye onClick={handleShowClick} />
                          )}
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.Password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="DateOfBirth">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.DateOfBirth && touched.DateOfBirth}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Date of Birth <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="date"
                        placeholder="..."
                        // mb="24px"
                        size="lg"
                        // required
                        // onChange={(e) => setDateOfBirth(e.target.value)}
                      />
                      <FormErrorMessage>{errors.DateOfBirth}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="MobileNum">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.MobileNum && touched.MobileNum}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Mobile Number <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="number"
                        placeholder="Enter a valid number"
                        // mb="24px"
                        size="lg"
                        onKeyPress={(event) => {
                          const pattern = /[0-9]/;
                          const inputChar = String.fromCharCode(event.charCode);
                          if (!pattern.test(inputChar)) {
                            event.preventDefault();
                          }
                        }}
                        // required
                        // onChange={(e) => setMobileNumber(e.target.value)}
                      />
                      <FormErrorMessage>{errors.MobileNum}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="NationalId">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.NationalId && touched.NationalId}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        National ID <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="text"
                        placeholder="..."
                        // mb="24px"
                        size="lg"
                        onKeyPress={(event) => {
                          const pattern = /[0-9]/;
                          const inputChar = String.fromCharCode(event.charCode);
                          if (!pattern.test(inputChar)) {
                            event.preventDefault();
                          }
                        }}
                        // required
                        // onChange={(e) => setDateOfBirth(e.target.value)}
                      />
                      <FormErrorMessage>{errors.NationalId}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                {/* <FormControl>
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Gender
                  </FormLabel>
                  {genders.map((Gender) => (
                    <Flex key={Gender} align="center" ms="10px">
                      <Radio
                        value={Gender}
                        isChecked={Gender === Gender}
                        onChange={handleGenderChange}
                        required
                      >
                        {Gender}
                      </Radio>
                    </Flex>
                  ))}
                </FormControl> */}
                <Field name="Gender">
                  {({ field, form }) => {
                    const { onChange, ...rest } = field;
                    return (
                      <FormControl
                        mb="24px"
                        isInvalid={errors.Gender && touched.Gender}
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Gender <span style={{ color: "red" }}>*</span>
                        </FormLabel>
                        <RadioGroup
                          {...rest}
                          // mb="24px"
                        >
                          {genders.map((Gender) => (
                            <Flex key={Gender} align="center" ms="10px">
                              <Radio
                                value={Gender}
                                onChange={onChange}
                                isChecked={field.value === Gender}
                              >
                                {Gender}
                              </Radio>
                            </Flex>
                          ))}
                        </RadioGroup>
                        <FormErrorMessage>{errors.Gender}</FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="EmergencyContactName">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={
                        errors.EmergencyContactName &&
                        touched.EmergencyContactName
                      }
                    >
                      <FormLabel
                        ms="4px"
                        mt="16px"
                        fontSize="sm"
                        fontWeight="normal"
                      >
                        Emergency Contact Name{" "}
                        <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="text"
                        placeholder="Please Enter Full Name"
                        // mb="24px"
                        size="lg"
                        // required
                        // onChange={(e) => setEmergencyContactName(e.target.value)}
                      />
                      <FormErrorMessage>
                        {" "}
                        {errors.EmergencyContactName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="EmergencyContactNumber">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={
                        errors.EmergencyContactNumber &&
                        touched.EmergencyContactNumber
                      }
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Emergency Contact Number{" "}
                        <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="number"
                        placeholder="Enter a valid phone number"
                        // mb="24px"
                        size="lg"
                        onKeyPress={(event) => {
                          const pattern = /[0-9]/;
                          const inputChar = String.fromCharCode(event.charCode);
                          if (!pattern.test(inputChar)) {
                            event.preventDefault();
                          }
                        }}
                        // value={EmergencyContactNumber}
                        // required
                        // onChange={(e) => setEmergencyContactNumber(e.target.value)}
                      />
                      <FormErrorMessage>
                        {errors.EmergencyContactNumber}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
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
                {error && (
                  <Alert status="error" mt={2} mb={4}>
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
                {/* </FormControl> */}
              </Form>
            )}
          </Formik>
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
