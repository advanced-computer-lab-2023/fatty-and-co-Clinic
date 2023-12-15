// Chakra imports
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import React, { useState, useEffect } from "react";

import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import ProfileInformation from "./components/ProfileInformation";
import Header from "./components/Header";
import UpdateAffil from "../updateInfo/UpdateAffil";
import UpdateSlots from "../updateInfo/UpdateSlots";
import UpdateHourly from "../updateInfo/UpdateHourly";

function DoctorProfile() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const [doctor, setDoctor] = useState([{}]);
  const [systemUser, setSystemUser] = useState([{}]);

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  useEffect(() => {
    getDoctorInfo();
  }, []);

  const getDoctorInfo = () => {
    const url = API_PATHS.getDoctorInfo;
    axios
      .get(url, {
        headers: {
          Authorization,
        },
      })
      .then((response) => {
        setDoctor(response.data.doctor);
        console.log(response.data);
        setSystemUser(response.data.user);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Flex direction="column">
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        name={doctor.Name}
        email={systemUser.Email}
      />
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap="22px">
        <ProfileInformation
          title="Profile Information"
          name={doctor.Name}
          email={systemUser.Email}
          dateOfBirth={new Date(doctor.DateOfBirth).toLocaleDateString("en-GB")}
          speciality={doctor.Speciality}
          hourlyRate={doctor.HourlyRate}
          educationalBackground={doctor.EducationalBackground}
          affiliation={doctor.Affiliation}
        />
        <Flex direction="column" gap="10px">
          <UpdateSlots />
        </Flex>
      </Grid>
    </Flex>
  );
}

export default DoctorProfile;
