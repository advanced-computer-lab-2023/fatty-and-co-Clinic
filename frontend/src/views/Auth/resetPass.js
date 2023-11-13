import React from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

// Assets
import signInImage from "assets/img/signInImage.png";
import { useState } from "react";
import { API_PATHS } from "API/api_paths";
import axios from 'axios';

const SignInSchema = Yup.object().shape({
    Password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ),
  });

function resetPass() {
    const [email, setEmail] = useState('');
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const [isOTPSubmitted, setOTPSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();

    const handleShowClick = () => setShowPassword(!showPassword);
  
    const handleSubmit = async (values, { setSubmitting }) => {
      console.log(values);
      try {
        const { Email } = values;
        console.log(Email);

        setEmail(Email);  
        const response = await axios.post(API_PATHS.sendOTP, { Email });
        console.log(email);
  
        console.log('Server response:', response.data);
  
        setFormSubmitted(true);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    };
  
    const handleOtpSubmit = async (values, { setSubmitting }) => {
        try{
            console.log('OTP submitted:', values.otp);
                const { otp} = values;
                //await handleSubmit(values, { setSubmitting });
                console.log(otp);
                console.log(email);
                console.log('Request Payload:', { Email: email, otp: otp });

                const response = await axios.post(API_PATHS.validateOTP, { Email: email , otp: otp });
            
                console.log('Server response:', response.data);

                setOTPSubmitted(true);
                setFormSubmitted(false);
                setSubmitting(false);
        } catch (error) {
            console.error(error);
          }
    };

    const handlePasswordSubmit = async (values, { setSubmitting }) => {
        try{
            console.log('Password submitted:', values.Password);
                const { Password} = values;
                console.log(Password);
                console.log('Request Payload:', { Email: email, Password: Password });

                const response = await axios.patch(API_PATHS.resetPass, { Email: email, Password: Password })
                .then((response) => {
                    // Handle success or provide feedback to the user
                    toast({
                      title: "Password reset successfully",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                  })
                  .catch((error) => {
                    toast({
                      title: "Failed to reset password",
                      description: error.response.data.error,
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                    console.error("An error occurred", error);
                  });;;
            
                console.log('Server response:', response.data);

            
                window.location.href = '/auth/signin';
        } catch (error) {
            console.error(error);
          }
    };

  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: 'initial', md: '75vh', lg: '85vh' }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: '100px', md: '0px' }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: 'none' }}
          w={{ base: '100%', md: '50%', lg: '42%' }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: '150px', lg: '80px' }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              {isFormSubmitted ? 'Enter OTP' : isOTPSubmitted? 'Reset Password' : 'Welcome Back'}
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              {isFormSubmitted
                ? 'Enter the OTP sent to your email'
                : isOTPSubmitted? 'Enter your new password': 'Enter an email to reset your password'}
            </Text>

            {isFormSubmitted ? (
              <Formik
                initialValues={{
                  otp: '',
                }}
                onSubmit={handleOtpSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field name="otp">
                      {({ field }) => (
                        <FormControl mb="24px">
                          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                            OTP
                          </FormLabel>
                          <Input
                            {...field}
                            fontSize="sm"
                            ms="4px"
                            borderRadius="15px"
                            type="text"
                            placeholder="Enter OTP"
                            size="lg"
                          />
                        </FormControl>
                      )}
                    </Field>

                    <Button
                      fontSize="10px"
                      isLoading={isSubmitting}
                      type="submit"
                      bg="teal.300"
                      w="100%"
                      h="45"
                      mb="20px"
                      color="white"
                      mt="20px"
                      _hover={{
                        bg: 'teal.200',
                      }}
                      _active={{
                        bg: 'teal.400',
                      }}
                    >
                      SUBMIT OTP
                    </Button>
                  </Form>
                )}
              </Formik>
            ) : isOTPSubmitted ? (
                
                <Formik
                initialValues={{
                  Password: '',
                }}
                validationSchema={SignInSchema}
                onSubmit={handlePasswordSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <Field name="Password">
                      {({ field, form }) => (
                        <FormControl
                          mb="24px"
                          isInvalid={errors.Password && touched.Password}
                        >
                          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                            Password
                          </FormLabel>
                          <InputGroup> 
                          <Input
                            {...field}
                            fontSize="sm"
                            ms="4px"
                            borderRadius="15px"
                            type={showPassword ? "text" : "password"}
                            placeholder="Your Password"
                            size="lg"
                          />
                          <InputRightElement>
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

                    <Button
                      fontSize="10px"
                      isLoading={isSubmitting}
                      type="submit"
                      bg="teal.300"
                      w="100%"
                      h="45"
                      mb="20px"
                      color="white"
                      mt="20px"
                      _hover={{
                        bg: 'teal.200',
                      }}
                      _active={{ 
                        bg: 'teal.400',
                      }}
                    >
                      RESET
                    </Button>
                  </Form>
                )}
              </Formik>

              ): (
              <Formik
                initialValues={{
                  Email: '',
                }}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <Field name="Email">
                      {({ field }) => (
                        <FormControl
                          mb="24px"
                          isInvalid={errors.Email && touched.Email}
                        >
                          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                            Email
                          </FormLabel>
                          <Input
                            {...field}
                            fontSize="sm"
                            ms="4px"
                            borderRadius="15px"
                            type="email"
                            placeholder="Your Email address"
                            size="lg"
                          />
                          <FormErrorMessage>{errors.Email}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Button
                      fontSize="10px"
                      isLoading={isSubmitting}
                      type="submit"
                      bg="teal.300"
                      w="100%"
                      h="45"
                      mb="20px"
                      color="white"
                      mt="20px"
                      _hover={{
                        bg: 'teal.200',
                      }}
                      _active={{ 
                        bg: 'teal.400',
                      }}
                    >
                      SUBMIT
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Don't have an account?
                <Link
                  color={titleColor}
                  ms="5px"
                  fontWeight="bold"
                  href="./signup"
                >
                  Sign Up
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default resetPass;
