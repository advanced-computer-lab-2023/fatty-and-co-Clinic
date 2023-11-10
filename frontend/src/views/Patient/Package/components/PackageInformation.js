// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import PackageRow from "./PackageRow";
import React, { useState } from "react";

const PackageInformation = ({ title, data }) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card my={{ lg: "24px" }} me={{ lg: "24px" }}>
      <Flex direction="column">
        <CardHeader py="12px">
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            {title}
          </Text>
        </CardHeader>
        <CardBody>
          <Flex direction="column" w="100%">
            {data
              .filter((row) => row !== null)
              .map((row, index) => {
                if (row) {
                  const id = row.Patient ? row.Patient._id : row.FamilyMem._id;
                  const name = row.Patient
                    ? row.Patient.Name
                    : row.FamilyMem.Name;

                  return (
                    <PackageRow
                      key={index}
                      Name={name}
                      Status={row.Status}
                      PackageName={row.PackageName.Name}
                      Enddate={row.Enddate}
                      Startdate={row.Startdate}
                      Renewaldate={row.Renewaldate}
                     // _id={id}
                    />
                  );
                }
                return null; // or handle the case when row is null
              })}
          </Flex>
        </CardBody>
      </Flex>
    </Card>
  );
};



export default PackageInformation;
