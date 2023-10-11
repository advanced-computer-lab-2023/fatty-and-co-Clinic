// Chakra imports
import {
    Box,
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



  
  function createFamilymember() {
    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");
    return (
      <Flex
        direction='column'
        alignSelf='center'
        justifySelf='center'
        overflow='hidden'>
        <Box
          position='absolute'
          minH={{ base: "70vh", md: "50vh" }}
          w={{ md: "calc(100vw - 50px)" }}
          borderRadius={{ md: "15px" }}
          left='0'
          right='0'
          bgRepeat='no-repeat'
          overflow='hidden'
          zIndex='-1'
          top='0'
          bgImage={BgSignUp}
          bgSize='cover'
          mx={{ md: "auto" }}
          mt={{ md: "14px" }}></Box>
        <Flex
          direction='column'
          textAlign='center'
          justifyContent='center'
          align='center'
          mt='6.5rem'
          mb='30px'>
          <Text fontSize='4xl' color='white' fontWeight='bold'>
            AA !
          </Text>
          <Text
            fontSize='md'
            color='white'
            fontWeight='normal'
            mt='10px'
            mb='26px'
            w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}>
            Use these awesome forms to login or create new account in your project
            for free.
          </Text>
        </Flex>
        <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
          <Flex
            direction='column'
            w='445px'
            background='transparent'
            borderRadius='15px'
            p='40px'
            mx={{ base: "100px" }}
            bg={bgColor}
            boxShadow='0 20px 27px 0 rgb(0 0 0 / 5%)'>
            <Text
              fontSize='xl'
              color={textColor}
              fontWeight='bold'
              textAlign='center'
              mb='22px'>
              Register  A new Family member
            </Text>
            <HStack spacing='15px' justify='center' mb='22px'>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='15px'
                border='1px solid lightgray'
                cursor='pointer'
                transition='all .25s ease'
                _hover={{ filter: "brightness(120%)", bg: bgIcons }}>
                 <Icon
                  as={FaFacebook}
                  w='30px'
                  h='30px'
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Flex>
             
             
            </HStack>
            <Text
              fontSize='lg'
              color='gray.400'
              fontWeight='bold'
              textAlign='center'
              mb='22px'>
              or
            </Text>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Full name 
              </FormLabel>
              <Input
                fontSize='sm'
                ms='4px'
                borderRadius='15px'
                type='text'
                placeholder='Family member full name'
                mb='24px'
                size='lg'
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                National id 
              </FormLabel>
              <Input
                fontSize='sm'
                ms='4px'
                borderRadius='15px'
                type='number'
                placeholder='Family member national id '
                mb='24px'
                size='lg'
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Age
              </FormLabel>
              <Input
                fontSize='sm'
                ms='4px'
                borderRadius='15px'
                type='number'
                placeholder='Family member Age'
                mb='24px'
                size='lg'
              />
               <FormLabel ms='4px' fontSize='18px' fontWeight='normal'>
              Gender 
              </FormLabel>
              <select
              fontSize='sm'
               ms='4px'
              borderRadius='25px'
            placeholder='Family member Gender'
            mb='24px'
           size='lg'
           style={{
            border: '2px solid grey',
            borderRadius: '10px',
         width:"331px",
        
          }}
                 >
   <option value="">Select a gender</option>
    <option value="female">male</option>
    <option value="female">female</option>
  </select>
  <br></br>
  <br></br>
  <FormLabel ms='4px' fontSize='18' fontWeight='normal'>
             Relation
              </FormLabel>
              <select
              fontSize='sm'
               ms='4px'
             borderRadius='25px'
             placeholder='Family member Relation'
             mb='24px'
             size='lg'
             style={{
                border: '2px solid grey',
                borderRadius: '10px',
             width:"331px"
              }}
                 >
    <option value="">Select a Relation</option>
    <option value="Child">Child</option>
    <option value="Spouse">Spouse</option>
  </select>
         
            <br>
            </br>
            <br>
            </br>
              <Button
                type='Add Family member'
                bg='teal.300'
                fontSize='15px'
                color='white'
                fontWeight='bold'
                w='60%'
                h='45'
                mb='24px'
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
                style={{
                  left:"71px"
                  }}
                >
               Done
              </Button>
            </FormControl>
            <Button
                type='Add Family member'
                bg='teal.300'
                fontSize='15px'
                color='white'
                fontWeight='bold'
                w='60%'
                h='45'
                mb='24px'
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
                style={{
                  left:"71px",
                  border: '2px solid grey',
                  background:"black"
                  
                  }}
                >
               Add anther Family member 
              </Button>
          </Flex>
        </Flex>
      </Flex>
    );
  }
  
  export default createFamilymember;
  