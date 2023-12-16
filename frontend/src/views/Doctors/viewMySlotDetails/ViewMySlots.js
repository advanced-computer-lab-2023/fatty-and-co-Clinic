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
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const searchParams = new URLSearchParams(location.search);
  const patientUsername = searchParams.get("username");
  const doctor= searchParams.get("doctor");

  useEffect(() => {
    axios
      .get(API_PATHS.getDoctorByUser , {
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
      .get(API_PATHS.viewMySlots ,{
        headers: { Authorization },
      })
      .then((response) => setTableData(response.data))
      .catch((error) => {
        console.log(error);
      });
  } ,[]);

  return (
    <Box pt="80px">
       {(doctor && doctor !== ":username" && (
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
              captions={["Day", "Hour", ""]}
              data={tableData}
              setTableData={setTableData}
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
