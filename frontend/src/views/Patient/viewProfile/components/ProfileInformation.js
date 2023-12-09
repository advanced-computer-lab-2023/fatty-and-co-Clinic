// Chakra imports
import { Flex, Button, Text, useColorModeValue, Stack, StackDivider, Box, Heading } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React , {useState} from "react";
import ReactCardFlip from "react-card-flip";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";

const ProfileInformation = ({
  title,
  description,
  name,
  mobile,
  email,
  dateOfBirth,
  gender,
  nationalId,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const handlePasswordChange = () => {
    setIsPassword(!isPassword);
    setIsFlipped(!isFlipped);
  };
  const handleEmailChange = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
    <Card p='16px' my={{ sm: "24px", xl: "0px" }} >
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </CardHeader>
      <CardBody px='5px'>
        <Flex direction='column' w='100%' >
        <Stack divider={<StackDivider />} spacing='3' flex='1' align='center' flexDirection='column'>
          <Box align='center'>
            <Heading size='xs' textTransform='uppercase'>
              Mobile Number
            </Heading>
            <Text pt='2' fontSize='sm'>
              {mobile}
            </Text>
          </Box>
          <Box align='center'>
            <Heading size='xs' textTransform='uppercase'>
              Date Of Birth
            </Heading>
            <Text pt='2' fontSize='sm'>
              {dateOfBirth}
            </Text>
          </Box>
          <Box align='center'>
            <Heading size='xs' textTransform='uppercase'>
              Gender
            </Heading>
            <Text pt='2' fontSize='sm'>
            {gender}
            </Text>
          </Box>
          <Box align='center'>
            <Heading size='xs' textTransform='uppercase'>
              National ID
            </Heading>
            <Text pt='2' fontSize='sm'>
              {nationalId}
            </Text>
          </Box>
          <Flex>
            <Button colorScheme="red" flex="1" mr="4" onClick={() => handlePasswordChange()}>
              Change Password
            </Button>
            <Button colorScheme="red" flex="1" ml="4" onClick={() => handleEmailChange()}>
               Change Email
            </Button>
          </Flex>
       </Stack>
       </Flex>
      </CardBody>
    </Card>

      <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              {title}
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column"  justify="center"  width="100%">
              {isPassword?(
                <>
                <ChangePassword/>
                <Button colorScheme="red"  onClick={() => handlePasswordChange()}>
                  Cancel
                </Button>
                </>
              ):(
                <>
                <ChangeEmail/>
                <Button colorScheme="red"  onClick={() => handleEmailChange()}>
                  Cancel
                </Button>
                </>
              )}
            </Flex>
          </CardBody>
        </Card>
    </ReactCardFlip>
  );
};

export default ProfileInformation;
