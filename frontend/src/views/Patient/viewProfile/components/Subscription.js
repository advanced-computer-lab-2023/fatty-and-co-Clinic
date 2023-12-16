// Chakra imports
import { Flex, Icon, Link, Text, useColorModeValue, Heading, Button, useToast, Divider, Box } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, {useEffect, useState} from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { useAuthContext } from "hooks/useAuthContext";

const Subscription = ({ subscription, myPackage }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const toast = useToast();
  const history = useHistory();
  const [isCancelled, setIsCancelled] = useState(false);
  useEffect(() => {
    }, [subscription, myPackage]);

  const isSubscriptionEmpty = () => {
    return isCancelled|| (Array.isArray(subscription) && subscription.every(obj => Object.keys(obj).length === 0));
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
  const packageColor = packageColors[myPackage.Name?.toLowerCase()] || "teal.500";
  
  return (
    <Card >
      {!isSubscriptionEmpty()?(
        <>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize="lg" fontWeight="bold">
          Subscribed to{" "}
          <Text as="span" color={packageColor}>
            {myPackage.Name}
          </Text>{" "}
            package
        </Text>
      </CardHeader>
      <CardBody px='5px'>
        <Flex direction='column' w="100%">
            <Box align='center'>
            <Heading size='xs' textTransform='uppercase'>
                Price
            </Heading>
            <Text pt='2' fontSize='sm'>
                {myPackage.Price}
            </Text>
            </Box>
            <Divider />
            <Box align='center' mt='4'>
            <Heading size='xs' textTransform='uppercase'>
                Discounts
            </Heading>
            
            <Flex justifyContent="space-between">
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
                <Box textAlign="right" >
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
            <Box align='center' mt='4'>
            <Heading size='xs' textTransform='uppercase'>
                End date
            </Heading>
            <Text pt='2' fontSize='sm'>
                {new Date(subscription.Enddate).toLocaleDateString("en-GB")}
            </Text>
            </Box>
            <Divider />
            <Box align='center' mt='4'>
            <Heading size='xs' textTransform='uppercase'>
                Renewal Date
            </Heading>
            <Text pt='2' fontSize='sm'>
                {new Date(subscription.Renewaldate).toLocaleDateString("en-GB")}
            </Text>
            </Box>
            <Divider/>
            <Box align='center' mt='4'>
             <Button colorScheme="red" width="fit-content" onClick={handleCancel}>
                Cancel Subscription
            </Button>
            </Box>
        </Flex>
        </CardBody>
        </>
        ):(
        <>
        <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
            Subscription 
            </Text>
        </CardHeader>
        <CardBody px='5px'>
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
        </CardBody>
        </>
        )}
    </Card>
  );
};

export default Subscription;
