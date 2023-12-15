// Chakra imports
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
// Assets
import React from "react";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import { usePackageContext } from "./hooks/usePackageContext";

function Package() {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "1.6fr 1.2fr" }} />
    </Flex>
  );
}

export default Package;
