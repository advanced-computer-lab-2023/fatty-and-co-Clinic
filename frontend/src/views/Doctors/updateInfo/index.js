

// Chakra imports
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
// Assets
import React from "react";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import UpdateEmail from "./components/UpdateEmail";
import { API_PATHS } from "API/api_paths";

function UpdateDocEmail() {
  return (
    <ChakraProvider>
      <div className="DeleteUser">
        <UpdateEmail />
        {/* Add other components or routing as needed */}
      </div>
    </ChakraProvider>
  );
}


export default UpdateDocEmail