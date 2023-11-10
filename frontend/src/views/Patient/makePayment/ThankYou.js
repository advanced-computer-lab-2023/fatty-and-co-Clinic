import React from "react";
import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const ThankYouCard = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const history = useHistory();

  const returnToHomePage = () => {
    history.push("/");
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <Box
        p="8"
        borderRadius="lg"
        boxShadow="xl"
        bg={useColorModeValue("white", "gray.800")}
        color={textColor}
        textAlign="center"
      >
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Thank You for your purchase, your order has been confirmed.
        </Text>
        <Button colorScheme="teal" onClick={returnToHomePage}>
          Return to Home Page
        </Button>
      </Box>
    </Flex>
  );
};

export default ThankYouCard;
