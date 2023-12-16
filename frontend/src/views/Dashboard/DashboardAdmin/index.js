import { Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import React from "react";
import Header from "./components/Header";
import Requests from "views/Admin/Requests";
import Package from "views/Admin/Package/package";
import CreateAdminForm from "views/Admin/CreateAdmin/CreateAdminForm";
import DeleteUserForm from "views/Admin/DeleteUser/DeleteUserForm";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

function DashboardAdmin() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  return (
    <Flex direction="column">
      <Header backgroundHeader={ProfileBgImage} backgroundProfile={bgProfile} />
      <Grid templateColumns={{ sm: "1fr", xl: "2fr 3fr" }} gap="22px">
        <Requests />
        <Card>
          <CardHeader>
            <Flex justify="space-between" align="center" mb="1rem" w="100%">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Control users
              </Text>
            </Flex>
          </CardHeader>
              <CreateAdminForm />
              <DeleteUserForm />
        </Card>
      </Grid>
    </Flex>
  );
}

export default DashboardAdmin;
