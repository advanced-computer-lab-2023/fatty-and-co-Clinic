
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


//import DoctorsRow from "components/Tables/NewDoctorsRow"; // Change this line

import DoctorsRow from "components/Tables/DoctorsRow";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

const DoctorsTable = ({ title, captions, data }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const history = useHistory();
  const textColor = useColorModeValue("gray.700", "white");

  const handleRowClick = (row) => {
    setSelectedRow(row);

    let newUrl = `./viewDoctorDetails/${row}`;
    let newState = {
      Username: row.Username,
      Cost: row.Cost,
      CostFam: row.CostFam,
    }

    history.push(newUrl,newState );
  };

  return (
    <Box my="22px" overflowX={{ sm: "scroll", xl: "hidden" }}>
    <Box p="6px 0px 22px 0px">
      <Flex direction="column">
        <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
          {/* title will be All doctors  */}
          {title}
        </Text>
      </Flex>
    </Box>
    <Box>
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
    </Box>
  </Box>
  );
};

export default DoctorsTable;