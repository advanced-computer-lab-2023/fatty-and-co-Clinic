// Chakra imports
import { Flex, Icon, Link, Text, useColorModeValue, Heading, Button, useToast } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { useAuthContext } from "hooks/useAuthContext";

const Subscription = ({ subscription, myPackage, refresh }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const toast = useToast();
  const history = useHistory();

  const isSubscriptionEmpty = () => {
    return (Array.isArray(subscription) && subscription.every(obj => Object.keys(obj).length === 0));
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
        refresh();
        setPackage2("");
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
  
  return (
    <Card p='16px' my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          Subscribed Package Details
        </Text>
      </CardHeader>
      <CardBody px='5px'>
        {!isSubscriptionEmpty()?(
        <Flex direction='column'>
            <Heading as="h3" size="lg" mb="4">
                 You are subscribed to the{" "}
                <Text as="span" color="red.500">
                 {myPackage.Name}
                </Text>{" "}
                package
            </Heading>

          <Flex align='center' mb='15px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Price:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {myPackage.Price}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Session Discount:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {myPackage.Session_Discount}%
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Medicine_Discount:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {myPackage.Medicine_Discount}%
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Family Discount:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {myPackage.Family_Discount}%
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Start Date:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              { new Date(subscription.Startdate).toLocaleDateString("en-GB")}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Renewal Date:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {new Date(subscription.Renewaldate).toLocaleDateString("en-GB")}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              End Date:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {new Date(subscription.Enddate).toLocaleDateString("en-GB")}
            </Text>
          </Flex>
          <Button colorScheme="red" width="fit-content" onClick={handleCancel}>
                Cancel Subscription
          </Button>
        </Flex>
        
        ):(
        <Flex direction='column'>
            <Heading  as="h2" size="xl" mb={4}>You are not subscribed to any package</Heading>
            <Heading as="h3" size="lg" mb={4} color="teal">Explore Our Exclusive Packages</Heading>
            <Text fontSize="xl">
                Discover a world of savings and benefits with our curated packages. Unlock endless discounts
                tailored just for you!
            </Text>
            <Button size="lg" colorScheme="teal" mt="24px" onClick={()=>{history.push('./SubscribePackages')}}>
                Subscribe Now
            </Button>
        </Flex>
        )}
      </CardBody>
    </Card>
  );
};

export default Subscription;
