// Chakra imports
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
// Assets
import React from "react";
import PackageInformation from "./components/PackageInformation";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { usePackageContext } from "./hooks/usePackageContext";
import PackageForm from "./components/PackageForm";
import DeleteUserForm from "./components/PackageForm";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";

function DeleteUser() {
  return (
    <ChakraProvider>
      <div className="DeleteUser">
        <DeleteUserForm />
        {/* Add other components or routing as needed */}
      </div>
    </ChakraProvider>
  );
}

// ... (imports)

function PackageI() {
  const { packages, dispatch } = usePackageContext();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(API_PATHS.viewHealthFamwithstatus, {
          headers: {
            Authorization,
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          dispatch({ type: "SET_PACKAGES", payload: data });
        } else {
          console.log(data); // The data is printed correctly
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, [dispatch, Authorization]);

  useEffect(() => {
    // This useEffect will log the packages when they change
    console.log("Packages", packages);
  }, [packages]);

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
DeleteUser;
