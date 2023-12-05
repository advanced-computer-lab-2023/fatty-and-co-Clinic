// Chakra imports
import { Flex, Icon, Link, Text, useColorModeValue, Heading, Button } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";

const Subscription = ({
  myPackage
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const isPackageEmpty = () => {
    return Array.isArray(myPackage) && myPackage.every(obj => Object.keys(obj).length === 0);
  };
  
  return (
    <Card p='16px' my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          Subscribed Package Details
        </Text>
      </CardHeader>
      <CardBody px='5px'>
        {!isPackageEmpty()?(
        <Flex direction='column'>
            <Text>Package name {myPackage.Name}</Text>
          {/* WORK IN PROGRESS */}
        </Flex>
        ):(
        <Flex direction='column'>
            <Heading  as="h2" size="xl" mb={4}>You are not subscribed to any package</Heading>
            <Heading as="h3" size="lg" mb={4} color="teal">Explore Our Exclusive Packages</Heading>
            <Text fontSize="xl">
                Discover a world of savings and benefits with our curated packages. Unlock endless discounts
                tailored just for you!
            </Text>
            <Button size="lg" colorScheme="teal" mt="24px">
                Subscribe Now
            </Button>
        </Flex>
        )}
      </CardBody>
    </Card>
  );
};

export default Subscription;
