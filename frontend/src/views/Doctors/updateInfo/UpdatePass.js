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
  import React, { useState } from "react";
  import { FaUserPlus } from "react-icons/fa";
  import { API_PATHS } from "API/api_paths";
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import { useAuthContext } from "hooks/useAuthContext";
  import axios from "axios";
  import { Formik, Form, Field } from "formik";
  import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
    Password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ),
  });
  
  function UpdatePass() {
    const [showPassword, setShowPassword] = useState(false);
    const textColor = useColorModeValue("gray.700", "white");
    const toast = useToast();
    const { user } = useAuthContext();
    const Authorization = `Bearer ${user.token}`;
    const handleShowClick = () => setShowPassword(!showPassword);

    const handlePasswordSubmit = async (values, { setSubmitting }) => {
        console.log(values);
        try {
            console.log('Password submitted:', values.Password);
            const { Password} = values;
            console.log(Password);

            const response = await axios.patch(API_PATHS.updatePass, {Password }, { headers: { Authorization } })
            .then((response) => {
                // Handle success or provide feedback to the user
                toast({
                  title: "Password updated successfully",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });

              })
              .catch((error) => {
                toast({
                  title: "Failed to update password",
                  description: error.response.data.error,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
                console.error("An error occurred", error);
              });;
        
            console.log('Server response:', response.data);

    
          setSubmitting(false);


        } catch (error) {
          console.error(error);
          setSubmitting(false);
        }
      };

  
    return (
        <Box pt="80px">
            <Flex
        direction="column"
        alignItems="flex-center"
        pt="50px"
        justifyContent="flex-start"
      >
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
                  <FormLabel  fontSize="lg" color = {textColor} fontWeight="bold">
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
              SAVE
            </Button>
          </Form>
        )}
      </Formik>
      </Flex>
        </Box>
        

    );
  }
  
  export default UpdatePass;
  