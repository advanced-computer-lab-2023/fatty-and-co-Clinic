// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import HealthRecordRow from "./HealthRecordRow";
import React, { useState } from "react";

const HealthRecordInformation = ({ title, data }) => {
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
            {data.map((row) => {
              return (
                // Name, Price, Session_Discount,  Medicine_Discount ,Family_Discount
                <HealthRecordRow
                  key={row._id}
                  Name={row.Name}
                  Price={row.Price}
                  Session_Discount={row.Session_Discount}
                  Medicine_Discount={row.Medicine_Discount}
                  Family_Discount={row.Family_Discount}
                  _id={row._id}
                />
              );
            })}
          </Flex>
        </CardBody>
      </Flex>
    </Card>
  );
};

export default HealthRecordInformation;
