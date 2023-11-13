// Chakra imports
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
// Assets
import React from "react";
import HealthRecordInformation from "./components/HealthRecordInformation";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useMedicalHistoryContext } from "./hooks/useMedicalHistoryContext";
import HealthRecordForm from "./components/HealthRecordForm";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import { useState } from "react";
import { he } from "date-fns/locale";


function MedicalHistoryI() {
  // const { healthRecords, dispatch } = usePackageContext();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [healthRecords, setHealthRecords] = useState(null);
  useEffect(() => {
    const fetchHealthRecords = async () => {
      const response = await fetch(API_PATHS.getMedicalHistory+user.userType ,{
        headers:{
          'Authorization': Authorization
        }
      });
      const data = await response.json();
      if (response.ok) {
        setHealthRecords(data.MedicalHistory);
        // dispatch({ type: "SET_PACKAGES", payload: data });
      } else {
        console.log(data);
      }
    };
    fetchHealthRecords();
  }, []);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "1.6fr 1.2fr" }}>
        {healthRecords && (
          <HealthRecordInformation title={"Uploaded Health Records"} data={healthRecords} />
        )}

        <HealthRecordForm />
      </Grid>
    </Flex>
  );
}

export default MedicalHistoryI;