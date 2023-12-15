// Chakra imports
import { Flex, Button, Text, useColorModeValue, Stack, StackDivider, Box,
  Editable, useToast, Input, Icon,
  IconButton,ButtonGroup,NumberInputStepper,
  NumberInput, NumberDecrementStepper, NumberIncrementStepper,NumberInputField,
  } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { BsEnvelopeAtFill } from "react-icons/bs";
import { FaBirthdayCake, FaGraduationCap, FaMoneyBillAlt, FaFileMedicalAlt, FaHospital } from "react-icons/fa";
import axios from 'axios';
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React , {useState, useEffect} from "react";
import ReactCardFlip from "react-card-flip";
import ChangePassword from "./ChangePassword";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";

const ProfileInformation = (props) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState(props.email);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [isEditingHourlyRate, setIsEditingHourlyRate] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(props.hourlyRate);

  const [isEditingAffiliation, setIsEditingAffiliation] = useState(false);
  const [affiliation, setAffiliation] = useState(props.affiliation);

  const toast = useToast();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  useEffect(() => {
    setEmail(props.email);
    setHourlyRate(props.hourlyRate);
    setAffiliation(props.affiliation);
  }, [props.email, props.hourlyRate, props.affiliation]);

  const handlePasswordChange = () => {
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
    setIsEditingEmail(false);
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

const handleSaveHourlyRate = async (e) => {
    if (hourlyRate == "") {
      toast({
        title: "Please fill the HourlyRate field",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    axios
      .patch(
        API_PATHS.updateHourly,
        { HourlyRate: hourlyRate },
        { headers: { Authorization } }
      )
      .then((response) => {
        toast({
          title: "HourlyRate updated successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Failed to update HourlyRate",
          description: "An error occurred while updating the HourlyRate.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
      setIsEditingHourlyRate(false);
  };

  const handleUpdateAffiliation = async (e) => {
    if (affiliation == "") {
      toast({
        title: "Please fill the new affiliation field",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    axios
      .patch(
        API_PATHS.updateAffil,
        { Affiliation: affiliation },
        { headers: { Authorization } }
      )
      .then((response) => {
        toast({
          title: "Affiliation updated successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

      setAffiliation(response.data.affiliation);
      })
      .catch((err) => {
        toast({
          title: "Failed to update Affiliation",
          description: "An error occurred while updating the affiliation.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
      setIsEditingAffiliation(false);
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
            <Flex  alignItems="center" direction='row' pl="10">
              <Icon as={FaBirthdayCake} boxSize={6} color={useColorModeValue("teal.500", "teal.300")}/>
              <Text pl="20" pb="3" fontSize='lg' mt="4"> 
                {props.dateOfBirth}
              </Text>
            </Flex>
          </Box>
          <Box align='center'>
            <Flex  alignItems="center" direction='row' pl="10">
              <Icon as={FaFileMedicalAlt} boxSize={6} color={useColorModeValue("teal.500", "teal.300")}/>
              <Text pl="20" pb="3" fontSize='lg' mt="4"> 
                {props.speciality}
              </Text>
            </Flex>
          </Box>
          <Box align='center'>
            <Flex  alignItems="center" direction='row' pl="10">
              <Icon as={FaGraduationCap} boxSize={6} color={useColorModeValue("teal.500", "teal.300")}/>
              <Text pl="20" pb="3" fontSize='lg' mt="4"> 
                {props.educationalBackground}
              </Text>
            </Flex>
          </Box>
          <Box align='center'>
            <Flex alignItems="center" direction="row" pl="10">
              <Icon
                as={FaMoneyBillAlt}
                boxSize={6}
                color={useColorModeValue("teal.500", "teal.300")}
              />
              {isEditingHourlyRate ? (
                <NumberInput
                  pl="20"
                  defaultValue={hourlyRate}
                  precision={2}
                  step={0.2}
                  onChange={(value) => setHourlyRate(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              ) : (
                <Text pl="20" pb="3" fontSize="lg" mt="4">
                  {hourlyRate}
                </Text>
              )}
              <Box pl="5">
              {isEditingHourlyRate ? (
                <ButtonGroup justifyContent='center' size='sm'>
                    <IconButton icon={<CheckIcon />} onClick={() => {handleSaveHourlyRate();}} />
                    <IconButton icon={<CloseIcon />} onClick={() => {setIsEditingHourlyRate(false); setHourlyRate(props.hourlyRate)}} />
                </ButtonGroup>
              ) : (
                <IconButton
                  size='sm'
                  icon={<EditIcon />}
                  onClick={() => setIsEditingHourlyRate(true)}
                />
              )}
              </Box>
            </Flex>
          </Box>
          <Box align='center'>
            <Flex  alignItems="center" direction='row' pl="10">
              <Icon as={FaHospital} boxSize={6} color={useColorModeValue("teal.500", "teal.300")}/>
              <Editable
              textAlign='center'
              value={affiliation}
              fontSize='md'
              isPreviewFocusable={false}
              isEditing={isEditingAffiliation}
              onSubmit={() => handleUpdateAffiliation()}
              pl="20"
            >
              <Flex direction='row'>
              <Input
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                isReadOnly={!isEditingAffiliation}
              />
              <Box pl="5">  
              {isEditingAffiliation ? (
                <ButtonGroup justifyContent='center' size='sm'>
                  <IconButton icon={<CheckIcon />} onClick={() => {handleUpdateAffiliation();}} />
                  <IconButton icon={<CloseIcon />} onClick={() => {setIsEditingAffiliation(false); setAffiliation(props.affiliation)}} />
                </ButtonGroup>
              ) : (
                  <IconButton
                    size='sm'
                    icon={<EditIcon />}
                    onClick={() => setIsEditingAffiliation(true)}
                  />
              )}
              </Box>
              </Flex>
            </Editable>
            </Flex>
          </Box>
          <Box align='center'>
            <Flex  alignItems="center" direction='row' pl="10">
              <Icon as={BsEnvelopeAtFill} boxSize={6} color={useColorModeValue("teal.500", "teal.300")}/>
            <Editable
              textAlign='center'
              value={email}
              fontSize='md'
              isPreviewFocusable={false}
              isEditing={isEditingEmail}
              onSubmit={() => handleUpdateEmail()}
              pl="20"
            >
              <Flex direction='row'>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isReadOnly={!isEditingEmail}
              />
              <Box pl="5">  
              {isEditingEmail ? (
                <ButtonGroup justifyContent='center' size='sm'>
                  <IconButton icon={<CheckIcon />} onClick={() => {handleUpdateEmail();}} />
                  <IconButton icon={<CloseIcon />} onClick={() => {setIsEditingEmail(false); setEmail(props.email)}} />
                </ButtonGroup>
              ) : (
                  <IconButton
                    size='sm'
                    icon={<EditIcon />}
                    onClick={() => setIsEditingEmail(true)}
                  />
              )}
              </Box>
              </Flex>
            </Editable>
            </Flex>
          </Box>
          <Box pl="20" pt="2">
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
                <>
                <ChangePassword/>
                <Button colorScheme="red"  onClick={() => handlePasswordChange()}>
                  Cancel
                </Button>
                </>
            </Flex>
          </CardBody>
        </Card>
    </ReactCardFlip>
  );
};

export default ProfileInformation;
