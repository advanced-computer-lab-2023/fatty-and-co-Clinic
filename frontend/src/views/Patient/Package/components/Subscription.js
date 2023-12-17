// Chakra imports
import {
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
  Heading,
  Button,
  useToast,
  Divider,
  Box,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useEffect, useState } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "hooks/useAuthContext";
const Subscription = ({ subscription, myPackage }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const toast = useToast();
  const history = useHistory();
  const [isCancelled, setIsCancelled] = useState(false);
 
  useEffect(() => {}, [subscription, myPackage]);

  const isSubscriptionEmpty = () => {
    return (
      isCancelled ||
      (Array.isArray(subscription) &&
        subscription.every((obj) => Object.keys(obj).length === 0))
    );
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_PATHS.cancelSubscription, {
        method: "PATCH",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      });
      console.log("Response", response.status);
      const errorData = await response.json();
      if (response.ok) {
        toast({
          title: "Cancelled successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsCancelled(true);
      } else {
        toast({
          title: "Failed to Cancel",
          description: errorData.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const packageColors = {
    silver: "gray.400",
    platinum: "blue.200",
    premium: "blue.200",
    gold: "yellow.400",
  };

  // Get the color based on the package name, default to teal.500 if not found
  const packageColor =
    packageColors[myPackage.Name?.toLowerCase()] || "teal.500";

  return (
    <Card p="16px" my={{ sm: "24px", xl: "0px" }} w="100%"  boxShadow="lg" > 
      {!isSubscriptionEmpty() ? (
        <>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" fontWeight="bold" ml="2px">
              Subscribed to{" "}
              <Text as="span" color={packageColor}>
                {myPackage.Name}
              </Text>{" "}
              package
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column" w="100%">
              <Box align="center">
                <Heading size="xs" textTransform="uppercase">
                  Price
                </Heading>
                <Text pt="2" fontSize="sm">
                  {myPackage.Price}
                </Text>
              </Box>
              <Divider />
              <Box align="center" mt="4">
                <Heading size="xs" textTransform="uppercase">
                  Discounts
                </Heading>

                <Flex justifyContent="space-evenly">
                  <Box textAlign="left">
                    <Text pt="2" fontSize="sm" align="center">
                      Session
                    </Text>
                    <Text pt="2" fontSize="sm" align="center">
                      {myPackage.Session_Discount}%
                    </Text>
                  </Box>

                  <Box textAlign="center">
                    <Text pt="2" fontSize="sm" align="center">
                      Medicine
                    </Text>

                    <Text pt="2" fontSize="sm" align="center">
                      {myPackage.Medicine_Discount}%
                    </Text>
                  </Box>
                  <Box textAlign="right">
                    <Text pt="2" fontSize="sm" align="center">
                      Family
                    </Text>
                    <Text pt="2" fontSize="sm" align="center">
                      {myPackage.Family_Discount}%
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Divider />
              <Box align="center" mt="4">
                <Heading size="xs" textTransform="uppercase">
                  End date
                </Heading>
                <Text pt="2" fontSize="sm">
                  {new Date(subscription.Enddate).toLocaleDateString("en-GB")}
                </Text>
              </Box>
              <Divider />
              <Box align="center" mt="4">
                <Heading size="xs" textTransform="uppercase">
                  Renewal Date
                </Heading>
                <Text pt="2" fontSize="sm">
                  {new Date(subscription.Renewaldate).toLocaleDateString(
                    "en-GB"
                  )}
                </Text>
              </Box>
              <Divider />
              <Box align="center" mt="4">
                <Button
                  colorScheme="red"
                  width="fit-content"
                  onClick={handleCancel}
                >
                  Cancel Subscription
                </Button>
              </Box>
            </Flex>
          </CardBody>
        </>
      ) : (
        <>
          
        </>
      )}
    </Card>
  );
};

export default Subscription;
