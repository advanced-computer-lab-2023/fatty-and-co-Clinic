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
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

// Assets
import signInImage from "assets/img/signInImage.png";
import { useLogin } from "hooks/useLogin";
import { useState } from "react";

const SignInSchema = Yup.object().shape({
  Username: Yup.string().required("Required"),
  Password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
    ),
});

function SignIn() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const { login, error, loading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      const { Username, Password } = values;
      await login(Username, Password);
      setSubmitting(false);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setSubmitting(false);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your username and password to sign in
            </Text>

            <Formik
              initialValues={{
                Username: "",
                Password: "",
              }}
              validationSchema={SignInSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Field name="Username">
                    {({ field, form }) => (
                      <FormControl
                        mb="24px"
                        isInvalid={errors.Username && touched.Username}
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Username
                        </FormLabel>
                        <Input
                          {...field}
                          borderRadius="15px"
                          // mb="24px"
                          fontSize="sm"
                          type="text"
                          placeholder="Your username"
                          size="lg"
                          // onChange={(e) => setUsername(e.target.value)}
                        />
                        <FormErrorMessage>{errors.Username}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="Password">
                    {({ field, form }) => (
                      <FormControl
                        mb="36px"
                        isInvalid={errors.Password && touched.Password}
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Password
                        </FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            borderRadius="15px"
                            // mb="36px"
                            fontSize="sm"
                            type={showPassword ? "text" : "password"}
                            placeholder="Your password"
                            size="lg"
                            // onChange={(e) => setPassword(e.target.value)}
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
                  <FormControl display="flex" alignItems="center">
                    <Switch id="remember-login" colorScheme="teal" me="10px" />
                    <FormLabel
                      htmlFor="remember-login"
                      mb="0"
                      ms="1"
                      fontWeight="normal"
                    >
                      Remember me
                      {/* TODO: Handle remember me later */}
                    </FormLabel>
                  </FormControl>
                  <Button
                    fontSize="10px"
                    isLoading={isSubmitting || loading}
                    type="submit"
                    bg="teal.300"
                    w="100%"
                    h="45"
                    mb="20px"
                    color="white"
                    mt="20px"
                    _hover={{
                      bg: "teal.200",
                    }}
                    _active={{
                      bg: "teal.400",
                    }}
                  >
                    SIGN IN
                  </Button>
                  {error && (
                    <Alert status="error" mt={2} mb={4}>
                      <AlertIcon />
                      {error}
                    </Alert>
                  )}
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

export default SignIn;
