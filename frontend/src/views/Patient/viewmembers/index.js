import React, { useEffect, useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { FamilymemberTable } from "./components/FamilymemberTable.js";
import { Flex, Button, Box } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
//import { useParams } from "react-router-dom";
import { useAuthContext } from "hooks/useAuthContext";

function Viewmembers() {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [data, setData] = useState([{}]);

  useEffect(() => {
    const URL1 = API_PATHS.viewFamilyMembers;
    axios
      .get(URL1, {
        headers: {
          Authorization: Authorization,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box pt="80px">
      <Flex
        direction="column"
        alignItems="flex-start"
        pt="50px"
        justifyContent="flex-start"
      >
        <FamilymemberTable
          title={"Registered Family Memebers"}
          captions={["Name", "NationalId", "Age", "Gender", "Relation"]}
          data={data}
        />
      </Flex>
    </Box>
  );
}

export default Viewmembers;
