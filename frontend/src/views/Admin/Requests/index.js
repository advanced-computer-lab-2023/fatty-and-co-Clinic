import React, { useEffect, useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import Requests from "./components/RequestsTable";
import { Flex, Button, Box } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";

function ViewRequests() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(API_PATHS.getRequests, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Set the fetched data in the state
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
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
          data={data}
        />
      </Flex>
    </Box>
  );
}

export default ViewRequests;
