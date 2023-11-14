import React, { useEffect } from "react";
import Requests from "./components/RequestsTable";
import { Flex, Box, useToast } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";
import { useRequestsContext } from "hooks/useRequestsContext";

export function ViewRequestsInner() {
  // const [data, setData] = useState([{}]);
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const { requests, dispatch } = useRequestsContext();

  const toast = useToast();
  useEffect(() => {
    axios
      .get(API_PATHS.getRequests, {
        headers: {
          Authorization,
        },
      })
      .then((response) => {
        // setData(response.data); // Set the fetched data in the state
        dispatch({ type: "GET_REQUESTS", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        toast({
          title: "Error",
          description: "Error fetching data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, []);

  return (
    <Box pt="80px">
      <Flex
        direction="column"
        alignItems="flex-start"
        pt="50px"
        justifyContent="flex-start"
      >
        <Requests
          title={"Requests"}
          captions={["Name", "Username", "Status", ""]}
          data={requests}
        />
      </Flex>
    </Box>
  );
}
