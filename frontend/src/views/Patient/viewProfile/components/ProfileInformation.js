// Chakra imports
import { Flex, Button, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React , {useState} from "react";
import ReactCardFlip from "react-card-flip";
import ChangePassword from "./ChangePassword";

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
  const handlePasswordChange = () => {
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
        <Flex direction='column'>
          <Text fontSize='md' color='gray.500' fontWeight='400' mb='30px'>
            {description}
          </Text>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Full Name:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {name}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Mobile:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {mobile}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Email:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {email}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Date of Birth:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {dateOfBirth}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Gender:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {gender}
            </Text>
          </Flex>
          <Flex align='center' mb='50px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              National ID:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {nationalId}
            </Text>
          </Flex>
        <Flex mb="24px">
          <Button colorScheme="red" width="fit-content" onClick={() => handlePasswordChange()}>
                Change Password
          </Button>
        </Flex>
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
              <ChangePassword/>
              <Button colorScheme="red"  onClick={() => handlePasswordChange()}>
                  Cancel
              </Button>
            </Flex>
          </CardBody>
        </Card>
    </ReactCardFlip>
  );
};

export default ProfileInformation;
