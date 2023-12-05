// Chakra imports
import { Flex, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import React from "react";
import { FaCube, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Conversations from "./components/Conversations";
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";
import ProfileInformation from "./components/ProfileInformation";
import Appointments from "./components/Appointments";
import { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import PrescriptionTable from "../viewPrescriptions/index.js"

function PatientProfile() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const [patient, setPatient] = useState([{}]);
  const [systemUser, setSystemUser] = useState([{}]);
  const [familyMembers, setFamilyMembers]= useState([{}]); 

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  useEffect(() => {
    const url = API_PATHS.getPatientInfo;
    axios
      .get(url, {
        headers: {
          Authorization: Authorization,
        },
      })
      .then((response) => {
        setPatient(response.data.patient);
        setSystemUser(response.data.user);
        setFamilyMembers(patient.LinkedPatients);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Flex direction='column'>
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        name={patient.Name}
        email={systemUser.Email}
      />
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>
        <GridItem></GridItem>
        <ProfileInformation
          title={"Profile Information"}
          name={patient.Name}
          mobile={patient.MobileNum}
          email={systemUser.Email}
          dateOfBirth={new Date(patient.DateOfBirth).toLocaleDateString("en-GB")}
          gender={patient.Gender == "F"? "Female": patient.Gener == "M"? "Male": "Other"}
          nationalId={patient.NationalId}
        />
        <GridItem></GridItem>
      </Grid>
      <Appointments/>
      <PrescriptionTable></PrescriptionTable>
    </Flex>
  );
}

export default PatientProfile;
