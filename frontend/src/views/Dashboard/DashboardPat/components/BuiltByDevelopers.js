// Chakra imports
import {
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import React from "react";
// react icons
import { BsArrowRight } from "react-icons/bs";

const BuiltByDevelopers = ({ title, name, description, image }) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card minHeight='290.5px' p='1.2rem'>
      <CardBody w='100%'>
        <Flex flexDirection={{ sm: "column", lg: "row" }} w='100%'>
          <Flex
            flexDirection='column'
            h='100%'
            lineHeight='1.6'
            width={{ lg: "45%" }}>
            <Text fontSize='sm' color='gray.400' fontWeight='bold'>
              {title}
            </Text>
            <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
              {name}
            </Text>
            <Text fontSize='md' color='gray.400' fontWeight='bo'>
              {description}
            </Text>
            <Spacer />

          </Flex>
          <Spacer />
          <Flex
            bg='teal.300'
            //align='center'
            justify='center'
            borderRadius='15px'
            width={{ lg: "50%" }}
            minHeight={{ sm: "250px" }}>
            {image}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default BuiltByDevelopers;
