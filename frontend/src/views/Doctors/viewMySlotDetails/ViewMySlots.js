import { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useParams , useLocation} from "react-router-dom";

import { useAuthContext } from "hooks/useAuthContext";
import DocSlotAptsTable from "./DocSlotAptsTable";

export const ViewMySlots = () => {
  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    affiliation: "",
    educationalBackground: "",
  });
  const [tableData, setTableData] = useState([{}]);
  const location = useLocation();
  const { state } = location;
  //const { username } = useParams();
  let username = state.Username;
 
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  useEffect(() => {
    axios
      .get(API_PATHS.getDoctorByUsername + user.Username, {
        headers: { Authorization },
      })
      .then((response) => response.data)
      .then((data) => {
        setFormData({
          name: data.Name,
          speciality: data.Speciality,
          affiliation: data.Affiliation,
          educationalBackground: data.EducationalBackground,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(API_PATHS.viewAllAvailableSlots + username, {
        headers: { Authorization },
      })
      .then((response) => setTableData(response.data))
      .catch((error) => {
        console.log(error);
      });
  } ,[]);

  return (
    <Box pt="80px">
      {(username && username !== ":username" && (
        <Flex flexDirection="column">
          <Box>
            <Text>
              <strong>Name: </strong>
              {formData.name}
            </Text>
            <Text>
              <strong>Speciality: </strong>
              {formData.speciality}
            </Text>
            <Text>
              <strong>Affiliation: </strong>
              {formData.affiliation}
            </Text>
            <Text>
              <strong>Educational Background: </strong>
              {formData.educationalBackground}
            </Text>
            <DocSlotAptsTable
              title={"Doctor's Working Slots"}
              captions={["Day", "Hour", "Book"]}
              data={tableData}

              //setTableData={setTableData}
            />
          </Box>
        </Flex>
      )) || (
        <Text fontSize="3xl" fontWeight="bold">
          Username not found
        </Text>
      )}
    </Box>
  );
};
