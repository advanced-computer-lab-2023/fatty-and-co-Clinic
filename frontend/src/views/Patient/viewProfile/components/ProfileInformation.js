// Chakra imports
import { Flex, Button, Text, useColorModeValue, Stack, StackDivider, Box,
  Editable, useToast, Input, Icon,
  EditableInput, IconButton,ButtonGroup,
  EditablePreview, Heading } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon, PhoneIcon } from '@chakra-ui/icons';
import { BsEnvelopeAtFill,BsGenderAmbiguous } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi2";
import axios from 'axios';
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React , {useState, useEffect} from "react";
import ReactCardFlip from "react-card-flip";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";

const ProfileInformation = (props) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [email, setEmail] = useState(props.email);
  const [isEditing, setIsEditing] = useState(false);

  const toast = useToast();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  useEffect(() => {
    setEmail(props.email);
  }, [props.email]);

  const handlePasswordChange = () => {
    setIsPassword(!isPassword);
    setIsFlipped(!isFlipped);
  };

  const handleUpdateEmail = async () => {
  try {
    const response = await axios.patch(
      API_PATHS.updateEmail,
      { Email: email },
      { headers: { Authorization } }
    );
    console.log(email);
    toast({
      title: "Email updated successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    setEmail(response.data.email); // Update the state with the new email
    setIsEditing(false);
  } catch (err) {
    console.log(err);
    toast({
      title: "Failed to update Email",
      description: err.response?.data?.error || "Unknown error",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
};

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
    <Card p='16px' my={{ sm: "24px", xl: "0px" }} >
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {props.title}
        </Text>
      </CardHeader>
      <CardBody px='5px'>
        <Flex direction='column' w='100%' >
        <Stack spacing='1' flex='1' align='left' flexDirection='column'>
          <Box align='center'>
            <Flex  alignItems="center" direction='row' pl="20">
              <Icon as={PhoneIcon} boxSize={6} color={useColorModeValue("teal.500", "teal.300")}/>
              <Text pl="20" pb="3" fontSize='lg' mt="4"> 
                {props.mobile}
              </Text>
            </Flex>
          </Box>
          <Box align='center'>
            <Flex  alignItems="center" direction='row' pl="20">
              <Icon as={FaBirthdayCake} boxSize={6} color={useColorModeValue("teal.500", "teal.300")}/>
              <Text pl="20" pb="3" fontSize='lg' mt="4"> 
                {props.dateOfBirth}
              </Text>
            </Flex>
          </Box>
          <Box align='center'>
            <Flex  alignItems="center" direction='row' pl="20">
              <Icon as={BsGenderAmbiguous} boxSize={6} color={useColorModeValue("teal.500", "teal.300")}/>
              <Text pl="20" pb="3" fontSize='lg' mt="4"> 
                {props.gender}
              </Text>
            </Flex>
          </Box>
          <Box align='center'>
            <Flex  alignItems="center" direction='row' pl="20">
              <Icon as={HiIdentification} boxSize={6} color={useColorModeValue("teal.500", "teal.300")}/>
              <Text pl="20" pb="3" fontSize='lg' mt="4"> 
                {props.nationalId}
              </Text>
            </Flex>
          </Box>
          <Box align='center'>
            <Flex  alignItems="center" direction='row' pl="20">
              <Icon as={BsEnvelopeAtFill} boxSize={6} color={useColorModeValue("teal.500", "teal.300")}/>
            <Editable
              textAlign='center'
              value={email}
              fontSize='md'
              isPreviewFocusable={false}
              isEditing={isEditing}
              onSubmit={() => handleUpdateEmail()}
              pl="20"
            >
              <Flex direction='row'>
              {/* <EditablePreview /> */}
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isReadOnly={!isEditing}
              />
              {isEditing ? (
                <ButtonGroup justifyContent='center' size='sm'>
                  <IconButton icon={<CheckIcon />} onClick={() => {handleUpdateEmail();}} />
                  <IconButton icon={<CloseIcon />} onClick={() => {setIsEditing(false); setEmail(props.email)}} />
                </ButtonGroup>
              ) : (
                  <IconButton
                    size='sm'
                    icon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                  />
              )}
              </Flex>
            </Editable>
            </Flex>
          </Box>
          <Box pl="40">
            <Button colorScheme="red" flex="1" mr="4" onClick={() => handlePasswordChange()}>
              Change Password
            </Button>
          </Box>
       </Stack>
       </Flex>
      </CardBody>
    </Card>

      <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              {props.title}
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
