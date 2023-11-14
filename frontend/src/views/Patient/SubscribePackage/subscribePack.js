import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Input,
  Stack,
  useToast,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { API_PATHS } from "API/api_paths";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import { useHistory } from "react-router-dom";
import { useAuthContext } from "hooks/useAuthContext";
import MakePayment from "../makePayment";
import { PackageContextProvider } from "../viewPackagesFam/components/Context";
import PackageI from "../viewPackagesFam";
import { useWalletContext } from "hooks/useWalletContext";

import axios from "axios";

function SubscribePackage() {
  const [PackageName, setPackageName] = useState("");
  const [NationalId, setNationalId] = useState("");
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState("");

  const toast = useToast();
  const textColor = useColorModeValue("gray.700", "white");
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const { Wallet, dispatch } = useWalletContext();

  const handleSubscribeCredit = async (e) => {
    e.preventDefault();

    try {
      if (!PackageName) {
        toast({
          title: "Please fill the Package field!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return; // Don't proceed further
      } else if (PackageName && !NationalId) {
        const response = await fetch(API_PATHS.getAmountCredit, {
          method: "PATCH",
          headers: {
            Authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ PackageName }),
        });
        const errorData = await response.json();
        if (response.ok) {
          const { amount, description, PackageName } = errorData;
          const redirectUrl = `/patient/payment/?amount=${amount}&description=${description}&PackageName=${PackageName}`;
          history.replace(redirectUrl);
        } else {
          toast({
            title: "Failed to pay & subscribe!",
            description: errorData.error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
      } else if (PackageName && NationalId) {
        const response = await fetch(API_PATHS.getAmountCreditFam, {
          method: "PATCH",
          headers: {
            Authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ PackageName, NationalId }),
        });
        const errorData = await response.json();
        if (response.ok) {
          const { amount, description, PackageName, NationalId } = errorData;
          const redirectUrl = `/patient/payment/?amount=${amount}&description=${description}&PackageName=${PackageName}&NationalId=${NationalId}`;
          history.replace(redirectUrl);
        } else {
          toast({
            title: "Failed to pay & subscribe",
            description: errorData.error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleNoSelected = async (e) => {
    e.preventDefault();
    toast({
      title: "Please select a payment method!",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    return;
  };
  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      if (!PackageName) {
        toast({
          title: "Please fill the Package field!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      } else if (PackageName && !NationalId) {
        const response = await fetch(API_PATHS.subscribePackageSelf, {
          method: "PATCH",
          headers: {
            Authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ PackageName }),
        });
        const errorData = await response.json();
        if (response.ok) {
          toast({
            title: "Subscription process successfull!",
            status: "success",
            description: errorData.success,
            duration: 9000,
            isClosable: true,
          });
          try {
            const res = await axios.get(API_PATHS.getWalletAmount, {
              headers: { Authorization },
            });
            dispatch({ type: "GET_WALLET", payload: res.data.Wallet });
          } catch (error) {
            console.error("Error fetching wallet amount", error);
          }
        } else {
          toast({
            title: "Failed to pay & subscribe",
            description: errorData.error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } else if (PackageName && NationalId) {
        const response = await fetch(API_PATHS.subscribePackageFam, {
          method: "PATCH",
          headers: {
            Authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ PackageName, NationalId }),
        });
        // const errorData = await response.json();
        if (response.ok) {
          toast({
            title: "Subscription process completed successfully!",
            description: errorData.success,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          try {
            const res = await axios.get(API_PATHS.getWalletAmount, {
              headers: { Authorization },
            });
            dispatch({ type: "GET_WALLET", payload: res.data.Wallet });
          } catch (error) {
            console.error("Error fetching wallet amount", error);
          }
        } else {
          toast({
            title: "Failed to pay & subscribe for family member!",
            // description: errorData.error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <Flex>
      <Card
        p="80px"
        my={{ sm: "24px", lg: "0px" }}
        ms={{ sm: "0px", lg: "24px" }}
      >
        <CardHeader>
          <Flex justify="space-between" align="center" mb="1rem" w="100%">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Subscribe For Yourself/Family Member
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex direction="column" w="100%">
            <form>
              <Text>Steps To Subscribe:</Text>
              <Text>1.Enter package name for yourself</Text>
              <Text>2. Enter package name & national ID of family member</Text>

              <br />
              <Stack spacing={3}>
                <Input
                  variant="filled"
                  type="text"
                  placeholder="Package"
                  value={PackageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
                <Input
                  variant="filled"
                  type="NationalId"
                  placeholder="NationalId"
                  value={NationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                />
                <Box>
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    style={{
                      backgroundColor: "teal.300", // Mint blue background color
                      color: "#319795", // Mint blue text color
                      padding: "8px 12px",
                      borderRadius: "4px",
                      border: "1px solid #319795", // Mint blue border color
                    }}
                  >
                    {" "}
                    <option value="">Payment Method</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Credit">Credit Card</option>
                  </select>
                </Box>
                <Button
                  colorScheme="teal"
                  borderColor="teal.300"
                  color="teal.300"
                  fontSize="xs"
                  p="8px 32px"
                  type="submit"
                  textColor="white"
                  onClick={
                    selectedOption === "Wallet"
                      ? handleSubscribe
                      : selectedOption === "Credit"
                      ? handleSubscribeCredit
                      : handleNoSelected
                  }
                >
                  {" "}
                  <Icon as={FaUserPlus} mr={2} />
                  Pay
                </Button>
              </Stack>
            </form>
          </Flex>
        </CardBody>
      </Card>
      <PackageContextProvider>
        <PackageI />
      </PackageContextProvider>
    </Flex>
  );
}

export default SubscribePackage;
