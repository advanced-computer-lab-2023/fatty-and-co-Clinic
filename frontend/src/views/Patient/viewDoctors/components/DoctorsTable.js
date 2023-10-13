// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import DoctorsRow from "components/Tables/DoctorsRow";

import { useHistory } from "react-router-dom";
import React, { useState } from "react";

const DoctorsTable = ({ title, captions, data }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const history = useHistory();
  const textColor = useColorModeValue("gray.700", "white");

  const handleRowClick = (row) => {
    setSelectedRow(row);
    history.replace(`/admin/viewDoctorDetails/${row.Username}`);
  };

  return (
    <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {/* title will be All doctors  */}
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px">
              {captions.map((caption, idx) => {
                return (
                  <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => {
              console.log(row.Username);
              return (
                <DoctorsRow
                  key={row.Username}
                  Name={row.Name}
                  Speciality={row.Speciality}
                  Cost={row.Cost}
                  isSelected={selectedRow === row}
                  onClick={() => handleRowClick(row)}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default DoctorsTable;
