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
import Statuspackagerow from "components/Tables/statuspackagerow";
import MyPackageSubRow from "components/Tables/MyPackageSubRow";
// console.log(statuspackagerow)
import React from "react";

export function FamPackagestatusTable({ title, captions, data }) {
  const textColor = useColorModeValue("gray.700", "white");

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
            {Array.isArray(data) ? (
              data.map((row) => {
                if (row) {
                  const id = row.Patient ? row.Patient._id : row.FamilyMem._id;
                  const name = row.Patient
                    ? row.Patient.Name
                    : row.FamilyMem.Name;

                  return (
                    <Statuspackagerow
                      key={id}
                      Name={name}
                      Status={row.Status ? row.Status : ""}
                      Package={row.Package ? row.Package.Name : ""}
                      Enddate={row.Enddate ? row.Enddate : ""}
                      Startdate={row.Startdate ? row.Startdate : ""}
                      Renewaldate={
                        !row.Renewaldate || row.Status === "Cancelled"
                          ? ""
                          : row.Renewaldate
                      }
                    />
                  );
                }
              })
            ) : (
              // Render a single row for non-array data (assuming it's an object)
              <MyPackageSubRow
                key={data.Patient ? data.Patient._id : data.FamilyMem._id}
                Name={data.Patient ? data.Patient.Name : data.FamilyMem.Name}
                Status={data.Status ? data.Status : ""}
                Package={data.Package ? data.Package.Name : ""}
                Enddate={data.Enddate ? data.Enddate : ""}
                Startdate={data.Startdate ? data.Startdate : ""}
                Renewaldate={
                  !data.Renewaldate || data.Status === "Cancelled"
                    ? ""
                    : data.Renewaldate
                }
              />
            )}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
