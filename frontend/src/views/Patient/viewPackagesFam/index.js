// Chakra imports
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
// Assets
import React from "react";
import PackageInformation from "./components/PackageInformation";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { usePackageContext } from "./hooks/usePackageContext";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";


function PackageI() {
  const { packages, dispatch } = usePackageContext();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  // const [packages, setPackages] = useState(null);
  useEffect(() => {
    const fetchPackages = async () => {
      const response = await fetch(API_PATHS.viewOptionPackages ,{
        headers:{
          'Authorization': Authorization
        }
      });
      const data = await response.json();
      if (response.ok) {
        // setPackages(data);
        dispatch({ type: "SET_PACKAGES", payload: data });
        console.log(packages);
      } else {
        console.log(data);
      }
    };
    fetchPackages();
  }, []);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "1.6fr 1.2fr" }}>
        {packages && (
          <PackageInformation title={"Available Packages"} data={packages} />
        )}
      </Grid>
    </Flex>
  );
}

export default PackageI;
