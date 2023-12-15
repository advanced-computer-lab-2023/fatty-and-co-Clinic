// Chakra imports
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
// Assets
import React from "react";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";
import { useState } from "react";

// Custom components
import Subscription from "./components/Subscription";
import PackageI from "./components/PackageInformation";
import FamPackagestatusTable from "./components/FamPackagestatusTable";

function Package() {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [subscription, setSubscription] = useState([{}]);
  const [myPackage, setMyPackage] = useState([{}]);
  const [familyPackages, setFamilyPackages] = useState([]);
  const [packages, setPackages] = useState([{}]);

  useEffect(() => {
    getSubscriptionInfo();
    fetchPackages();
    fetchFamilyPackages();
  }, []);

  const getSubscriptionInfo = () => {
    const url = API_PATHS.viewSubscription;
    axios
      .get(url, {
        headers: {
          Authorization: Authorization,
        },
      })
      .then((response) => {
        setMyPackage(response.data.package);
        setSubscription(response.data.subscription);
      })
      .catch((err) => console.log(err));
  };

  const fetchPackages = async () => {
    const response = await fetch(API_PATHS.packages, {
      headers: {
        Authorization: Authorization,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setPackages(data);
    } else {
      console.log(data);
    }
  };

  const fetchFamilyPackages =  () => {
    const url = API_PATHS.viewFamPackage;
    axios
      .get(url, {
        headers: {
          Authorization: Authorization,
        },
      })
      .then((response) => {
        setFamilyPackages(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} >
      <Grid templateColumns={{ sm: "1fr", lg: "1.6fr 1.2fr" }} >
        <Box>
          <Subscription subscription={subscription} myPackage={myPackage} />
          <FamPackagestatusTable
            title={"My Package"}
            captions={[
              "Name",
              "Status",
              "Package",
              "Enddate",
              "Startdate",
              "Renewaldate",
            ]}
            data={familyPackages}
          ></FamPackagestatusTable>
          </Box>
          <PackageI data={packages} title={"Avilable Packages"} />
          
          
          
      </Grid>
    </Flex>
  );
}

export default Package;
