import {
  Box,
  Stack,
  Heading,
  Text,
  Image,
  Divider,
  Button,
  ButtonGroup,
  Avatar,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaUserMd, FaHeart, FaTooth, FaEye , FaLungs } from "react-icons/fa";
function DoctorCard(props) {
  const { Name, Speciality, Cost, CostOld, isSelected, onClick } = props;


  function getSpecialityIcon(speciality) {
    const lowerCaseSpeciality = (speciality || '').toLowerCase();
    switch (lowerCaseSpeciality.toLowerCase()) {
      case "cardiology":
        return <Icon as={FaHeart}   boxSize={4} mr={2} />;
      case "dentistry":
        return <Icon as={FaTooth}   boxSize={4} mr={2} />;
      case "ophthalmology":
        return <Icon as={FaEye}    boxSize={4} mr={2} />;
        case "pulmonology":
          return <Icon as={FaLungs}   boxSize={4} mr={2} />;
      default:
        return <Icon as={FaUserMd}    boxSize={4} mr={2} />;
    }
  }

  return (
    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
    >
      <Flex align="center" p="2">
        <Avatar
          size="md"
          name={Name}
          // src={Name.avatarUrl}
          bg="teal.500"
          color="white"
        />
        <Heading size="md" ml="4">
          {Name}
        </Heading>
      </Flex>
      <Box p="3">
        <Stack spacing="3">
          <Flex>
            {" "}
            {getSpecialityIcon(Speciality)}
            <Text fontSize="xl" fontWeight="bold" mr="1">
              {" "}
              Speciality :{" "}
            </Text>
            <Text fontSize="xl"> {Speciality}</Text>
          </Flex>
          <Text fontSize="xl" color="teal">
            <Flex align="center">
              <Icon as={FaMoneyBillWave} color="black" mr="1" />
              {/* {" "} Price:{" "} */}
              <Text fontSize="xl" fontWeight="bold" color="black" mr="1">
                {" "}
                Price :{" "}
              </Text>
              {CostOld !== Cost ? (
                <>
                  <span
                    style={{ textDecoration: "line-through", color: "teal" }}
                  >
                    {Cost} EGP
                  </span>{" "}
                  {"  "}
                  <span style={{ color: "red" }}>{"    "}{CostOld} EGP</span>
                </>
              ) : (
                <span style={{ color: "teal" }}>{Cost} EGP</span>
              )}
            </Flex>
          </Text>
        </Stack>
      </Box>
      <Divider />
      <Box p="4">
        <ButtonGroup spacing="2" justifyContent="flex-end"  width="full">
          <Button variant="solid" colorScheme="teal" onClick={onClick} >
            Book
          </Button>
          {/* You can add more buttons or customize the actions as needed */}
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default DoctorCard;
