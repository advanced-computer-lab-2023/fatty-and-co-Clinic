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
import FamPackageRow from "components/Tables/FamPackageRow";

import React from "react";

function FamPackageTable({ title, captions, data }) {
  const textColor = useColorModeValue("gray.700", "white");
  title = "Family Member Packages";
  return (
    <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px">
              {captions.map((caption, idx) => (
                <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                  {caption}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => {
              if (row) {
                const id = row.Patient
                  ? row.Patient._id
                  : row.FamilyMem
                  ? row.FamilyMem._id
                  : "";
                const name = row.Patient
                  ? row.Patient.Name
                  : row.FamilyMem
                  ? row.FamilyMem.Name
                  : "";

                return (
                  <FamPackageRow
                    key={id}
                    FamName={name}
                    packName={row.Package ? row.Package.Name : ""}
                    packPrice={row.Package ? row.Package.Price : ""}
                    packSessionDiscount={
                      row.Package ? `${row.Package.Session_Discount}%` : ""
                    }
                    packMedicineDiscount={
                      row.Package ? `${row.Package.Medicine_Discount}%` : ""
                    }
                    packFamilyDiscount={
                      row.Package ? `${row.Package.Family_Discount}%` : ""
                    }
                  />
                );
              }
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default FamPackageTable;
