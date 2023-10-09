// Chakra imports
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
// Assets
import React from "react";
import PackageInformation from "./components/PackageInformation";
import { useEffect } from "react";
import { usePackageContext } from "./hooks/usePackageContext";
import PackageForm from "./components/PackageForm";

function PackageI() {
  const { packages, dispatch } = usePackageContext();

  // const [packages, setPackages] = useState(null);
  useEffect(() => {
    const fetchPackages = async () => {
      const response = await fetch("/package/packages");
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
        
        <PackageForm />
      </Grid>
      
    </Flex>
  );
}

export default PackageI;