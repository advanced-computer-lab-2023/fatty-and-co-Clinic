import {
  Avatar,
  AvatarGroup,
  Flex,
  Icon,
  Progress,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function DoctorsRow(props) {
  const { Name, Speciality, Cost, isSelected, onClick } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr
      onClick={onClick}
      bg={isSelected ? "blue.100" : "transparent"}
      _hover={{ bg: "gray.100" }}
      cursor="pointer"
    >
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Name}
          </Text>
        </Flex>
      </Td>

      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Speciality}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {Cost}
        </Text>
      </Td>
    </Tr>
  );
}

export default DoctorsRow;

// import {
//   Box,
//   Stack,
//   Heading,
//   Text,
//   Image,
//   Divider,
//   Button,
//   ButtonGroup,
//   Card,
//   CardBody,
//   CardFooter,
// } from "@chakra-ui/react";
// import React from "react";

// function DoctorCard(props) {
//   const { Name, Speciality, Cost, isSelected, onClick } = props;

//   return (
//     <Card maxW="sm" borderWidth="1px" borderRadius="lg">
//       <CardBody>
//         {/* Add an Image component here if you have a profile picture for the doctor */}
//         <Stack mt="6" spacing="3">
//           <Heading size="md">{Name}</Heading>
//           <Text>{Speciality}</Text>
//           <Text color="blue.600" fontSize="2xl">
//             {Cost}
//           </Text>
//         </Stack>
//       </CardBody>
//       <Divider />
//       <CardFooter>
//         <ButtonGroup spacing="2">
//           <Button variant="solid" colorScheme="blue" onClick={onClick}>
//             Select
//           </Button>
//           {/* You can add more buttons or customize the actions as needed */}
//         </ButtonGroup>
//       </CardFooter>
//     </Card>
//   );
// }

// export default DoctorCard;

// import {
//   Box,
//   Stack,
//   Heading,
//   Text,
//   Image,
//   Divider,
//   Button,
//   ButtonGroup,
// } from "@chakra-ui/react";
// import React from "react";

// function DoctorCard(props) {
//   const { Name, Speciality, Cost, isSelected, onClick } = props;

//   return (
//     <Box
//       maxW="sm"
//       borderWidth="1px"
//       borderRadius="lg"
//       overflow="hidden"
//       boxShadow="md"
//     >
//       <Image
//         src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
//         alt="Doctor Profile"
//         borderTopRadius="lg"
//         objectFit="cover"
//         height="200px"
//       />
//       <Box p="6">
//         <Stack spacing="3">
//           <Heading size="md">{Name}</Heading>
//           <Text>{Speciality}</Text>
//           <Text color="blue.600" fontSize="2xl">
//             {Cost}
//           </Text>
//         </Stack>
//       </Box>
//       <Divider />
//       <Box p="4">
//         <ButtonGroup spacing="2">
//           <Button variant="solid" colorScheme="blue" onClick={onClick}>
//             Select
//           </Button>
//           {/* You can add more buttons or customize the actions as needed */}
//         </ButtonGroup>
//       </Box>
//     </Box>
//   );
// }

// export default DoctorCard;

