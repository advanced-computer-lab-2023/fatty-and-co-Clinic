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
  Link,
  Switch,
  Text,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";

function UpdateHourlyRate() {
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex position='relative' mb='40px'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}>
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}>
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Change Hourly Rate
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'>
                Fill in the below form to change your hourly rate!
            </Text>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Old hourly rate
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='number'
                size='lg'
                disabled="true"
                pointerEvents="none"
                backgroundColor="ref"

              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                New hourly rate
              </FormLabel>
              
              <Input id="Value"
                borderRadius='15px'
                mb='36px'
                fontSize='sm'
                type='number'
                placeholder='New hourly rate'
                max="10000"
                maxlength="5"
       
              />

              <Button
                fontSize='20px'
                type='submit'
                bg='teal.300'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}>
                Save
              </Button>
            </FormControl>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          // overflowX='hidden'
          h='100%'
          w='40vw'
          position='relative'
          margin-top='auto'
          margin-right="30px"
          margin-bottom='auto'
          
          >
          <Box
            bgImage={signInImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default UpdateHourlyRate;