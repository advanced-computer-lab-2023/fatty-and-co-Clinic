import { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ViewDoctorDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    affiliation: "",
    educationalBackground: "",
  });

  const { username } = useParams();

  useEffect(() => {
    axios
      .get(API_PATHS.getDoctorByUsername + username)
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

  return (
    <Box pt="80px">
      {(username && username !== ":username" && (
        <Flex flexDirection="column">
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
        </Flex>
      )) || (
        <Text fontSize="3xl" fontWeight="bold">
          Username not found
        </Text>
      )}
    </Box>
  );
};
